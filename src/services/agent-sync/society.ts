/**
 * agent-society — the breath over the agent-sync bus.
 *
 * `./index` defines the room protocol (envelope + encode/decode + socket); the
 * runtime (`@/services/agents`) dispatches events to DomainAgents. Neither knew
 * the other — `connectAgentSync` had zero callers, so the society was a body
 * before breath. This module is the single wire between them: it publishes a
 * runtime DomainEvent to the room and feeds every inbound room event back into
 * `runtime.dispatchEvent`, idempotent on the event's content-uuid. With it,
 * every agent in a tenant's room sees every other agent's work the instant it
 * happens; without it, agents are deaf to one another.
 *
 * The room is per-tenant by construction (`roomIdForTenant`), so the shared bus
 * never crosses the tenant-isolation boundary — a tenant's agents convene in
 * exactly their own room and no other.
 *
 * Mapping + room-id derivation are PURE (and tested); `connectAgentSociety`
 * opens the socket and wires pub/sub — the impure edge, the same split as
 * `./index` (pure protocol / impure connect).
 *
 * @standard W3C ActivityPub server-to-server activity-distribution (the model)
 * @standard ISO/IEC 27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
 * @standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)
 */

import { connectAgentSync } from './index'
import type { AgentSync, ErpaxEvent } from './index'
import { computeContentUuid, uuid } from '@/services/integrity/content-uuid'
import type { AgentContext, AgentRuntime, DomainEvent } from '@/services/agents/types'

/**
 * Canonical fallback host for the hosted erpax society. Lives here (this
 * module's "0"), exactly once — never baked into the generic url builder.
 */
export const AGENT_SYNC_DEFAULT_HOST = 'chat.erpax.com'

/**
 * Resolve the room host from the deployment env, falling back to the hosted
 * default. Which bus an instance joins is a deployment fact (self-host /
 * per-tenant provisioned Worker / local dev), not a library constant.
 */
export function resolveAgentSyncHost(env?: { AGENT_SYNC_HOST?: string }): string {
  return env?.AGENT_SYNC_HOST?.trim() || AGENT_SYNC_DEFAULT_HOST
}

/**
 * Deterministic per-tenant room id: same tenant ⇒ same room everywhere
 * (federation-friendly merge), and no cross-tenant event leakage.
 */
export function roomIdForTenant(tenantId: string): string {
  return uuid(`erpax::room::${tenantId}`)
}

/**
 * Project a runtime DomainEvent onto the bus envelope. Pure: same event ⇒ same
 * `uuid` ⇒ idempotent across the society. The `uuid` fingerprints THIS event
 * (the idempotency key); `aggregateId` fingerprints the entity it is about.
 * Both are derived from content, never invented.
 */
export function domainToErpaxEvent(ev: DomainEvent, agent: string): ErpaxEvent {
  return {
    v: 1,
    uuid: computeContentUuid(
      { id: ev.id, tenantId: ev.tenantId, payload: ev.payload, emittedAt: ev.emittedAt },
      ev.tenantId,
    ),
    event: ev.id,
    aggregateId: computeContentUuid(ev.payload, ev.tenantId),
    agent,
    ts: ev.emittedAt,
    payload: ev.payload,
  }
}

/**
 * Project an inbound bus envelope back onto a runtime DomainEvent under the
 * room's tenant (the only tenant whose agents share that room). Pure.
 */
export function erpaxToDomainEvent(e: ErpaxEvent, tenantId: string): DomainEvent {
  return {
    id: e.event,
    tenantId,
    payload: e.payload && typeof e.payload === 'object' ? (e.payload as Record<string, unknown>) : {},
    emittedAt: e.ts,
  }
}

export interface AgentSociety {
  /** Publish a runtime event to the tenant's room (every other agent sees it). */
  publish: (ev: DomainEvent) => void
  /** Leave the room. */
  close: () => void
}

/**
 * Connect a runtime to its tenant's room — the breath. Inbound room events are
 * dispatched into the runtime (deduped on content-uuid); outbound DomainEvents
 * publish to the room. Requires a `WebSocket` runtime (Cloudflare Workers /
 * browser); `connectAgentSync` throws otherwise.
 */
export function connectAgentSociety(opts: {
  runtime: AgentRuntime
  ctx: AgentContext
  tenantId: string
  agentName: string
  host: string
  /** Override the per-tenant room (defaults to `roomIdForTenant`). */
  roomId?: string
}): AgentSociety {
  const { runtime, ctx, tenantId, agentName, host } = opts
  const roomId = opts.roomId ?? roomIdForTenant(tenantId)
  const seen = new Set<string>()

  const sync: AgentSync = connectAgentSync({
    roomId,
    agentName,
    host,
    verifyTenantId: tenantId,
    onEvent: (e) => {
      if (seen.has(e.uuid)) return // idempotent on content-uuid
      seen.add(e.uuid)
      void runtime.dispatchEvent(ctx, erpaxToDomainEvent(e, tenantId))
    },
  })

  return {
    publish: (ev) => {
      const e = domainToErpaxEvent(ev, agentName)
      seen.add(e.uuid) // never re-dispatch our own publish if it echoes back
      sync.publish(e)
    },
    close: () => sync.close(),
  }
}
