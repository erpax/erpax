import { describe, it, expect } from 'vitest'
import { Invoices } from '@/invoices'

// Unified-node invariant test for the `invoices` collection.
describe('invoices collection node', () => {
  it('exports a valid collection config', () => {
    expect(Invoices.slug).toBe('invoices')
    expect(Array.isArray(Invoices.fields)).toBe(true)
    expect(Invoices.fields.length).toBeGreaterThan(0)
  })
})
