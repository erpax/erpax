import { describe, it, expect } from 'vitest'
import Receipts from '@/receipts'

// Unified-node invariant test for the `receipts` collection.
describe('receipts collection node', () => {
  it('exports a valid collection config', () => {
    expect(Receipts.slug).toBe('receipts')
    expect(Array.isArray(Receipts.fields)).toBe(true)
    expect(Receipts.fields.length).toBeGreaterThan(0)
  })
})
