/**
 * Tests for uuid-driven references — Conservation Law 10.
 * Slice UUUUU.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  uuidRef, registerUuidRef, UUID_REF_REGISTRY,
} from './uuid-ref'

beforeEach(() => UUID_REF_REGISTRY.clear())

describe('uuidRef', () => {
  it('returns a single text field with index + uuid validate', () => {
    const fields = uuidRef({
      owningCollection: 'invoices', fieldName: 'customerUuid', targetCollection: 'customers',
    })
    expect(fields).toHaveLength(1)
    expect(fields[0]).toMatchObject({
      name: 'customerUuid', type: 'text', index: true, required: false,
    })
  })

  it('registers (owningCollection, fieldName) → targetCollection in the registry', () => {
    uuidRef({
      owningCollection: 'invoices', fieldName: 'customerUuid', targetCollection: 'customers',
    })
    expect(UUID_REF_REGISTRY.get('invoices.customerUuid')).toBe('customers')
  })

  it('validate accepts a UUIDv8 string', () => {
    const [field] = uuidRef({
      owningCollection: 'invoices', fieldName: 'customerUuid', targetCollection: 'customers',
    })
    const validate = (field as { validate: (v: unknown) => true | string }).validate
    // Valid v8 (version nibble = 8, variant = 8/9/a/b in high two bits)
    expect(validate('00112233-4455-8667-8899-aabbccddeeff')).toBe(true)
  })

  it('validate rejects non-uuid strings', () => {
    const [field] = uuidRef({
      owningCollection: 'invoices', fieldName: 'customerUuid', targetCollection: 'customers',
    })
    const validate = (field as { validate: (v: unknown) => true | string }).validate
    const rejection = validate('not-a-uuid')
    expect(typeof rejection).toBe('string')
    expect(rejection).toContain('UUIDv8')
    expect(rejection).toContain('customers')
  })

  it('validate rejects v4 uuids (version nibble must be 8)', () => {
    const [field] = uuidRef({
      owningCollection: 'invoices', fieldName: 'customerUuid', targetCollection: 'customers',
    })
    const validate = (field as { validate: (v: unknown) => true | string }).validate
    // v4: version nibble = 4
    expect(typeof validate('00112233-4455-4667-8899-aabbccddeeff')).toBe('string')
  })

  it('validate accepts empty/null when not required', () => {
    const [field] = uuidRef({
      owningCollection: 'invoices', fieldName: 'customerUuid', targetCollection: 'customers',
      required: false,
    })
    const validate = (field as { validate: (v: unknown) => true | string }).validate
    expect(validate('')).toBe(true)
    expect(validate(null)).toBe(true)
    expect(validate(undefined)).toBe(true)
  })

  it('validate rejects empty when required', () => {
    const [field] = uuidRef({
      owningCollection: 'invoices', fieldName: 'customerUuid', targetCollection: 'customers',
      required: true,
    })
    const validate = (field as { validate: (v: unknown) => true | string }).validate
    expect(typeof validate('')).toBe('string')
    expect(typeof validate(null)).toBe('string')
  })
})

describe('registerUuidRef', () => {
  it('multiple registrations accumulate', () => {
    registerUuidRef('invoices', 'customerUuid', 'customers')
    registerUuidRef('invoices', 'paymentUuid', 'payments')
    registerUuidRef('payments', 'invoiceUuid', 'invoices')
    expect(UUID_REF_REGISTRY.size).toBe(3)
    expect(UUID_REF_REGISTRY.get('invoices.customerUuid')).toBe('customers')
    expect(UUID_REF_REGISTRY.get('payments.invoiceUuid')).toBe('invoices')
  })

  it('re-registration of the same key overwrites (last write wins)', () => {
    registerUuidRef('invoices', 'customerUuid', 'customers')
    registerUuidRef('invoices', 'customerUuid', 'leads')
    expect(UUID_REF_REGISTRY.get('invoices.customerUuid')).toBe('leads')
    expect(UUID_REF_REGISTRY.size).toBe(1)
  })
})
