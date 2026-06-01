import { describe, it, expect } from 'vitest'
import BankTransactions from './index'

// Unified-node invariant test for the `bank-transactions` collection.
describe('bank-transactions collection node', () => {
  it('exports a valid collection config', () => {
    expect(BankTransactions.slug).toBe('bank-transactions')
    expect(Array.isArray(BankTransactions.fields)).toBe(true)
    expect(BankTransactions.fields.length).toBeGreaterThan(0)
  })
})
