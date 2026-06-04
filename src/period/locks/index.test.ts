import { describe, it, expect } from 'vitest'
import { PeriodLocks } from '@/period/locks'

// Unified-node invariant test for the `period-locks` collection.
describe('period-locks collection node', () => {
  it('exports a valid collection config', () => {
    expect(PeriodLocks.slug).toBe('period-locks')
    expect(Array.isArray(PeriodLocks.fields)).toBe(true)
    expect(PeriodLocks.fields.length).toBeGreaterThan(0)
  })
})
