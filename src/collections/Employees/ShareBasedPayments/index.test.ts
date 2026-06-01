import { describe, it, expect } from 'vitest'
import ShareBasedPayments from './index'

// Unified-node invariant test for the `share-based-payments` collection.
describe('share-based-payments collection node', () => {
  it('exports a valid collection config', () => {
    expect(ShareBasedPayments.slug).toBe('share-based-payments')
    expect(Array.isArray(ShareBasedPayments.fields)).toBe(true)
    expect(ShareBasedPayments.fields.length).toBeGreaterThan(0)
  })
})
