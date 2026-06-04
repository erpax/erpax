/**
 * payload-chat — the agent-sync transport over a Payload collection.
 *
 * "Build the chat using payload": instead of a chat.erpax.com Durable-Object
 * WebSocket room, publish/read the SAME `ErpaxEvent` envelope as rows in the
 * `chat` collection. Publishing = create a content-addressed row (the
 * contentUuid plugin stamps the row uuid; `eventUuid` carries the envelope's
 * idempotency key); reading = query the tenant's room oldest-first. No external
 * dependency, no WebSocket — the room is the akashic record, durable and
 * queryable, and internalising it lifts the self-sufficiency floor (tamper-cost).
 *
 * The publish side closes the loop: `chatEmit` is an `AgentContext.emit`
 * implementation backed by this collection, so an agent's emitted event becomes
 * a chat row (→ afterChange → broadcast → the next agent). `depth` bounds the
 * cascade (the broadcast hook stops past a cap — the runaway-loop guard).
 *
 * Pure mapping (testable) + a thin structural client (mockable) — the same
 * split as ./index (pure protocol / impure connect).
 *
 * @standard RFC 9562 §5.8 content-uuid event-identity (idempotency key)
 * @standard ISO-27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
 */

import type { ErpaxEvent } from '@/agent/sync'
import { domainToErpaxEvent } from '@/agent/sync/society'
import type { DomainEvent } from '@/agent/types'

export const CHAT_COLLECTION = 'chat' as const

/** The chat-collection row shape (the agent-society room, native to Payload). */
export interface ChatMessage {
  readonly eventUuid: string
  readonly event: string
  readonly aggregateId: string
  readonly agent: string
  readonly payload?: unknown
}

/** Project an ErpaxEvent envelope onto a chat-collection row. */
export function eventToChatMessage(e: ErpaxEvent): ChatMessage {
  return { eventUuid: e.uuid, event: e.event, aggregateId: e.aggregateId, agent: e.agent, payload: e.payload }
}

/** Recover an ErpaxEvent from a chat row (the row's `createdAt` is the envelope ts). */
export function chatMessageToEvent(row: ChatMessage & { createdAt?: string }): ErpaxEvent {
  return {
    v: 1,
    uuid: row.eventUuid,
    event: row.event,
    aggregateId: row.aggregateId,
    agent: row.agent,
    ts: row.createdAt ?? '',
    payload: row.payload,
  }
}

/** The slice of Payload's Local API the chat transport needs (structural — mockable). */
export interface ChatClient {
  create(args: { collection: typeof CHAT_COLLECTION; data: Record<string, unknown> }): Promise<unknown>
  find(args: {
    collection: typeof CHAT_COLLECTION
    where?: Record<string, unknown>
    sort?: string
    limit?: number
  }): Promise<{ docs: Array<Record<string, unknown>> }>
}

/**
 * Publish an event into the tenant's Payload room — create a content-addressed
 * row. The contentUuid plugin stamps the row uuid; `eventUuid` is the envelope
 * idempotency key; `depth` is the cascade hop (0 for an original publish).
 */
export async function publishToChat(
  client: ChatClient,
  e: ErpaxEvent,
  tenantId: string,
  depth = 0,
): Promise<void> {
  await client.create({ collection: CHAT_COLLECTION, data: { ...eventToChatMessage(e), tenant: tenantId, depth } })
}

/**
 * Read the tenant's room since an optional ISO cursor — the akashic chat history
 * as ErpaxEvents, oldest first.
 */
export async function readChatSince(client: ChatClient, tenantId: string, sinceIso?: string): Promise<ErpaxEvent[]> {
  const where: Record<string, unknown> = { tenant: { equals: tenantId } }
  if (sinceIso) where.createdAt = { greater_than: sinceIso }
  const res = await client.find({ collection: CHAT_COLLECTION, where, sort: 'createdAt' })
  const str = (v: unknown): string => (typeof v === 'string' ? v : '')
  return res.docs.map((d) =>
    chatMessageToEvent({
      eventUuid: str(d.eventUuid),
      event: str(d.event),
      aggregateId: str(d.aggregateId),
      agent: str(d.agent),
      payload: d.payload,
      createdAt: str(d.createdAt),
    }),
  )
}

/** Publish an agent-emitted DomainEvent onto the Payload bus (await-able). */
export async function publishEmit(
  client: ChatClient,
  ev: DomainEvent,
  depth = 0,
  agentName = 'erpax-society',
): Promise<void> {
  await publishToChat(client, domainToErpaxEvent(ev, agentName), ev.tenantId, depth)
}

/**
 * An `emit` substrate callback backed by the Payload chat: each emitted event
 * becomes a content-addressed chat row (→ afterChange → broadcast). Fire-and-
 * forget + guarded, matching `AgentContext.emit`'s `(ev) => void` contract.
 * `depth` is stamped on the produced row so the broadcast hook can cap cascades.
 */
export function chatEmit(client: ChatClient, depth = 0, agentName = 'erpax-society'): (ev: DomainEvent) => void {
  return (ev) => {
    void publishEmit(client, ev, depth, agentName).catch(() => {
      /* best-effort — emit never throws into the agent */
    })
  }
}
