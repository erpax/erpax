import { describe, it, expect } from 'vitest'
import { Posts } from './index'

// Unified-node invariant test for the `posts` collection.
describe('posts collection node', () => {
  it('exports a valid collection config', () => {
    expect(Posts.slug).toBe('posts')
    expect(Array.isArray(Posts.fields)).toBe(true)
    expect(Posts.fields.length).toBeGreaterThan(0)
  })
})
