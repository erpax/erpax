import { describe, it, expect } from 'vitest'
import ProductionReceipts from '@/items/bills/of/materials/work/orders/production/receipts'

// Unified-node invariant test for the `production-receipts` collection.
describe('production-receipts collection node', () => {
  it('exports a valid collection config', () => {
    expect(ProductionReceipts.slug).toBe('production-receipts')
    expect(Array.isArray(ProductionReceipts.fields)).toBe(true)
    expect(ProductionReceipts.fields.length).toBeGreaterThan(0)
  })
})
