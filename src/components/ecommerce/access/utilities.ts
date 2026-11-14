/**
 * Ecommerce role-check helpers — staff vs customer determination.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @see docs/STANDARDS.md §4.4
 */

/** Global CMS roles that can manage ecommerce (aligned with plugin-ecommerce `isAdmin`). */
const GLOBAL_STAFF_ROLES = ['super-admin', 'admin'] as const

type UserLike = {
  roles?: string[]
  tenants?: Array<{ roles?: string[] }>
}

function asUserLike(user: unknown): UserLike | null {
  if (!user || typeof user !== 'object') return null
  return user as UserLike
}

export function commerceHasTenantAdminRole(user?: unknown): boolean {
  const maybeUser = asUserLike(user)
  if (!maybeUser?.tenants) return false
  return Boolean(maybeUser.tenants.some((row) => row.roles?.includes('admin')))
}

export function commerceHasStaffRole(user?: unknown): boolean {
  const maybeUser = asUserLike(user)
  if (!maybeUser) return false
  if (GLOBAL_STAFF_ROLES.some((r) => maybeUser.roles?.includes(r))) {
    return true
  }
  return commerceHasTenantAdminRole(maybeUser)
}

export function commerceHasCustomerRole(user?: unknown): boolean {
  const maybeUser = asUserLike(user)
  if (!maybeUser?.roles?.length) return false
  return maybeUser.roles.includes('customer')
}
