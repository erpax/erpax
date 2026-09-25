/**
 * Canonical Access Predicates — a RE-EXPORT, because a policy has one address.
 *
 * This file used to DEFINE four predicates and claim that "all access control in the codebase
 * routes through these helpers". Measured 2026-09-25: no collection imported it, while 233 access
 * legs routed through `@/auth`, `@/authenticated`, `@/anyone`, `@/is/super/admin` and
 * `@/tenant/scoped/read`. Two of its definitions had diverged from the live ones under the same
 * names. See ./SKILL.md.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 § 5.15 access-control
 * @security ISO-27002 § 5.18 access-rights
 * @security ISO-27002 § 8.2 privileged-access-rights
 */

import type { Access } from 'payload'
import { adminOnly as canonicalAdminOnly, multiTenantRead } from '@/auth'
import { superAdminOnly, isSuperAdmin as canonicalIsSuperAdmin } from '@/is/super/admin'

export { authenticated } from '@/authenticated'

/** Does this user hold the super-admin role — the canonical predicate. */
export const userIsSuperAdmin = (user: unknown): boolean => canonicalIsSuperAdmin(user)

/** Super-admin only. The privileged-role policy, defined once in `@/is/super/admin`. */
export const isSuperAdmin: Access = superAdminOnly

/** Admin or super-admin. Defined once in `@/auth`, sourced from the role registry. */
export const adminOnly: Access = canonicalAdminOnly

/**
 * Read within the caller's own tenant.
 *
 * Aliases `@/auth`'s `multiTenantRead`. The definition this replaced also returned `true` for a
 * super-admin; that bypass is the separate `isSuperAdmin` policy above, and it had no caller here.
 */
export const tenantScoped: Access = multiTenantRead
