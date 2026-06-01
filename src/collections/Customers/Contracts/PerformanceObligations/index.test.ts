import { describe, it, expect } from 'vitest'
import PerformanceObligations from './index'

// Unified-node invariant test for the `performance-obligations` collection.
describe('performance-obligations collection node', () => {
  it('exports a valid collection config', () => {
    expect(PerformanceObligations.slug).toBe('performance-obligations')
    expect(Array.isArray(PerformanceObligations.fields)).toBe(true)
    expect(PerformanceObligations.fields.length).toBeGreaterThan(0)
  })
})
