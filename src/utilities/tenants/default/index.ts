import type { PayloadRequest } from 'payload'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'

import { getUserTenantIDs } from '@/utilities/get/user/tenant/i/ds'

/**
 * The tenant a new document gets when it names none: the tenant selected in the cookie when the
 * user may read it, else the user's first tenant. This is the plugin's own default plus the fallback
 * the plugin keeps for autosave collections only, so a request with no cookie (an agent through MCP,
 * the REST API) still lands in a tenant. A default fills a missing value only: an update never moves
 * a document to another tenant.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
export const tenantDefault = async ({ req }: { req: PayloadRequest }): Promise<number | string | null> => {
  const idType = req.payload.collections.tenants?.customIDType ?? req.payload.db.defaultIDType
  const selected = getTenantFromCookie(req.headers, idType === 'number' ? 'number' : 'text')
  if (!selected) return getUserTenantIDs(req.user)[0] ?? null
  const { totalDocs } = await req.payload.count({ collection: 'tenants', overrideAccess: false, req, user: req.user, where: { id: { in: [selected] } } })
  return totalDocs > 0 ? selected : null
}
