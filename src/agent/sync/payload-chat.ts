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
import { navPyramid, type NavPyramid } from '@/navigation'
import { bind4 } from '@/merge'
import { domainToErpaxEvent } from './society'
import type { DomainEvent } from '../types'
import { enforceTeamCommsEmit } from '@/team/comms'

export const CHAT_COLLECTION = 'chat' as const

/** The chat-collection row shape (the agent-society room, native to Payload). */
export interface ChatMessage {
  readonly eventUuid: string
  readonly event: string
  readonly aggregateId: string
  readonly agent: string
  /** the message's 4-key seal — chatSeal over its own navigation cross (see eventToChatMessage). */
  readonly seal: string
  readonly payload?: unknown
}

/**
 * Project an ErpaxEvent envelope onto a chat-collection row — sealed with ALL 4 keys of the
 * message's own navigation cross, never the content-uuid alone (1 key = a linear seam). The four
 * coordinates a message carries are: `aggregateId` (the referrer — the thing it concerns),
 * `uuid` (its id), `agent` (prev — who authored it), `event` (next — the intent it advances). A
 * row stamped with only its content-uuid is a linear seal a single inversion breaks; folding all
 * four makes it the 4-connected tamper-evident node the matrix bind is (flip any key, seal breaks).
 */
export function eventToChatMessage(e: ErpaxEvent): ChatMessage {
  return {
    eventUuid: e.uuid,
    event: e.event,
    aggregateId: e.aggregateId,
    agent: e.agent,
    seal: chatSeal(e.aggregateId, e.uuid, e.agent, e.event),
    payload: e.payload,
  }
}

/** Recover an ErpaxEvent from a chat row (the row's `createdAt` is the envelope ts). The seal is a
 * derived tamper token, not needed to reconstruct the event, so it is not required to read a row. */
export function chatMessageToEvent(
  row: Pick<ChatMessage, 'eventUuid' | 'event' | 'aggregateId' | 'agent' | 'payload'> & { createdAt?: string },
): ErpaxEvent {
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

/**
 * The QUANTUM context of a chat exchange — the (referrer × current) superposition over the two events'
 * atoms, computed via the navigational pyramid. A reply to `invoice:activated` from `payment:received`
 * collapses to the shared context the referrer arrived through, so a thread is navigable (referrer-relative
 * breadcrumb, shared group) with ZERO stored thread structure — the same fold that scales the nav base.
 * The chat improves the chat: it reuses navPyramid (the corpus's own nav theorem) instead of a bespoke
 * thread model. An event `atom:verb` maps to its atom path (`atom`, dots → slashes).
 */
export function chatContext(referrerEvent: string, currentEvent: string): NavPyramid {
  const atomOf = (ev: string): string => (ev.split(':')[0] ?? '').replace(/\./g, '/')
  return navPyramid(atomOf(referrerEvent), atomOf(currentEvent))
}

/**
 * Seal a chat message with its 4-key navigation cross — the SAME bind the matrix uses:
 *   bind = merge(id, merge(merge(referrer, prev), next))  =  id ⊕ referrer ⊕ prev ⊕ next
 * The referrer (where the reply came from), the message id, and the prev/next thread pair fold to one
 * content-uuid, so a thread is a 4-connected tamper-evident chain: flip ANY of the four and the seal
 * breaks (proven for the matrix bind). As the room's coverage → 1 (every message wired), the forge cost
 * → ∞ (tamper/cost Law 62) — "infinite cryptography" in the corpus's HONEST sense.
 *
 * Honest boundary (the one tamper/cost + ceccec carry): this is tamper-EVIDENT, not tamper-PROOF or
 * confidentiality. The fold is SHA-256 (2^128 collision), so "infinite" is the coverage LIMIT at a
 * measured 1, not a literal — Grover halves the hash; unconditional secrecy needs a cipher (AES-GCM), not
 * this. It detects any change to the thread; it does not hide the thread.
 */
export function chatSeal(referrer: string, id: string, prev: string, next: string): string {
  return bind4(referrer, id, prev, next) // the canonical navigation-cross fold (one formula, @/merge)
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
  const verdict = enforceTeamCommsEmit({
    scopeTenantId: tenantId,
    emit: {
      tenantId,
      event: e.event,
      eventUuid: e.uuid,
      agent: e.agent,
      payload: e.payload,
      depth,
      emittedAt: e.ts,
    },
  })
  if (!verdict.ok) throw new Error(`team-comms: ${verdict.reason ?? 'emit rejected'}`)
  await client.create({
    collection: CHAT_COLLECTION,
    data: { ...eventToChatMessage(e), tenant: tenantId, depth, emittedAt: e.ts },
  })
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
