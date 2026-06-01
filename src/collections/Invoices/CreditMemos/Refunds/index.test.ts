import { describe, it, expect } from 'vitest'
import Refunds from './index'

// Unified-node invariant test for the `refunds` collection.
describe('refunds collection node', () => {
  it('exports a valid collection config', () => {
    expect(Refunds.slug).toBe('refunds')
    expect(Array.isArray(Refunds.fields)).toBe(true)
    expect(Refunds.fields.length).toBeGreaterThan(0)
  })
})
