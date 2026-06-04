import { describe, it, expect } from 'vitest'
import TimeEntries from '@/employees/time/entries'

// Unified-node invariant test for the `time-entries` collection.
describe('time-entries collection node', () => {
  it('exports a valid collection config', () => {
    expect(TimeEntries.slug).toBe('time-entries')
    expect(Array.isArray(TimeEntries.fields)).toBe(true)
    expect(TimeEntries.fields.length).toBeGreaterThan(0)
  })
})
