import { describe, it, expect } from 'vitest'
import FairValueMeasurements from '@/fair/value/measurements'

// Unified-node invariant test for the `fair-value-measurements` collection.
describe('fair-value-measurements collection node', () => {
  it('exports a valid collection config', () => {
    expect(FairValueMeasurements.slug).toBe('fair-value-measurements')
    expect(Array.isArray(FairValueMeasurements.fields)).toBe(true)
    expect(FairValueMeasurements.fields.length).toBeGreaterThan(0)
  })
})
