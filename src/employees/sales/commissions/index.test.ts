import { describe, it, expect } from 'vitest'
import SalesCommissions from '@/employees/sales/commissions'

// Unified-node invariant test for the `sales-commissions` collection.
describe('sales-commissions collection node', () => {
  it('exports a valid collection config', () => {
    expect(SalesCommissions.slug).toBe('sales-commissions')
    expect(Array.isArray(SalesCommissions.fields)).toBe(true)
    expect(SalesCommissions.fields.length).toBeGreaterThan(0)
  })
})
