import { describe, it, expect } from 'vitest'
import IntercompanyTransactions from '@/legal/entities/intercompany/transactions'

// Unified-node invariant test for the `intercompany-transactions` collection.
describe('intercompany-transactions collection node', () => {
  it('exports a valid collection config', () => {
    expect(IntercompanyTransactions.slug).toBe('intercompany-transactions')
    expect(Array.isArray(IntercompanyTransactions.fields)).toBe(true)
    expect(IntercompanyTransactions.fields.length).toBeGreaterThan(0)
  })
})
