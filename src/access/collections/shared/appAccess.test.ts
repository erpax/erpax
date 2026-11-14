import { describe, it, expect } from 'vitest'
import type { CollectionConfig } from 'payload'
import { both, gateByApp, scopeFor, tenantsWith } from '@/access/collections/shared/appAccess'
import { enabledApps, hasApp, type App } from '@/packages/engine'

const apps: App[] = [
  { slug: 'admin', title: 'Admin', anchors: [], required: true },
  { slug: 'sales', title: 'Sales', anchors: [] },
  { slug: 'ledger', title: 'Ledger', anchors: [] },
]

describe('enabledApps — the apps a tenant has on', () => {
  it('a tenant with nothing chosen has every app', () => {
    for (const tenant of [{}, { apps: null }, { apps: [] }, null, undefined]) expect(enabledApps(tenant, apps)).toEqual(['admin', 'sales', 'ledger'])
  })
  it('a chosen list is what it says, plus the required apps', () => {
    expect(enabledApps({ apps: ['ledger'] }, apps)).toEqual(['admin', 'ledger'])
    expect(hasApp({ apps: ['ledger'] }, 'sales', apps)).toBe(false)
    expect(hasApp({ apps: ['ledger'] }, 'admin', apps)).toBe(true)
  })
  it('an app that no longer exists is ignored', () => {
    expect(enabledApps({ apps: ['gone', 'sales'] }, apps)).toEqual(['admin', 'sales'])
  })
})

describe('scopeFor — what the gate answers for a user\'s tenants', () => {
  const a = { id: 'a', apps: ['sales'] }
  const b = { id: 'b', apps: ['ledger'] }
  const all = { id: 'c' }
  it('refuses when no tenant of the user has the app', () => {
    expect(scopeFor('sales', [b], apps)).toBe(false)
  })
  it('changes nothing when every tenant has it', () => {
    expect(scopeFor('sales', [a, all], apps)).toBe(true)
  })
  it('narrows to the tenants that have it when only some do', () => {
    expect(tenantsWith('sales', [a, b, all], apps)).toEqual(['a', 'c'])
    expect(scopeFor('sales', [a, b, all], apps)).toEqual({ tenant: { in: ['a', 'c'] } })
  })
})

describe('both — two access answers together', () => {
  it('false wins, true is neutral, two constraints are AND-ed', () => {
    const w1 = { status: { equals: 'open' } }
    const w2 = { tenant: { in: ['a'] } }
    expect(both(false, w1)).toBe(false)
    expect(both(w1, false)).toBe(false)
    expect(both(true, w1)).toEqual(w1)
    expect(both(w1, true)).toEqual(w1)
    expect(both(true, true)).toBe(true)
    expect(both(w1, w2)).toEqual({ and: [w1, w2] })
  })
})

describe('gateByApp — the gate on a collection', () => {
  const collection: CollectionConfig = { slug: 'invoices', fields: [], access: { read: () => ({ status: { equals: 'open' } }), create: () => true, admin: () => true } }
  const gated = gateByApp(apps[1]!, collection)
  const call = (op: 'read' | 'create' | 'update' | 'delete', user: unknown) => (gated.access![op] as (args: unknown) => Promise<unknown>)({ req: { user, context: {} } })
  it('wraps the four document operations and keeps the others', () => {
    for (const op of ['create', 'read', 'update', 'delete'] as const) expect(typeof gated.access![op]).toBe('function')
    expect(gated.access!.admin).toBe(collection.access!.admin)
  })
  it('a request with no user is left to the collection\'s own access', async () => {
    expect(await call('read', null)).toEqual({ status: { equals: 'open' } })
    expect(await call('update', null)).toBe(false) // Payload's default: signed in
  })
  it('a user who belongs to no tenant is left to the collection\'s own access', async () => {
    expect(await call('read', { id: 1, tenants: [] })).toEqual({ status: { equals: 'open' } })
    expect(await call('create', { id: 1, tenants: [] })).toBe(true)
  })
  const member = (tenants: Array<{ id: string; apps?: string[] }>) => {
    let reads = 0
    const req = { user: { id: 7, tenants: tenants.map((t) => ({ tenant: t.id, roles: ['tenant-viewer'] })) }, context: {}, payload: { find: async () => (reads++, { docs: tenants }) } }
    const run = (op: 'read' | 'create' | 'update' | 'delete') => (gated.access![op] as (args: unknown) => Promise<unknown>)({ req })
    return { run, reads: () => reads }
  }
  it('a member of a tenant without the app is refused every operation', async () => {
    const { run } = member([{ id: 'b', apps: ['ledger'] }])
    for (const op of ['read', 'create', 'update', 'delete'] as const) expect(await run(op)).toBe(false)
  })
  it('a member of one tenant with the app and one without sees only the first', async () => {
    const { run, reads } = member([{ id: 'a', apps: ['sales'] }, { id: 'b', apps: ['ledger'] }])
    expect(await run('read')).toEqual({ and: [{ status: { equals: 'open' } }, { tenant: { in: ['a'] } }] })
    expect(await run('create')).toBe(true)
    expect(await run('update')).toEqual({ tenant: { in: ['a'] } })
    expect(reads()).toBe(1) // the tenants are read once per request
  })
  it('a member whose tenants all have the app is not narrowed', async () => {
    const { run } = member([{ id: 'a' }, { id: 'c', apps: ['sales', 'ledger'] }])
    expect(await run('read')).toEqual({ status: { equals: 'open' } })
    expect(await run('delete')).toBe(true)
  })
})
