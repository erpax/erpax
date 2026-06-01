import { describe, it, expect } from 'vitest'
import PostBalanceSheetEvents from './index'

// Unified-node invariant test for the `post-balance-sheet-events` collection.
describe('post-balance-sheet-events collection node', () => {
  it('exports a valid collection config', () => {
    expect(PostBalanceSheetEvents.slug).toBe('post-balance-sheet-events')
    expect(Array.isArray(PostBalanceSheetEvents.fields)).toBe(true)
    expect(PostBalanceSheetEvents.fields.length).toBeGreaterThan(0)
  })
})
