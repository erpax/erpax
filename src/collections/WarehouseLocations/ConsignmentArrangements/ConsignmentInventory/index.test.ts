import { describe, it, expect } from 'vitest'
import ConsignmentInventory from './index'

// Unified-node invariant test for the `consignment-inventory` collection.
describe('consignment-inventory collection node', () => {
  it('exports a valid collection config', () => {
    expect(ConsignmentInventory.slug).toBe('consignment-inventory')
    expect(Array.isArray(ConsignmentInventory.fields)).toBe(true)
    expect(ConsignmentInventory.fields.length).toBeGreaterThan(0)
  })
})
