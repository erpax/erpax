import { describe, it, expect } from 'vitest'
import { Categories } from '@/categories'

// Unified-node invariant test for the `categories` collection.
describe('categories collection node', () => {
  it('exports a valid collection config', () => {
    expect(Categories.slug).toBe('categories')
    expect(Array.isArray(Categories.fields)).toBe(true)
    expect(Categories.fields.length).toBeGreaterThan(0)
  })
})
