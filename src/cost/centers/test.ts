import { describe, it, expect } from 'vitest'
import CostCenters from '@/cost/centers'

// Unified-node invariant test for the `cost-centers` collection.
describe('cost-centers collection node', () => {
  it('exports a valid collection config', () => {
    expect(CostCenters.slug).toBe('cost-centers')
    expect(Array.isArray(CostCenters.fields)).toBe(true)
    expect(CostCenters.fields.length).toBeGreaterThan(0)
  })
})
