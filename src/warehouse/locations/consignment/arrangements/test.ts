import { describe, it, expect } from 'vitest'
import ConsignmentArrangements from '@/warehouse/locations/consignment/arrangements'

// Unified-node invariant test for the `consignment-arrangements` collection.
describe('consignment-arrangements collection node', () => {
  it('exports a valid collection config', () => {
    expect(ConsignmentArrangements.slug).toBe('consignment-arrangements')
    expect(Array.isArray(ConsignmentArrangements.fields)).toBe(true)
    expect(ConsignmentArrangements.fields.length).toBeGreaterThan(0)
  })
})
