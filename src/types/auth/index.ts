/**
 * @erpax/auth/types — types for multi-tenant + role-based access control.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @see docs/STANDARDS.md §4.4
 */

import type { User } from '@/payload-types'

export const SUPER_ADMIN_ROLE = 'super-admin' as const

/**
 * Canonical global role union — DERIVED from the generated schema
 * (`User.roles[]`) so it can never drift from `src/collections/Users`.
 * The single source of truth for the role vocabulary; the SoD-aware
 * registry (`@/access/roles-registry`) keys off this same union.
 */
export type UserRole = NonNullable<User['roles']>[number]

export interface UserContext {
  id: string
  /** Active tenant id, derived from `req.user.tenants[0]?.tenant`. Empty string if the user has no tenant. */
  tenant: string
  roles: UserRole[]
}

export interface AccessResult {
  tenant?: { equals: string }
  [key: string]: unknown
}

/**
 * Type guard: narrow unknown to Payload user shape.
 *
 * Used to safely access `req.user` properties without `as any` casts.
 * Validates both presence and element types of arrays.
 */
export const isPayloadUser = (user: unknown): user is {
  readonly id: string
  readonly tenants: ReadonlyArray<{ readonly tenant?: string }>
  readonly roles: readonly string[]
} => {
  if (!user || typeof user !== 'object') return false
  if (!('id' in user && 'tenants' in user && 'roles' in user)) return false

  const u = user as Record<string, unknown>
  if (typeof u.id !== 'string' || !Array.isArray(u.tenants) || !Array.isArray(u.roles)) {
    return false
  }

  // Validate array element types
  return (
    u.tenants.every((t) =>
      typeof t === 'object' && t !== null &&
      (('tenant' in t && typeof (t as Record<string, unknown>).tenant === 'string') || !('tenant' in t))
    ) &&
    u.roles.every((r) => typeof r === 'string')
  )
}
