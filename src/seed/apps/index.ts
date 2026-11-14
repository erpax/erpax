/**
 * seed/apps — every app as a tenant.
 *
 * erpax is split into apps, and an app is itself a tenant: the tenant its own pages, forms and
 * documents live in, the way each product of a workspace suite is its own place. The rows are
 * computed from the app list (`appTenants`); loading them is idempotent — a tenant is found by its
 * slug, created when missing, and updated only when it differs.
 *
 * Run: pnpm seed --url <origin> --apps [--domain erpax.com]   (with --domain: <app>.erpax.com each)
 *
 * @see src/packages/engine/index.ts (appTenants) · src/collections/tenants (app, apps)
 */
import { APPS } from '@/packages'
import { APP_ROLES, appTenants, groupRowsOf, type AppGroupRow as AppGroupRowOf } from '@/packages/engine'

export interface TenantRest {
  find(args: Record<string, unknown>): Promise<unknown>
  create(args: Record<string, unknown>): Promise<unknown>
  update(args: Record<string, unknown>): Promise<unknown>
}

export type AppTenantRow = ReturnType<typeof appTenants>[number]

/** The tenant rows, one per app; with a base domain each is served at `<app>.<domain>`. */
export const appTenantRows = (domain?: string): AppTenantRow[] => appTenants(APPS, domain)

const same = (a: readonly string[] | null | undefined, b: readonly string[]): boolean => [...(a ?? [])].sort().join() === [...b].sort().join()

/** Does a stored tenant already say what the row says? */
export const upToDate = (stored: { name?: string | null; app?: string | null; apps?: string[] | null; domain?: string | null }, row: AppTenantRow): boolean =>
  stored.name === row.name && stored.app === row.app && same(stored.apps, row.apps) && (row.domain === undefined || stored.domain === row.domain)

/** Create or update the app tenants. */
export const loadAppTenants = async (rest: TenantRest, rows: readonly AppTenantRow[] = appTenantRows()): Promise<{ created: number; updated: number; unchanged: number }> => {
  const result = { created: 0, updated: 0, unchanged: 0 }
  for (const row of rows) {
    const found = (await rest.find({ collection: 'tenants', where: { slug: { equals: row.slug } }, limit: 1, depth: 0 })) as { docs?: Array<{ id: string | number; name?: string | null; app?: string | null; apps?: string[] | null; domain?: string | null }> }
    const stored = found.docs?.[0]
    if (!stored) {
      await rest.create({ collection: 'tenants', data: row })
      result.created++
    } else if (upToDate(stored, row)) result.unchanged++
    else {
      await rest.update({ collection: 'tenants', id: stored.id, data: { name: row.name, app: row.app, apps: row.apps, ...(row.domain ? { domain: row.domain } : {}) } })
      result.updated++
    }
  }
  return result
}

export { APP_ROLES }

/** A group row of an app tenant: the tenant is its slug, which the loader resolves to an id. */
export type AppGroupRow = AppGroupRowOf & { readonly tenant: string }

/** The groups of every app tenant, computed by the engine: the app's own group and one per role. */
export const appGroupRows = (domain = 'erpax.com'): AppGroupRow[] => APPS.flatMap((app) => groupRowsOf(app.slug, [app], domain)) as AppGroupRow[]

/** Create the app groups that are missing; a group is found by its tenant and address. */
export const loadAppGroups = async (rest: TenantRest, rows: readonly AppGroupRow[] = appGroupRows()): Promise<{ created: number; unchanged: number; skipped: number }> => {
  const result = { created: 0, unchanged: 0, skipped: 0 }
  const tenants = new Map<string, string | number>()
  for (const row of rows) {
    if (!tenants.has(row.tenant)) {
      const found = (await rest.find({ collection: 'tenants', where: { slug: { equals: row.tenant } }, limit: 1, depth: 0 })) as { docs?: Array<{ id: string | number }> }
      const id = found.docs?.[0]?.id
      if (id !== undefined) tenants.set(row.tenant, id)
    }
    const tenant = tenants.get(row.tenant)
    if (tenant === undefined) {
      result.skipped++ // the app tenant is not there: load the tenants first
      continue
    }
    const exists = (await rest.find({ collection: 'groups', where: { and: [{ tenant: { equals: tenant } }, { email: { equals: row.email } }] }, limit: 1, depth: 0 })) as { docs?: unknown[] }
    if (exists.docs?.length) result.unchanged++
    else {
      await rest.create({ collection: 'groups', data: { name: row.name, email: row.email, kind: row.kind, tenant } })
      result.created++
    }
  }
  return result
}
