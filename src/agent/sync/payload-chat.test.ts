/**
 * payload-chat — the chat built on Payload, proved. Green by construction: an
 * event round-trips through a content-addressed row, and reads are scoped to the
 * tenant room (no external Durable Object). @see ./payload-chat.ts, src/chat/SKILL.md
 */
import { describe, it, expect } from 'vitest'
import {
  CHAT_COLLECTION,
  chatContext,
  chatSeal,
  eventToChatMessage,
  chatMessageToEvent,
  publishToChat,
  publishEmit,
  readChatSince,
  type ChatClient,
} from './payload-chat'
import { domainToErpaxEvent } from './society'
import type { ErpaxEvent } from '@/agent/sync'

describe('chatContext — a chat reply is the (referrer × current) event superposition', () => {
  it('a same-atom thread collapses to that atom (full merkaba, one topic)', () => {
    const c = chatContext('invoice:activated', 'invoice:paid')
    expect(c.context).toBe('invoice')
    expect(c.group).toBe('invoice')
    expect(c.breadcrumb).toEqual(c.descend) // one topic ⇒ the whole spin
  })

  it('a cross-atom reply has no shared context ⇒ the current event own group (reuses navPyramid, no thread store)', () => {
    const c = chatContext('payment:received', 'invoice:activated')
    expect(c.context).toBe('')
    expect(c.group).toBe('invoice')
    expect(c.referrer).toBe('payment') // atom extracted from atom:verb
    expect(c.current).toBe('invoice')
  })
})

describe('chatSeal — the chat is a 4-key tamper-evident chain (referrer ⊕ id ⊕ prev ⊕ next)', () => {
  const seal = chatSeal('ref', 'id', 'prev', 'next')

  it('folds the 4 navigation-cross keys to one content-uuid (the matrix bind, on the chat)', () => {
    expect(seal).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })

  it('ALL 4 keys are needed to decode — flipping any one breaks the seal (tamper-evident chain)', () => {
    expect(chatSeal('X', 'id', 'prev', 'next')).not.toBe(seal) // referrer
    expect(chatSeal('ref', 'X', 'prev', 'next')).not.toBe(seal) // id
    expect(chatSeal('ref', 'id', 'X', 'next')).not.toBe(seal) // prev
    expect(chatSeal('ref', 'id', 'prev', 'X')).not.toBe(seal) // next
  })
})

const TENANT = 'tenant-chat'
const TS = '2026-06-01T00:00:00.000Z'
const ev = (tenantId = TENANT, agent = 'agent-a'): ErpaxEvent =>
  domainToErpaxEvent({ id: 'society:discovery', tenantId, payload: { target: 'localize' }, emittedAt: TS }, agent)

/** In-memory Payload mock — the room as a collection. */
function mockChat(): ChatClient & { rows: Array<Record<string, unknown>> } {
  const rows: Array<Record<string, unknown>> = []
  return {
    rows,
    create: async ({ data }) => {
      rows.push({ ...data, createdAt: String(rows.length) })
      return data
    },
    find: async ({ where }) => {
      const t = where?.tenant as { equals?: string } | undefined
      return { docs: rows.filter((r) => !t?.equals || r.tenant === t.equals) }
    },
  }
}

describe('payload-chat: event ↔ content-addressed row', () => {
  it('round-trips an ErpaxEvent through a chat row', () => {
    const e = ev()
    const back = chatMessageToEvent({ ...eventToChatMessage(e), createdAt: e.ts })
    expect(back.uuid).toBe(e.uuid) // the idempotency key survives
    expect(back.event).toBe(e.event)
    expect(back.aggregateId).toBe(e.aggregateId)
    expect(back.agent).toBe(e.agent)
    expect(back.payload).toEqual(e.payload)
    expect(back.ts).toBe(e.ts)
  })
})

describe('payload-chat: the room is a Payload collection (no Durable Object)', () => {
  it('publish creates a content-addressed row; read returns it as an event', async () => {
    const client = mockChat()
    const e = ev()
    await publishToChat(client, e, TENANT)
    expect(client.rows).toHaveLength(1)
    expect(client.rows[0]!.eventUuid).toBe(e.uuid)
    expect(client.rows[0]!.tenant).toBe(TENANT)
    const back = await readChatSince(client, TENANT)
    expect(back).toHaveLength(1)
    expect(back[0]!.uuid).toBe(e.uuid)
    expect(back[0]!.event).toBe('society:discovery')
  })
  it('reads are scoped to the tenant room (ISO-27001 isolation)', async () => {
    const client = mockChat()
    await publishToChat(client, ev(TENANT), TENANT)
    await publishToChat(client, ev('other', 'agent-b'), 'other')
    expect(await readChatSince(client, TENANT)).toHaveLength(1)
    expect(await readChatSince(client, 'other')).toHaveLength(1)
  })
  it('targets the chat collection', () => {
    expect(CHAT_COLLECTION).toBe('chat')
  })

  it('publishEmit puts an agent-emitted DomainEvent on the bus, depth-stamped', async () => {
    const client = mockChat()
    await publishEmit(client, { id: 'invoice:activated', tenantId: TENANT, payload: { n: 1 }, emittedAt: TS }, 3, 'agent-a')
    expect(client.rows).toHaveLength(1)
    expect(client.rows[0]!.event).toBe('invoice:activated')
    expect(client.rows[0]!.tenant).toBe(TENANT)
    expect(client.rows[0]!.depth).toBe(3)
    const [back] = await readChatSince(client, TENANT)
    expect(back!.event).toBe('invoice:activated')
  })
})
