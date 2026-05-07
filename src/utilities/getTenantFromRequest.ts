import configPromise from '@payload-config'
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import { getPayload } from 'payload'

import type { Tenant } from '@/payload-types'

/**
 * Resolve the active tenant document from the `payload-tenant` cookie (same as Payload multi-tenant plugin).
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
