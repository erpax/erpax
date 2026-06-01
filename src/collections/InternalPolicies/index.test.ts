import { describe, it, expect } from 'vitest'
import { InternalPolicies } from './index'

// Unified-node invariant test for the `internal-policies` collection.
describe('internal-policies collection node', () => {
  it('exports a valid collection config', () => {
    expect(InternalPolicies.slug).toBe('internal-policies')
    expect(Array.isArray(InternalPolicies.fields)).toBe(true)
    expect(InternalPolicies.fields.length).toBeGreaterThan(0)
  })
})
