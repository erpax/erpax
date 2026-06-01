import { describe, it, expect } from 'vitest'
import InventoryMovements from './index'

// Unified-node invariant test for the `inventory-movements` collection.
describe('inventory-movements collection node', () => {
  it('exports a valid collection config', () => {
    expect(InventoryMovements.slug).toBe('inventory-movements')
    expect(Array.isArray(InventoryMovements.fields)).toBe(true)
    expect(InventoryMovements.fields.length).toBeGreaterThan(0)
  })
})
