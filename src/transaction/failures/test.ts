import { describe, it, expect } from 'vitest'
import TransactionFailures from '@/transaction/failures'

// Unified-node invariant test for the `transaction-failures` collection.
describe('transaction-failures collection node', () => {
  it('exports a valid collection config', () => {
    expect(TransactionFailures.slug).toBe('transaction-failures')
    expect(Array.isArray(TransactionFailures.fields)).toBe(true)
    expect(TransactionFailures.fields.length).toBeGreaterThan(0)
  })
})
