import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Compute the platform owner — the genesis super-admin, by itself.
 *
 * The FIRST user IS super-admin, computed from the EMPTY-CASE IDENTITY ("all is
 * defined even when nothing is defined"): when the user set is empty
 * (count === 0), the user being created is the genesis owner and the super-admin
 * role is computed in — never hand-assigned. The instant a user exists, the empty
 * case closes and roles are governed normally.
 *
 * Respects the no-bypass law: the role is REAL (the multi-tenant plugin's
 * `userHasAccessToAllTenants = isSuperAdmin` then grants the genesis tenant
 * through the plugin, not around it) — it simply computes itself from the state
 * instead of being set by an external bootstrap step.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control privileged-role
 * @security ISO-27001 A.5.18 access-rights genesis-owner
 * @audit ISO-19011:2018 audit-trail genesis
 */
export const firstUserSuperAdmin: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== 'create') return data
  const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
  if (totalDocs > 0) return data // not the genesis — the empty case has closed
  const current = (data as { roles?: unknown }).roles
  const roles = Array.isArray(current) ? (current as string[]) : []
  // Grant the `admin` role only — super-admin then DERIVES from admin + the empty
  // tenant scope (isSuperAdmin). No stored super-admin role; nothing hand-assigned.
  if (!roles.includes('admin')) {
    ;(data as { roles?: string[] }).roles = [...roles, 'admin']
  }
  return data
}
