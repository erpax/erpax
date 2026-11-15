import { describe, expect, it } from 'vitest'

import { changedTenants, guardPrivilege, privilegeError } from '@/hooks/collections/users/guardPrivilege'
import { CREDENTIALS, genesisData } from '@/hooks/collections/users/firstUserSuperAdmin'

const superAdmin = { id: 'sa', roles: ['admin'], tenants: [] }
const tenantAdmin = { id: 'ta', roles: ['user'], tenants: [{ tenant: 't1', roles: ['admin'] }] }
const viewer = { id: 'v', roles: ['user'], tenants: [{ tenant: 't1', roles: ['viewer'] }] }
const boundAdmin = { id: 'ba', roles: ['admin'], tenants: [{ tenant: 't1', roles: ['admin'] }] }

describe('guardPrivilege — who may make what of a user', () => {
  it('a viewer cannot promote itself or join another tenant (escalation 1)', () => {
    expect(privilegeError({ actor: viewer, before: viewer, after: { ...viewer, tenants: [{ tenant: 't1', roles: ['admin'] }] } })).toMatch(/admin of that tenant/)
    expect(privilegeError({ actor: viewer, before: viewer, after: { ...viewer, tenants: [...viewer.tenants, { tenant: 't2', roles: ['viewer'] }] } })).toMatch(/admin of that tenant/)
  })

  it('a tenant admin cannot create a super-admin (escalation 2)', () => {
    expect(privilegeError({ actor: tenantAdmin, after: { roles: ['admin'], tenants: [] } })).toMatch(/Only a super-admin/)
  })

  it('a tenant-bound admin cannot clear its tenants into super-admin (escalation 3)', () => {
    expect(privilegeError({ actor: boundAdmin, before: boundAdmin, after: { ...boundAdmin, tenants: [] } })).toMatch(/Only a super-admin/)
  })

  it('a tenant admin manages membership within its own tenant, and only there', () => {
    expect(privilegeError({ actor: tenantAdmin, before: viewer, after: { ...viewer, tenants: [{ tenant: 't1', roles: ['admin'] }] } })).toBeUndefined()
    expect(privilegeError({ actor: tenantAdmin, after: { roles: ['user'], tenants: [{ tenant: 't1', roles: ['viewer'] }] } })).toBeUndefined()
    expect(privilegeError({ actor: tenantAdmin, before: viewer, after: { ...viewer, tenants: [{ tenant: 't2', roles: ['viewer'] }] } })).toMatch(/admin of that tenant/)
  })

  it('a new user is created inside a tenant its creator runs — no orphans, no creating by viewers', () => {
    expect(privilegeError({ actor: tenantAdmin, after: { roles: ['user'], tenants: [] }, creating: true })).toMatch(/inside a tenant its creator runs/)
    expect(privilegeError({ actor: viewer, after: { roles: ['user'], tenants: [] }, creating: true })).toMatch(/inside a tenant its creator runs/)
    expect(privilegeError({ actor: tenantAdmin, after: { roles: ['user'], tenants: [{ tenant: 't1', roles: ['viewer'] }] }, creating: true })).toBeUndefined()
    expect(privilegeError({ actor: superAdmin, after: { roles: ['user'], tenants: [] }, creating: true })).toBeUndefined()
  })

  it('a super-admin may do all of it; an unchanged membership is not a change', () => {
    expect(privilegeError({ actor: superAdmin, after: { roles: ['admin'], tenants: [] } })).toBeUndefined()
    expect(changedTenants([{ tenant: { id: 't1' }, roles: ['b', 'a'] }], [{ tenant: 't1', roles: ['a', 'b'] }])).toEqual([])
    expect(privilegeError({ actor: viewer, before: viewer, after: { ...viewer, name: 'renamed' } })).toBeUndefined()
  })

  it('the hook refuses with 403, lets the genesis and trusted server code through, and strips keys from an anonymous caller', () => {
    const run = (args: object) => (guardPrivilege as unknown as (a: object) => unknown)(args)
    let status = 0
    try {
      run({ data: { tenants: [] }, originalDoc: boundAdmin, req: { user: boundAdmin, context: {}, payloadAPI: 'REST' } })
    } catch (error) {
      status = (error as { status: number }).status
    }
    expect(status).toBe(403)
    const genesis = { email: 'o@x', password: 'p', apiKey: 'k', enableAPIKey: true, roles: ['admin'] }
    expect(run({ data: genesis, req: { user: null, context: { genesis: true }, payloadAPI: 'REST' } })).toEqual({ email: 'o@x', password: 'p', roles: ['admin'] })
    expect(run({ data: { roles: ['admin'], tenants: [] }, req: { user: null, context: {}, payloadAPI: 'local' } })).toEqual({ roles: ['admin'], tenants: [] })
  })
})

describe('genesis — the first user brings credentials only', () => {
  it('keeps email and password, drops tenants, roles, keys and the rest', () => {
    expect(CREDENTIALS).toEqual(['email', 'password'])
    expect(genesisData({ email: 'o@x', password: 'p', roles: ['admin'], tenants: [{ tenant: 't1' }], apiKey: 'k', config: {} }, undefined)).toEqual({ email: 'o@x', password: 'p' })
  })

  it('with an owner set, only the owner may be the first user (any case)', () => {
    expect(genesisData({ email: 'Owner@Example.com', password: 'p' }, 'owner@example.com')).toEqual({ email: 'Owner@Example.com', password: 'p' })
    expect(genesisData({ email: 'someone@else.com', password: 'p' }, 'owner@example.com')).toBeUndefined()
  })
})
