import { describe, it, expect } from 'vitest'
import { TaxCodes } from '@/tax/jurisdictions/tax/codes'

// Unified-node invariant test for the `tax-codes` collection.
describe('tax-codes collection node', () => {
  it('exports a valid collection config', () => {
    expect(TaxCodes.slug).toBe('tax-codes')
    expect(Array.isArray(TaxCodes.fields)).toBe(true)
    expect(TaxCodes.fields.length).toBeGreaterThan(0)
  })
})
