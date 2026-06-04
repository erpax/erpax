import { describe, it, expect } from 'vitest'
import ConsignmentSales from '@/warehouse/locations/consignment/arrangements/consignment/sales'

// Unified-node invariant test for the `consignment-sales` collection.
describe('consignment-sales collection node', () => {
  it('exports a valid collection config', () => {
    expect(ConsignmentSales.slug).toBe('consignment-sales')
    expect(Array.isArray(ConsignmentSales.fields)).toBe(true)
    expect(ConsignmentSales.fields.length).toBeGreaterThan(0)
  })
})
