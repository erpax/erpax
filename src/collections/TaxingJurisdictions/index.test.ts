import { describe, it, expect } from 'vitest'
import { TaxingJurisdictions } from './index'

// Unified-node invariant test for the `taxing-jurisdictions` collection.
describe('taxing-jurisdictions collection node', () => {
  it('exports a valid collection config', () => {
    expect(TaxingJurisdictions.slug).toBe('taxing-jurisdictions')
    expect(Array.isArray(TaxingJurisdictions.fields)).toBe(true)
    expect(TaxingJurisdictions.fields.length).toBeGreaterThan(0)
  })
})
