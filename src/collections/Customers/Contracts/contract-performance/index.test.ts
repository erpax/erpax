import { describe, it, expect } from 'vitest'
import ContractPerformance from './index'

// Unified-node invariant test for the `contract-performance` collection.
describe('contract-performance collection node', () => {
  it('exports a valid collection config', () => {
    expect(ContractPerformance.slug).toBe('contract-performance')
    expect(Array.isArray(ContractPerformance.fields)).toBe(true)
    expect(ContractPerformance.fields.length).toBeGreaterThan(0)
  })
})
