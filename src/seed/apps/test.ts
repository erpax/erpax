import { describe, it, expect } from 'vitest'
import { APPS } from '@/packages'
import { appOfHost } from '@/packages/engine'
import { appTenantRows, loadAppTenants, upToDate, type TenantRest } from '@/seed/apps'

describe('seed/apps — every app as a tenant', () => {
  it('there is one tenant row per app, named and slugged after it', () => {
    const rows = appTenantRows()
    expect(rows.map((row) => row.slug)).toEqual(APPS.map((app) => app.slug))
    expect(rows.find((row) => row.slug === 'sales')).toEqual({ name: 'Sales', slug: 'sales', app: 'sales', apps: ['admin', 'sales', 'platform'] })
  })
  it('an app tenant has its own app and the required ones, nothing else', () => {
    for (const row of appTenantRows()) expect([...new Set(['admin', row.app, 'platform'])].sort()).toEqual([...row.apps].sort())
  })
  it('loading creates what is missing, updates what differs and leaves the rest', async () => {
    const rows = appTenantRows().slice(0, 3)
    const stored = new Map<string, Record<string, unknown>>([
      [rows[0]!.slug, { id: 1, ...rows[0]! }],
      [rows[1]!.slug, { id: 2, ...rows[1]!, name: 'Old name' }],
    ])
    const calls: string[] = []
    const rest: TenantRest = {
      find: async (args) => ({ docs: [stored.get((args.where as { slug: { equals: string } }).slug.equals)].filter(Boolean) }),
      create: async (args) => void calls.push(`create ${(args.data as { slug: string }).slug}`),
      update: async (args) => void calls.push(`update ${String(args.id)}`),
    }
    expect(await loadAppTenants(rest, rows)).toEqual({ created: 1, updated: 1, unchanged: 1 })
    expect(calls).toEqual(['update 2', `create ${rows[2]!.slug}`])
  })
  it('a stored tenant is up to date whatever order its apps are in', () => {
    const row = appTenantRows().find((r) => r.slug === 'sales')!
    expect(upToDate({ name: 'Sales', app: 'sales', apps: ['platform', 'sales', 'admin'] }, row)).toBe(true)
    expect(upToDate({ name: 'Sales', app: 'sales', apps: ['sales'] }, row)).toBe(false)
  })
  it('with a base domain every app tenant is served on its own subdomain', () => {
    const rows = appTenantRows('erpax.com')
    expect(rows.find((row) => row.slug === 'ledger')!.domain).toBe('ledger.erpax.com')
    expect(appTenantRows()[0]!.domain).toBe(undefined)
    expect(upToDate({ name: 'Sales', app: 'sales', apps: ['admin', 'sales', 'platform'], domain: 'old.example' }, rows.find((r) => r.slug === 'sales')!)).toBe(false)
  })
  it('a host name says which app it is for', () => {
    expect(appOfHost('ledger.erpax.com', APPS)!.slug).toBe('ledger')
    expect(appOfHost('LEDGER.erpax.com:8443', APPS)!.slug).toBe('ledger')
    expect(appOfHost('www.erpax.com', APPS)).toBe(undefined)
    expect(appOfHost(null, APPS)).toBe(undefined)
  })
})

describe('seed/apps — every app and role as a group', () => {
  it('one group per app and one per role in it, each at its own address', async () => {
    const { appGroupRows, APP_ROLES } = await import('@/seed/apps')
    const rows = appGroupRows('erpax.com')
    expect(rows).toHaveLength(APPS.length * (1 + APP_ROLES.length))
    expect(new Set(rows.map((row) => row.email)).size).toBe(rows.length)
    expect(rows).toContainEqual({ tenant: 'sales', name: 'Sales', email: 'sales@erpax.com', kind: 'team' })
    expect(rows).toContainEqual({ tenant: 'sales', name: 'Sales manager', email: 'manager@sales.erpax.com', kind: 'security' })
  })
  it('every role group address reads back as that role in that app', async () => {
    const { appGroupRows } = await import('@/seed/apps')
    const { parseRoleAddress } = await import('@/packages/engine')
    for (const row of appGroupRows().filter((r) => r.kind === 'security')) expect(parseRoleAddress(row.email, APPS)?.app.slug, row.email).toBe(row.tenant)
  })
  it('loading creates what is missing and leaves what exists; with no tenant it skips', async () => {
    const { appGroupRows, loadAppGroups } = await import('@/seed/apps')
    const rows = appGroupRows().filter((row) => row.tenant === 'sales')
    const created: unknown[] = []
    const rest = (stored: string[]) => ({
      find: async ({ collection, where }: { collection: string; where: Record<string, unknown> }) =>
        collection === 'tenants' ? { docs: [{ id: 't1' }] } : { docs: stored.includes(JSON.stringify(where)) ? [{}] : [] },
      create: async (args: Record<string, unknown>) => { created.push(args) },
      update: async () => undefined,
    })
    const first = await loadAppGroups(rest([]), rows)
    expect(first).toEqual({ created: rows.length, unchanged: 0, skipped: 0 })
    const stored = rows.map((row) => JSON.stringify({ and: [{ tenant: { equals: 't1' } }, { email: { equals: row.email } }] }))
    expect(await loadAppGroups(rest(stored), rows)).toEqual({ created: 0, unchanged: rows.length, skipped: 0 })
    const none = { find: async () => ({ docs: [] }), create: async () => undefined, update: async () => undefined }
    expect(await loadAppGroups(none, rows)).toEqual({ created: 0, unchanged: 0, skipped: rows.length })
  })
})
