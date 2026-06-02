/**
 * createAgentContext — the ONE place an AgentContext is assembled.
 *
 * Until now there was no full-context factory: every dispatch path built a
 * partial literal and cast it `as never` / `as unknown as AgentContext`
 * (chat-broadcast, the events MCP tools, agents.dispatch). Each duplicated the
 * substrate wiring and silently omitted `emit`/`audit`/`capture` — so those
 * callbacks were never real off the chat path, and there was nowhere to wire the
 * new agent-to-agent `call` once. This factory is that single seam: pass the
 * substrate you have, and it fills the rest with safe defaults (no-op emit/audit/
 * capture, passthrough translator, locale 'en') and wires `call` to the runtime.
 *
 * `call` is the agent-to-agent primitive: it dispatches to ONE named agent
 * (`runtime.dispatchTo`) on THIS same context — so the callee shares the caller's
 * tenant / payload / emit / audit, its effects are processed, and they are
 * returned. Where `emit` broadcasts, `call` addresses. The closure captures the
 * built `ctx`, so a chain of calls all run on one coherent substrate.
 *
 * Pure assembly (no I/O of its own) → trivially testable; the impure substrate
 * (payload / mcp / emit) is injected by the caller — the same split the rest of
 * the agent runtime uses.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability (single-source-of-truth context)
 * @standard ISO/IEC 12207 software-life-cycle (one substrate seam)
 */

import type { Payload } from 'payload'
import type { SupportedLocale } from '@/i18n'
import type { Translator } from '@/services/spec-generator'
import type {
  AgentContext,
  AgentRuntime,
  AuditLeaf,
  DomainEvent,
  EvidenceFrame,
} from './types'
import type { McpClient } from './mcp/in-process-client'

/** The substrate to build an AgentContext from — only `runtime`/`payload`/`tenantId`/`mcp` are required. */
export interface AgentContextSpec {
  readonly runtime: AgentRuntime
  readonly payload: Payload
  readonly tenantId: string
  readonly mcp: McpClient
  readonly locale?: SupportedLocale
  readonly t?: Translator
  readonly emit?: (ev: DomainEvent) => void
  readonly audit?: (leaf: AuditLeaf) => void
  readonly capture?: (frame: EvidenceFrame) => void
  readonly chain?: AgentContext['chain']
}

/** No-op default for an unwired substrate callback. */
const noop = (): void => {}
/** Passthrough translator — returns the key when no real i18n is supplied. */
const passthrough: Translator = (key: string): string => key

/**
 * Assemble a complete AgentContext. The returned `call` dispatches to one agent
 * on this very context (the agent-to-agent wire) — so `ctx.call(id, ev)` is the
 * single, typed way an agent reaches a peer.
 */
export function createAgentContext(spec: AgentContextSpec): AgentContext {
  const ctx: AgentContext = {
    payload: spec.payload,
    tenantId: spec.tenantId,
    locale: spec.locale ?? 'en',
    t: spec.t ?? passthrough,
    emit: spec.emit ?? noop,
    audit: spec.audit ?? noop,
    capture: spec.capture ?? noop,
    mcp: spec.mcp,
    call: (agentId, ev) => spec.runtime.dispatchTo(ctx, agentId, ev),
    chain: spec.chain,
  }
  return ctx
}
