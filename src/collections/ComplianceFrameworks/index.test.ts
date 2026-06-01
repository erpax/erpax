import { describe, it, expect } from 'vitest'
import { ComplianceFrameworks } from './index'

// Unified-node invariant test for the `compliance-frameworks` collection.
describe('compliance-frameworks collection node', () => {
  it('exports a valid collection config', () => {
    expect(ComplianceFrameworks.slug).toBe('compliance-frameworks')
    expect(Array.isArray(ComplianceFrameworks.fields)).toBe(true)
    expect(ComplianceFrameworks.fields.length).toBeGreaterThan(0)
  })
})
