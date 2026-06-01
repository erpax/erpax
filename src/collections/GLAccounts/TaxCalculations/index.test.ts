import { describe, it, expect } from 'vitest'
import TaxCalculations from './index'

// Unified-node invariant test for the `tax-calculations` collection.
describe('tax-calculations collection node', () => {
  it('exports a valid collection config', () => {
    expect(TaxCalculations.slug).toBe('tax-calculations')
    expect(Array.isArray(TaxCalculations.fields)).toBe(true)
    expect(TaxCalculations.fields.length).toBeGreaterThan(0)
  })
})
