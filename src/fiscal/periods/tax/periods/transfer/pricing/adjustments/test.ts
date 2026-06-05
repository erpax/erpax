import { describe, it, expect } from 'vitest'
import { TransferPricingAdjustments } from '@/fiscal/periods/tax/periods/transfer/pricing/adjustments'

// Unified-node invariant test for the `transfer-pricing-adjustments` collection.
describe('transfer-pricing-adjustments collection node', () => {
  it('exports a valid collection config', () => {
    expect(TransferPricingAdjustments.slug).toBe('transfer-pricing-adjustments')
    expect(Array.isArray(TransferPricingAdjustments.fields)).toBe(true)
    expect(TransferPricingAdjustments.fields.length).toBeGreaterThan(0)
  })
})
