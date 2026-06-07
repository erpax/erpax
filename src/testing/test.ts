import { describe, it, expect } from 'vitest'
import {
  coerceValue,
  validateFieldType,
  createFieldValidator,
  registerCustomValidator,
  getCustomFieldValidator,
  getFieldValidator,
  SEED_VALIDATION_REGISTRY,
  getSeedCategoryRegistry,
  getSeedsByCategory,
  type FieldTypeValidator,
} from '@/testing'

// testing — the society proving itself against its own schema (./index.ts barrel).
// The discovery organ coerces/validates a value against a field TYPE: validate
// asserts the value is ALREADY the type; coerce converts compatible shapes and
// flags `coerced`. The seed organ keeps a per-collection required-field contract
// (SEED_VALIDATION_REGISTRY) and a UI-category registry, both readable with no
// live Payload.

describe('testing — coerce converts, validate only accepts the exact type', () => {
  it('coerceValue passes null/undefined through untouched (coerced=false)', () => {
    const n = coerceValue('number', null)
    expect(n.success).toBe(true)
    expect(n.coerced).toBe(false)
    expect(n.value).toBeNull()

    const u = coerceValue('text', undefined)
    expect(u.success).toBe(true)
    expect(u.coerced).toBe(false)
    expect(u.value).toBeUndefined()
  })

  it('coerceValue("number", "123") converts and marks coerced; a real number is not coerced', () => {
    const fromString = coerceValue('number', '123')
    expect(fromString.success).toBe(true)
    expect(fromString.value).toBe(123)
    expect(fromString.coerced).toBe(true)

    const fromNumber = coerceValue('number', 42)
    expect(fromNumber.success).toBe(true)
    expect(fromNumber.value).toBe(42)
    expect(fromNumber.coerced).toBe(false)

    const bad = coerceValue('number', 'not-a-number')
    expect(bad.success).toBe(false)
  })

  it('coerceValue("integer", 3.7) floors to a whole number', () => {
    const r = coerceValue('integer', 3.7)
    expect(r.success).toBe(true)
    expect(r.value).toBe(3)
    expect(r.coerced).toBe(true)
  })

  it('coerceValue("boolean", ...) maps the canonical truthy/falsy strings and numbers', () => {
    expect(coerceValue('boolean', 'yes').value).toBe(true)
    expect(coerceValue('boolean', 'off').value).toBe(false)
    expect(coerceValue('boolean', 1).value).toBe(true)
    expect(coerceValue('boolean', 0).value).toBe(false)
    expect(coerceValue('boolean', true).coerced).toBe(false)
  })

  it('coerceValue rejects an unknown field type', () => {
    // 'mystery' is not a FieldType — exercise the default branch.
    const r = coerceValue('mystery' as unknown as 'text', 'x')
    expect(r.success).toBe(false)
    expect(r.error).toContain('Unknown field type')
  })

  it('validateFieldType accepts only the exact type — no coercion', () => {
    expect(validateFieldType('number', 5).valid).toBe(true)
    expect(validateFieldType('number', '5').valid).toBe(false) // a string is not a number
    expect(validateFieldType('integer', 5).valid).toBe(true)
    expect(validateFieldType('integer', 5.5).valid).toBe(false)
    expect(validateFieldType('boolean', true).valid).toBe(true)
    expect(validateFieldType('boolean', 'true').valid).toBe(false)
    expect(validateFieldType('email', 'a@b.co').valid).toBe(true)
    expect(validateFieldType('email', 'nope').valid).toBe(false)
    // null/undefined are universally valid (a missing value is not a type error)
    expect(validateFieldType('number', null).valid).toBe(true)
  })

  it('createFieldValidator binds one field type into validate/coerce/canCoerce', () => {
    const v = createFieldValidator('number')
    expect(v.validate(7).valid).toBe(true)
    expect(v.validate('7').valid).toBe(false)
    expect(v.coerce('7').value).toBe(7)
    expect(v.canCoerce('7')).toBe(true)
    expect(v.canCoerce('seven')).toBe(false)
  })
})

describe('testing — the field-validator registry: built-ins resolve, customs extend', () => {
  it('getFieldValidator resolves every built-in type and null for the unknown', () => {
    for (const t of ['text', 'email', 'number', 'integer', 'date', 'boolean', 'select', 'relationship']) {
      expect(getFieldValidator(t)).not.toBeNull()
    }
    expect(getFieldValidator('does-not-exist')).toBeNull()
  })

  it('a registered custom validator becomes resolvable; unregistered stays null', () => {
    const custom: FieldTypeValidator = {
      validate: (value) => ({ valid: typeof value === 'string' && value.startsWith('iban:') }),
      coerce: (value) => ({ value, success: typeof value === 'string' }),
      canCoerce: (value) => typeof value === 'string',
    }
    expect(getCustomFieldValidator('iban')).toBeNull()
    registerCustomValidator('iban', custom)
    expect(getCustomFieldValidator('iban')).toBe(custom)
    // getFieldValidator also surfaces customs (after built-in miss)
    expect(getFieldValidator('iban')).toBe(custom)
    expect(getFieldValidator('iban')?.validate('iban:BG80').valid).toBe(true)
  })
})

describe('testing — the seed contract registry holds without a live Payload', () => {
  it('SEED_VALIDATION_REGISTRY carries per-collection required-field contracts', () => {
    expect(SEED_VALIDATION_REGISTRY.tenants).toBeDefined()
    expect(SEED_VALIDATION_REGISTRY.tenants.label).toBe('Tenant')
    expect(SEED_VALIDATION_REGISTRY.tenants.requiredFields).toContain('name')
    // every contract names a label and at least one required field
    for (const contract of Object.values(SEED_VALIDATION_REGISTRY)) {
      expect(typeof contract.label).toBe('string')
      expect(contract.requiredFields.length).toBeGreaterThan(0)
    }
  })

  it('the tenant code domain-rule enforces uppercase alnum/underscore', () => {
    const rule = SEED_VALIDATION_REGISTRY.tenants.domainRules?.find((r) => r.field === 'code')
    expect(rule).toBeDefined()
    expect(rule?.check('ACME_1')).toBe(true)
    expect(rule?.check('acme-1')).toBe(false)
  })

  it('the UI-category registry is readable and filterable', () => {
    const all = getSeedCategoryRegistry()
    expect(Array.isArray(all)).toBe(true)
    // filtering by a category never returns more than the whole registry
    const filtered = getSeedsByCategory('admin-data')
    expect(filtered.length).toBeLessThanOrEqual(all.length)
    expect(filtered.every((e) => e.category === 'admin-data')).toBe(true)
  })
})
