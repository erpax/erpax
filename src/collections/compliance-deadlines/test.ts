import { describe, it, expect } from 'vitest'
import { ComplianceDeadlines } from '@/collections/compliance-deadlines'

// Unified-node invariant test for the `compliance-deadlines` collection.
describe('compliance-deadlines collection node', () => {
  it('exports a valid collection config', () => {
    expect(ComplianceDeadlines.slug).toBe('compliance-deadlines')
    expect(Array.isArray(ComplianceDeadlines.fields)).toBe(true)
    expect(ComplianceDeadlines.fields.length).toBeGreaterThan(0)
  })
  it('carries its compliance-notifications as the `notifications` array (the folded child collection)', () => {
    const field = ComplianceDeadlines.fields.find((x) => 'name' in x && x.name === 'notifications')
    expect(field?.type).toBe('array')
    const names = field?.type === 'array' ? field.fields.map((x) => ('name' in x ? x.name : '')) : []
    expect(names).not.toContain('deadline') // the parent IS the containing document
    expect(names.length).toBe(7)
  })
})
