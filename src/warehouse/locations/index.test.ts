import { describe, it, expect } from 'vitest'
import WarehouseLocations from '@/warehouse/locations'

// Unified-node invariant test for the `warehouse-locations` collection.
describe('warehouse-locations collection node', () => {
  it('exports a valid collection config', () => {
    expect(WarehouseLocations.slug).toBe('warehouse-locations')
    expect(Array.isArray(WarehouseLocations.fields)).toBe(true)
    expect(WarehouseLocations.fields.length).toBeGreaterThan(0)
  })
})
