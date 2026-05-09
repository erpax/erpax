import type { Access } from 'payload'

import { getAllowPublicReadTenantIds } from '@/access/allowPublicReadTenants'
import { commerceHasStaffRole } from '@/ecommerce/access/utilities'

/**
 * Ecommerce read predicate — staff see all statuses, anonymous see only
 * published rows for `allowPublicRead = true` tenants.
 *
 * Blocks cross-tenant product enumeration via open REST/GraphQL.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 * @see docs/STANDARDS.md §4.4
 */
export const adminOrPublishedStatus: Access = async ({ req }) => {
  if (commerceHasStaffRole(req.user)) {
    return true
  }

  const ids = await getAllowPublicReadTenantIds(req.payload)
  if (ids.length === 0) {
    return false
  }

  return {
    and: [
      {
        _status: {
          equals: 'published',
        },
      },
      {
        tenant: {
          in: ids,
        },
      },
    ],
  }
}
