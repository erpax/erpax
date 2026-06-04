import { describe, it, expect } from 'vitest'
import PerformanceReviews from '@/employees/performance/reviews'

// Unified-node invariant test for the `performance-reviews` collection.
describe('performance-reviews collection node', () => {
  it('exports a valid collection config', () => {
    expect(PerformanceReviews.slug).toBe('performance-reviews')
    expect(Array.isArray(PerformanceReviews.fields)).toBe(true)
    expect(PerformanceReviews.fields.length).toBeGreaterThan(0)
  })
})
