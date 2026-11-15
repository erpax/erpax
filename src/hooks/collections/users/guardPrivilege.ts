import { APIError, type CollectionBeforeChangeHook } from 'payload'

import { isSuperAdmin } from '@/access/collections/shared/superAdminOnly'
import { extractID } from '@/utilities/extract/id'
import { getUserTenantIDs } from '@/utilities/get/user/tenant/i/ds'

/**
 * Who may make what of a user. Field access decides which fields a caller may send; this decides
 * what the result may be, so no combination of fields gets around it.
 *
 *   · Super-admin is derived (`admin` with no tenant), so only a super-admin may produce one — not a
 *     tenant admin creating a user with `roles: ['admin']` and no tenants, and not a tenant-bound
 *     admin clearing its own `tenants`.
 *   · A membership row (a tenant and the roles in it) may be added, removed or changed only by an
 *     admin of that tenant — not by the member itself, and not into a tenant the caller does not run.
 *
 * The genesis user is exempt: the first user is super-admin by definition (firstUserSuperAdmin marks
 * it). So is trusted server code: the local API with no user (seeds, jobs). Every request from
 * outside (REST, GraphQL, MCP) is held to the rule, signed in or not.
 *
 * @security ISO-27002 §5.15 §5.18 access-control privilege-escalation
 * @standard NIST INCITS-359-2012 role-based-access-control
 */

type Row = { tenant?: unknown; roles?: unknown }

/** Each tenant a user belongs to, with its roles in a comparable form. */
const membership = (rows: unknown): Map<string, string> =>
  new Map(
    (Array.isArray(rows) ? (rows as Row[]) : [])
      .filter((row) => row?.tenant)
      .map((row) => [String(extractID(row.tenant as never)), (Array.isArray(row.roles) ? [...row.roles] : []).sort().join(',')]),
  )

/** The tenants whose membership row differs between two versions of a user. */
export const changedTenants = (before: unknown, after: unknown): string[] => {
  const was = membership(before)
  const is = membership(after)
  return [...new Set([...was.keys(), ...is.keys()])].filter((tenant) => was.get(tenant) !== is.get(tenant))
}

/** Why the actor may not turn `before` into `after`, or undefined when it may. */
export const privilegeError = ({ actor, before, after }: { actor: unknown; before?: unknown; after: unknown }): string | undefined => {
  if (isSuperAdmin(actor)) return undefined
  if (isSuperAdmin(after)) return 'Only a super-admin can make a super-admin (the admin role with no tenant).'
  const runs = new Set(getUserTenantIDs(actor, 'admin').map(String))
  const outside = changedTenants((before as { tenants?: unknown })?.tenants, (after as { tenants?: unknown })?.tenants).filter(
    (tenant) => !runs.has(tenant),
  )
  if (outside.length) return 'A tenant membership can only be changed by an admin of that tenant.'
  return undefined
}

export const guardPrivilege: CollectionBeforeChangeHook = ({ data, originalDoc, req }) => {
  const trusted = !req.user && req.payloadAPI === 'local'
  // An anonymous caller from outside (only the genesis request gets this far) sends credentials only.
  if (!req.user && !trusted && data) {
    delete (data as { enableAPIKey?: unknown }).enableAPIKey
    delete (data as { apiKey?: unknown }).apiKey
  }
  if (req.context?.genesis || trusted) return data
  const after = { ...(originalDoc ?? {}), ...(data ?? {}) }
  const error = privilegeError({ actor: req.user, before: originalDoc, after })
  if (error) throw new APIError(error, 403)
  return data
}
