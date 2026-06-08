import type { Access } from 'payload'

import type { Tenant, User } from '@/types'

import { isSuperAdmin } from '@/is/super/admin'
import { getUserTenantIDs } from '@/get/user/tenant/i/ds'

/**
 * Users:create access predicate — first-user bootstrap, super-admin, or
 * tenant-admin scoped to the requested tenants.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §5.16 identity-management
 * @compliance SOC-2 CC6.2 access-provisioning
 * @see docs/STANDARDS.md §4.4
 */
export const createAccess: Access<User> = async ({ req }) => {
  // Allow first user creation (no authentication required)
  if (!req.user) {
    try {
      const { totalDocs } = await req.payload.count({
        collection: 'users',
        overrideAccess: true,
      })
      // If no users exist, allow creation of first user
      return totalDocs === 0
    } catch {
      // If error checking users, allow creation (likely first user scenario)
      return true
    }
  }

  if (isSuperAdmin(req.user)) {
    return true
  }

  if (!isSuperAdmin(req.user) && req.data?.roles?.includes('super-admin')) {
    return false
  }

  const adminTenantAccessIDs = getUserTenantIDs(req.user, 'admin')

  const requestedTenants: Tenant['id'][] =
    req.data?.tenants?.map((t: { tenant: Tenant['id'] }) => t.tenant) ?? []

  const hasAccessToAllRequestedTenants = requestedTenants.every((tenantID) =>
    adminTenantAccessIDs.includes(tenantID),
  )

  if (hasAccessToAllRequestedTenants) {
    return true
  }

  return false
}
