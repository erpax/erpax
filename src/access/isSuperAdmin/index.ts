/**
 * Super-admin access predicates — global role check (`super-admin`).
 *
 * @standard NIST INCITS-359-2012 role-based-access-control privileged-role
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.2 privileged-access-rights
 * @compliance SOC-2 CC6.3 privileged-access-management
 * @see src/standards/iso-27002/types.ts
 * @see docs/STANDARDS.md §4.4
 */

import type { Access, FieldAccess } from 'payload'
import type { Iso27002ControlId } from '../../standards/iso-27002'
import { getUserTenantIDs } from '../../utilities/getUserTenantIDs'

/**
 * Canonical ISO 27002 controls this predicate exercises:
 *   5.15 — Access control
 *   5.18 — Access rights (super-admin is the highest tier)
 *   8.2  — Privileged access rights (the canonical control for super-admin)
 */
export const controlsApplied: ReadonlyArray<Iso27002ControlId> = [
  '5.15',
  '5.18',
  '8.2',
] as const

export const isSuperAdminAccess: Access = ({ req }): boolean => {
  return isSuperAdmin(req.user)
}

export const isSuperAdminFieldAccess: FieldAccess = ({ req }): boolean => {
  return isSuperAdmin(req.user)
}

export const isSuperAdmin = (user: unknown): boolean => {
  if (!user || typeof user !== 'object' || !('roles' in user)) return false
  const roles = (user as { roles?: unknown }).roles
  // super-admin is DERIVED, never a stored role: an `admin` with an EMPTY tenant
  // scope IS the platform (system) admin — "if tenant is empty and role admin it
  // is super-admin by architecture". An admin bound to a tenant is a tenant-admin.
  // (Upstream erpax: admin? = system? || role == 'admin', domain-scoped.)
  if (!Array.isArray(roles) || !roles.includes('admin')) return false
  return getUserTenantIDs(user).length === 0
}
