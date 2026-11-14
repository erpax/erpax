import { describe, it, expect } from 'vitest'
import { StatutoryReportTemplates } from '@/collections/statutory-report-templates'

// Unified-node invariant test for the `statutory-report-templates` collection.
describe('statutory-report-templates collection node', () => {
  it('exports a valid collection config', () => {
    expect(StatutoryReportTemplates.slug).toBe('statutory-report-templates')
    expect(Array.isArray(StatutoryReportTemplates.fields)).toBe(true)
    expect(StatutoryReportTemplates.fields.length).toBeGreaterThan(0)
  })
  it('carries its statutory-field-mappings as the `fieldMappings` array (the folded child collection)', () => {
    const field = StatutoryReportTemplates.fields.find((x) => 'name' in x && x.name === 'fieldMappings')
    expect(field?.type).toBe('array')
    const names = field?.type === 'array' ? field.fields.map((x) => ('name' in x ? x.name : '')) : []
    expect(names).not.toContain('reportTemplate') // the parent IS the containing document
    expect(names.length).toBe(8)
  })
})
