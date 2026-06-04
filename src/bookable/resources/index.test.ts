import { describe, it, expect } from 'vitest'
import BookableResources from '@/bookable/resources'

// Unified-node invariant test for the `bookable-resources` collection.
describe('bookable-resources collection node', () => {
  it('exports a valid collection config', () => {
    expect(BookableResources.slug).toBe('bookable-resources')
    expect(Array.isArray(BookableResources.fields)).toBe(true)
    expect(BookableResources.fields.length).toBeGreaterThan(0)
  })
})
