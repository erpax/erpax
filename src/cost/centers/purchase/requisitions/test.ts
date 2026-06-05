import { describe, it, expect } from 'vitest'
import PurchaseRequisitions from '@/cost/centers/purchase/requisitions'

// Unified-node invariant test for the `purchase-requisitions` collection.
describe('purchase-requisitions collection node', () => {
  it('exports a valid collection config', () => {
    expect(PurchaseRequisitions.slug).toBe('purchase-requisitions')
    expect(Array.isArray(PurchaseRequisitions.fields)).toBe(true)
    expect(PurchaseRequisitions.fields.length).toBeGreaterThan(0)
  })
})
