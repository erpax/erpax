import { describe, it, expect } from 'vitest'
import { ReportingMappings } from '@/taxing/jurisdictions/reporting/standards/reporting/mappings'

// Unified-node invariant test for the `reporting-mappings` collection.
describe('reporting-mappings collection node', () => {
  it('exports a valid collection config', () => {
    expect(ReportingMappings.slug).toBe('reporting-mappings')
    expect(Array.isArray(ReportingMappings.fields)).toBe(true)
    expect(ReportingMappings.fields.length).toBeGreaterThan(0)
  })
})
