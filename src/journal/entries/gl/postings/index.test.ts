import { describe, it, expect } from 'vitest'
import GLPostings from '@/journal/entries/gl/postings'

// Unified-node invariant test for the `gl-postings` collection.
describe('gl-postings collection node', () => {
  it('exports a valid collection config', () => {
    expect(GLPostings.slug).toBe('gl-postings')
    expect(Array.isArray(GLPostings.fields)).toBe(true)
    expect(GLPostings.fields.length).toBeGreaterThan(0)
  })
})
