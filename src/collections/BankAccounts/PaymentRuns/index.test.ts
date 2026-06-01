import { describe, it, expect } from 'vitest'
import PaymentRuns from './index'

// Unified-node invariant test for the `payment-runs` collection.
describe('payment-runs collection node', () => {
  it('exports a valid collection config', () => {
    expect(PaymentRuns.slug).toBe('payment-runs')
    expect(Array.isArray(PaymentRuns.fields)).toBe(true)
    expect(PaymentRuns.fields.length).toBeGreaterThan(0)
  })
})
