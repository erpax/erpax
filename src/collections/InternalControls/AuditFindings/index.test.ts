import { describe, it, expect } from 'vitest'
import { AuditFindings } from './index'

// Unified-node invariant test for the `audit-findings` collection.
describe('audit-findings collection node', () => {
  it('exports a valid collection config', () => {
    expect(AuditFindings.slug).toBe('audit-findings')
    expect(Array.isArray(AuditFindings.fields)).toBe(true)
    expect(AuditFindings.fields.length).toBeGreaterThan(0)
  })
})
