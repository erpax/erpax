import { describe, it, expect } from 'vitest'
import TransferPricingFiles from './index'

// Unified-node invariant test for the `transfer-pricing-files` collection.
describe('transfer-pricing-files collection node', () => {
  it('exports a valid collection config', () => {
    expect(TransferPricingFiles.slug).toBe('transfer-pricing-files')
    expect(Array.isArray(TransferPricingFiles.fields)).toBe(true)
    expect(TransferPricingFiles.fields.length).toBeGreaterThan(0)
  })
})
