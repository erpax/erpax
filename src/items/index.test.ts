import { describe, it, expect } from 'vitest'
import { Items } from '@/items'

// Unified-node invariant test for the `items` collection.
describe('items collection node', () => {
  it('exports a valid collection config', () => {
    expect(Items.slug).toBe('items')
    expect(Array.isArray(Items.fields)).toBe(true)
    expect(Items.fields.length).toBeGreaterThan(0)
  })
})
