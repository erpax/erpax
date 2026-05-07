import type { User } from '@/payload-types'

/** Global CMS roles that can manage ecommerce (aligned with plugin-ecommerce `isAdmin`). */
const GLOBAL_STAFF_ROLES = ['super-admin', 'admin'] as const

export function commerceHasTenantAdminRole(user?: User | null): boolean {
  return Boolean(user?.tenants?.some((row) => row.roles?.includes('tenant-admin')))
}

export function commerceHasStaffRole(user?: User | null): boolean {
  if (!user) return false
  if (GLOBAL_STAFF_ROLES.some((r) => user.roles?.includes(r as User['roles'][number]))) {
    return true
  }
  return commerceHasTenantAdminRole(user)
}

export function commerceHasCustomerRole(user?: User | null): boolean {
  if (!user?.roles?.length) return false
  return user.roles.includes('customer' as User['roles'][number])
}
