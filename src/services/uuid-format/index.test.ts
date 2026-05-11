/**
 * Structured uuidv8 tests — Conservation Law 61.
 *
 * Slice UUUUUUUUU-cut1 (2026-05-11). Pins:
 *
 *   1. encodeStructured produces a syntactically valid uuid.
 *   2. The version nibble is 8 (RFC 9562 §6.4).
 *   3. The variant bits are 0b10 (RFC 4122 §4.1.2).
 *   4. decodeStructured recovers the (slotTag, capabilities,
 *      schemaVersion) inputs exactly.
 *   5. Different (slotTag) or (capabilities) inputs produce
 *      different uuids — flipping a capability flag changes the uuid.
 *   6. verifyStructured returns true iff inputs match the encoded uuid.
 *   7. hasCapability detects each flag.
 *   8. Per-tenant namespacing — same content + different tenant →
 *      different uuids.
 *
 * @audit Conservation Law 61 uuid-carries-features
 */
import { describe, it, expect } from 'vitest'
import {
  encodeStructured,
  decodeStructured,
  verifyStructured,
  hasCapability,
  withCapabilities,
  SLOT_TAGS,
  CAPABILITIES,
} from './index'

const TENANT = 'tenant-1'

describe('encodeStructured — RFC 9562 uuidv8 layout', () => {
  it('produces a uuid in the canonical 8-4-4-4-12 form', () => {
    const uuid = encodeStructured({
      slotTag: SLOT_TAGS.currency,
      capabilities: 0,
      schemaVersion: 0,
      content: { code: 'EUR' },
      tenantId: TENANT,
    })
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })

  it('version nibble = 8 (RFC 9562 §6.4)', () => {
    const uuid = encodeStructured({
      slotTag: SLOT_TAGS.currency, capabilities: 0, schemaVersion: 0,
      content: { x: 1 }, tenantId: TENANT,
    })
    // Position 14 in the canonical form is the version nibble.
    expect(uuid[14]).toBe('8')
  })

  it('variant bits = 0b10 (RFC 4122 §4.1.2)', () => {
    const uuid = encodeStructured({
      slotTag: SLOT_TAGS.currency, capabilities: 0, schemaVersion: 0,
      content: { x: 1 }, tenantId: TENANT,
    })
    // Position 19 is the first hex digit of byte 8; high 2 bits must be 0b10.
    const nibble = parseInt(uuid[19]!, 16)
    expect((nibble >> 2) & 0b11).toBe(0b10)
  })
})

describe('decodeStructured — recovers all inputs', () => {
  it('recovers slotTag, capabilities, schemaVersion exactly', () => {
    const uuid = encodeStructured({
      slotTag: SLOT_TAGS.share,
      capabilities: withCapabilities(CAPABILITIES.SIGNED, CAPABILITIES.SEALED, CAPABILITIES.SHARED),
      schemaVersion: 5,
      content: { grantee: 'g', target: 't', role: 'admin' },
      tenantId: TENANT,
    })
    const parts = decodeStructured(uuid)
    expect(parts.slotTag).toBe(SLOT_TAGS.share)
    expect(parts.slotName).toBe('share')
    expect(parts.capabilities).toBe(
      CAPABILITIES.SIGNED | CAPABILITIES.SEALED | CAPABILITIES.SHARED,
    )
    expect(parts.capabilityNames.sort()).toEqual(['SEALED', 'SHARED', 'SIGNED'])
    expect(parts.schemaVersion).toBe(5)
  })

  it('throws on a non-uuidv8 input (e.g. uuidv5)', () => {
    // uuidv5 has version nibble 5; structured decoder must reject it.
    const v5 = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
    expect(() => decodeStructured(v5)).toThrow(/expected uuidv8/)
  })

  it('throws on bad length', () => {
    expect(() => decodeStructured('not-a-uuid')).toThrow()
  })
})

describe('Feature flag changes produce different uuids', () => {
  const baseArgs = {
    slotTag: SLOT_TAGS.auditEvent,
    capabilities: 0,
    schemaVersion: 1,
    content: { event: 'invoice:activated' },
    tenantId: TENANT,
  } as const

  it('flipping capability flag changes the uuid', () => {
    const a = encodeStructured(baseArgs)
    const b = encodeStructured({ ...baseArgs, capabilities: CAPABILITIES.SIGNED })
    const c = encodeStructured({ ...baseArgs, capabilities: CAPABILITIES.SIGNED | CAPABILITIES.SEALED })
    expect(a).not.toBe(b)
    expect(b).not.toBe(c)
    expect(a).not.toBe(c)
  })

  it('changing slotTag changes the uuid', () => {
    const a = encodeStructured(baseArgs)
    const b = encodeStructured({ ...baseArgs, slotTag: SLOT_TAGS.kvBinding })
    expect(a).not.toBe(b)
  })

  it('changing schemaVersion changes the uuid', () => {
    const a = encodeStructured(baseArgs)
    const b = encodeStructured({ ...baseArgs, schemaVersion: 2 })
    expect(a).not.toBe(b)
  })

  it('changing content changes the uuid', () => {
    const a = encodeStructured(baseArgs)
    const b = encodeStructured({ ...baseArgs, content: { event: 'invoice:paid' } })
    expect(a).not.toBe(b)
  })

  it('changing tenant changes the uuid (per-tenant namespace)', () => {
    const a = encodeStructured(baseArgs)
    const b = encodeStructured({ ...baseArgs, tenantId: 'tenant-2' })
    expect(a).not.toBe(b)
  })
})

describe('verifyStructured + hasCapability', () => {
  it('verifyStructured returns true for matching inputs, false for mismatched', () => {
    const uuid = encodeStructured({
      slotTag: SLOT_TAGS.chainLeaf,
      capabilities: CAPABILITIES.CHAINED | CAPABILITIES.SEALED,
      schemaVersion: 0,
      content: { depth: 42 },
      tenantId: TENANT,
    })
    expect(verifyStructured({
      uuid,
      slotTag: SLOT_TAGS.chainLeaf,
      capabilities: CAPABILITIES.CHAINED | CAPABILITIES.SEALED,
      schemaVersion: 0,
      content: { depth: 42 },
      tenantId: TENANT,
    })).toBe(true)
    // Wrong depth → wrong uuid.
    expect(verifyStructured({
      uuid,
      slotTag: SLOT_TAGS.chainLeaf,
      capabilities: CAPABILITIES.CHAINED | CAPABILITIES.SEALED,
      schemaVersion: 0,
      content: { depth: 43 },
      tenantId: TENANT,
    })).toBe(false)
  })

  it('hasCapability detects each set flag', () => {
    const uuid = encodeStructured({
      slotTag: SLOT_TAGS.share,
      capabilities: CAPABILITIES.SIGNED | CAPABILITIES.SHARED,
      schemaVersion: 0,
      content: { x: 1 },
      tenantId: TENANT,
    })
    expect(hasCapability(uuid, CAPABILITIES.SIGNED)).toBe(true)
    expect(hasCapability(uuid, CAPABILITIES.SHARED)).toBe(true)
    expect(hasCapability(uuid, CAPABILITIES.SEALED)).toBe(false)
    expect(hasCapability(uuid, CAPABILITIES.ENCRYPTED)).toBe(false)
  })
})

describe('withCapabilities — composition helper', () => {
  it('OR-composes flag values; respects 0..255 range', () => {
    const combined = withCapabilities(
      CAPABILITIES.SIGNED,
      CAPABILITIES.SEALED,
      CAPABILITIES.TAMPER_PROOF,
    )
    expect(combined & CAPABILITIES.SIGNED).toBe(CAPABILITIES.SIGNED)
    expect(combined & CAPABILITIES.SEALED).toBe(CAPABILITIES.SEALED)
    expect(combined & CAPABILITIES.TAMPER_PROOF).toBe(CAPABILITIES.TAMPER_PROOF)
    expect(combined & CAPABILITIES.ENCRYPTED).toBe(0)
    expect(combined).toBeLessThanOrEqual(0xff)
  })
})
