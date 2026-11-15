import { describe, it, expect, vi } from 'vitest'
import type { Condition } from 'payload'
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

// The first user brings an email and a password: everything else is the super-admin role's.
describe('users — the first-user form and the schema', () => {
  const condition = (name: string) => (Users.fields.find((f) => 'name' in f && f.name === name) as { admin?: { condition?: Condition } }).admin?.condition
  const shown = (name: string, user: unknown) => condition(name)?.({}, {}, { user } as never) ?? true

  it('hides the API key fields from the anonymous first-user form, and shows them once signed in', () => {
    for (const name of ['apiKey', 'apiKeyLast4', 'name']) {
      expect(shown(name, null), name).toBe(false)
      expect(shown(name, { id: 'u1' }), name).toBe(true)
    }
  })

  it('does not verify email, whatever the environment: verify adds columns, so it cannot follow an env var', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test')
    vi.resetModules()
    const { Users: withKey } = await import('@/collections/users')
    vi.unstubAllEnvs()
    expect(withKey.auth).toMatchObject({ verify: false })
    expect(Users.auth).toMatchObject({ verify: false })
  })
})
