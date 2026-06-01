import { describe, it, expect } from 'vitest'
import BankAccounts from './index'

// Unified-node invariant test for the `bank-accounts` collection.
describe('bank-accounts collection node', () => {
  it('exports a valid collection config', () => {
    expect(BankAccounts.slug).toBe('bank-accounts')
    expect(Array.isArray(BankAccounts.fields)).toBe(true)
    expect(BankAccounts.fields.length).toBeGreaterThan(0)
  })
})
