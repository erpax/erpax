import { describe, it, expect } from 'vitest'
import GoodsReceipts from './index'

// Unified-node invariant test for the `goods-receipts` collection.
describe('goods-receipts collection node', () => {
  it('exports a valid collection config', () => {
    expect(GoodsReceipts.slug).toBe('goods-receipts')
    expect(Array.isArray(GoodsReceipts.fields)).toBe(true)
    expect(GoodsReceipts.fields.length).toBeGreaterThan(0)
  })
})
