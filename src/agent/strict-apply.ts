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
import { recordOnPath, toAtomPath, type PathCanonicalEntry } from '@/path'
import {
  assertAgentUnderstandsCross,
  assertPathFollowed,
  assertRecordedAndImplemented,
  crossConceptForViolation,
  violationsFromUnsealedAxes,
} from '@/seal'
import { crossViolationFromStrictApply } from '@/monitor/violations'
import { waveSessionVerdict } from '@/wave'
import {
  agentSkillContextForDispatch,
  compactRulesSnapshot,
  type AgentSkillContext,
} from './skill-context'
import type { AgentContext, AgentEffect, AgentLawState, DomainEvent } from './types'

/** Thrown when a dispatch or effect violates agent law — fail-closed, no optional bypass. */
export class StrictApplyViolation extends Error {
  readonly crossEducation?: string

  constructor(
    readonly gate: string,
    readonly reason: string,
    opts?: { readonly crossEducation?: string },
  ) {
    const edu = opts?.crossEducation
    super(
      edu
        ? `strict-apply (${gate}): ${reason}\n\n--- CrossConceptVerdict ---\n${edu}`
        : `strict-apply (${gate}): ${reason}`,
    )
    this.name = 'StrictApplyViolation'
    this.crossEducation = edu
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
  /** Lazy-realised skill bundle for touched paths (<50KB, no skills.index). */
  readonly skillContext?: AgentSkillContext
  /** Cross education markdown when rules/cross gate blocks — finishedIdeaCrossed primer. */
  readonly crossEducation?: string
}

const MCP_TOOL_ACTION: ToolAction = { capability: 'execute' }

/** Mutable session — pathsVisited + append-only pathLedger for strict-apply gates. */
export interface PathSession {
  readonly pathsVisited: Set<string>
  readonly pathLedger: PathCanonicalEntry[]
}

/** Fresh path session — pair with `agentLawWithPathSession` for dispatch tracking. */
export function createPathSession(): PathSession {
  return { pathsVisited: new Set(), pathLedger: [] }
}

/** Law state wired to a mutable path session (dispatch records visits into the session). */
export function agentLawWithPathSession(
  session: PathSession,
  overrides: Partial<AgentLawState> = {},
): AgentLawState {
  return defaultAgentLawState({
    pathsVisited: session.pathsVisited,
    pathLedger: session.pathLedger,
    ...overrides,
  })
}

const normalizeVisitedPath = (raw: string): string =>
  toAtomPath(raw, 'fs') || raw.replace(/^src\//, '').replace(/^\//, '').replace(/\/+$/, '')

/** Extract atom paths declared on a dispatch event or opts. */
export function dispatchPathsFrom(
  ev: DomainEvent,
  opts?: { readonly paths?: readonly string[]; readonly atomPath?: string },
): readonly string[] {
  const paths: string[] = []
  if (opts?.atomPath) paths.push(opts.atomPath)
  if (opts?.paths) paths.push(...opts.paths)
  const payload = ev.payload
  if (typeof payload.atomPath === 'string') paths.push(payload.atomPath)
  if (Array.isArray(payload.paths)) {
    for (const p of payload.paths) if (typeof p === 'string') paths.push(p)
  }
  return [...new Set(paths.map(normalizeVisitedPath).filter((p) => p.length > 0))]
}

/** Append canonical ledger rows for each visited path (prev-chained, append-only). */
export function recordPathVisits(
  law: AgentLawState,
  paths: readonly string[],
  at: string,
  eventId?: string,
): void {
  if (paths.length === 0) return
  const visited = law.pathsVisited as Set<string> | undefined
  const ledger = law.pathLedger as PathCanonicalEntry[] | undefined
  if (!visited && !ledger) return
  for (const raw of paths) {
    const p = normalizeVisitedPath(raw)
    visited?.add(p)
    if (ledger) {
      const prev = ledger.length > 0 ? ledger[ledger.length - 1]!.entryUuid : null
      const seq = ledger.length
      ledger.push(
        recordOnPath(p, { kind: 'dispatch.visit', eventId }, at, prev, seq),
      )
    }
  }
}

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

const attachSkillContext = (law: AgentLawState, skillContext: AgentSkillContext | undefined): void => {
  if (skillContext) {
    ;(law as { skillContext?: AgentSkillContext }).skillContext = skillContext
  }
}

/** Rule axes for cross-education gate — reuse dispatch skillContext, else cached rulesOf. */
const rulesAxesForEffectGate = (law: AgentLawState): readonly { axis: string; violations: number; baseline: number }[] => {
  if (law.skillContext) return law.skillContext.rules.axes
  return compactRulesSnapshot().axes
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
  opts?: {
    readonly untrustedPayload?: unknown
    readonly paths?: readonly string[]
    readonly atomPath?: string
  },
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
  const visitedPaths = dispatchPathsFrom(ev, opts)
  recordPathVisits(law, visitedPaths, ev.emittedAt || new Date().toISOString(), ev.id)
  const skillContext = agentSkillContextForDispatch(visitedPaths) ?? undefined
  attachSkillContext(law, skillContext)
  return { allowed: true, receipt: boundary.receipt, skillContext }
}

/** Assert dispatch law — throws StrictApplyViolation on block. */
export function assertStrictDispatch(
  ctx: AgentContext,
  ev: DomainEvent,
  opts?: {
    readonly untrustedPayload?: unknown
    readonly paths?: readonly string[]
    readonly atomPath?: string
  },
): void {
  const v = strictApplyDispatch(ctx, ev, opts)
  if (!v.allowed) {
    if (v.crossEducation) {
      crossViolationFromStrictApply({
        atomPath: opts?.atomPath ?? opts?.paths?.[0] ?? 'agent',
        gate: 'dispatch',
        reason: v.reason ?? 'blocked',
        crossEducation: v.crossEducation,
      })
    }
    throw new StrictApplyViolation('dispatch', v.reason ?? 'blocked', {
      crossEducation: v.crossEducation,
    })
  }
}

/**
 * Gate one AgentEffect before the effect-processor executes it.
 * Enforces access scope (no overrideAccess), tenant isolation, cascade depth on `call`.
 */
export function strictApplyEffect(ctx: AgentContext, eff: AgentEffect): StrictApplyVerdict {
  const law = ctx.law ?? defaultAgentLawState({ actor: ctx.tenantId })

  switch (eff.kind) {
    case 'create':
    case 'update': {
      // Law: cross-education gate — rules unsealed ⇒ acknowledge cross before persist.
      const unsealed = violationsFromUnsealedAxes(rulesAxesForEffectGate(law))
      if (unsealed.length > 0) {
        const crossGate = assertAgentUnderstandsCross({
          violations: unsealed,
          acknowledgedAxes: law.crossAcknowledgedAxes,
        })
        if (!crossGate.allowed) {
          const primary = crossGate.pending[0] ?? crossConceptForViolation(unsealed[0]!)
          const crossEducation = crossGate.crossEducation ?? primary.crossEducation
          const atomPath =
            [...(law.pathsVisited ?? [])][0] ??
            unsealed[0]?.atomPath ??
            'rules'
          crossViolationFromStrictApply({
            atomPath,
            gate: 'effect',
            reason: crossGate.reason ?? 'rules unsealed',
            crossEducation,
            detail: primary.reason,
          })
          return {
            allowed: false,
            reason: `cross-education gate: ${crossGate.reason ?? 'rules unsealed'}`,
            crossEducation,
          }
        }
      }
      // Law: persist only after wave plan completes with balanced receipts.
      if (law.waveSession) {
        const waveGate = waveSessionVerdict(law.waveSession)
        if (!waveGate.complete || !waveGate.balanced) {
          return {
            allowed: false,
            reason: `wave-complete gate: ${waveGate.reason ?? 'waves incomplete'}`,
          }
        }
      }
      // Law: persist only after full path-follow + recorded+implemented gates.
      if (law.pathsVisited) {
        const pathGate = assertPathFollowed(law.pathsVisited, law.requiredPaths)
        if (!pathGate.followed) {
          return {
            allowed: false,
            reason: `path-follow gate: ${pathGate.missing.length} path(s) not followed — ${pathGate.missing.slice(0, 3).join(', ')}`,
          }
        }
      }
      if (law.pathsVisited && law.pathLedger) {
        const batch = assertRecordedAndImplemented(law.pathsVisited, law.pathLedger)
        if (!batch.complete) {
          const missing =
            batch.recordGate?.missing.length
              ? `${batch.recordGate.missing.length} unrecorded`
              : `${batch.incomplete.length} incomplete`
          return {
            allowed: false,
            reason: `path recorded+implemented gate: ${missing} — ${batch.incomplete.slice(0, 3).join(', ')}`,
          }
        }
      }
      // Payload writes inherit actor access — never widen via overrideAccess.
      return { allowed: true }
    }

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
  if (!v.allowed) {
    throw new StrictApplyViolation('effect', v.reason ?? 'blocked', {
      crossEducation: v.crossEducation,
    })
  }
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
