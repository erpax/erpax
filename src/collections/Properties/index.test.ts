import { describe, it, expect } from 'vitest'
import Properties from './index'

// Unified-node invariant test for the `properties` collection.
describe('properties collection node', () => {
  it('exports a valid collection config', () => {
    expect(Properties.slug).toBe('properties')
    expect(Array.isArray(Properties.fields)).toBe(true)
    expect(Properties.fields.length).toBeGreaterThan(0)
  })
})
