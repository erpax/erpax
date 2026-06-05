import { describe, it, expect } from 'vitest'
import Taggings from '@/tags/taggings'

// Unified-node invariant test for the `taggings` collection.
describe('taggings collection node', () => {
  it('exports a valid collection config', () => {
    expect(Taggings.slug).toBe('taggings')
    expect(Array.isArray(Taggings.fields)).toBe(true)
    expect(Taggings.fields.length).toBeGreaterThan(0)
  })
})
