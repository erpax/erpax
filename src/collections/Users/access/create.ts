import type { Access } from 'payload'

import type { Tenant, User } from '../../../payload-types'

import { isSuperAdmin } from '../../../access/isSuperAdmin'
import { getUserTenantIDs } from '../../../utilities/getUserTenantIDs'

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

  const adminTenantAccessIDs = getUserTenantIDs(req.user, 'tenant-admin')

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
