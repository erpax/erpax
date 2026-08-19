/**
 * Tenant Context — derives user's active tenant from Payload request.
 *
 * REPLACES all `req.payload.requestContext` references (which don't exist).
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 § 5.15 access-control
 */

import type { PayloadRequest } from 'payload'
import { isPayloadUser, SUPER_ADMIN_ROLE } from '@/types/auth'

export type TenantContext = {
  /** User's primary active tenant identifier. */
  readonly tenantId: string
  /** Authenticated user's unique ID. */
  readonly userId: string
  /** All assigned roles for the authenticated user in this tenant. */
  readonly userRoles: readonly string[]
  /** True if user holds super-admin role (cross-tenant privileges). */
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
 * @throws Error if user has no tenant access or is not authenticated
 */
export const getTenantContext = (req: PayloadRequest): TenantContext => {
  if (!isPayloadUser(req.user)) {
    throw new Error('User not authenticated or missing tenant/role properties')
  }

  const firstTenant = req.user.tenants[0]?.tenant

  if (!firstTenant) {
    throw new Error(`User ${req.user.id} has no tenant access (tenants: ${req.user.tenants.length})`)
  }

  return {
    tenantId: firstTenant,
    userId: req.user.id,
    userRoles: [...req.user.roles],
    isSuperAdmin: req.user.roles.includes(SUPER_ADMIN_ROLE),
  }
}
