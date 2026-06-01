import { describe, it, expect } from 'vitest'
import { encodeEvent, decodeEvent, roomWebSocketUrl, type ErpaxEvent } from './index'

const ev: ErpaxEvent = {
  v: 1,
  uuid: '11111111-1111-5111-8111-111111111111',
  event: 'invoice:activated',
  aggregateId: '22222222-2222-5222-8222-222222222222',
  agent: 'agent-a',
  ts: '2026-06-01T00:00:00.000Z',
  payload: { amount: 1000 },
}

describe('agent-sync — the erpax realtime event bus over the chat.erpax.com DO', () => {
  it('builds the Durable-Object room websocket url', () => {
    expect(roomWebSocketUrl('B1EkSl_fSQBkMCSJVZqy7', 'chat.erpax.com')).toBe('wss://chat.erpax.com/api/room/B1EkSl_fSQBkMCSJVZqy7/websocket')
  })

  it('encode → decode round-trips an erpax event', () => {
    const decoded = decodeEvent({ name: 'agent-a', message: encodeEvent(ev) }, 'agent-b')
    expect(decoded).toEqual(ev)
  })

  it('ignores human chat (no erpax prefix)', () => {
    expect(decodeEvent({ name: 'human', message: 'hello team' })).toBeNull()
  })

  it('ignores its own echo (idempotent self-filter)', () => {
    expect(decodeEvent({ name: 'agent-a', message: encodeEvent(ev) }, 'agent-a')).toBeNull()
  })

  it('rejects malformed / wrong-version envelopes', () => {
    expect(decodeEvent({ message: 'erpax::{not json' })).toBeNull()
    expect(decodeEvent({ message: 'erpax::{"v":2,"uuid":"x"}' })).toBeNull()
  })
})
