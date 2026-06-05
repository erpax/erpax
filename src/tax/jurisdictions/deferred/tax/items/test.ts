import { describe, it, expect } from 'vitest'
import DeferredTaxItems from '@/tax/jurisdictions/deferred/tax/items'

// Unified-node invariant test for the `deferred-tax-items` collection.
describe('deferred-tax-items collection node', () => {
  it('exports a valid collection config', () => {
    expect(DeferredTaxItems.slug).toBe('deferred-tax-items')
    expect(Array.isArray(DeferredTaxItems.fields)).toBe(true)
    expect(DeferredTaxItems.fields.length).toBeGreaterThan(0)
  })
})
