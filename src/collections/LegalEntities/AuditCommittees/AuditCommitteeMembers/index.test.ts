import { describe, it, expect } from 'vitest'
import { AuditCommitteeMembers } from './index'

// Unified-node invariant test for the `audit-committee-members` collection.
describe('audit-committee-members collection node', () => {
  it('exports a valid collection config', () => {
    expect(AuditCommitteeMembers.slug).toBe('audit-committee-members')
    expect(Array.isArray(AuditCommitteeMembers.fields)).toBe(true)
    expect(AuditCommitteeMembers.fields.length).toBeGreaterThan(0)
  })
})
