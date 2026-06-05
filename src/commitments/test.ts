import { describe, it, expect } from 'vitest'
import Commitments from '@/commitments'

// Unified-node invariant test for the `commitments` collection.
describe('commitments collection node', () => {
  it('exports a valid collection config', () => {
    expect(Commitments.slug).toBe('commitments')
    expect(Array.isArray(Commitments.fields)).toBe(true)
    expect(Commitments.fields.length).toBeGreaterThan(0)
  })
})
