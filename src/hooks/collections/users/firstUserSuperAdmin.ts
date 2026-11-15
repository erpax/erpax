import { Forbidden, type CollectionBeforeChangeHook, type CollectionBeforeOperationHook } from 'payload'

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
  // guardPrivilege reads this: the genesis user is super-admin by definition, not by a caller's say-so
  req.context.genesis = true
  const current = (data as { roles?: unknown }).roles
  const roles = Array.isArray(current) ? (current as string[]) : []
  // Grant the `admin` role only — super-admin then DERIVES from admin + the empty
  // tenant scope (isSuperAdmin). No stored super-admin role; nothing hand-assigned.
  if (!roles.includes('admin')) {
    ;(data as { roles?: string[] }).roles = [...roles, 'admin']
  }
  return data
}

/** What the first user brings: credentials. Everything else is derived (super-admin, defaults). */
export const CREDENTIALS = ['email', 'password'] as const

/** The owner the first user must be, when ERPAX_OWNER_EMAIL is set (the Cloudflare account's address). */
export const ownerEmail = (): string | undefined => process.env.ERPAX_OWNER_EMAIL?.trim().toLowerCase() || undefined

/** The data an anonymous create keeps: its credentials, and only for the owner when one is set. */
export const genesisData = (data: Record<string, unknown> | undefined, owner = ownerEmail()): Record<string, unknown> | undefined => {
  if (owner && String(data?.email ?? '').trim().toLowerCase() !== owner) return undefined
  return Object.fromEntries(CREDENTIALS.filter((key) => data?.[key] !== undefined).map((key) => [key, data?.[key]]))
}

/**
 * The first user is super-admin by definition, so tenants, roles, keys and the rest of the account
 * are not the first caller's to set. Payload's first-register creates with `overrideAccess: true`,
 * past collection and field access, so this runs before the operation: an anonymous create from
 * outside keeps its credentials only, and firstUserSuperAdmin and the defaults derive the rest. With
 * ERPAX_OWNER_EMAIL set, only that address may be the first user.
 */
export const firstUserCredentials: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (operation !== 'create' || req.user || req.payloadAPI === 'local') return args
  const data = genesisData(args.data as Record<string, unknown> | undefined)
  if (!data) throw new Forbidden(req.t)
  return { ...args, data }
}
