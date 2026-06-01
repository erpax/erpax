import { describe, it, expect } from 'vitest'
import BankReconciliations from './index'

// Unified-node invariant test for the `bank-reconciliations` collection.
describe('bank-reconciliations collection node', () => {
  it('exports a valid collection config', () => {
    expect(BankReconciliations.slug).toBe('bank-reconciliations')
    expect(Array.isArray(BankReconciliations.fields)).toBe(true)
    expect(BankReconciliations.fields.length).toBeGreaterThan(0)
  })
})
