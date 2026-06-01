import { describe, it, expect } from 'vitest'
import InsuranceContracts from './index'

// Unified-node invariant test for the `insurance-contracts` collection.
describe('insurance-contracts collection node', () => {
  it('exports a valid collection config', () => {
    expect(InsuranceContracts.slug).toBe('insurance-contracts')
    expect(Array.isArray(InsuranceContracts.fields)).toBe(true)
    expect(InsuranceContracts.fields.length).toBeGreaterThan(0)
  })
})
