import { describe, it, expect } from 'vitest'
import { PaymentMethods } from './index'

// Unified-node invariant test for the `payment-methods` collection.
describe('payment-methods collection node', () => {
  it('exports a valid collection config', () => {
    expect(PaymentMethods.slug).toBe('payment-methods')
    expect(Array.isArray(PaymentMethods.fields)).toBe(true)
    expect(PaymentMethods.fields.length).toBeGreaterThan(0)
  })
})
