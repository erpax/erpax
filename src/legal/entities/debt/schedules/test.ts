import { describe, it, expect } from 'vitest'
import { DebtSchedule } from '@/legal/entities/debt/schedules'

// Unified-node invariant test for the `debt-schedule` collection.
describe('debt-schedule collection node', () => {
  it('exports a valid collection config', () => {
    expect(DebtSchedule.slug).toBe('debt-schedule')
    expect(Array.isArray(DebtSchedule.fields)).toBe(true)
    expect(DebtSchedule.fields.length).toBeGreaterThan(0)
  })
})
