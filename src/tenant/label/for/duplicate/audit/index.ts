import type { PayloadRequest } from 'payload'

import { isSuperAdmin } from '@/is/super/admin'
import { getUserTenantIDs } from '@/get/user/tenant/i/ds'

/**
 * Tenant display name for duplicate-* audit logs when the actor may manage multiple tenants.
 */
export async function tenantLabelForDuplicateAudit(
  req: PayloadRequest,
  tenantId: number | string | null | undefined,
): Promise<string | undefined> {
  if (tenantId === null || tenantId === undefined || !req.user) {
    return undefined
  }
  if (!isSuperAdmin(req.user) && getUserTenantIDs(req.user).length <= 1) {
    return undefined
  }
  const doc = await req.payload.findByID({
    id: tenantId,
    collection: 'tenants',
  })
  return typeof doc.name === 'string' ? doc.name : undefined
}
