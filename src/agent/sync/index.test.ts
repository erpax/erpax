import { describe, it, expect } from 'vitest'
import { computeContentUuid } from '@/integrity'
import { encodeEvent, decodeEvent, roomWebSocketUrl, eventContentUuid, type ErpaxEvent } from '@/agent/sync'

const TENANT = 'tenant-1'

function honestEvent(overrides: Partial<ErpaxEvent> = {}): ErpaxEvent {
  const base: ErpaxEvent = {
    v: 1,
    uuid: '',
    event: 'invoice:activated',
    aggregateId: computeContentUuid({ invoiceId: 'inv-7' }, TENANT),
    agent: 'agent-a',
    ts: '2026-06-01T00:00:00.000Z',
    payload: { amount: 1000 },
    ...overrides,
  }
  return { ...base, uuid: eventContentUuid(base, TENANT) }
}

describe('agent-sync — the erpax realtime event bus over the chat.erpax.com DO', () => {
  it('builds the Durable-Object room websocket url', () => {
    expect(roomWebSocketUrl('B1EkSl_fSQBkMCSJVZqy7', 'chat.erpax.com')).toBe('wss://chat.erpax.com/api/room/B1EkSl_fSQBkMCSJVZqy7/websocket')
  })

  it('encode → decode round-trips an erpax event', () => {
    const ev = honestEvent()
    const decoded = decodeEvent({ name: 'agent-a', message: encodeEvent(ev) }, 'agent-b')
    expect(decoded).toEqual(ev)
  })

  it('ignores human chat (no erpax prefix)', () => {
    expect(decodeEvent({ name: 'human', message: 'hello team' })).toBeNull()
  })

  it('ignores its own echo (idempotent self-filter)', () => {
    const ev = honestEvent()
    expect(decodeEvent({ name: 'agent-a', message: encodeEvent(ev) }, 'agent-a')).toBeNull()
  })

  it('rejects malformed / wrong-version envelopes', () => {
    expect(decodeEvent({ message: 'erpax::{not json' })).toBeNull()
    expect(decodeEvent({ message: 'erpax::{"v":2,"uuid":"x"}' })).toBeNull()
  })
})
