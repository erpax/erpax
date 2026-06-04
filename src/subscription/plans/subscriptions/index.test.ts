import { describe, it, expect } from 'vitest'
import { Subscriptions } from '@/subscription/plans/subscriptions'

// Unified-node invariant test for the `subscriptions` collection.
describe('subscriptions collection node', () => {
  it('exports a valid collection config', () => {
    expect(Subscriptions.slug).toBe('subscriptions')
    expect(Array.isArray(Subscriptions.fields)).toBe(true)
    expect(Subscriptions.fields.length).toBeGreaterThan(0)
  })
})
