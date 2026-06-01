import { describe, it, expect } from 'vitest'
import PaymentAllocations from './index'

// Unified-node invariant test for the `payment-allocations` collection.
describe('payment-allocations collection node', () => {
  it('exports a valid collection config', () => {
    expect(PaymentAllocations.slug).toBe('payment-allocations')
    expect(Array.isArray(PaymentAllocations.fields)).toBe(true)
    expect(PaymentAllocations.fields.length).toBeGreaterThan(0)
  })
})
