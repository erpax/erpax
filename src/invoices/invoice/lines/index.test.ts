import { describe, it, expect } from 'vitest'
import { InvoiceLines } from '@/invoices/invoice/lines'

// Unified-node invariant test for the `invoice-lines` collection.
describe('invoice-lines collection node', () => {
  it('exports a valid collection config', () => {
    expect(InvoiceLines.slug).toBe('invoice-lines')
    expect(Array.isArray(InvoiceLines.fields)).toBe(true)
    expect(InvoiceLines.fields.length).toBeGreaterThan(0)
  })
})
