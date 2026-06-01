import { describe, it, expect } from 'vitest'
import RecurringJournals from './index'

// Unified-node invariant test for the `recurring-journals` collection.
describe('recurring-journals collection node', () => {
  it('exports a valid collection config', () => {
    expect(RecurringJournals.slug).toBe('recurring-journals')
    expect(Array.isArray(RecurringJournals.fields)).toBe(true)
    expect(RecurringJournals.fields.length).toBeGreaterThan(0)
  })
})
