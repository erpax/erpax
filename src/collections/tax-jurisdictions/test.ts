import { describe, it, expect } from 'vitest'
import { TaxJurisdictions } from '@/collections/tax-jurisdictions'

// Unified-node invariant test for the `tax-jurisdictions` collection.
describe('tax-jurisdictions collection node', () => {
  it('exports a valid collection config', () => {
    expect(TaxJurisdictions.slug).toBe('tax-jurisdictions')
    expect(Array.isArray(TaxJurisdictions.fields)).toBe(true)
    expect(TaxJurisdictions.fields.length).toBeGreaterThan(0)
  })
  it('carries the reference attributes merged in from taxing-jurisdictions, writable by super-admins only', () => {
    const top = new Map(TaxJurisdictions.fields.flatMap((f) => ('name' in f ? [[f.name, f] as const] : [])))
    for (const name of ['parentJurisdiction', 'languages', 'regulatoryCharacteristics', 'bankingRequirements', 'filingDeadlines', 'complianceFrameworks', 'isActive']) {
      const access = (top.get(name) as { access?: { create?: unknown; update?: unknown } } | undefined)?.access
      expect(typeof access?.create, name).toBe('function')
      expect(access?.update, name).toBe(access?.create)
    }
    expect((top.get('parentJurisdiction') as { relationTo?: string }).relationTo).toBe('tax-jurisdictions')
  })
  it('drops the duplicated type / iso2Code / primaryCurrency (level, country and filing.currency already say it)', () => {
    const names = TaxJurisdictions.fields.flatMap((f) => ('name' in f ? [f.name] : []))
    for (const gone of ['type', 'iso2Code', 'primaryCurrency']) expect(names).not.toContain(gone)
  })
  it('leaves the tenant registration and filing groups without the reference lock', () => {
    for (const name of ['registration', 'filing']) {
      const group = TaxJurisdictions.fields.find((f) => 'name' in f && f.name === name) as { access?: unknown }
      expect(group.access).toBeUndefined()
    }
  })
})
