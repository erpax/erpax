import type { User } from '../../../payload-types'
import type { Access, Where } from 'payload'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'

import { isSuperAdmin } from '../../../access/isSuperAdmin'
import { getUserTenantIDs } from '../../../utilities/getUserTenantIDs'
import { isAccessingSelf } from './isAccessingSelf'
import { getCollectionIDType } from '../../../utilities/getCollectionIDType'

/**
 * Users:read access predicate — self, super-admin, or admin of the user's tenant.
 *
 * Builds a tenant-scoped `Where` filter so the SQL layer enforces isolation —
 * this is the load-bearing multi-tenant boundary for the `users` collection.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27001 A.5.23 information-security-for-cloud-services
 * @security ISO-27002 §5.15 access-control
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §4.4
 */
export const readAccess: Access<User> = ({ req, id }) => {
  if (!req?.user) {
    return false
  }

  if (isAccessingSelf({ id, user: req.user })) {
    return true
  }

  const superAdmin = isSuperAdmin(req.user)

  // Super admins are global (`userHasAccessToAllTenants`) and often have no rows in `users.tenants`.
  // If we scoped them by the tenant cookie here, the query would require `tenants.tenant` = cookie,
  // which excludes users with no tenant assignment—including themselves. That must run before the
  // selected-tenant branch below (otherwise `if (superAdmin) return true` is dead code).
  if (superAdmin) {
    return true
  }

  const selectedTenant = getTenantFromCookie(
    req.headers,
    getCollectionIDType({ payload: req.payload, collectionSlug: 'tenants' }),
  )
  const adminTenantAccessIDs = getUserTenantIDs(req.user, 'admin')
  const currentUserID =
    typeof req.user === 'object' && req.user && 'id' in req.user
      ? (req.user as { id?: string | number }).id
      : undefined

  if (selectedTenant) {
    const hasTenantAccess = adminTenantAccessIDs.some((tid) => tid === selectedTenant)
    if (hasTenantAccess) {
      return {
        'tenants.tenant': {
          equals: selectedTenant,
        },
      }
    }
  }

  const or: Where[] = []
  if (currentUserID !== undefined) {
    or.push({
      id: {
        equals: currentUserID,
      },
    })
  }
  or.push({
    'tenants.tenant': {
      in: adminTenantAccessIDs,
    },
  })

  return {
    or,
  } as Where
}
