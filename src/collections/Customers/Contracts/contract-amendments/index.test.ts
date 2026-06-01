import { describe, it, expect } from 'vitest'
import ContractAmendments from './index'

// Unified-node invariant test for the `contract-amendments` collection.
describe('contract-amendments collection node', () => {
  it('exports a valid collection config', () => {
    expect(ContractAmendments.slug).toBe('contract-amendments')
    expect(Array.isArray(ContractAmendments.fields)).toBe(true)
    expect(ContractAmendments.fields.length).toBeGreaterThan(0)
  })
})
