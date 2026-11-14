import { describe, it, expect } from 'vitest'
import { AuditCommittees } from '@/collections/audit-committees'

// Unified-node invariant test for the `audit-committees` collection.
describe('audit-committees collection node', () => {
  it('exports a valid collection config', () => {
    expect(AuditCommittees.slug).toBe('audit-committees')
    expect(Array.isArray(AuditCommittees.fields)).toBe(true)
    expect(AuditCommittees.fields.length).toBeGreaterThan(0)
  })
  it('carries its roster as the `members` array (the folded audit-committee-members collection)', () => {
    const field = AuditCommittees.fields.find((x) => 'name' in x && x.name === 'members')
    expect(field?.type).toBe('array')
    const names = field?.type === 'array' ? field.fields.map((x) => ('name' in x ? x.name : '')) : []
    expect(names).not.toContain('committee') // the committee IS the containing document
    expect(names).toEqual(['memberName', 'title', 'affiliation', 'appointedDate', 'termEndDate', 'role', 'expertise', 'status'])
  })
})
