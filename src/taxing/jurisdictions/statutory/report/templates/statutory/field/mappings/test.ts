import { describe, it, expect } from 'vitest'
import { StatutoryFieldMappings } from '@/taxing/jurisdictions/statutory/report/templates/statutory/field/mappings'

// Unified-node invariant test for the `statutory-field-mappings` collection.
describe('statutory-field-mappings collection node', () => {
  it('exports a valid collection config', () => {
    expect(StatutoryFieldMappings.slug).toBe('statutory-field-mappings')
    expect(Array.isArray(StatutoryFieldMappings.fields)).toBe(true)
    expect(StatutoryFieldMappings.fields.length).toBeGreaterThan(0)
  })
})
