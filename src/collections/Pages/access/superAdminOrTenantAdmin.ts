import type { Access } from 'payload'

import { isSuperAdmin } from '../../../access/isSuperAdmin'
import { extractID } from '@/utilities/extractID'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'

/**
 * Tenant admins and super admins are allowed access.
 */
export const superAdminOrTenantAdminAccess: Access = ({ req }) => {
  if (!req.user) {
    return false
  }

  if (isSuperAdmin(req.user)) {
    return true
  }

  const adminTenantAccessIDs = getUserTenantIDs(req.user, 'tenant-admin')
  const requestedTenant =
    req?.data?.tenant !== undefined && req?.data?.tenant !== null
      ? extractID(req.data.tenant)
      : undefined

  if (requestedTenant && adminTenantAccessIDs.includes(requestedTenant)) {
    return true
  }

  return false
}
