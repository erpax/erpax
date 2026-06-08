import { describe, it, expect } from 'vitest'
import { computeContentUuid } from '@/integrity'
import {
  eventContentUuid,
  verifyEventUuid,
  roomWebSocketUrl,
  encodeEvent,
  decodeEvent,
  type ErpaxEvent,
} from '@/agent/sync'

// The room PROTOCOL (the pure form): a content-uuid event envelope whose `uuid`
// is the idempotency key, encode/decode at the wire, and the cryptographic gate
// that recomputes the uuid from content so a forged-uuid replay is rejected.
const TENANT = 'tenant-1'

function honestEvent(overrides: Partial<ErpaxEvent> = {}): ErpaxEvent {
  const base: ErpaxEvent = {
    v: 1,
    uuid: '',
    event: 'invoice:activated',
    aggregateId: computeContentUuid({ invoiceId: 'inv-7' }, TENANT),
    agent: 'finance-agent',
    ts: '2026-06-07T00:00:00.000Z',
    payload: { amount: 100 },
    ...overrides,
  }
  // An honest publisher stamps the uuid recomputed from content.
  return { ...base, uuid: eventContentUuid(base, TENANT) }
}

describe('agent/sync — content-uuid event protocol', () => {
  describe('eventContentUuid — deterministic idempotency key from content', () => {
    it('same content ⇒ same id (idempotent)', () => {
      const a = honestEvent()
      const b = honestEvent()
      expect(eventContentUuid(a, TENANT)).toBe(eventContentUuid(b, TENANT))
    })
    it('different payload ⇒ different id', () => {
      const a = honestEvent({ payload: { amount: 100 } })
      const b = honestEvent({ payload: { amount: 999 } })
      expect(eventContentUuid(a, TENANT)).not.toBe(eventContentUuid(b, TENANT))
    })
    it('the tenant is a connection fact — a different tenant yields a different id', () => {
      const e = honestEvent()
      expect(eventContentUuid(e, TENANT)).not.toBe(eventContentUuid(e, 'tenant-2'))
    })
  })

  describe('verifyEventUuid — the tamper/replay gate', () => {
    it('an honest envelope verifies', () => {
      expect(verifyEventUuid(honestEvent(), TENANT)).toBe(true)
    })
    it('an envelope whose claimed uuid does not match its content is rejected', () => {
      const forged = { ...honestEvent(), uuid: 'attacker-chosen-uuid' }
      expect(verifyEventUuid(forged, TENANT)).toBe(false)
    })
  })

  describe('roomWebSocketUrl — host is injected, never baked', () => {
    it('builds a wss URL with the encoded room id under the supplied host', () => {
      expect(roomWebSocketUrl('room a', 'self.example.com')).toBe(
        'wss://self.example.com/api/room/room%20a/websocket',
      )
    })
  })

  describe('encode / decode round-trip + the wire prefix', () => {
    it('encode prefixes the JSON so it is distinguishable from human chat', () => {
      const wire = encodeEvent(honestEvent())
      expect(wire.startsWith('erpax::')).toBe(true)
    })
    it('decode recovers an encoded event', () => {
      const e = honestEvent()
      const decoded = decodeEvent({ message: encodeEvent(e) })
      expect(decoded).not.toBeNull()
      expect(decoded?.uuid).toBe(e.uuid)
      expect(decoded?.event).toBe('invoice:activated')
    })
    it('human chat (no prefix) and malformed JSON decode to null', () => {
      expect(decodeEvent({ message: 'hello' })).toBeNull()
      expect(decodeEvent({ message: 'erpax::{not json' })).toBeNull()
    })
    it('an envelope missing required fields decodes to null', () => {
      expect(decodeEvent({ message: 'erpax::' + JSON.stringify({ v: 1 }) })).toBeNull()
    })
  })

  describe('decode — self-echo suppression and the opt-in uuid gate', () => {
    it("an agent ignores its own echo", () => {
      const e = honestEvent({ agent: 'me' })
      expect(decodeEvent({ message: encodeEvent(e) }, 'me')).toBeNull()
      expect(decodeEvent({ message: encodeEvent(e) }, 'someone-else')).not.toBeNull()
    })
    it('with verifyTenantId, a forged-uuid envelope is dropped before delivery', () => {
      const e = honestEvent()
      const forged = { ...e, uuid: 'forged' }
      expect(decodeEvent({ message: encodeEvent(forged) }, { verifyTenantId: TENANT })).toBeNull()
      // honest envelope still passes the gate
      expect(decodeEvent({ message: encodeEvent(e) }, { verifyTenantId: TENANT })).not.toBeNull()
    })
    it('without verifyTenantId the uuid is not checked at decode (consumer dedupes)', () => {
      const forged = { ...honestEvent(), uuid: 'forged-but-not-checked' }
      const decoded = decodeEvent({ message: encodeEvent(forged) })
      expect(decoded?.uuid).toBe('forged-but-not-checked')
    })
  })
})
