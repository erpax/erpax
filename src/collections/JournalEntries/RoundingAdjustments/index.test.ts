import { describe, it, expect } from 'vitest'
import RoundingAdjustments from './index'

// Unified-node invariant test for the `rounding-adjustments` collection.
describe('rounding-adjustments collection node', () => {
  it('exports a valid collection config', () => {
    expect(RoundingAdjustments.slug).toBe('rounding-adjustments')
    expect(Array.isArray(RoundingAdjustments.fields)).toBe(true)
    expect(RoundingAdjustments.fields.length).toBeGreaterThan(0)
  })
})
