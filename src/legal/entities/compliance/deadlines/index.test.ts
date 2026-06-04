import { describe, it, expect } from 'vitest'
import { ComplianceDeadlines } from '@/legal/entities/compliance/deadlines'

// Unified-node invariant test for the `compliance-deadlines` collection.
describe('compliance-deadlines collection node', () => {
  it('exports a valid collection config', () => {
    expect(ComplianceDeadlines.slug).toBe('compliance-deadlines')
    expect(Array.isArray(ComplianceDeadlines.fields)).toBe(true)
    expect(ComplianceDeadlines.fields.length).toBeGreaterThan(0)
  })
})
