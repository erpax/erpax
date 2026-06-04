import { describe, it, expect } from 'vitest'
import { UserRoles } from '@/roles/user/roles'

// Unified-node invariant test for the `user-roles` collection.
describe('user-roles collection node', () => {
  it('exports a valid collection config', () => {
    expect(UserRoles.slug).toBe('user-roles')
    expect(Array.isArray(UserRoles.fields)).toBe(true)
    expect(UserRoles.fields.length).toBeGreaterThan(0)
  })
})
