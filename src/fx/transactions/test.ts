import { describe, it, expect } from 'vitest'
import FxTransactions from '@/fx/transactions'

// Unified-node invariant test for the `fx-transactions` collection.
describe('fx-transactions collection node', () => {
  it('exports a valid collection config', () => {
    expect(FxTransactions.slug).toBe('fx-transactions')
    expect(Array.isArray(FxTransactions.fields)).toBe(true)
    expect(FxTransactions.fields.length).toBeGreaterThan(0)
  })
})
