import { describe, it, expect } from 'vitest'
import TaxReturns from '@/tax/jurisdictions/tax/returns'

// Unified-node invariant test for the `tax-returns` collection.
describe('tax-returns collection node', () => {
  it('exports a valid collection config', () => {
    expect(TaxReturns.slug).toBe('tax-returns')
    expect(Array.isArray(TaxReturns.fields)).toBe(true)
    expect(TaxReturns.fields.length).toBeGreaterThan(0)
  })
})
