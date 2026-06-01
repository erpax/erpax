import { describe, it, expect } from 'vitest'
import Returns from './index'

// Unified-node invariant test for the `returns` collection.
describe('returns collection node', () => {
  it('exports a valid collection config', () => {
    expect(Returns.slug).toBe('returns')
    expect(Array.isArray(Returns.fields)).toBe(true)
    expect(Returns.fields.length).toBeGreaterThan(0)
  })
})
