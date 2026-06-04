import { describe, it, expect } from 'vitest'
import MaintenanceRequests from '@/maintenance/requests'

// Unified-node invariant test for the `maintenance-requests` collection.
describe('maintenance-requests collection node', () => {
  it('exports a valid collection config', () => {
    expect(MaintenanceRequests.slug).toBe('maintenance-requests')
    expect(Array.isArray(MaintenanceRequests.fields)).toBe(true)
    expect(MaintenanceRequests.fields.length).toBeGreaterThan(0)
  })
})
