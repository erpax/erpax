import { describe, it, expect } from 'vitest'
import BiologicalAssets from './index'

// Unified-node invariant test for the `biological-assets` collection.
describe('biological-assets collection node', () => {
  it('exports a valid collection config', () => {
    expect(BiologicalAssets.slug).toBe('biological-assets')
    expect(Array.isArray(BiologicalAssets.fields)).toBe(true)
    expect(BiologicalAssets.fields.length).toBeGreaterThan(0)
  })
})
