/**
 * @erpax/auth/access — reusable access-control predicates (multi-tenant + RBAC).
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @standard NIST SP-800-162 attribute-based-access-control
 * @security ISO-27001 A.5.15 access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §5.4 segregation-of-duties
 * @standard OWASP-ASVS V4 access-control
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §4.4
 */

import type { Access, PayloadRequest } from 'payload'
import type { UserContext, UserRole, AccessResult } from '../../types/auth'
import type { User } from '../../payload-types'

export { isSuperAdminAccess as superAdminOnly } from '../isSuperAdmin'

/**
 * Narrow `req.user` (the `User | PayloadMcpApiKey` auth union) to the
 * app `User`. Machine identities (MCP API keys) carry no `roles` and
 * resolve to `null`. The single canonical touch-point for `req.user`:
 * access predicates, hooks, and services all compose with this atom
 * instead of poking the union directly.
 */
export function getUser(req: PayloadRequest): User | null {
  const u = req.user
  if (!u || !('roles' in u)) return null
  return u as User
}

/**
 * The acting identity's id as a string, for ANY auth type (app `User`
 * OR machine `PayloadMcpApiKey`). Use this — not `getUser` — when you
 * only need the actor id (audit events, mediator context), since API
 * keys are legitimate actors there.
 */
export function getActorId(req?: PayloadRequest): string | undefined {
  return req?.user ? String(req.user.id) : undefined
}

/**
 * Extract user context from request.
 *
 * Derives `tenant` from the canonical `User.tenants[]` array
 * (multi-tenant plugin convention). Picks the first tenant; multi-tenant
 * users with several memberships switch active tenant via the
 * payload-tenant cookie (handled by `getTenantFromRequest`).
 */
export function getUserContext(req: PayloadRequest): UserContext | null {
  const user = getUser(req)
  if (!user) return null

  const firstTenantRef = user.tenants?.[0]?.tenant
  const tenant =
    typeof firstTenantRef === 'number' || typeof firstTenantRef === 'string'
      ? String(firstTenantRef)
      : ''

  return {
    id: String(user.id),
    tenant,
    roles: (user.roles as UserRole[]) ?? [],
  }
}

/**
 * Check if user has required role
 */
export function hasRole(user: UserContext | null, ...requiredRoles: UserRole[]): boolean {
  if (!user) return false
  return requiredRoles.some((role) => user.roles.includes(role))
}

/**
 * Multi-tenant read access (everyone can read their tenant's data)
 * PATTERN: Applied to all collections for read access
 */
export const multiTenantRead: Access = async ({ req }) => {
  const user = getUserContext(req)
  if (!user) return false

  return { tenant: { equals: user.tenant } }
}

/**
 * Admin-only access (create/update/delete)
 * PATTERN: Used for system-critical collections (Tenants, Roles, Users)
 */
export const adminOnly: Access = async ({ req }) => {
  const user = getUserContext(req)
  return hasRole(user, 'admin')
}

/**
 * Admin or Accountant access
 * PATTERN: Used for financial collections (Accounts, Equations, Entries, Payments)
 */
export const adminOrAccountant: Access = async ({ req }) => {
  const user = getUserContext(req)
  if (!hasRole(user, 'admin', 'accountant')) return false

  return { tenant: { equals: user.tenant } }
}

/**
 * Tenant-scoped admin access (admins can manage their own tenant's data)
 * PATTERN: Used for collection management (Addresses, Items, Invoices)
 */
export const tenantAdmin: Access = async ({ req }) => {
  const user = getUserContext(req)
  if (!hasRole(user, 'admin')) return false

  return { tenant: { equals: user.tenant } }
}

/**
 * Builder: Combine multiple access rules with AND logic
 * PATTERN: For complex access requirements
 */
export function andAccess(...accessFns: Access[]): Access {
  return async (args) => {
    for (const fn of accessFns) {
      const result = await fn(args)
      if (result === false) return false
    }
    return true
  }
}

/**
 * Builder: Create scoped access (returns query with tenant filter)
 * PATTERN: For all scoped collections
 */
export function scopedAccess(additionalWhere?: Record<string, unknown>): Access {
  return async ({ req }) => {
    const user = getUserContext(req)
    if (!user) return false

    const query: AccessResult = { tenant: { equals: user.tenant } }

    if (additionalWhere) {
      return { and: [query, additionalWhere] }
    }

    return query
  }
}

/**
 * Builder: Role-gated scoped access
 * PATTERN: For role-restricted collections
 */
export function roleScopedAccess(...allowedRoles: UserRole[]): Access {
  return async ({ req }) => {
    const user = getUserContext(req)
    if (!hasRole(user, ...allowedRoles)) return false

    return { tenant: { equals: user.tenant } }
  }
}

/**
 * Builder: party-role (entity-membership) access — the **membership** twin of
 * the capability gate above. This is the fundamental access duality made
 * explicit: a role is either a **capability** (what you may *do* → boolean,
 * `hasRole`/`roleScopedAccess`) or an **entity-membership** (what you are a
 * *party to* → row-level `Where`). This returns the Where — "documents of
 * `collectionSlug` on which the acting user holds one of `partyRoles`" —
 * exactly Rolify's `Resource.with_role(role, user)` over the document-scoped
 * (instance) role binding.
 *
 * Multi-party by construction: many users may hold `seller`/`buyer`/… on one
 * document; each sees it because membership is a *set*, not a single FK.
 * Capability holders (default `admin`) bypass to full tenant scope.
 *
 * Roles live in the resource-scoped engine (`roles` + `user-roles`, the NIST
 * INCITS-359 / Rolify port): a document-scoped row has `binding: 'document'`,
 * `scopedCollection: <slug>`, `resource.value: <id>`.
 *
 * @standard NIST INCITS-359-2012 rbac object-scoped-role-assignment
 * @security ISO-27001 A.5.15 access-control
 * @see src/standards/nist-incits-359/payload.ts (the add_role / has_role engine)
 */
export function partyRoleAccess(
  collectionSlug: string,
  partyRoles: readonly string[],
  options: { capabilityRoles?: UserRole[] } = {},
): Access {
  return async ({ req }) => {
    const user = getUserContext(req)
    if (!user) return false

    const tenantWhere: AccessResult = { tenant: { equals: user.tenant } }

    // Capability side: an admin (or configured capability role) holds blanket
    // access — no per-document membership lookup needed.
    if (hasRole(user, 'admin', ...(options.capabilityRoles ?? []))) return tenantWhere

    // Membership side: collect the documents on which the user holds a party
    // role (document-scoped binding). One query; role populated at depth 1.
    const { docs } = await req.payload.find({
      collection: 'user-roles',
      where: { user: { equals: user.id } },
      depth: 1,
      pagination: false,
      overrideAccess: true,
      req,
    })

    const memberOf: string[] = []
    for (const ur of docs as Array<{ role?: unknown }>) {
      const role = ur.role
      if (!role || typeof role !== 'object') continue
      const r = role as {
        name?: string
        binding?: string
        scopedCollection?: string
        resource?: { value?: unknown }
      }
      if (r.binding !== 'document' || r.scopedCollection !== collectionSlug) continue
      if (!r.name || !partyRoles.includes(r.name)) continue
      const v = r.resource?.value
      const id = v && typeof v === 'object' ? (v as { id?: unknown }).id : v
      if (id != null) memberOf.push(String(id))
    }

    return { and: [tenantWhere, { id: { in: memberOf } }] }
  }
}

// ─── Bundle helpers (Slice KKK DRY) ──────────────────────────────────────
//
// The patterns below were extracted from the existing canonical
// collections — each replaces a 4-key access block that recurs across N
// collections with a single named bundle. Authoring rule: every new
// collection should reach for one of these bundles first; only define a
// bespoke `access:` block when none of the bundles fit.
//
// Frequency snapshot at extraction time:
//   accountingCollectionAccess  → 32 collections
//   tenantMasterDataAccess      →  5 collections
//   tenantAdminWriteAccess      →  4 collections
//   superAdminOnlyAccess        →  4 collections
//
// @standard NIST INCITS-359-2012 role-based-access-control
// @security ISO-27001 A.5.15 access-control
// @security ISO-27001 A.5.18 access-rights
// @security ISO-27001 A.5.23 cloud-service-tenant-isolation
// @security ISO-27002 §5.15 access-control

/**
 * 4-key access bundle for the **accounting-domain** collections —
 * tenant-scoped read for everyone in tenant, role-gated writes (default
 * admin + accountant), tenant-admin delete. Replaces the 4-line block
 * that recurs across 32 collections (JournalEntries, GLPostings, …).
 *
 * Slice VVV: `feature` option added — when set, every op is wrapped
 * with `featureGuard(feature)` so the collection is hidden / blocked
 * for tenants whose plan doesn't include the feature. The featureId
 * MUST exist in `FEATURE_REGISTRY` (`@/access/feature-registry`).
 *
 * @example
 *   access: accountingCollectionAccess(),                              // free + up
 *   access: accountingCollectionAccess({ feature: 'manufacturing' }), // enterprise only
 *   access: accountingCollectionAccess({ feature: 'leasing', writeRoles: ['admin'] }),
 */
export function accountingCollectionAccess(
  options: { writeRoles?: UserRole[]; feature?: string } = {},
): { read: Access; create: Access; update: Access; delete: Access } {
  const writeRoles = options.writeRoles ?? (['admin', 'accountant'] as UserRole[])
  const baseRead = scopedAccess()
  const baseCreate = roleScopedAccess(...writeRoles)
  const baseUpdate = roleScopedAccess(...writeRoles)
  const baseDelete = tenantAdmin
  if (!options.feature) {
    return { read: baseRead, create: baseCreate, update: baseUpdate, delete: baseDelete }
  }
  // Wrap every op with the feature gate. We require both checks to pass.
  // Lazy-import `featureGuard` to avoid a cycle (subscriptionGates imports
  // from payload-types which transitively pulls collection schemas).
  const guard = (op: Access): Access => async (args) => {
    const { featureGuard } = await import('@/access/subscriptionGates')
    const guarded = featureGuard(options.feature!)
    const ok = await guarded(args)
    if (ok === false) return false
    return op(args)
  }
  return {
    read: guard(baseRead),
    create: guard(baseCreate),
    update: guard(baseUpdate),
    delete: guard(baseDelete),
  }
}

/**
 * 4-key access bundle for **tenant master data** collections (Customers,
 * Vendors, TaxCodes, TaxJurisdictions, FiscalPeriods, …) — `multiTenantRead`
 * for every authenticated tenant member, `adminOrAccountant` writes,
 * `adminOnly` delete (master data should not be deletable by accountants).
 */
export function tenantMasterDataAccess(): { read: Access; create: Access; update: Access; delete: Access } {
  return {
    read: multiTenantRead,
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: adminOnly,
  }
}

/**
 * 4-key access bundle for collections where **only tenant-admins write**
 * (BankAccounts, CurrencyRates, FinancialStatements, GLPostings) — scoped
 * read, role-gated create, tenant-admin update + delete.
 */
export function tenantAdminWriteAccess(
  options: { createRoles?: UserRole[] } = {},
): { read: Access; create: Access; update: Access; delete: Access } {
  const createRoles = options.createRoles ?? (['admin', 'accountant'] as UserRole[])
  return {
    read: scopedAccess(),
    create: roleScopedAccess(...createRoles),
    update: tenantAdmin,
    delete: tenantAdmin,
  }
}
