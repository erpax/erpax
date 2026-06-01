import { describe, it, expect } from 'vitest'
import PeriodEndAdjustments from './index'

// Unified-node invariant test for the `period-end-adjustments` collection.
describe('period-end-adjustments collection node', () => {
  it('exports a valid collection config', () => {
    expect(PeriodEndAdjustments.slug).toBe('period-end-adjustments')
    expect(Array.isArray(PeriodEndAdjustments.fields)).toBe(true)
    expect(PeriodEndAdjustments.fields.length).toBeGreaterThan(0)
  })
})
