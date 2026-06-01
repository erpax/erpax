import { describe, it, expect } from 'vitest'
import DataProcessingActivities from './index'

// Unified-node invariant test for the `data-processing-activities` collection.
describe('data-processing-activities collection node', () => {
  it('exports a valid collection config', () => {
    expect(DataProcessingActivities.slug).toBe('data-processing-activities')
    expect(Array.isArray(DataProcessingActivities.fields)).toBe(true)
    expect(DataProcessingActivities.fields.length).toBeGreaterThan(0)
  })
})
