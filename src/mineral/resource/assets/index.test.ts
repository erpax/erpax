import { describe, it, expect } from 'vitest'
import MineralResourceAssets from '@/mineral/resource/assets'

// Unified-node invariant test for the `mineral-resource-assets` collection.
describe('mineral-resource-assets collection node', () => {
  it('exports a valid collection config', () => {
    expect(MineralResourceAssets.slug).toBe('mineral-resource-assets')
    expect(Array.isArray(MineralResourceAssets.fields)).toBe(true)
    expect(MineralResourceAssets.fields.length).toBeGreaterThan(0)
  })
})
