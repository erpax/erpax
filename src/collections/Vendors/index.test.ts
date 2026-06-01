import { describe, it, expect } from 'vitest'
import { Vendors } from './index'

// Unified-node invariant test for the `vendors` collection.
describe('vendors collection node', () => {
  it('exports a valid collection config', () => {
    expect(Vendors.slug).toBe('vendors')
    expect(Array.isArray(Vendors.fields)).toBe(true)
    expect(Vendors.fields.length).toBeGreaterThan(0)
  })
})
