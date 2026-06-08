/**
 * agent-sync — synchronise agent work within the erpax domain in real time.
 *
 * Closes the federation/event-sync gap: erpax agents (typeless users) share one
 * realtime bus — a chat.erpax.com room, a single Cloudflare Durable Object
 * (the canonical workers-chat-demo). Each agent publishes its domain EVENTS
 * (the content-uuid envelope the `event` skill defines, emitted by the
 * workflow-engine on a transition) into the room; the DO broadcasts to every
 * connected agent, so all see each other's work the instant it happens. Same
 * content ⇒ same id ⇒ no double-processing (idempotent on `uuid`).
 *
 * The room is the matter; the protocol below is the form. The encode/decode is
 * pure (testable); `connectAgentSync` opens the WebSocket and wires pub/sub.
 *
 * @standard W3C ActivityPub server-to-server activity-distribution (the model)
 * @standard RFC-6455 websocket
 * @standard RFC-4122 §4.3 content-uuid event-identity (idempotency key)
 */

import { computeContentUuid } from '@/integrity'

/** The erpax domain-event envelope (the `event` skill): aggregateId MUST be a content-uuid (the 0). */
export interface ErpaxEvent {
  v: 1
  /** content-uuid of THIS event (idempotency key). */
  uuid: string
  /** event name, e.g. 'invoice:activated', 'payroll:obligation', 'connection:friend'. */
  event: string
  /** content-uuid of the aggregate the event is about (never a row id). */
  aggregateId: string
  /** the publishing agent (a typeless user). */
  agent: string
  /** ISO-8601 emit time. */
  ts: string
  payload?: unknown
}

const ERPAX_PREFIX = 'erpax::'

/**
 * Recompute the content-uuid an HONEST publisher MUST stamp on this event,
 * from the event's content alone. This is the single source of truth for the
 * idempotency key — `domainToErpaxEvent` (./society) derives the published
 * `uuid` from exactly these fields (`{ id, tenantId, payload, emittedAt }`),
 * so the recomputation here reproduces it byte-for-byte. The envelope's own
 * `uuid` field is attacker-controlled and is NEVER trusted as the key.
 *
 * `event` carries the runtime event id; `ts` carries `emittedAt`; `tenantId`
 * is supplied by the consumer (the room is per-tenant, so the tenant is a
 * connection fact, never read from the untrusted envelope).
 *
 * @standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)
 */
export function eventContentUuid(e: ErpaxEvent, tenantId: string): string {
  return computeContentUuid(
    { id: e.event, tenantId, payload: e.payload, emittedAt: e.ts },
    tenantId,
  )
}

/**
 * Cryptographically verify the envelope's claimed `uuid` matches the uuid
 * recomputed from its content. Without this gate, an attacker can replay the
 * SAME content under a DIFFERENT arbitrary `uuid` to slip past a consumer's
 * idempotency set (which keys on `uuid`) and force duplicate processing — or
 * stamp a `uuid` that simply does not correspond to the content it carries.
 */
export function verifyEventUuid(e: ErpaxEvent, tenantId: string): boolean {
  return e.uuid === eventContentUuid(e, tenantId)
}

/**
 * Build the Durable-Object room WebSocket URL. `host` is a deployment fact and
 * MUST be injected (resolve it via `resolveAgentSyncHost` in ./society) — never
 * baked into this generic builder, so a self-hosted/federated instance is never
 * silently coupled to the hosted `chat.erpax.com`.
 */
export function roomWebSocketUrl(roomId: string, host: string): string {
  return `wss://${host}/api/room/${encodeURIComponent(roomId)}/websocket`
}

/** Encode an erpax event into the chat-room `{message}` payload (prefixed so it is distinguishable from human chat). */
export function encodeEvent(e: ErpaxEvent): string {
  return ERPAX_PREFIX + JSON.stringify(e)
}

/**
 * Decode a chat-room broadcast `{name, message}` into an erpax event.
 * Returns null for human chat, malformed payloads, this agent's own echo, or
 * (when `opts.verifyTenantId` is given) any event whose claimed `uuid` does
 * NOT match the uuid recomputed from its content — the cryptographic gate
 * that stops an attacker replaying the same content under a forged `uuid`.
 *
 * Verification is opt-in via `verifyTenantId`: the room is per-tenant, so the
 * tenant is a trusted connection fact supplied by the consumer, never read
 * from the untrusted envelope. `selfAgent` may be passed positionally (legacy)
 * or as `opts.selfAgent`.
 */
export function decodeEvent(
  raw: { name?: string; message?: string },
  selfAgentOrOpts?: string | { selfAgent?: string; verifyTenantId?: string },
): ErpaxEvent | null {
  const opts = typeof selfAgentOrOpts === 'string' ? { selfAgent: selfAgentOrOpts } : (selfAgentOrOpts ?? {})
  const { selfAgent, verifyTenantId } = opts
  const msg = raw?.message
  if (typeof msg !== 'string' || !msg.startsWith(ERPAX_PREFIX)) return null
  let parsed: unknown
  try {
    parsed = JSON.parse(msg.slice(ERPAX_PREFIX.length))
  } catch {
    return null
  }
  if (!parsed || typeof parsed !== 'object') return null
  const e = parsed as Partial<ErpaxEvent>
  if (e.v !== 1 || typeof e.uuid !== 'string' || typeof e.event !== 'string' || typeof e.aggregateId !== 'string') {
    return null
  }
  if (selfAgent && e.agent === selfAgent) return null // ignore own echo
  // Reject any envelope whose claimed uuid does not match its content — the
  // tamper/replay gate. Skipped when no tenant context is supplied (the uuid
  // is then the consumer's responsibility to verify before dedupe).
  if (verifyTenantId !== undefined && !verifyEventUuid(e as ErpaxEvent, verifyTenantId)) return null
  return e as ErpaxEvent
}

export interface AgentSync {
  publish: (e: ErpaxEvent) => void
  close: () => void
}

/**
 * Connect an agent to the erpax realtime room. Idempotent consumption is the
 * caller's job (dedupe on `event.uuid`). Requires a global `WebSocket`
 * (Cloudflare Workers / browser); throws otherwise.
 */
export function connectAgentSync(opts: {
  roomId: string
  agentName: string
  onEvent: (e: ErpaxEvent) => void
  host: string
  /**
   * Tenant of this room. When supplied, every inbound envelope is decoded with
   * the cryptographic uuid gate (`verifyEventUuid`) — events whose claimed
   * `uuid` does not match their content are dropped before `onEvent`, so a
   * consumer keying idempotency on `uuid` can never be tricked into dropping or
   * re-processing forged-uuid duplicates.
   */
  verifyTenantId?: string
}): AgentSync {
  const WS = (globalThis as { WebSocket?: typeof WebSocket }).WebSocket
  if (!WS) throw new Error('agent-sync requires a WebSocket runtime')
  const ws = new WS(roomWebSocketUrl(opts.roomId, opts.host))
  ws.addEventListener('open', () => ws.send(JSON.stringify({ name: opts.agentName })))
  ws.addEventListener('message', (ev: MessageEvent) => {
    let data: { name?: string; message?: string }
    try {
      data = JSON.parse(typeof ev.data === 'string' ? ev.data : '')
    } catch {
      return
    }
    const e = decodeEvent(data, { selfAgent: opts.agentName, verifyTenantId: opts.verifyTenantId })
    if (e) opts.onEvent(e)
  })
  return {
    publish: (e: ErpaxEvent) => ws.send(JSON.stringify({ message: encodeEvent(e) })),
    close: () => ws.close(),
  }
}

// The breath — the caller that convenes the society over this bus.
export * from './society'
// The team breath — a whole tribe joins the society circle (the next scale of the breath).
export * from './horo'
// The contribution layer — shared discoveries (gaps filled by many) over the bus.
export * from './discovery'
// The Payload-native room — the chat built on Payload (no external Durable Object).
export * from './payload-chat'
// The broadcast — a new chat row dispatches its embedded event into the runtime.
export * from './chat-broadcast'
// Training lifecycle — job-positions afterChange fans out to the agent room.
export * from './training-broadcast'
