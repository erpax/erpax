import { describe, it, expect } from 'vitest'
import {
  computeContentUuid, verifyContentUuid,
  jcsCanonicalize, stripNonContentFields,
  tenantNamespace, ERPAX_NAMESPACE_ROOT, NON_CONTENT_FIELDS,
  toJws, fromJws,
} from '@/integrity'

const UUID_V8_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// Conservation Law 8: identity is a pure projection of content. The uuid is
// the tamper detector — same content ⇒ same uuid, any field change ⇒ new uuid.
describe('integrity — content-addressable uuid (Law 8)', () => {
  it('jcsCanonicalize sorts keys and rejects non-finite numbers', () => {
    expect(jcsCanonicalize({ b: 1, a: 2 })).toBe('{"a":2,"b":1}')
    expect(jcsCanonicalize({ a: undefined, b: 1 })).toBe('{"b":1}')
    expect(() => jcsCanonicalize(Number.POSITIVE_INFINITY)).toThrow()
  })

  it('stripNonContentFields drops every storage-managed field, keeps content', () => {
    const stripped = stripNonContentFields({ uuid: 'x', id: 1, createdAt: 't', amount: 99 })
    expect(stripped).toEqual({ amount: 99 })
    for (const f of NON_CONTENT_FIELDS) {
      expect(Object.keys(stripped)).not.toContain(f)
    }
  })

  it('computeContentUuid is deterministic and a conformant uuidv8', () => {
    const obj = { amount: 100, payee: 'bob' }
    const u = computeContentUuid(obj, 'tenant-1')
    expect(u).toBe(computeContentUuid({ payee: 'bob', amount: 100 }, 'tenant-1'))
    expect(u).toMatch(UUID_V8_RE)
  })

  it('any content change ⇒ different uuid (tamper detector)', () => {
    expect(computeContentUuid({ amount: 100 }, 't'))
      .not.toBe(computeContentUuid({ amount: 999 }, 't'))
  })

  it('the namespace is per-tenant — same content under different tenants differs', () => {
    expect(computeContentUuid({ amount: 1 }, 'a'))
      .not.toBe(computeContentUuid({ amount: 1 }, 'b'))
    expect(tenantNamespace('a')).not.toBe(tenantNamespace('b'))
    expect(tenantNamespace('a')).toBe(tenantNamespace('a'))
    expect(ERPAX_NAMESPACE_ROOT).toBe('6ba7b810-9dad-11d1-80b4-00c04fd430c8')
  })

  it('verifyContentUuid accepts the matching stored uuid, flags a tampered one', () => {
    const obj = { amount: 100, payee: 'bob' }
    const uuid = computeContentUuid(obj, 'tenant-1')
    expect(verifyContentUuid({ ...obj, uuid }, 'tenant-1')).toEqual({ ok: true })

    const bad = verifyContentUuid({ ...obj, amount: 999, uuid }, 'tenant-1')
    expect(bad.ok).toBe(false)
    if (!bad.ok) expect(bad.actual).toBe(uuid)
  })

  it('missing stored uuid is reported as actual: undefined', () => {
    const res = verifyContentUuid({ amount: 1 }, 'tenant-1')
    expect(res.ok).toBe(false)
    if (!res.ok) expect(res.actual).toBeUndefined()
  })
})

// Signatures fold into the uuid family: JWS is a lossless wire form of the tuple.
describe('integrity — signed-uuid JWS round-trip (RFC 7515)', () => {
  it('toJws → fromJws recovers (uuid, alg, kid, sig, signedAt)', () => {
    const signed = {
      uuid: computeContentUuid({ amount: 1 }, 't') as never,
      alg: 'EdDSA' as const,
      kid: 'tenant-1/signing/2026-05-11',
      sig: 'AAAA',
      signedAt: '2026-05-11T08:00:00.000Z',
    }
    const jws = toJws(signed)
    expect(jws.split('.')).toHaveLength(3)
    const back = fromJws(jws)
    expect(back.uuid).toBe(signed.uuid)
    expect(back.alg).toBe(signed.alg)
    expect(back.kid).toBe(signed.kid)
    expect(back.sig).toBe(signed.sig)
    expect(back.signedAt).toBe(signed.signedAt)
  })

  it('fromJws throws on a structurally malformed token', () => {
    expect(() => fromJws('only.two')).toThrow()
  })
})
