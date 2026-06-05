import { describe, it, expect } from 'vitest'
import { ComplianceNotifications } from '@/legal/entities/compliance/deadlines/compliance/notifications'

// Unified-node invariant test for the `compliance-notifications` collection.
describe('compliance-notifications collection node', () => {
  it('exports a valid collection config', () => {
    expect(ComplianceNotifications.slug).toBe('compliance-notifications')
    expect(Array.isArray(ComplianceNotifications.fields)).toBe(true)
    expect(ComplianceNotifications.fields.length).toBeGreaterThan(0)
  })
})
