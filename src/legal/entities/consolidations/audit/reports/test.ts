import { describe, it, expect } from 'vitest'
import { AuditReports } from '@/legal/entities/consolidations/audit/reports'

// Unified-node invariant test for the `audit-reports` collection.
describe('audit-reports collection node', () => {
  it('exports a valid collection config', () => {
    expect(AuditReports.slug).toBe('audit-reports')
    expect(Array.isArray(AuditReports.fields)).toBe(true)
    expect(AuditReports.fields.length).toBeGreaterThan(0)
  })
})
