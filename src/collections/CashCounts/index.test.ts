import { describe, it, expect } from 'vitest'
import CashCounts from './index'

// Unified-node invariant test for the `cash-counts` collection.
describe('cash-counts collection node', () => {
  it('exports a valid collection config', () => {
    expect(CashCounts.slug).toBe('cash-counts')
    expect(Array.isArray(CashCounts.fields)).toBe(true)
    expect(CashCounts.fields.length).toBeGreaterThan(0)
  })
})
