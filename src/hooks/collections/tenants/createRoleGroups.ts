/**
 * createRoleGroups — a new tenant gets the groups that hold its roles.
 *
 * Roles are held by being in a group (`manager@sales.acme.com` is the manager role of the sales app for
 * the tenant at acme.com). So when a tenant is created with a domain, its groups are created with it:
 * for each app it has, the app's own group and one group per role (`APP_ROLES`). An app tenant
 * (`tenants.app`) gets only its own app's groups, addressed on the base domain (`sales.erpax.com` →
 * `manager@sales.erpax.com`). A tenant with no domain gets none: an address needs one.
 *
 * Creating them must never block the tenant: a domain that cannot form an address, or an address already
 * taken, is logged and skipped.
 *
 * @standard NIST INCITS-359-2012 §5.1 users and groups
 * @security ISO-27002 §5.15 access-control · §5.18 access-rights
 * @see src/packages/engine/index.ts (`groupRowsOf`) · src/utilities/roles/groups (how a group becomes a role)
 */
import type { CollectionAfterChangeHook } from 'payload'

import { APPS } from '@/packages'
import { enabledApps, groupRowsOf, type AppGroupRow } from '@/packages/engine'
import type { Iso27002ControlId } from '@/utilities/iso/27002'

/** Canonical ISO 27002:2022 controls this module exercises: 5.15 access control · 5.18 access rights. */
export const controlsApplied: ReadonlyArray<Iso27002ControlId> = ['5.15', '5.18'] as const

interface TenantShape {
  readonly id: string | number
  readonly domain?: string | null
  readonly app?: string | null
  readonly apps?: readonly string[] | null
}

/** The domain groups are addressed on: the tenant's, without an app tenant's own `<app>.` label. */
export const baseDomainOf = (domain: string, app?: string | null): string => {
  const host = domain.trim().toLowerCase()
  return app && host.startsWith(`${app}.`) ? host.slice(app.length + 1) : host
}

/** The groups a tenant should have — none without a domain that can form an address. */
export const roleGroupRows = (tenant: TenantShape): AppGroupRow[] => {
  const domain = tenant.domain ? baseDomainOf(tenant.domain, tenant.app) : ''
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain)) return []
  const own = tenant.app ? APPS.filter((app) => app.slug === tenant.app) : APPS.filter((app) => enabledApps(tenant, APPS).includes(app.slug))
  return groupRowsOf(tenant.id, own, domain)
}

export const createRoleGroups: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  for (const row of roleGroupRows(doc as TenantShape)) {
    try {
      await req.payload.create({ collection: 'groups', data: { name: row.name, email: row.email, kind: row.kind, tenant: String(row.tenant) }, overrideAccess: true, req })
    } catch (error) {
      req.payload.logger.warn(`createRoleGroups: ${row.email} for tenant ${String(row.tenant)} was not created — ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  return doc
}
