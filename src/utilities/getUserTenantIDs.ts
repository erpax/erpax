/**
 * Returns array of all tenant IDs assigned to a user, optionally filtered
 * by the role granted within that tenant.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control user-role-assignment
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @compliance SOX §404 internal-controls
 * @see src/standards/nist-incits-359/
 */

import type { Tenant, User } from '../payload-types'
import { extractID } from './extractID'

/**
 * Returns array of all tenant IDs assigned to a user.
 *
 * @param user - User object with tenants field
 * @param role - Optional role to filter by
 */
export const getUserTenantIDs = (
  user: unknown,
  role?: NonNullable<User['tenants']>[number]['roles'][number],
): Tenant['id'][] => {
  if (!user || typeof user !== 'object' || !('tenants' in user)) {
    return []
  }

  const tenants = (user as { tenants?: User['tenants'] }).tenants
  if (!Array.isArray(tenants)) return []

  return (
    tenants.reduce<Tenant['id'][]>((acc, { roles, tenant }) => {
      if (role && !roles.includes(role)) {
        return acc
      }

      if (tenant) {
        acc.push(extractID(tenant))
      }

      return acc
    }, []) || []
  )
}
