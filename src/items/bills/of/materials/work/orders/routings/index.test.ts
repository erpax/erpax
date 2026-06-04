import { describe, it, expect } from 'vitest'
import Routings from '@/items/bills/of/materials/work/orders/routings'

// Unified-node invariant test for the `routings` collection.
describe('routings collection node', () => {
  it('exports a valid collection config', () => {
    expect(Routings.slug).toBe('routings')
    expect(Array.isArray(Routings.fields)).toBe(true)
    expect(Routings.fields.length).toBeGreaterThan(0)
  })
})
