import { describe, it, expect } from 'vitest'
import VendorQuotes from './index'

// Unified-node invariant test for the `vendor-quotes` collection.
describe('vendor-quotes collection node', () => {
  it('exports a valid collection config', () => {
    expect(VendorQuotes.slug).toBe('vendor-quotes')
    expect(Array.isArray(VendorQuotes.fields)).toBe(true)
    expect(VendorQuotes.fields.length).toBeGreaterThan(0)
  })
})
