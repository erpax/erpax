import { describe, it, expect } from 'vitest'
import PriorPeriodAdjustments from '@/fiscal/periods/prior/period/adjustments'

// Unified-node invariant test for the `prior-period-adjustments` collection.
describe('prior-period-adjustments collection node', () => {
  it('exports a valid collection config', () => {
    expect(PriorPeriodAdjustments.slug).toBe('prior-period-adjustments')
    expect(Array.isArray(PriorPeriodAdjustments.fields)).toBe(true)
    expect(PriorPeriodAdjustments.fields.length).toBeGreaterThan(0)
  })
})
