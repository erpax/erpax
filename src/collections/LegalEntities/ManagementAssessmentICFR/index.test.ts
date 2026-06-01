import { describe, it, expect } from 'vitest'
import { ManagementAssessmentICFR } from './index'

// Unified-node invariant test for the `management-assessment-icfr` collection.
describe('management-assessment-icfr collection node', () => {
  it('exports a valid collection config', () => {
    expect(ManagementAssessmentICFR.slug).toBe('management-assessment-icfr')
    expect(Array.isArray(ManagementAssessmentICFR.fields)).toBe(true)
    expect(ManagementAssessmentICFR.fields.length).toBeGreaterThan(0)
  })
})
