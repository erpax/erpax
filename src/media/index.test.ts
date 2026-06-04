import { describe, it, expect } from 'vitest'
import { Media } from '@/media'

// Unified-node invariant test for the `media` collection.
describe('media collection node', () => {
  it('exports a valid collection config', () => {
    expect(Media.slug).toBe('media')
    expect(Array.isArray(Media.fields)).toBe(true)
    expect(Media.fields.length).toBeGreaterThan(0)
  })
})
