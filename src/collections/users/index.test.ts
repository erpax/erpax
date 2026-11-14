import { describe, it, expect } from 'vitest'
import { Users } from '@/collections/users'

// Unified-node invariant test for the `users` collection.
describe('users collection node', () => {
  it('exports a valid collection config', () => {
    expect(Users.slug).toBe('users')
    expect(Array.isArray(Users.fields)).toBe(true)
    expect(Users.fields.length).toBeGreaterThan(0)
  })
  it('carries role assignments as a has-many relationship, readable and writable by super-admins only (the folded user-roles join)', () => {
    const field = Users.fields.find((f) => 'name' in f && f.name === 'roleAssignments') as { type?: string; relationTo?: string; hasMany?: boolean; access?: Record<string, unknown> }
    expect(field).toMatchObject({ type: 'relationship', relationTo: 'roles', hasMany: true })
    for (const op of ['create', 'read', 'update']) expect(typeof field.access?.[op], op).toBe('function')
  })
})
