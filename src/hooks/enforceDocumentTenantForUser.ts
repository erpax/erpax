import type { CollectionBeforeChangeHook } from 'payload'

import { isSuperAdmin } from '@/access/isSuperAdmin'
import type { Tenant } from '@/payload-types'
import { extractID } from '@/utilities/extractID'
import { apiErr, ERR } from '@/utilities/errors'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'

/**
 * Block document assignment to a tenant the user doesn't belong to.
 *
 * Super-admins unrestricted. Complements `@payloadcms/plugin-multi-tenant`
 * access, which doesn't always reject creates that target another tenant.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.4
 */
export const enforceDocumentTenantForUser: CollectionBeforeChangeHook = ({ req, data }) => {
  if (!req.user || !data || typeof data !== 'object') return data
  if (isSuperAdmin(req.user)) return data

  const record = data as Record<string, unknown>
  if (!('tenant' in record) || record.tenant === undefined || record.tenant === null) {
    return data
  }

  const tenantId = extractID(record.tenant as Tenant | Tenant['id'])
  const allowed = getUserTenantIDs(req.user)
  if (!allowed.includes(tenantId)) {
    throw apiErr(ERR.TENANT_DOCUMENT_FORBIDDEN)
  }

  return data
}
