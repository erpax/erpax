import { describe, it, expect } from 'vitest'
import { APPS } from '@/packages'
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
})
