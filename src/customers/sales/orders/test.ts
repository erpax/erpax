import { describe, it, expect } from 'vitest'
import createAccountingCollection from '@/customers/sales/orders'

// Unified-node invariant test for the `sales-orders` collection.
describe('sales-orders collection node', () => {
  it('exports a valid collection config', () => {
    expect(createAccountingCollection.slug).toBe('sales-orders')
    expect(Array.isArray(createAccountingCollection.fields)).toBe(true)
    expect(createAccountingCollection.fields.length).toBeGreaterThan(0)
  })
})
