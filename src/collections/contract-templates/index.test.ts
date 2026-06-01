import { describe, it, expect } from 'vitest'
import ContractTemplates from './index'

// Unified-node invariant test for the `contract-templates` collection.
describe('contract-templates collection node', () => {
  it('exports a valid collection config', () => {
    expect(ContractTemplates.slug).toBe('contract-templates')
    expect(Array.isArray(ContractTemplates.fields)).toBe(true)
    expect(ContractTemplates.fields.length).toBeGreaterThan(0)
  })
})
