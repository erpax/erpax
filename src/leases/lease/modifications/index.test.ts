import { describe, it, expect } from 'vitest'
import LeaseModifications from '@/leases/lease/modifications'

// Unified-node invariant test for the `lease-modifications` collection.
describe('lease-modifications collection node', () => {
  it('exports a valid collection config', () => {
    expect(LeaseModifications.slug).toBe('lease-modifications')
    expect(Array.isArray(LeaseModifications.fields)).toBe(true)
    expect(LeaseModifications.fields.length).toBeGreaterThan(0)
  })
})
