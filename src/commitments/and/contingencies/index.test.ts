import { describe, it, expect } from 'vitest'
import CommitmentsAndContingencies from '@/commitments/and/contingencies'

// Unified-node invariant test for the `commitments-and-contingencies` collection.
describe('commitments-and-contingencies collection node', () => {
  it('exports a valid collection config', () => {
    expect(CommitmentsAndContingencies.slug).toBe('commitments-and-contingencies')
    expect(Array.isArray(CommitmentsAndContingencies.fields)).toBe(true)
    expect(CommitmentsAndContingencies.fields.length).toBeGreaterThan(0)
  })
})
