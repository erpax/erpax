import { describe, it, expect } from 'vitest'
import { TaxJurisdictions } from './index'

// Unified-node invariant test for the `tax-jurisdictions` collection.
describe('tax-jurisdictions collection node', () => {
  it('exports a valid collection config', () => {
    expect(TaxJurisdictions.slug).toBe('tax-jurisdictions')
    expect(Array.isArray(TaxJurisdictions.fields)).toBe(true)
    expect(TaxJurisdictions.fields.length).toBeGreaterThan(0)
  })
})
