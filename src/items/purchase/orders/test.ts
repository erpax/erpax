import { describe, it, expect } from 'vitest'
import PurchaseOrders from '@/items/purchase/orders'

// Unified-node invariant test for the `purchase-orders` collection.
describe('purchase-orders collection node', () => {
  it('exports a valid collection config', () => {
    expect(PurchaseOrders.slug).toBe('purchase-orders')
    expect(Array.isArray(PurchaseOrders.fields)).toBe(true)
    expect(PurchaseOrders.fields.length).toBeGreaterThan(0)
  })
})
