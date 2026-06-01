import { describe, it, expect } from 'vitest'
import BillsOfMaterials from './index'

// Unified-node invariant test for the `bills-of-materials` collection.
describe('bills-of-materials collection node', () => {
  it('exports a valid collection config', () => {
    expect(BillsOfMaterials.slug).toBe('bills-of-materials')
    expect(Array.isArray(BillsOfMaterials.fields)).toBe(true)
    expect(BillsOfMaterials.fields.length).toBeGreaterThan(0)
  })
})
