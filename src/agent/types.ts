/**
 * Domain-agent contract — the coupling-tensor's A-vortex axis.
 *
 * Slice DDDDD (2026-05-11). Every domain agent lives behind this single
 * interface; the runtime dispatcher routes chain steps + events +
 * scheduled ticks to the agent and processes its returned
 * `AgentEffect[]` through the B-vortex substrate (i18n / audit /
 * multimedia / event bus / Payload).
 *
 * Pure functions only — agents perform NO side effects directly. This
 * makes them trivially testable, mockable, parallel-safe, and audit-
 * friendly.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.5 testability
 * @standard ISO/IEC 12207 software-life-cycle (single-source-of-truth)
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-spec-traceability
 */

import type { Payload } from 'payload'
import type { SupportedLocale } from '@/i18n'
import type { Translator, SpecChainStep } from '@/spec/generator'
import type { McpClient } from '@/agents/mcp'
import type { Receipt } from '@/receipt'
import type { ToolGrant } from '@/sandbox'

export type AgentId =
  | 'finance' | 'sales' | 'marketing' | 'hr' | 'legal'
  | 'ops' | 'engineering' | 'customer-support' | 'data' | 'design'
  | 'product' | 'productivity' | 'enterprise-search' | 'plugins' | 'meta-skill'
  | 'consistency'

/** A domain event emitted by an agent or chain step. */
export interface DomainEvent {
  /** Event identifier — e.g. 'invoice:activated', 'payment:received'. */
  readonly id: string
  readonly tenantId: string
  readonly payload: Record<string, unknown>
  /** ISO-8601 timestamp. */
  readonly emittedAt: string
  /** Optional id/content-uuid of the aggregate this event is about — preserved
   *  end-to-end so a chat row points at the real entity, not a payload hash. */
  readonly aggregateId?: string
}

/** A single Merkle-audit leaf produced by an agent step. */
export interface AuditLeaf {
  readonly tenantId: string
  readonly subjectCollection: string
  readonly subjectId: string
  readonly action: string
  readonly chainId?: string
  readonly chainStepId?: string
  /** Populated by MerkleAuditChain after the leaf is appended. */
  readonly hash?: string
}

/** A multimedia evidence frame captured during a chain step. */
export interface EvidenceFrame {
  readonly workflow: string
  readonly stepId: string
  readonly captionKey: string
  readonly screenshotPath?: string
  readonly publicUrl?: string
}

/** Severity classification for `escalate` effects (mirrors UxGap.severity). */
export type GapSeverity = 'info' | 'minor' | 'major' | 'blocker' | 'critical'

/** Law state threaded through AgentContext — receipt chain + depth + actor identity. */
export interface AgentLawState {
  readonly depth: number
  readonly actor: string
  readonly grant: ToolGrant
  readonly receiptHead: { leafUuid: string; seq: number } | null
  readonly untrustedPayload?: unknown
  readonly onReceipt?: (receipt: Receipt) => void
}

/**
 * Discriminated union of every effect a DomainAgent can request. The
 * AgentEffectProcessor exhaustively handles each kind through the
 * appropriate substrate layer; TypeScript exhaustiveness in the
 * processor's `default: never` branch guarantees every kind is wired.
 */
export type AgentEffect =
  | { kind: 'create'  ; collection: string; data: unknown }
  | { kind: 'update'  ; collection: string; id: string; patch: unknown }
  | { kind: 'notify'  ; channel: string; templateKey: string; vars: Record<string, unknown> }
  | { kind: 'audit'   ; leaf: AuditLeaf }
  | { kind: 'escalate'; severity: GapSeverity; templateKey: string; vars: Record<string, unknown> }
  | { kind: 'emit'    ; event: DomainEvent }
  | { kind: 'capture' ; frame: EvidenceFrame }
  // `call` ADDRESSES one named agent (the dual of `emit`'s broadcast): the event
  // is dispatched to exactly that agent, which acts and whose own effects are
  // processed. An agent fanning a follow-up to a specific peer. The synchronous,
  // return-valued form is `ctx.call` — this is its fire-and-forget effect twin.
  | { kind: 'call'    ; agentId: AgentId; event: DomainEvent }

/**
 * Execution context handed to every DomainAgent hook. Carries the
 * substrate callbacks (emit / audit / capture) plus the Payload data
 * layer and the i18n translator, so an agent can reason about its
 * step without reaching for any global singleton.
 */
export interface AgentContext {
  readonly payload:  Payload
  readonly tenantId: string
  readonly locale:   SupportedLocale
  readonly t:        Translator
  readonly emit:     (ev: DomainEvent) => void
  readonly audit:    (leaf: AuditLeaf) => void
  readonly capture:  (frame: EvidenceFrame) => void
  /**
   * Call another agent by id and receive its effects — the agent-to-agent
   * primitive. Where `emit` BROADCASTS an event to every subscriber, `call`
   * ADDRESSES exactly one agent (`runtime.dispatchTo`): the target acts on the
   * same substrate (this ctx — same tenant / payload / emit / audit), its
   * effects are processed, and they are returned so the caller can reason about
   * the result. This is how a member of a team covers a gap by invoking the
   * peer whose capability answers it ([[society]]/[[team]]/[[contribution]]).
   */
  readonly call:     (agentId: AgentId, ev: DomainEvent) => Promise<AgentEffect[]>
  /**
   * In-process MCP client — same tool surface as the over-the-wire
   * `@payloadcms/plugin-mcp` exposure. Agents call MCP tools the same
   * way external clients (Claude Code, Cursor, IDEs) do.
   * Added in slice DDDDD task 11.
   */
  readonly mcp:      McpClient
  /** Set when the context is dispatched as part of a chain step. */
  readonly chain?:   { id: string; step: SpecChainStep }
  /**
   * Law state for strict-apply gates — depth, grant, receipt chain, actor.
   * When omitted, `defaultAgentLawState` applies at each gate (fail-closed).
   */
  readonly law?:     AgentLawState
}

/**
 * The single contract every domain agent implements. All hooks
 * are optional — an agent can be event-only, schedule-only, or
 * chain-only depending on its domain.
 */
export interface DomainAgent {
  readonly id: AgentId
  readonly ownsCollections: ReadonlyArray<string>
  readonly subscribesTo:    ReadonlyArray<string>
  readonly emits:           ReadonlyArray<string>
  /** Optional cron expression for scheduled execution (`onSchedule`). */
  readonly cron?: string

  onChainStep?(ctx: AgentContext, step: SpecChainStep): Promise<AgentEffect[]>
  onEvent?    (ctx: AgentContext, ev:   DomainEvent  ): Promise<AgentEffect[]>
  onSchedule? (ctx: AgentContext                     ): Promise<AgentEffect[]>
}

/** Lookup interface for the bootstrapped agent registry. */
export interface AgentRegistry {
  byId(id: AgentId): DomainAgent | undefined
  byCollection(slug: string): DomainAgent | undefined
  bySubscribedEvent(eventId: string): ReadonlyArray<DomainAgent>
  scheduled(): ReadonlyArray<DomainAgent>
  all(): ReadonlyArray<DomainAgent>
}

/** Dispatcher contract — wires chain runner / event bus / scheduler to agents. */
export interface AgentRuntime {
  readonly registry: AgentRegistry
  dispatchChainStep(ctx: AgentContext, step: SpecChainStep): Promise<AgentEffect[]>
  dispatchEvent    (ctx: AgentContext, ev:   DomainEvent  ): Promise<AgentEffect[]>
  dispatchSchedule (ctx: AgentContext, agentId: AgentId   ): Promise<AgentEffect[]>
  /** Address one agent directly (the `call` primitive) — runs its `onEvent`,
   *  processes its effects, returns them. `dispatchEvent` is the broadcast dual. */
  dispatchTo       (ctx: AgentContext, agentId: AgentId, ev: DomainEvent): Promise<AgentEffect[]>
}
