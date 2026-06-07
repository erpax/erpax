import { describe, it, expect, beforeEach } from 'vitest'
import {
  // coercion / validation
  coerceValue,
  validateFieldType,
  createFieldValidator,
  registerCustomValidator,
  getCustomFieldValidator,
  getFieldValidator,
  // seed registry
  SEED_VALIDATION_REGISTRY,
  registerSeedCategory,
  getSeedCategoryRegistry,
  getSeedsByCategory,
  // discovery singleton helpers
  initializeDiscovery,
  getDiscovery,
  resetDiscovery,
  // snapshot
  SeedSnapshot,
} from '@/testing'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makePayload(collections: { slug: string; fields: { name: string; type: string; required?: boolean; options?: { label: string; value: string }[] }[] }[]) {
  return { collections } as never
}

// Reset the singleton before every group that touches it
function withFreshDiscovery() {
  beforeEach(() => {
    resetDiscovery()
  })
}

// ---------------------------------------------------------------------------

describe('testing', () => {
  // -------------------------------------------------------------------------
  // coerceValue
  // -------------------------------------------------------------------------
  describe('coerceValue', () => {
    it('passes native text through uncoerced', () => {
      const r = coerceValue('text', 'hello')
      expect(r).toMatchObject({ value: 'hello', success: true, coerced: false })
    })

    it('coerces a number to text', () => {
      const r = coerceValue('text', 42)
      expect(r).toMatchObject({ value: '42', success: true, coerced: true })
    })

    it('accepts a valid email string', () => {
      const r = coerceValue('email', 'user@example.com')
      expect(r.success).toBe(true)
      expect(r.coerced).toBe(false)
    })

    it('rejects a malformed email string', () => {
      const r = coerceValue('email', 'not-an-email')
      expect(r.success).toBe(false)
    })

    it('coerces a numeric string to number', () => {
      const r = coerceValue('number', '3.14')
      expect(r).toMatchObject({ value: 3.14, success: true, coerced: true })
    })

    it('coerces a float to integer via Math.floor', () => {
      const r = coerceValue('integer', '2.9')
      expect(r).toMatchObject({ value: 2, success: true, coerced: true })
    })

    it('coerces truthy strings to boolean true', () => {
      for (const v of ['true', '1', 'yes', 'on', 'TRUE']) {
        const r = coerceValue('boolean', v)
        expect(r).toMatchObject({ value: true, success: true, coerced: true })
      }
    })

    it('coerces falsy strings to boolean false', () => {
      for (const v of ['false', '0', 'no', 'off']) {
        const r = coerceValue('boolean', v)
        expect(r).toMatchObject({ value: false, success: true, coerced: true })
      }
    })

    it('passes a date string through as a Date object', () => {
      const r = coerceValue('date', '2024-01-15')
      expect(r.success).toBe(true)
      expect(r.value).toBeInstanceOf(Date)
    })

    it('accepts a relationship ID string', () => {
      const r = coerceValue('relationship', 'abc123')
      expect(r.success).toBe(true)
    })

    it('accepts a relationship object with id', () => {
      const r = coerceValue('relationship', { id: 'xyz' })
      expect(r.success).toBe(true)
    })

    it('returns success:false for an unknown field type', () => {
      const r = coerceValue('bogus' as never, 'x')
      expect(r.success).toBe(false)
      expect(r.error).toMatch(/Unknown field type/)
    })

    it('passes null through without error for any type', () => {
      const r = coerceValue('number', null)
      expect(r.success).toBe(true)
      expect(r.value).toBeNull()
    })
  })

  // -------------------------------------------------------------------------
  // validateFieldType
  // -------------------------------------------------------------------------
  describe('validateFieldType', () => {
    it('validates text correctly', () => {
      expect(validateFieldType('text', 'ok').valid).toBe(true)
      expect(validateFieldType('text', 99).valid).toBe(false)
    })

    it('validates email format', () => {
      expect(validateFieldType('email', 'a@b.com').valid).toBe(true)
      expect(validateFieldType('email', 'bad').valid).toBe(false)
    })

    it('validates number (NaN is invalid)', () => {
      expect(validateFieldType('number', 1).valid).toBe(true)
      expect(validateFieldType('number', NaN).valid).toBe(false)
      expect(validateFieldType('number', '1').valid).toBe(false)
    })

    it('validates integer (float is invalid)', () => {
      expect(validateFieldType('integer', 3).valid).toBe(true)
      expect(validateFieldType('integer', 3.5).valid).toBe(false)
    })

    it('validates boolean', () => {
      expect(validateFieldType('boolean', true).valid).toBe(true)
      expect(validateFieldType('boolean', 'true').valid).toBe(false)
    })

    it('treats null as valid for any type', () => {
      expect(validateFieldType('number', null).valid).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // createFieldValidator
  // -------------------------------------------------------------------------
  describe('createFieldValidator', () => {
    it('produces a validator whose validate/coerce/canCoerce agree', () => {
      const v = createFieldValidator('number')
      expect(v.validate(42).valid).toBe(true)
      expect(v.validate('nope').valid).toBe(false)
      expect(v.coerce('3.14')).toMatchObject({ value: 3.14, success: true })
      expect(v.canCoerce('3.14')).toBe(true)
      expect(v.canCoerce('abc')).toBe(false)
    })
  })

  // -------------------------------------------------------------------------
  // custom validators
  // -------------------------------------------------------------------------
  describe('registerCustomValidator / getCustomFieldValidator / getFieldValidator', () => {
    it('registers and retrieves a custom validator', () => {
      const fake = {
        validate: (v: unknown) => ({ valid: v === 'ok' }),
        coerce: (v: unknown) => ({ value: v, success: v === 'ok' }),
        canCoerce: (v: unknown) => v === 'ok',
      }
      registerCustomValidator('x-custom', fake)
      expect(getCustomFieldValidator('x-custom')).toBe(fake)
    })

    it('getFieldValidator returns null for unknown types', () => {
      expect(getFieldValidator('totally-unknown-type')).toBeNull()
    })

    it('getFieldValidator returns a validator for built-in types', () => {
      expect(getFieldValidator('text')).not.toBeNull()
      expect(getFieldValidator('boolean')).not.toBeNull()
    })
  })

  // -------------------------------------------------------------------------
  // SEED_VALIDATION_REGISTRY
  // -------------------------------------------------------------------------
  describe('SEED_VALIDATION_REGISTRY', () => {
    it('contains entries for core accounting collections', () => {
      expect(SEED_VALIDATION_REGISTRY['tenants']).toBeDefined()
      expect(SEED_VALIDATION_REGISTRY['gl-accounts']).toBeDefined()
      expect(SEED_VALIDATION_REGISTRY['users']).toBeDefined()
      expect(SEED_VALIDATION_REGISTRY['journal-entries']).toBeDefined()
    })

    it('tenants entry requires name, code, status', () => {
      const c = SEED_VALIDATION_REGISTRY['tenants']
      expect(c.requiredFields).toContain('name')
      expect(c.requiredFields).toContain('code')
      expect(c.requiredFields).toContain('status')
    })

    it('journal-entries cross-field check rejects unbalanced entries', () => {
      const check = SEED_VALIDATION_REGISTRY['journal-entries'].crossFieldChecks![0]
      expect(check({ debitAmount: 100, creditAmount: 100 })).toBeNull()
      expect(check({ debitAmount: 100, creditAmount: 50 })).toMatch(/balanced/)
    })

    it('currency-rates domain rule rejects non-ISO-4217 codes', () => {
      const rule = SEED_VALIDATION_REGISTRY['currency-rates'].domainRules!.find(
        (r) => r.field === 'fromCurrency',
      )!
      expect(rule.check('USD')).toBe(true)
      expect(rule.check('usd')).toBe(false)
      expect(rule.check('US')).toBe(false)
    })

    it('fx-transactions cross-field check rejects same currency', () => {
      const check = SEED_VALIDATION_REGISTRY['fx-transactions'].crossFieldChecks![0]
      expect(check({ fromCurrency: 'USD', toCurrency: 'EUR' })).toBeNull()
      expect(check({ fromCurrency: 'USD', toCurrency: 'USD' })).toMatch(/different/)
    })
  })

  // -------------------------------------------------------------------------
  // Seed category registry
  // -------------------------------------------------------------------------
  describe('registerSeedCategory / getSeedCategoryRegistry / getSeedsByCategory', () => {
    it('registers and retrieves a seed category entry', () => {
      class FakeSeed {} // not a real TestSeedFactory; registry only stores the ref
      registerSeedCategory({
        id: 'test-admin-seed',
        category: 'admin-data',
        description: 'A fake admin seed',
        ctor: FakeSeed as never,
      })
      const all = getSeedCategoryRegistry()
      const entry = all.find((e) => e.id === 'test-admin-seed')
      expect(entry).toBeDefined()
      expect(entry!.category).toBe('admin-data')
    })

    it('getSeedsByCategory filters correctly', () => {
      class FakeSeed2 {}
      registerSeedCategory({
        id: 'test-compliance-seed',
        category: 'compliance-evidence',
        description: 'A compliance seed',
        ctor: FakeSeed2 as never,
      })
      const compliance = getSeedsByCategory('compliance-evidence')
      expect(compliance.some((e) => e.id === 'test-compliance-seed')).toBe(true)
      compliance.forEach((e) => expect(e.category).toBe('compliance-evidence'))
    })
  })

  // -------------------------------------------------------------------------
  // PayloadConfigDiscovery singleton helpers
  // -------------------------------------------------------------------------
  describe('initializeDiscovery / getDiscovery / resetDiscovery', () => {
    withFreshDiscovery()

    it('getDiscovery returns the singleton without initialization', () => {
      const d = getDiscovery()
      expect(d).toBeDefined()
      expect(d.isInitialized()).toBe(false)
    })

    it('initializeDiscovery binds a mock payload and exposes slugs', () => {
      const payload = makePayload([
        { slug: 'posts', fields: [{ name: 'title', type: 'text', required: true }] },
        { slug: 'tags', fields: [{ name: 'name', type: 'text' }] },
      ])
      const d = initializeDiscovery(payload)
      expect(d.isInitialized()).toBe(true)
      expect(d.getCollectionSlugs()).toContain('posts')
      expect(d.getCollectionSlugs()).toContain('tags')
    })

    it('collectionExists returns false for unknown slugs', () => {
      const payload = makePayload([{ slug: 'items', fields: [] }])
      initializeDiscovery(payload)
      expect(getDiscovery().collectionExists('items')).toBe(true)
      expect(getDiscovery().collectionExists('nope')).toBe(false)
    })

    it('getCollectionInfo returns required fields from config', () => {
      const payload = makePayload([
        {
          slug: 'orders',
          fields: [
            { name: 'ref', type: 'text', required: true },
            { name: 'note', type: 'text' },
          ],
        },
      ])
      initializeDiscovery(payload)
      const meta = getDiscovery().getCollectionInfo('orders')
      expect(meta.requiredFields).toEqual(['ref'])
      expect(meta.fields).toHaveLength(2)
    })

    it('resetDiscovery makes a fresh singleton (not initialized)', () => {
      const payload = makePayload([{ slug: 'x', fields: [] }])
      initializeDiscovery(payload)
      expect(getDiscovery().isInitialized()).toBe(true)
      resetDiscovery()
      expect(getDiscovery().isInitialized()).toBe(false)
    })
  })

  // -------------------------------------------------------------------------
  // SeedSnapshot
  // -------------------------------------------------------------------------
  describe('SeedSnapshot', () => {
    it('snapshot + compare: matching data returns matches=true', () => {
      const ss = new SeedSnapshot()
      ss.snapshot('order-1', { id: 1, total: 100 })
      expect(ss.compare('order-1', { id: 1, total: 100 }).matches).toBe(true)
    })

    it('compare returns diff when data changed', () => {
      const ss = new SeedSnapshot()
      ss.snapshot('order-2', { id: 2, total: 50 })
      const result = ss.compare('order-2', { id: 2, total: 99 })
      expect(result.matches).toBe(false)
      expect(result.diff).toBeDefined()
    })

    it('compare returns matches=false for unknown snapshot names', () => {
      const ss = new SeedSnapshot()
      expect(ss.compare('ghost', {}).matches).toBe(false)
    })

    it('listSnapshots reflects all saved names', () => {
      const ss = new SeedSnapshot()
      ss.snapshot('a', 1)
      ss.snapshot('b', 2)
      expect(ss.listSnapshots()).toEqual(expect.arrayContaining(['a', 'b']))
    })

    it('clear removes all snapshots', () => {
      const ss = new SeedSnapshot()
      ss.snapshot('x', 1)
      ss.clear()
      expect(ss.listSnapshots()).toHaveLength(0)
    })

    it('export / import round-trips data', () => {
      const ss = new SeedSnapshot()
      ss.snapshot('key', { v: 42 })
      const exported = ss.export()
      const ss2 = new SeedSnapshot()
      ss2.import(exported)
      expect(ss2.compare('key', { v: 42 }).matches).toBe(true)
    })

    it('deep-clones on snapshot so mutations do not affect the stored copy', () => {
      const ss = new SeedSnapshot()
      const obj = { a: 1 }
      ss.snapshot('mut', obj)
      obj.a = 99 // mutate original
      expect(ss.compare('mut', { a: 1 }).matches).toBe(true)
    })
  })
})
