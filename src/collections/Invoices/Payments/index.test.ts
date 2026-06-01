import { describe, it, expect } from 'vitest'
import { Payments } from './index'

// Unified-node invariant test for the `payments` collection.
describe('payments collection node', () => {
  it('exports a valid collection config', () => {
    expect(Payments.slug).toBe('payments')
    expect(Array.isArray(Payments.fields)).toBe(true)
    expect(Payments.fields.length).toBeGreaterThan(0)
  })
})
