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

export type UserRole = 'super-admin' | 'admin' | 'user' | 'customer' | 'accountant' | 'auditor' | 'viewer'

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
