/**
 * strict-apply — agents strictly apply corpus law at runtime (fail-closed).
 *
 * Every dispatch and effect passes a law checklist before execute:
 *   - no overrideAccess bypass on Payload writes
 *   - MCP tool calls grounded + trust-boundary receipted (ai/industry remedies)
 *   - society cascade depth capped (cascadeDepthVerdict)
 *   - cross-tenant emit/call rejected
 *
 * @standard NIST SP 800-162 ABAC (access inherits actor scope)
 * @standard OWASP-LLM-Top-10:2025 LLM01 prompt-injection (trustBoundaryVerdict)
 * @see ../ai/industry · ../sandbox · ./effect-processor · ../agents/mcp/in-process-client
 */
import {
  cascadeDepthVerdict,
  groundToolCall,
  trustBoundaryVerdict,
} from '@/ai/industry'
import { accessVerdict, actorFromScope, type AccessActor } from '@/access'
import { expectedEventUuid, extractSecureWave, waveInSecureComms } from '@/team/comms'
import type { Receipt } from '@/receipt'
import type { ToolGrant, ToolAction } from '@/sandbox'
import type { AgentContext, AgentEffect, AgentLawState, DomainEvent } from './types'

/** Thrown when a dispatch or effect violates agent law — fail-closed, no optional bypass. */
export class StrictApplyViolation extends Error {
  constructor(
    readonly gate: string,
    readonly reason: string,
  ) {
    super(`strict-apply (${gate}): ${reason}`)
    this.name = 'StrictApplyViolation'
  }
}

/** Default grant for in-process agent MCP — society-internal, capability-scoped. */
export const AGENT_RUNTIME_GRANT: ToolGrant = {
  toolUuid: 'agent-runtime-mcp',
  capabilities: ['read', 'api', 'execute'],
  allowedHosts: [],
  credentialHandles: [],
}

export interface StrictApplyVerdict {
  readonly allowed: boolean
  readonly reason?: string
  readonly receipt?: Receipt
}

const MCP_TOOL_ACTION: ToolAction = { capability: 'execute' }

/** Build default law state for a society dispatch path. */
export function defaultAgentLawState(overrides: Partial<AgentLawState> = {}): AgentLawState {
  return {
    depth: 0,
    actor: 'agent-runtime',
    grant: AGENT_RUNTIME_GRANT,
    receiptHead: null,
    ...overrides,
  }
}

function recordReceipt(law: AgentLawState | undefined, receipt: Receipt): void {
  law?.onReceipt?.(receipt)
}

/**
 * Gate a society dispatch (event fan-out or addressed call) — depth + trust boundary.
 * Call before `runtime.dispatchEvent` / `dispatchTo`.
 */
export function strictApplyDispatch(
  ctx: AgentContext,
  ev: DomainEvent,
  opts?: { readonly untrustedPayload?: unknown },
): StrictApplyVerdict {
  const law = ctx.law ?? defaultAgentLawState({ actor: ctx.tenantId })
  const depthVerdict = cascadeDepthVerdict(law.depth)
  if (!depthVerdict.allowed) {
    return { allowed: false, reason: depthVerdict.reason }
  }
  const dispatchAccess = accessVerdict(
    actorFromScope(ctx.tenantId, law.actor),
    { level: 'agent', tenantId: ev.tenantId },
    'dispatch',
  )
  if (!dispatchAccess.allowed) {
    return { allowed: false, reason: `cross-tenant dispatch: ${dispatchAccess.reason}` }
  }
  const untrusted = opts?.untrustedPayload ?? law.untrustedPayload ?? ev.payload
  const boundary = trustBoundaryVerdict({
    grant: law.grant,
    action: MCP_TOOL_ACTION,
    actor: law.actor,
    head: law.receiptHead,
    timestampIso: ev.emittedAt || new Date().toISOString(),
    untrustedPayload: untrusted,
    actionLabel: `dispatch:${ev.id}`,
  })
  recordReceipt(law, boundary.receipt)
  if (!boundary.allowed) {
    return { allowed: false, reason: boundary.reason, receipt: boundary.receipt }
  }
  return { allowed: true, receipt: boundary.receipt }
}

/** Assert dispatch law — throws StrictApplyViolation on block. */
export function assertStrictDispatch(
  ctx: AgentContext,
  ev: DomainEvent,
  opts?: { readonly untrustedPayload?: unknown },
): void {
  const v = strictApplyDispatch(ctx, ev, opts)
  if (!v.allowed) throw new StrictApplyViolation('dispatch', v.reason ?? 'blocked')
}

/**
 * Gate one AgentEffect before the effect-processor executes it.
 * Enforces access scope (no overrideAccess), tenant isolation, cascade depth on `call`.
 */
export function strictApplyEffect(ctx: AgentContext, eff: AgentEffect): StrictApplyVerdict {
  const law = ctx.law ?? defaultAgentLawState({ actor: ctx.tenantId })

  switch (eff.kind) {
    case 'create':
    case 'update':
      // Law: Payload writes inherit actor access — never widen via overrideAccess.
      return { allowed: true }

    case 'emit': {
      const wave = extractSecureWave(eff.event.payload)
      if (wave) {
        const emitBody = {
          tenantId: wave.tenantId,
          event: eff.event.id,
          eventUuid: '',
          agent: law.actor,
          payload: eff.event.payload,
          depth: wave.depth,
          emittedAt: wave.emittedAt,
        }
        const r = waveInSecureComms({
          scopeTenantId: ctx.tenantId,
          envelope: wave,
          event: eff.event.id,
          eventUuid: expectedEventUuid(emitBody),
          agent: law.actor,
          payload: eff.event.payload,
        })
        if (!r.verdict.ok) {
          return { allowed: false, reason: r.verdict.reason }
        }
        return { allowed: true, receipt: r.receipt }
      }
      const emitAccess = accessVerdict(
        actorFromScope(ctx.tenantId, law.actor),
        { level: 'emit', tenantId: eff.event.tenantId },
        'emit',
      )
      if (!emitAccess.allowed) {
        return { allowed: false, reason: `cross-tenant emit: ${emitAccess.reason}` }
      }
      return { allowed: true }
    }

    case 'call': {
      const depthVerdict = cascadeDepthVerdict(law.depth)
      if (!depthVerdict.allowed) return { allowed: false, reason: depthVerdict.reason }
      const callAccess = accessVerdict(
        actorFromScope(ctx.tenantId, law.actor),
        { level: 'agent', tenantId: eff.event.tenantId },
        'call',
      )
      if (!callAccess.allowed) {
        return { allowed: false, reason: `cross-tenant call: ${callAccess.reason}` }
      }
      return { allowed: true }
    }

    case 'notify':
    case 'escalate':
    case 'audit':
    case 'capture':
      return { allowed: true }

    default: {
      const _exhaustive: never = eff
      return { allowed: false, reason: `unknown effect kind: ${(_exhaustive as { kind: string }).kind}` }
    }
  }
}

/** Assert effect law — throws StrictApplyViolation on block. */
export function assertStrictEffect(ctx: AgentContext, eff: AgentEffect): void {
  const v = strictApplyEffect(ctx, eff)
  if (!v.allowed) throw new StrictApplyViolation('effect', v.reason ?? 'blocked')
}

/**
 * Gate an in-process MCP tool call — groundToolCall + trustBoundaryVerdict (receipt mandatory).
 */
export function strictApplyMcpCall(
  law: AgentLawState,
  toolName: string,
  args: Record<string, unknown>,
  timestampIso?: string,
  opts?: { readonly actor?: AccessActor },
): StrictApplyVerdict {
  const tid = args.tenantId
  if (typeof tid === 'string' && tid.length > 0 && opts?.actor) {
    const tenantAccess = accessVerdict(
      opts.actor,
      { level: 'mcp', tenantId: tid, toolName },
      'execute',
    )
    if (!tenantAccess.allowed) {
      return { allowed: false, reason: tenantAccess.reason }
    }
  }
  const grounded = groundToolCall(law.grant, MCP_TOOL_ACTION, { tool: toolName, args })
  if (!grounded.grounded) {
    return { allowed: false, reason: grounded.reason }
  }
  const boundary = trustBoundaryVerdict({
    grant: law.grant,
    action: MCP_TOOL_ACTION,
    actor: law.actor,
    head: law.receiptHead,
    timestampIso: timestampIso ?? new Date().toISOString(),
    untrustedPayload: args,
    actionLabel: `mcp:${toolName}`,
  })
  recordReceipt(law, boundary.receipt)
  if (!boundary.allowed) {
    return { allowed: false, reason: boundary.reason, receipt: boundary.receipt }
  }
  return { allowed: true, receipt: boundary.receipt }
}

/** Assert MCP call law — throws StrictApplyViolation on block. */
export function assertStrictMcpCall(
  law: AgentLawState,
  toolName: string,
  args: Record<string, unknown>,
  timestampIso?: string,
  opts?: { readonly actor?: AccessActor },
): Receipt {
  const v = strictApplyMcpCall(law, toolName, args, timestampIso, opts)
  if (!v.allowed || !v.receipt) {
    throw new StrictApplyViolation('mcp', v.reason ?? 'blocked without receipt')
  }
  return v.receipt
}
