import { describe, it, expect } from 'vitest'
import Shipments from './index'

// Unified-node invariant test for the `shipments` collection.
describe('shipments collection node', () => {
  it('exports a valid collection config', () => {
    expect(Shipments.slug).toBe('shipments')
    expect(Array.isArray(Shipments.fields)).toBe(true)
    expect(Shipments.fields.length).toBeGreaterThan(0)
  })
})
