import { describe, it, expect } from 'vitest'
import TrackingEvents from '@/customers/sales/orders/shipments/tracking/events'

// Unified-node invariant test for the `tracking-events` collection.
describe('tracking-events collection node', () => {
  it('exports a valid collection config', () => {
    expect(TrackingEvents.slug).toBe('tracking-events')
    expect(Array.isArray(TrackingEvents.fields)).toBe(true)
    expect(TrackingEvents.fields.length).toBeGreaterThan(0)
  })
})
