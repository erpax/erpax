import { describe, it, expect } from 'vitest'
import UsageRecords from '@/subscription/plans/subscriptions/usage/records'

// Unified-node invariant test for the `usage-records` collection.
describe('usage-records collection node', () => {
  it('exports a valid collection config', () => {
    expect(UsageRecords.slug).toBe('usage-records')
    expect(Array.isArray(UsageRecords.fields)).toBe(true)
    expect(UsageRecords.fields.length).toBeGreaterThan(0)
  })
})
