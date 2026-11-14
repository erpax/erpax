import { describe, it, expect } from 'vitest'
import { ReportingStandards } from '@/collections/reporting-standards'

// Unified-node invariant test for the `reporting-standards` collection.
describe('reporting-standards collection node', () => {
  it('exports a valid collection config', () => {
    expect(ReportingStandards.slug).toBe('reporting-standards')
    expect(Array.isArray(ReportingStandards.fields)).toBe(true)
    expect(ReportingStandards.fields.length).toBeGreaterThan(0)
  })
  it('carries its reporting-mappings as the `mappings` array (the folded child collection)', () => {
    const field = ReportingStandards.fields.find((x) => 'name' in x && x.name === 'mappings')
    expect(field?.type).toBe('array')
    const names = field?.type === 'array' ? field.fields.map((x) => ('name' in x ? x.name : '')) : []
    expect(names).not.toContain('fromStandard') // the parent IS the containing document
    expect(names.length).toBe(5)
  })
})
