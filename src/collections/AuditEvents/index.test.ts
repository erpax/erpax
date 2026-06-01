import { describe, it, expect } from 'vitest'
import AuditEvents from './index'

// Unified-node invariant test for the `audit-events` collection.
describe('audit-events collection node', () => {
  it('exports a valid collection config', () => {
    expect(AuditEvents.slug).toBe('audit-events')
    expect(Array.isArray(AuditEvents.fields)).toBe(true)
    expect(AuditEvents.fields.length).toBeGreaterThan(0)
  })
})
