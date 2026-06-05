import { describe, it, expect } from 'vitest'
import CustomerSegments from '@/customer/segments'

// Unified-node invariant test for the `customer-segments` collection.
describe('customer-segments collection node', () => {
  it('exports a valid collection config', () => {
    expect(CustomerSegments.slug).toBe('customer-segments')
    expect(Array.isArray(CustomerSegments.fields)).toBe(true)
    expect(CustomerSegments.fields.length).toBeGreaterThan(0)
  })
})
