import type { Access } from 'payload'

import { getUserTenantIDs } from '@/get/user/tenant/i/ds'
import { isSuperAdmin } from '@/is/super/admin'
import { isAccessingSelf } from '@/users/access/isAccessingSelf'

/**
 * Users:update + delete access predicate — self, super-admin, or
 * tenant-admin acting on co-tenants.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §5.4 segregation-of-duties
 * @compliance SOC-2 CC6.3 access-removal
 * @see docs/STANDARDS.md §4.4
 */
export const updateAndDeleteAccess: Access = ({ req, id }) => {
  const { user } = req

  if (!user) {
    return false
  }

  if (isSuperAdmin(user) || isAccessingSelf({ user, id })) {
    return true
  }

  /**
   * Constrains update and delete access to users that belong
   * to the same tenant as a membership admin making the request
   *
   * You may want to take this a step further with a beforeChange
   * hook to ensure that a membership admin can only remove users
   * from their own tenant in the tenants array.
   */
  return {
    'tenants.tenant': {
      in: getUserTenantIDs(user, 'admin'),
    },
  }
}
