import { describe, it, expect } from 'vitest'
import Sales from '@/fiscal/devices/sales'

// Unified-node invariant test for the `sales` collection.
describe('sales collection node', () => {
  it('exports a valid collection config', () => {
    expect(Sales.slug).toBe('sales')
    expect(Array.isArray(Sales.fields)).toBe(true)
    expect(Sales.fields.length).toBeGreaterThan(0)
  })
})
