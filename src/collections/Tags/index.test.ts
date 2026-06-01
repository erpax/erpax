import { describe, it, expect } from 'vitest'
import Tags from './index'

// Unified-node invariant test for the `tags` collection.
describe('tags collection node', () => {
  it('exports a valid collection config', () => {
    expect(Tags.slug).toBe('tags')
    expect(Array.isArray(Tags.fields)).toBe(true)
    expect(Tags.fields.length).toBeGreaterThan(0)
  })
})
