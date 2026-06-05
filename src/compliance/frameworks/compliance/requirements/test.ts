import { describe, it, expect } from 'vitest'
import { ComplianceRequirements } from '@/compliance/frameworks/compliance/requirements'

// Unified-node invariant test for the `compliance-requirements` collection.
describe('compliance-requirements collection node', () => {
  it('exports a valid collection config', () => {
    expect(ComplianceRequirements.slug).toBe('compliance-requirements')
    expect(Array.isArray(ComplianceRequirements.fields)).toBe(true)
    expect(ComplianceRequirements.fields.length).toBeGreaterThan(0)
  })
})
