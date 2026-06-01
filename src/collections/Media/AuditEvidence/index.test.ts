import { describe, it, expect } from 'vitest'
import { AuditEvidence } from './index'

// Unified-node invariant test for the `audit-evidence` collection.
describe('audit-evidence collection node', () => {
  it('exports a valid collection config', () => {
    expect(AuditEvidence.slug).toBe('audit-evidence')
    expect(Array.isArray(AuditEvidence.fields)).toBe(true)
    expect(AuditEvidence.fields.length).toBeGreaterThan(0)
  })
})
