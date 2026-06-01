import { describe, it, expect } from 'vitest'
import BusinessCombinations from './index'

// Unified-node invariant test for the `business-combinations` collection.
describe('business-combinations collection node', () => {
  it('exports a valid collection config', () => {
    expect(BusinessCombinations.slug).toBe('business-combinations')
    expect(Array.isArray(BusinessCombinations.fields)).toBe(true)
    expect(BusinessCombinations.fields.length).toBeGreaterThan(0)
  })
})
