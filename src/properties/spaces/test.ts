import { describe, it, expect } from 'vitest'
import Spaces from '@/properties/spaces'

// Unified-node invariant test for the `spaces` collection.
describe('spaces collection node', () => {
  it('exports a valid collection config', () => {
    expect(Spaces.slug).toBe('spaces')
    expect(Array.isArray(Spaces.fields)).toBe(true)
    expect(Spaces.fields.length).toBeGreaterThan(0)
  })
})
