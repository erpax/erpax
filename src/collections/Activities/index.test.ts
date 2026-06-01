import { describe, it, expect } from 'vitest'
import Activities from './index'

// Unified-node invariant test for the `activities` collection.
describe('activities collection node', () => {
  it('exports a valid collection config', () => {
    expect(Activities.slug).toBe('activities')
    expect(Array.isArray(Activities.fields)).toBe(true)
    expect(Activities.fields.length).toBeGreaterThan(0)
  })
})
