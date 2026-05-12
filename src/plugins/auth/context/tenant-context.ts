/**
 * Tenant Context — derives user's active tenant from Payload request.
 *
 * REPLACES all `req.payload.requestContext` references (which don't exist).
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 § 5.15 access-control
 */

import type { PayloadRequest } from 'payload'

export type TenantContext = {
  readonly tenantId: string
  readonly userId: string
  readonly userRoles: readonly string[]
  readonly isSuperAdmin: boolean
}

/**
 * Derive tenant context from request user.
 *
 * Extracts tenant ID from `req.user.tenants[0]?.tenant` (canonical shape per
 * @payloadcms/plugin-multi-tenant). Throws if user has no tenant access.
 *
 * @param req Payload request with authenticated user
 * @returns TenantContext with tenant ID + roles
 * @throws Error if user has no tenant access
 */
export const getTenantContext = (req: PayloadRequest): TenantContext => {
  if (!req.user) {
    throw new Error('User not authenticated')
  }

  const tenantsArr = (req.user as any).tenants as Array<{ tenant?: string }> | undefined
  const firstTenant = tenantsArr?.[0]?.tenant

  if (!firstTenant) {
    throw new Error('User has no tenant access')
  }

  return {
    tenantId: firstTenant,
    userId: req.user.id,
    userRoles: (req.user as any).roles ?? [],
    isSuperAdmin: ((req.user as any).roles ?? []).includes('super-admin'),
  }
}
