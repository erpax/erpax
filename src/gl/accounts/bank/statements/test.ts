import { describe, it, expect } from 'vitest'
import BankStatements from '@/gl/accounts/bank/statements'

// Unified-node invariant test for the `bank-statements` collection.
describe('bank-statements collection node', () => {
  it('exports a valid collection config', () => {
    expect(BankStatements.slug).toBe('bank-statements')
    expect(Array.isArray(BankStatements.fields)).toBe(true)
    expect(BankStatements.fields.length).toBeGreaterThan(0)
  })
})
