import { describe, it, expect } from 'vitest'
import Operators from '@/operators'

// Unified-node invariant test for the `operators` collection.
describe('operators collection node', () => {
  it('exports a valid collection config', () => {
    expect(Operators.slug).toBe('operators')
    expect(Array.isArray(Operators.fields)).toBe(true)
    expect(Operators.fields.length).toBeGreaterThan(0)
  })
})
