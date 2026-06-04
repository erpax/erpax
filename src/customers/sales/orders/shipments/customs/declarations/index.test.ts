import { describe, it, expect } from 'vitest'
import CustomsDeclarations from '@/customers/sales/orders/shipments/customs/declarations'

// Unified-node invariant test for the `customs-declarations` collection.
describe('customs-declarations collection node', () => {
  it('exports a valid collection config', () => {
    expect(CustomsDeclarations.slug).toBe('customs-declarations')
    expect(Array.isArray(CustomsDeclarations.fields)).toBe(true)
    expect(CustomsDeclarations.fields.length).toBeGreaterThan(0)
  })
})
