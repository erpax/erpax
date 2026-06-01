import { describe, it, expect } from 'vitest'
import FixedAssets from './index'

// Unified-node invariant test for the `fixed-assets` collection.
describe('fixed-assets collection node', () => {
  it('exports a valid collection config', () => {
    expect(FixedAssets.slug).toBe('fixed-assets')
    expect(Array.isArray(FixedAssets.fields)).toBe(true)
    expect(FixedAssets.fields.length).toBeGreaterThan(0)
  })
})
