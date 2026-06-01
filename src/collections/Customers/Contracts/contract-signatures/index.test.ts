import { describe, it, expect } from 'vitest'
import ContractSignatures from './index'

// Unified-node invariant test for the `contract-signatures` collection.
describe('contract-signatures collection node', () => {
  it('exports a valid collection config', () => {
    expect(ContractSignatures.slug).toBe('contract-signatures')
    expect(Array.isArray(ContractSignatures.fields)).toBe(true)
    expect(ContractSignatures.fields.length).toBeGreaterThan(0)
  })
})
