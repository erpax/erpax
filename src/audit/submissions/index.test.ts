import { describe, it, expect } from 'vitest'
import AuditSubmissions from '@/audit/submissions'

// Unified-node invariant test for the `audit-submissions` collection.
describe('audit-submissions collection node', () => {
  it('exports a valid collection config', () => {
    expect(AuditSubmissions.slug).toBe('audit-submissions')
    expect(Array.isArray(AuditSubmissions.fields)).toBe(true)
    expect(AuditSubmissions.fields.length).toBeGreaterThan(0)
  })
})
