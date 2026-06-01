import { describe, it, expect } from 'vitest'
import Opportunities from './index'

// Unified-node invariant test for the `opportunities` collection.
describe('opportunities collection node', () => {
  it('exports a valid collection config', () => {
    expect(Opportunities.slug).toBe('opportunities')
    expect(Array.isArray(Opportunities.fields)).toBe(true)
    expect(Opportunities.fields.length).toBeGreaterThan(0)
  })
})
