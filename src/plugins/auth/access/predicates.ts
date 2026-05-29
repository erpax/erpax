/**
 * Canonical Access Predicates
 *
 * Collection-level access control using Payload v3 Access type.
 * All access control in the codebase routes through these helpers.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 § 5.15 access-control
 * @security ISO-27002 § 5.18 access-rights
 * @security ISO-27002 § 8.2 privileged-access-rights
 */

import type { Access } from 'payload'
import { getTenantContext } from '../context'

/**
 * Helper: Check if user has super-admin role.
 *
 * @param user Request user object
 * @returns true if user has 'super-admin' role
 */
const userIsSuperAdmin = (user: unknown): boolean => {
  if (!user || typeof user !== 'object') return false
  const roles = (user as Record<string, unknown>).roles
  return Array.isArray(roles) && roles.includes('super-admin')
}

/**
 * Super-admin access predicate.
 *
 * Only users with 'super-admin' role can access. Used for system-critical
 * collections and operations that require global privilege.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control privileged-role
 * @security ISO-27002 § 8.2 privileged-access-rights
 * @compliance SOC-2 CC6.3 privileged-access-management
 *
 * @example
 *   access: {
 *     read: isSuperAdmin,
 *     create: isSuperAdmin,
 *     update: isSuperAdmin,
 *     delete: isSuperAdmin,
 *   }
 */
export const isSuperAdmin: Access = ({ req }) => {
  return userIsSuperAdmin(req.user)
}

/**
 * Authenticated access predicate.
 *
 * Any logged-in user can access, regardless of role or tenant.
 * Use this for operations that should be available to all authenticated users.
 *
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27002 § 5.15 access-control
 * @security ISO-27002 § 8.5 secure-authentication
 *
 * @example
 *   access: {
 *     read: authenticated,
 *     create: authenticated,
 *   }
 */
export const authenticated: Access = ({ req }) => {
  return Boolean(req.user)
}

/**
 * Tenant-scoped read predicate.
 *
 * User can read documents in their tenant(s) only.
 * Super-admin can read across all tenants (returns `true` to grant all access).
 * Standard users get a query filter scoped to their tenant.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 § 5.15 access-control
 * @security ISO-27002 § 8.3 information-access-restriction
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 * @compliance SOC-2 CC6.1 logical-access-controls
 *
 * @example
 *   access: {
 *     read: tenantScoped,
 *     create: authenticated,
 *   }
 */
export const tenantScoped: Access = async ({ req }) => {
  if (!req.user) return false

  // Super-admin can read all tenants
  if (userIsSuperAdmin(req.user)) return true

  // Standard users: filter by their tenant
  const ctx = getTenantContext(req)
  return {
    tenant: { equals: ctx.tenantId },
  }
}

/**
 * Admin-only access predicate.
 *
 * Only users with 'admin' or 'super-admin' roles can access.
 * Use this for administrative operations within a tenant.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27002 § 5.15 access-control
 * @security ISO-27002 § 5.18 access-rights
 * @compliance SOC-2 CC6.2 prior-to-issuing-system-access
 *
 * @example
 *   access: {
 *     create: adminOnly,
 *     update: adminOnly,
 *     delete: adminOnly,
 *   }
 */
export const adminOnly: Access = ({ req }) => {
  const user: unknown = req.user
  if (!user || typeof user !== 'object') return false
  const roles = (user as Record<string, unknown>).roles
  return Array.isArray(roles) && (roles.includes('admin') || roles.includes('super-admin'))
}
