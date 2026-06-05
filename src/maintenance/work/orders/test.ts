import { describe, it, expect } from 'vitest'
import MaintenanceWorkOrders from '@/maintenance/work/orders'

// Unified-node invariant test for the `maintenance-work-orders` collection.
describe('maintenance-work-orders collection node', () => {
  it('exports a valid collection config', () => {
    expect(MaintenanceWorkOrders.slug).toBe('maintenance-work-orders')
    expect(Array.isArray(MaintenanceWorkOrders.fields)).toBe(true)
    expect(MaintenanceWorkOrders.fields.length).toBeGreaterThan(0)
  })
})
