import { describe, it, expect } from 'vitest'
import { SubscriptionPlans } from './index'

// Unified-node invariant test for the `subscription-plans` collection.
describe('subscription-plans collection node', () => {
  it('exports a valid collection config', () => {
    expect(SubscriptionPlans.slug).toBe('subscription-plans')
    expect(Array.isArray(SubscriptionPlans.fields)).toBe(true)
    expect(SubscriptionPlans.fields.length).toBeGreaterThan(0)
  })
})
