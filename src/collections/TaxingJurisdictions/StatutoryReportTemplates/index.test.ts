import { describe, it, expect } from 'vitest'
import { StatutoryReportTemplates } from './index'

// Unified-node invariant test for the `statutory-report-templates` collection.
describe('statutory-report-templates collection node', () => {
  it('exports a valid collection config', () => {
    expect(StatutoryReportTemplates.slug).toBe('statutory-report-templates')
    expect(Array.isArray(StatutoryReportTemplates.fields)).toBe(true)
    expect(StatutoryReportTemplates.fields.length).toBeGreaterThan(0)
  })
})
