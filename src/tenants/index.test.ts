import { describe, it, expect } from 'vitest'
import { Tenants } from '@/tenants'

// Unified-node invariant test for the `tenants` collection.
describe('tenants collection node', () => {
  it('exports a valid collection config', () => {
    expect(Tenants.slug).toBe('tenants')
    expect(Array.isArray(Tenants.fields)).toBe(true)
    expect(Tenants.fields.length).toBeGreaterThan(0)
  })
})
