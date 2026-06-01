import { describe, it, expect } from 'vitest'
import GatewayEvents from './index'

// Unified-node invariant test for the `gateway-events` collection.
describe('gateway-events collection node', () => {
  it('exports a valid collection config', () => {
    expect(GatewayEvents.slug).toBe('gateway-events')
    expect(Array.isArray(GatewayEvents.fields)).toBe(true)
    expect(GatewayEvents.fields.length).toBeGreaterThan(0)
  })
})
