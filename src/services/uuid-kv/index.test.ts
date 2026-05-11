/**
 * Universal uuid mapping — round-trip tests.
 *
 * Slice QQQQQQQQQ-cut1 (2026-05-11). Pins the contract:
 *
 *   1. UuidMap is a typed key-uuid → value-uuid store.
 *   2. `computeKvBindingUuid` is stable for (keyUuid, valueUuid,
 *      tenant) — federation peers compute the same binding uuid.
 *   3. `toUuidMap` adapts a string-keyed entries list into a
 *      UuidMap; same (slot, key) → same keyUuid; different slots
 *      with the same key string produce DIFFERENT keyUuids.
 *   4. `freezeUuid` is stable for the same map contents in any
 *      insertion order (sorted internally) — closes Finding 3 of
 *      the tamper-surface review: registry freeze = "store
 *      freezeUuid at boot, compare at runtime".
 *   5. `resolveKeyUuid` matches the keyUuid produced by `toUuidMap`.
 *
 * @audit Conservation Law 8 + 47 (uuid family at both sides of the pair)
 */
import { describe, it, expect } from 'vitest'
import {
  UuidMap,
  computeKvBindingUuid,
  toUuidMap,
  resolveKeyUuid,
} from './index'
import type { ContentUuid } from '@/services/integrity/content-uuid'

// Phantom shapes for type-branding compile-time clarity.
interface Currency { code: string }
interface CurrencyDef { numericCode: number }

describe('UuidMap — typed pointer table', () => {
  it('set / get / has / delete with content-uuid keys', () => {
    const m = new UuidMap<Currency, CurrencyDef>()
    const k1 = '00000000-0000-5000-8000-000000000001' as ContentUuid<Currency>
    const v1 = '00000000-0000-5000-8000-000000000eur' as ContentUuid<CurrencyDef>
    expect(m.has(k1)).toBe(false)
    m.set(k1, v1)
    expect(m.get(k1)).toBe(v1)
    expect(m.has(k1)).toBe(true)
    expect(m.size).toBe(1)
    m.delete(k1)
    expect(m.has(k1)).toBe(false)
    expect(m.size).toBe(0)
  })

  it('iterates as KvBinding entries', () => {
    const m = new UuidMap<Currency, CurrencyDef>()
    const k1 = '00000000-0000-5000-8000-000000000001' as ContentUuid<Currency>
    const k2 = '00000000-0000-5000-8000-000000000002' as ContentUuid<Currency>
    const v1 = '00000000-0000-5000-8000-aaaaaaaaaaaa' as ContentUuid<CurrencyDef>
    const v2 = '00000000-0000-5000-8000-bbbbbbbbbbbb' as ContentUuid<CurrencyDef>
    m.set(k1, v1)
    m.set(k2, v2)
    const collected = [...m]
    expect(collected).toHaveLength(2)
    expect(collected[0]!.keyUuid).toBe(k1)
    expect(collected[0]!.valueUuid).toBe(v1)
    expect(collected[1]!.keyUuid).toBe(k2)
    expect(collected[1]!.valueUuid).toBe(v2)
  })
})

describe('computeKvBindingUuid — binding-level content uuid', () => {
  it('is stable for the same (keyUuid, valueUuid, tenant) tuple', () => {
    const args = {
      keyUuid:   '00000000-0000-5000-8000-keyk' as ContentUuid<Currency>,
      valueUuid: '00000000-0000-5000-8000-valv' as ContentUuid<CurrencyDef>,
      tenantId:  'tenant-1',
    }
    const a = computeKvBindingUuid(args)
    const b = computeKvBindingUuid(args)
    expect(a).toBe(b)
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-/)
  })

  it('differs when value-uuid changes (same key, new value → new binding)', () => {
    const k = '00000000-0000-5000-8000-keyk' as ContentUuid<Currency>
    const a = computeKvBindingUuid({
      keyUuid: k, valueUuid: '00000000-0000-5000-8000-aaaaaaaaaaaa' as ContentUuid<CurrencyDef>, tenantId: 't',
    })
    const b = computeKvBindingUuid({
      keyUuid: k, valueUuid: '00000000-0000-5000-8000-bbbbbbbbbbbb' as ContentUuid<CurrencyDef>, tenantId: 't',
    })
    expect(a).not.toBe(b)
  })

  it('differs across tenants (per-tenant binding namespace)', () => {
    const args = {
      keyUuid:   '00000000-0000-5000-8000-keyk' as ContentUuid<Currency>,
      valueUuid: '00000000-0000-5000-8000-valv' as ContentUuid<CurrencyDef>,
    }
    expect(computeKvBindingUuid({ ...args, tenantId: 'tenant-1' }))
      .not.toBe(computeKvBindingUuid({ ...args, tenantId: 'tenant-2' }))
  })
})

describe('toUuidMap — adapter from string-keyed entries', () => {
  it('hashes (slot, key) for each entry; same (slot, key, tenant) → same keyUuid', () => {
    const m1 = toUuidMap({
      slot: 'currency',
      entries: [['EUR', { numericCode: 978 }], ['JPY', { numericCode: 392 }]],
      tenantId: 'tenant-1',
    })
    const m2 = toUuidMap({
      slot: 'currency',
      entries: [['EUR', { numericCode: 978 }], ['JPY', { numericCode: 392 }]],
      tenantId: 'tenant-1',
    })
    const e1 = [...m1]
    const e2 = [...m2]
    expect(e1[0]!.keyUuid).toBe(e2[0]!.keyUuid)
    expect(e1[0]!.valueUuid).toBe(e2[0]!.valueUuid)
  })

  it('same key in different SLOTS produces DIFFERENT keyUuids (slot in hash)', () => {
    const currencyMap = toUuidMap({
      slot: 'currency',
      entries: [['EUR', { numericCode: 978 }]],
      tenantId: 'tenant-1',
    })
    const localeMap = toUuidMap({
      slot: 'locale',
      entries: [['EUR', { numericCode: 978 }]],   // same key+value, different slot
      tenantId: 'tenant-1',
    })
    const currK = [...currencyMap][0]!.keyUuid
    const localeK = [...localeMap][0]!.keyUuid
    expect(currK).not.toBe(localeK)
  })
})

describe('freezeUuid — registry-freeze pattern (closes Finding 3)', () => {
  it('is stable for the same entries regardless of insertion order', () => {
    const a = new UuidMap<Currency, CurrencyDef>()
    a.set('00000000-0000-5000-8000-000001' as ContentUuid<Currency>, '00000000-0000-5000-8000-0aaa' as ContentUuid<CurrencyDef>)
    a.set('00000000-0000-5000-8000-000002' as ContentUuid<Currency>, '00000000-0000-5000-8000-0bbb' as ContentUuid<CurrencyDef>)
    const b = new UuidMap<Currency, CurrencyDef>()
    b.set('00000000-0000-5000-8000-000002' as ContentUuid<Currency>, '00000000-0000-5000-8000-0bbb' as ContentUuid<CurrencyDef>)
    b.set('00000000-0000-5000-8000-000001' as ContentUuid<Currency>, '00000000-0000-5000-8000-0aaa' as ContentUuid<CurrencyDef>)
    expect(a.freezeUuid('tenant-1')).toBe(b.freezeUuid('tenant-1'))
  })

  it('changes when a new binding is added after freeze (registry-tamper detection)', () => {
    const m = new UuidMap<Currency, CurrencyDef>()
    m.set('00000000-0000-5000-8000-000001' as ContentUuid<Currency>, '00000000-0000-5000-8000-0aaa' as ContentUuid<CurrencyDef>)
    const frozen = m.freezeUuid('tenant-1')
    m.set('00000000-0000-5000-8000-000002' as ContentUuid<Currency>, '00000000-0000-5000-8000-0bbb' as ContentUuid<CurrencyDef>)
    expect(m.freezeUuid('tenant-1')).not.toBe(frozen)
  })

  it('differs across tenants (per-tenant freeze namespace)', () => {
    const m = new UuidMap<Currency, CurrencyDef>()
    m.set('00000000-0000-5000-8000-000001' as ContentUuid<Currency>, '00000000-0000-5000-8000-0aaa' as ContentUuid<CurrencyDef>)
    expect(m.freezeUuid('tenant-1')).not.toBe(m.freezeUuid('tenant-2'))
  })
})

describe('resolveKeyUuid — single-entry lookup matches toUuidMap', () => {
  it('the keyUuid returned matches what toUuidMap produces for the same (slot, key, tenant)', () => {
    const single = resolveKeyUuid({ slot: 'currency', key: 'EUR', tenantId: 't' })
    const fromMap = [...toUuidMap({
      slot: 'currency',
      entries: [['EUR', { numericCode: 978 }]],
      tenantId: 't',
    })][0]!.keyUuid
    expect(single).toBe(fromMap)
  })
})
