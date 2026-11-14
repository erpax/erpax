/**
 * appAccess — a collection is reachable only through a tenant that has its app switched on.
 *
 * erpax is split into apps (src/packages), and a tenant chooses which apps it has
 * (`tenants.apps`). This is the gate the app plugins put on each of an app's collections. For a
 * signed-in user it narrows every operation to the user's tenants that have the app:
 *
 *   no tenant of the user has the app    → refused
 *   every tenant of the user has it      → unchanged
 *   some do                              → only documents of those tenants
 *
 * A super-admin is not narrowed. A request with no user, and a user who belongs to no tenant (a
 * storefront customer reading their own orders), are left to the collection's own access: the
 * gate narrows tenant membership and has nothing to say where there is none. The user's tenants are read once per
 * request (`remembered`).
 *
 * @standard NIST INCITS-359-2012 §6.1 permission-assignment
 * @security ISO-27001 A.5.15 access-control · A.8.3 information-access-restriction
 * @see src/packages/engine/index.ts (enabledApps · Gate) · src/collections/tenants (apps)
 */
import type { Access, CollectionConfig, PayloadRequest, Where } from 'payload'
import { isSuperAdmin } from '@/access/collections/shared/superAdminOnly'
import { remembered } from '@/hooks/context'
import { APPS } from '@/packages'
import { enabledApps, type App, type Gate } from '@/packages/engine'
import { getUserTenantIDs } from '@/utilities/get/user/tenant/i/ds'

type Scope = boolean | Where

/** Both must allow: `false` wins, `true` is neutral, two constraints are AND-ed. */
export const both = (a: Scope, b: Scope): Scope => (a === false || b === false ? false : a === true ? b : b === true ? a : { and: [a, b] })

/** Which of these tenants have the app — the pure part of the gate. */
export const tenantsWith = (app: string, tenants: ReadonlyArray<{ id: string | number; apps?: readonly string[] | null }>, apps: readonly App[] = APPS): Array<string | number> =>
  tenants.filter((tenant) => enabledApps(tenant, apps).includes(app)).map((tenant) => tenant.id)

/** What the gate answers for a user's tenants: all of them, none, or the ones with the app. */
export const scopeFor = (app: string, tenants: ReadonlyArray<{ id: string | number; apps?: readonly string[] | null }>, apps: readonly App[] = APPS): Scope => {
  const withApp = tenantsWith(app, tenants, apps)
  if (withApp.length === 0) return false
  if (withApp.length === tenants.length) return true
  return { tenant: { in: withApp } }
}

/** The signed-in user's tenants with the apps each has on — read once per request. */
const tenantsOf = (req: PayloadRequest): Promise<Array<{ id: string | number; apps?: string[] | null }>> =>
  remembered(req, 'tenantApps', async () => {
    const ids = getUserTenantIDs(req.user)
    if (ids.length === 0) return []
    const found = await req.payload.find({ collection: 'tenants', where: { id: { in: ids } }, depth: 0, limit: ids.length, pagination: false, overrideAccess: true, select: { apps: true }, req })
    return found.docs.map((tenant) => ({ id: tenant.id, apps: (tenant as { apps?: string[] | null }).apps }))
  })

/** The gate as an access function for one app. */
export const appAccess =
  (app: string): Access =>
  async ({ req }) => {
    if (!req.user || isSuperAdmin(req.user)) return true
    const tenants = await tenantsOf(req)
    return tenants.length === 0 ? true : scopeFor(app, tenants)
  }

const signedIn: Access = ({ req }) => Boolean(req.user)

/** Narrow one access function by the app gate; a missing one is Payload's default (signed in). */
const gated = (app: string, access: Access | undefined, boolean: boolean): Access => {
  const gate = appAccess(app)
  return async (args) => {
    const scope = both((await (access ?? signedIn)(args)) as Scope, (await gate(args)) as Scope)
    // `create` answers yes or no: a constraint on existing documents means "yes, in those tenants"
    return boolean ? scope !== false : scope
  }
}

/** The gate the app plugins apply: every operation of the collection goes through its app. */
export const gateByApp: Gate = (app, collection): CollectionConfig => ({
  ...collection,
  access: {
    ...collection.access,
    create: gated(app.slug, collection.access?.create, true),
    read: gated(app.slug, collection.access?.read, false),
    update: gated(app.slug, collection.access?.update, false),
    delete: gated(app.slug, collection.access?.delete, false),
  },
})
