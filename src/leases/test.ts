import { describe, it, expect } from 'vitest'
import Leases from '@/leases'

// Unified-node invariant test for the `leases` collection.
describe('leases collection node', () => {
  it('exports a valid collection config', () => {
    expect(Leases.slug).toBe('leases')
    expect(Array.isArray(Leases.fields)).toBe(true)
    expect(Leases.fields.length).toBeGreaterThan(0)
  })
})
