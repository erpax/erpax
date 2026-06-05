import { describe, it, expect } from 'vitest'
import DepreciationSchedules from '@/fixed/assets/depreciation/schedules'

// Unified-node invariant test for the `depreciation-schedules` collection.
describe('depreciation-schedules collection node', () => {
  it('exports a valid collection config', () => {
    expect(DepreciationSchedules.slug).toBe('depreciation-schedules')
    expect(Array.isArray(DepreciationSchedules.fields)).toBe(true)
    expect(DepreciationSchedules.fields.length).toBeGreaterThan(0)
  })
})
