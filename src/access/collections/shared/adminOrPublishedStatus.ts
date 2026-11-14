import type { Access, Where } from 'payload'

import { getAllowPublicReadTenantIds } from '@/utilities/allow/public/read/tenant'
import { commerceHasStaffRole } from '@/components/ecommerce/access/utilities'

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

  // No public tenant → an empty `in`, which matches nothing: the list is empty, never a refusal.
  const ids = await getAllowPublicReadTenantIds(req.payload)

  const where: Where = {
    and: [{ _status: { equals: 'published' } }, { tenant: { in: ids } }],
  }
  return where
}
