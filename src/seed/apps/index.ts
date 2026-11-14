/**
 * seed/apps — every app as a tenant.
 *
 * erpax is split into apps, and an app is itself a tenant: the tenant its own pages, forms and
 * documents live in, the way each product of a workspace suite is its own place. The rows are
 * computed from the app list (`appTenants`); loading them is idempotent — a tenant is found by its
 * slug, created when missing, and updated only when it differs.
 *
 * Run: pnpm seed --url <origin> --apps
 *
 * @see src/packages/engine/index.ts (appTenants) · src/collections/tenants (app, apps)
 */
import { APPS } from '@/packages'
import { appTenants } from '@/packages/engine'

export interface TenantRest {
  find(args: Record<string, unknown>): Promise<unknown>
  create(args: Record<string, unknown>): Promise<unknown>
  update(args: Record<string, unknown>): Promise<unknown>
}

export type AppTenantRow = ReturnType<typeof appTenants>[number]

/** The tenant rows, one per app. */
export const appTenantRows = (): AppTenantRow[] => appTenants(APPS)

const same = (a: readonly string[] | null | undefined, b: readonly string[]): boolean => [...(a ?? [])].sort().join() === [...b].sort().join()

/** Does a stored tenant already say what the row says? */
export const upToDate = (stored: { name?: string | null; app?: string | null; apps?: string[] | null }, row: AppTenantRow): boolean =>
  stored.name === row.name && stored.app === row.app && same(stored.apps, row.apps)

/** Create or update the app tenants. */
export const loadAppTenants = async (rest: TenantRest, rows: readonly AppTenantRow[] = appTenantRows()): Promise<{ created: number; updated: number; unchanged: number }> => {
  const result = { created: 0, updated: 0, unchanged: 0 }
  for (const row of rows) {
    const found = (await rest.find({ collection: 'tenants', where: { slug: { equals: row.slug } }, limit: 1, depth: 0 })) as { docs?: Array<{ id: string | number; name?: string | null; app?: string | null; apps?: string[] | null }> }
    const stored = found.docs?.[0]
    if (!stored) {
      await rest.create({ collection: 'tenants', data: row })
      result.created++
    } else if (upToDate(stored, row)) result.unchanged++
    else {
      await rest.update({ collection: 'tenants', id: stored.id, data: { name: row.name, app: row.app, apps: row.apps } })
      result.updated++
    }
  }
  return result
}
