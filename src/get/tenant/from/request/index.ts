/**
 * Resolve the active tenant document from the `payload-tenant` cookie
 * (same convention as the Payload multi-tenant plugin).
 *
 * @rfc 6265 http-state-management cookies
 * @standard NIST INCITS-359-2012 role-based-access-control tenant-scope
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 */

import configPromise from '@payload-config'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import { getPayload } from 'payload'

import type { Tenant } from '@/types'

/**
 * Resolve the active tenant document from the `payload-tenant` cookie.
 */
export async function getTenantFromRequest(headers: Headers): Promise<Tenant | null> {
  const tenantId = getTenantFromCookie(headers, 'number')
  if (tenantId === null || tenantId === undefined) return null

  const payload = await getPayload({ config: configPromise })

  try {
    const tenant = await payload.findByID({
      collection: 'tenants',
      id: tenantId,
      depth: 0,
    })
    return tenant
  } catch {
    return null
  }
}
