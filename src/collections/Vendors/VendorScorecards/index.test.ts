import { describe, it, expect } from 'vitest'
import VendorScorecards from './index'

// Unified-node invariant test for the `vendor-scorecards` collection.
describe('vendor-scorecards collection node', () => {
  it('exports a valid collection config', () => {
    expect(VendorScorecards.slug).toBe('vendor-scorecards')
    expect(Array.isArray(VendorScorecards.fields)).toBe(true)
    expect(VendorScorecards.fields.length).toBeGreaterThan(0)
  })
})
