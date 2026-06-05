import { describe, it, expect } from 'vitest'
import CreditMemos from '@/invoices/credit/memos'

// Unified-node invariant test for the `credit-memos` collection.
describe('credit-memos collection node', () => {
  it('exports a valid collection config', () => {
    expect(CreditMemos.slug).toBe('credit-memos')
    expect(Array.isArray(CreditMemos.fields)).toBe(true)
    expect(CreditMemos.fields.length).toBeGreaterThan(0)
  })
})
