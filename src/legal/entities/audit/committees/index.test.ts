import { describe, it, expect } from 'vitest'
import { AuditCommittees } from '@/legal/entities/audit/committees'

// Unified-node invariant test for the `audit-committees` collection.
describe('audit-committees collection node', () => {
  it('exports a valid collection config', () => {
    expect(AuditCommittees.slug).toBe('audit-committees')
    expect(Array.isArray(AuditCommittees.fields)).toBe(true)
    expect(AuditCommittees.fields.length).toBeGreaterThan(0)
  })
})
