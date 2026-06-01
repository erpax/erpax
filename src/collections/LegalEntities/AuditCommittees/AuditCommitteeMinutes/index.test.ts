import { describe, it, expect } from 'vitest'
import { AuditCommitteeMinutes } from './index'

// Unified-node invariant test for the `audit-committee-minutes` collection.
describe('audit-committee-minutes collection node', () => {
  it('exports a valid collection config', () => {
    expect(AuditCommitteeMinutes.slug).toBe('audit-committee-minutes')
    expect(Array.isArray(AuditCommitteeMinutes.fields)).toBe(true)
    expect(AuditCommitteeMinutes.fields.length).toBeGreaterThan(0)
  })
})
