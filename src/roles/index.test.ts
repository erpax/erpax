import { describe, it, expect } from 'vitest'
import { Roles } from '@/roles'

// Unified-node invariant test for the `roles` collection.
describe('roles collection node', () => {
  it('exports a valid collection config', () => {
    expect(Roles.slug).toBe('roles')
    expect(Array.isArray(Roles.fields)).toBe(true)
    expect(Roles.fields.length).toBeGreaterThan(0)
  })
})
