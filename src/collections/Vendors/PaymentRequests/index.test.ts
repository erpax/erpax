import { describe, it, expect } from 'vitest'
import PaymentRequests from './index'

// Unified-node invariant test for the `payment-requests` collection.
describe('payment-requests collection node', () => {
  it('exports a valid collection config', () => {
    expect(PaymentRequests.slug).toBe('payment-requests')
    expect(Array.isArray(PaymentRequests.fields)).toBe(true)
    expect(PaymentRequests.fields.length).toBeGreaterThan(0)
  })
})
