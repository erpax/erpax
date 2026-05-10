/**
 * Tests for the content-addressable UUID primitive — Conservation Law 8.
 *
 * @standard RFC 4122 §4.3 + RFC 8785 + FIPS 180-4
 */
import { describe, it, expect } from 'vitest'
import {
  computeContentUuid, verifyContentUuid, jcsCanonicalize,
  stripNonContentFields, tenantNamespace, NON_CONTENT_FIELDS,
} from './content-uuid'

describe('jcsCanonicalize (RFC 8785)', () => {
  it('sorts object keys lexicographically', () => {
    expect(jcsCanonicalize({ b: 2, a: 1 })).toBe('{"a":1,"b":2}')
  })
  it('omits whitespace', () => {
    expect(jcsCanonicalize([1, 2, 3])).toBe('[1,2,3]')
  })
  it('handles nested structures', () => {
    expect(jcsCanonicalize({ b: [3, 1, 2], a: { y: 2, x: 1 } }))
      .toBe('{"a":{"x":1,"y":2},"b":[3,1,2]}')
  })
  it('omits undefined fields', () => {
    expect(jcsCanonicalize({ a: 1, b: undefined, c: 3 })).toBe('{"a":1,"c":3}')
  })
  it('rejects non-finite numbers', () => {
    expect(() => jcsCanonicalize({ x: NaN })).toThrow(/non-finite/)
    expect(() => jcsCanonicalize({ x: Infinity })).toThrow(/non-finite/)
  })
})

describe('stripNonContentFields', () => {
  it('removes uuid / id / createdAt / updatedAt + version metadata', () => {
    const obj = {
      uuid: 'u', id: 1, createdAt: 'x', updatedAt: 'y',
      _status: 'published', _version: 3, autosave: true,
      amount: 100, currency: 'EUR',
    }
    expect(stripNonContentFields(obj)).toEqual({ amount: 100, currency: 'EUR' })
  })
  it('does not mutate the input', () => {
    const obj = { uuid: 'u', amount: 100 }
    stripNonContentFields(obj)
    expect(obj).toEqual({ uuid: 'u', amount: 100 })
  })
  it('exposes NON_CONTENT_FIELDS for downstream consumers', () => {
    expect(NON_CONTENT_FIELDS.has('uuid')).toBe(true)
    expect(NON_CONTENT_FIELDS.has('createdAt')).toBe(true)
    expect(NON_CONTENT_FIELDS.has('amount')).toBe(false)
  })
})

describe('tenantNamespace', () => {
  it('produces a deterministic UUIDv5 per tenant', () => {
    const a = tenantNamespace('tenant-1')
    const b = tenantNamespace('tenant-1')
    expect(a).toBe(b)
  })
  it('different tenants get different namespaces', () => {
    expect(tenantNamespace('tenant-a')).not.toBe(tenantNamespace('tenant-b'))
  })
  it('returns a valid UUID v5 format', () => {
    const ns = tenantNamespace('t')
    expect(ns).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })
})

describe('computeContentUuid', () => {
  it('is deterministic — same input → same uuid', () => {
    const obj = { amount: 100, currency: 'EUR' }
    const u1 = computeContentUuid(obj, 'tenant-1')
    const u2 = computeContentUuid(obj, 'tenant-1')
    expect(u1).toBe(u2)
  })
  it('changes when ANY content field changes (tamper detection)', () => {
    const u1 = computeContentUuid({ amount: 100, currency: 'EUR' }, 'tenant-1')
    const u2 = computeContentUuid({ amount: 999, currency: 'EUR' }, 'tenant-1')
    expect(u1).not.toBe(u2)
  })
  it('does NOT change when only non-content fields differ', () => {
    const u1 = computeContentUuid({
      amount: 100, currency: 'EUR',
      uuid: 'old-uuid', createdAt: '2026-01-01', updatedAt: '2026-01-01',
    }, 'tenant-1')
    const u2 = computeContentUuid({
      amount: 100, currency: 'EUR',
      uuid: 'different-uuid', createdAt: '2026-12-31', updatedAt: '2026-12-31',
    }, 'tenant-1')
    expect(u1).toBe(u2)
  })
  it('different tenants → different uuids for the same content', () => {
    const obj = { amount: 100 }
    expect(computeContentUuid(obj, 'tenant-a')).not.toBe(computeContentUuid(obj, 'tenant-b'))
  })
  it('field order does not affect the uuid (canonicalization)', () => {
    const u1 = computeContentUuid({ a: 1, b: 2, c: 3 }, 't')
    const u2 = computeContentUuid({ c: 3, a: 1, b: 2 }, 't')
    expect(u1).toBe(u2)
  })
  it('returns a valid UUID v5 format', () => {
    const u = computeContentUuid({ amount: 100 }, 'tenant-1')
    expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })
})

describe('verifyContentUuid', () => {
  it('returns ok:true when stored uuid matches recomputed', () => {
    const obj = { amount: 100, currency: 'EUR' }
    const uuid = computeContentUuid(obj, 'tenant-1')
    const result = verifyContentUuid({ ...obj, uuid }, 'tenant-1')
    expect(result.ok).toBe(true)
  })
  it('returns ok:false with expected/actual on tamper', () => {
    const obj = { amount: 100, currency: 'EUR' }
    const goodUuid = computeContentUuid(obj, 'tenant-1')
    // Simulate tamper: someone ran `UPDATE invoices SET amount=999 WHERE uuid=…`
    const tamperedRow = { uuid: goodUuid, amount: 999, currency: 'EUR' }
    const result = verifyContentUuid(tamperedRow, 'tenant-1')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.actual).toBe(goodUuid)
      expect(result.expected).not.toBe(goodUuid)
    }
  })
  it('returns ok:false when uuid is missing', () => {
    const result = verifyContentUuid({ amount: 100 }, 'tenant-1')
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.actual).toBeUndefined()
  })
})
