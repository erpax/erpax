import { describe, it, expect } from 'vitest'
import ApiAuditEvents from './index'

// Unified-node invariant test for the `api-audit-events` collection.
describe('api-audit-events collection node', () => {
  it('exports a valid collection config', () => {
    expect(ApiAuditEvents.slug).toBe('api-audit-events')
    expect(Array.isArray(ApiAuditEvents.fields)).toBe(true)
    expect(ApiAuditEvents.fields.length).toBeGreaterThan(0)
  })
})
