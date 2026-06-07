import { describe, it, expect } from 'vitest'
import {
  getUser,
  getActorId,
  getUserContext,
  hasRole,
  scopedAccess,
  roleScopedAccess,
  andAccess,
  accountingCollectionAccess,
  tenantMasterDataAccess,
  tenantAdminWriteAccess,
} from '@/auth'

// Minimal req builder — no Payload boot required.
function makeReq(user: unknown): { user: unknown } {
  return { user } as never
}

function makeUser(overrides: Partial<{
  id: string | number
  roles: string[]
  tenants: Array<{ tenant?: string | number }>
}> = {}) {
  return {
    id: overrides.id ?? '42',
    roles: overrides.roles ?? ['user'],
    tenants: overrides.tenants ?? [{ tenant: 'tenant-1' }],
  }
}

describe('auth', () => {
  // ── getUser ───────────────────────────────────────────────────────────────
  it('getUser returns User when req.user has roles', () => {
    const user = makeUser()
    const result = getUser(makeReq(user) as never)
    expect(result).toBe(user)
  })

  it('getUser returns null for machine identity (no roles key)', () => {
    const machineKey = { id: 'key-1', token: 'abc' }
    expect(getUser(makeReq(machineKey) as never)).toBeNull()
  })

  it('getUser returns null when req.user is undefined', () => {
    expect(getUser(makeReq(undefined) as never)).toBeNull()
  })

  // ── getActorId ────────────────────────────────────────────────────────────
  it('getActorId coerces numeric id to string', () => {
    const user = makeUser({ id: 99 })
    expect(getActorId(makeReq(user) as never)).toBe('99')
  })

  it('getActorId works for machine identity (no roles)', () => {
    const key = { id: 'mcp-key-7' }
    expect(getActorId(makeReq(key) as never)).toBe('mcp-key-7')
  })

  it('getActorId returns undefined when req is undefined', () => {
    expect(getActorId(undefined)).toBeUndefined()
  })

  // ── getUserContext ────────────────────────────────────────────────────────
  it('getUserContext derives tenant from first tenants entry (string ref)', () => {
    const user = makeUser({ id: '10', tenants: [{ tenant: 'acme' }] })
    const ctx = getUserContext(makeReq(user) as never)
    expect(ctx).toEqual({ id: '10', tenant: 'acme', roles: ['user'] })
  })

  it('getUserContext coerces numeric tenant ref to string', () => {
    const user = makeUser({ id: '5', tenants: [{ tenant: 7 as never }] })
    const ctx = getUserContext(makeReq(user) as never)
    expect(ctx?.tenant).toBe('7')
  })

  it('getUserContext returns empty string tenant when tenants array is empty', () => {
    const user = makeUser({ tenants: [] })
    const ctx = getUserContext(makeReq(user) as never)
    expect(ctx?.tenant).toBe('')
  })

  it('getUserContext returns null for machine identity', () => {
    expect(getUserContext(makeReq({ id: 'mk' }) as never)).toBeNull()
  })

  // ── hasRole ───────────────────────────────────────────────────────────────
  it('hasRole returns true when user holds the required role', () => {
    const ctx = { id: '1', tenant: 'x', roles: ['admin' as never] }
    expect(hasRole(ctx, 'admin' as never)).toBe(true)
  })

  it('hasRole returns true when any of the required roles matches', () => {
    const ctx = { id: '1', tenant: 'x', roles: ['accountant' as never] }
    expect(hasRole(ctx, 'admin' as never, 'accountant' as never)).toBe(true)
  })

  it('hasRole returns false when user lacks all required roles', () => {
    const ctx = { id: '1', tenant: 'x', roles: ['user' as never] }
    expect(hasRole(ctx, 'admin' as never)).toBe(false)
  })

  it('hasRole returns false for null user', () => {
    expect(hasRole(null, 'admin' as never)).toBe(false)
  })

  // ── Access builders — shape + basic behaviour ─────────────────────────────
  it('scopedAccess returns tenant where-clause for authenticated user', async () => {
    const user = makeUser({ id: '3', tenants: [{ tenant: 'corp' }] })
    const fn = scopedAccess()
    const result = await fn({ req: makeReq(user) } as never)
    expect(result).toEqual({ tenant: { equals: 'corp' } })
  })

  it('scopedAccess returns false for unauthenticated request', async () => {
    const fn = scopedAccess()
    expect(await fn({ req: makeReq(undefined) } as never)).toBe(false)
  })

  it('scopedAccess with additionalWhere wraps in and: []', async () => {
    const user = makeUser({ tenants: [{ tenant: 'co' }] })
    const fn = scopedAccess({ status: { equals: 'active' } })
    const result = await fn({ req: makeReq(user) } as never)
    expect(result).toEqual({
      and: [{ tenant: { equals: 'co' } }, { status: { equals: 'active' } }],
    })
  })

  it('roleScopedAccess returns false when user lacks the role', async () => {
    const user = makeUser({ roles: ['user'] })
    const fn = roleScopedAccess('admin' as never)
    expect(await fn({ req: makeReq(user) } as never)).toBe(false)
  })

  it('andAccess short-circuits on first false', async () => {
    const alwaysFalse = async () => false as const
    const alwaysTrue = async () => true as const
    const combined = andAccess(alwaysTrue as never, alwaysFalse as never, alwaysTrue as never)
    expect(await combined({ req: makeReq(undefined) } as never)).toBe(false)
  })

  // ── Bundle shape assertions (no ops invoked) ──────────────────────────────
  it('accountingCollectionAccess returns all four access keys', () => {
    const bundle = accountingCollectionAccess()
    expect(Object.keys(bundle).sort()).toEqual(['create', 'delete', 'read', 'update'])
    for (const key of ['read', 'create', 'update', 'delete'] as const) {
      expect(typeof bundle[key]).toBe('function')
    }
  })

  it('tenantMasterDataAccess returns all four access keys as functions', () => {
    const bundle = tenantMasterDataAccess()
    expect(Object.keys(bundle).sort()).toEqual(['create', 'delete', 'read', 'update'])
    for (const key of ['read', 'create', 'update', 'delete'] as const) {
      expect(typeof bundle[key]).toBe('function')
    }
  })

  it('tenantAdminWriteAccess returns all four access keys as functions', () => {
    const bundle = tenantAdminWriteAccess()
    expect(Object.keys(bundle).sort()).toEqual(['create', 'delete', 'read', 'update'])
    for (const key of ['read', 'create', 'update', 'delete'] as const) {
      expect(typeof bundle[key]).toBe('function')
    }
  })
})
