import { describe, it, expect } from 'vitest'
import { TaxPeriods } from './index'

// Unified-node invariant test for the `tax-periods` collection.
describe('tax-periods collection node', () => {
  it('exports a valid collection config', () => {
    expect(TaxPeriods.slug).toBe('tax-periods')
    expect(Array.isArray(TaxPeriods.fields)).toBe(true)
    expect(TaxPeriods.fields.length).toBeGreaterThan(0)
  })
})
