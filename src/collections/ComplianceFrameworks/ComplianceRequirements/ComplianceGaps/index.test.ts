import { describe, it, expect } from 'vitest'
import { ComplianceGaps } from './index'

// Unified-node invariant test for the `compliance-gaps` collection.
describe('compliance-gaps collection node', () => {
  it('exports a valid collection config', () => {
    expect(ComplianceGaps.slug).toBe('compliance-gaps')
    expect(Array.isArray(ComplianceGaps.fields)).toBe(true)
    expect(ComplianceGaps.fields.length).toBeGreaterThan(0)
  })
})
