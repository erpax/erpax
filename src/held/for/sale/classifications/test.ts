import { describe, it, expect } from 'vitest'
import HeldForSaleClassifications from '@/held/for/sale/classifications'

// Unified-node invariant test for the `held-for-sale-classifications` collection.
describe('held-for-sale-classifications collection node', () => {
  it('exports a valid collection config', () => {
    expect(HeldForSaleClassifications.slug).toBe('held-for-sale-classifications')
    expect(Array.isArray(HeldForSaleClassifications.fields)).toBe(true)
    expect(HeldForSaleClassifications.fields.length).toBeGreaterThan(0)
  })
})
