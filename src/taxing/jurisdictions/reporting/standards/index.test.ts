import { describe, it, expect } from 'vitest'
import { ReportingStandards } from '@/taxing/jurisdictions/reporting/standards'

// Unified-node invariant test for the `reporting-standards` collection.
describe('reporting-standards collection node', () => {
  it('exports a valid collection config', () => {
    expect(ReportingStandards.slug).toBe('reporting-standards')
    expect(Array.isArray(ReportingStandards.fields)).toBe(true)
    expect(ReportingStandards.fields.length).toBeGreaterThan(0)
  })
})
