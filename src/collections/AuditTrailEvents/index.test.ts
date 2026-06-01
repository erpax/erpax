import { describe, it, expect } from 'vitest'
import { AuditTrailEvents } from './index'

// Unified-node invariant test for the `audit-trail-events` collection.
describe('audit-trail-events collection node', () => {
  it('exports a valid collection config', () => {
    expect(AuditTrailEvents.slug).toBe('audit-trail-events')
    expect(Array.isArray(AuditTrailEvents.fields)).toBe(true)
    expect(AuditTrailEvents.fields.length).toBeGreaterThan(0)
  })
})
