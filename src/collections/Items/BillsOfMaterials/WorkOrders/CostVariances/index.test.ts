import { describe, it, expect } from 'vitest'
import CostVariances from './index'

// Unified-node invariant test for the `cost-variances` collection.
describe('cost-variances collection node', () => {
  it('exports a valid collection config', () => {
    expect(CostVariances.slug).toBe('cost-variances')
    expect(Array.isArray(CostVariances.fields)).toBe(true)
    expect(CostVariances.fields.length).toBeGreaterThan(0)
  })
})
