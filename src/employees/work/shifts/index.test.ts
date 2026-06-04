import { describe, it, expect } from 'vitest'
import WorkShifts from '@/employees/work/shifts'

// Unified-node invariant test for the `work-shifts` collection.
describe('work-shifts collection node', () => {
  it('exports a valid collection config', () => {
    expect(WorkShifts.slug).toBe('work-shifts')
    expect(Array.isArray(WorkShifts.fields)).toBe(true)
    expect(WorkShifts.fields.length).toBeGreaterThan(0)
  })
})
