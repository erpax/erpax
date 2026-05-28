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
import type { UserContext, UserRole, AccessResult } from '../types/auth'

export { isSuperAdminAccess as superAdminOnly } from './isSuperAdmin'

/**
 * Extract user context from request.
 *
 * Slice CCC: derives `tenant` from the canonical `req.user.tenants[]`
 * array (multi-tenant plugin convention) rather than the fictional
 * `(req.user?.tenants?.[0]?.tenant)` field. Picks the first tenant; multi-tenant users
 * with several memberships should switch active tenant via the
 * payload-tenant cookie (handled by `getTenantFromRequest`).
 */
export function getUserContext(req: PayloadRequest): UserContext | null {
  if (!req.user) return null

  const tenantsArr = (req.user as unknown as { tenants?: Array<{ tenant?: number | string }> }).tenants
  const firstTenantRef = tenantsArr?.[0]?.tenant
  const tenant =
    typeof firstTenantRef === 'number' || typeof firstTenantRef === 'string'
      ? String(firstTenantRef)
      : ''

  return {
    id: String(req.user.id),
    tenant,
    roles: (req.user.roles as UserRole[]) || [],
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
