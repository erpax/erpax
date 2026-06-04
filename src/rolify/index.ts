/**
 * rolify — party/type roles ON documents (the Rolify port: instance-scoped roles).
 *
 * A document HAS roles — seller, buyer, carrier… — and many users belong to each, assigned via
 * `UserRoles` scoped to that document (`Roles.binding='document'`, `resource=<doc>`). The role
 * carries the TYPE/LOGIC (skillRoutes), not access (capability stays empty) — "all accountable
 * through roles". This is Rolify's instance-scoped role (`has_role?(:seller, @invoice)`), which
 * etrima_production runs as `roles(name, resource_type, resource_id)` + `admin_users_roles`.
 *
 * @standard NIST INCITS-359 RBAC (resource-scoped roles)
 * @standard EN-16931 business-terms (the party roles BG-4 Seller / BG-7 Buyer / BG-10 Payee …)
 * @see src/collections/Roles  ·  src/collections/Roles/UserRoles  ·  .claude/skills/access
 */
import type { Payload } from 'payload'

/**
 * The canonical document party-roles (EN-16931 / UBL business terms). These are TYPE/LOGIC roles:
 * `capability` is empty (they confer no access by themselves) and `skillRoutes` carry the party
 * logic. Seed them per-document with `binding: 'document'` + `resource: <the doc>`.
 */
export const PARTY_ROLES = [
  { name: 'seller', term: 'EN-16931 BG-4 Seller', skillRoutes: ['commerce/party/seller'] },
  { name: 'buyer', term: 'EN-16931 BG-7 Buyer', skillRoutes: ['commerce/party/buyer'] },
  { name: 'payee', term: 'EN-16931 BG-10 Payee', skillRoutes: ['commerce/party/payee'] },
  { name: 'tax-representative', term: 'EN-16931 BG-11 Seller tax representative', skillRoutes: ['tax/representative'] },
  { name: 'deliver-to', term: 'EN-16931 BG-13 Deliver-to (consignee)', skillRoutes: ['commerce/party/consignee'] },
  { name: 'carrier', term: 'UBL Carrier', skillRoutes: ['commerce/party/carrier'] },
  { name: 'supplier', term: 'UBL Supplier', skillRoutes: ['commerce/party/supplier'] },
  { name: 'agent', term: 'UBL Agent', skillRoutes: ['commerce/party/agent'] },
] as const

export type PartyRoleName = (typeof PARTY_ROLES)[number]['name']

/** A reference to the document a role is scoped to (polymorphic). */
export interface ResourceRef {
  readonly relationTo: string
  readonly id: string | number
}

interface RoleRow {
  readonly id: string | number
  readonly name: string
  readonly resource?: { relationTo?: string; value?: string | number } | null
}

const sameResource = (row: RoleRow, resource: ResourceRef): boolean =>
  row.resource?.relationTo === resource.relationTo && String(row.resource?.value) === String(resource.id)

/**
 * The document-scoped Role rows bound to a resource (optionally filtered by name) — "the roles a
 * document has". Filters the polymorphic `resource` in code (relationTo + value) so it is robust
 * across Payload query-syntax versions.
 */
export const rolesScopedTo = async (
  payload: Payload,
  resource: ResourceRef,
  name?: string,
): Promise<ReadonlyArray<{ id: string; name: string }>> => {
  const res = (await payload.find({
    collection: 'roles',
    depth: 0,
    limit: 500,
    overrideAccess: true,
    where: {
      and: [{ binding: { equals: 'document' } }, ...(name ? [{ name: { equals: name } }] : [])],
    },
  })) as unknown as { docs: RoleRow[] }
  return res.docs
    .filter((row) => sameResource(row, resource) && (name === undefined || row.name === name))
    .map((row) => ({ id: String(row.id), name: row.name }))
}

/** The party-role names a document carries (e.g. `['seller','buyer']`). */
export const partiesOf = async (payload: Payload, resource: ResourceRef): Promise<ReadonlyArray<string>> =>
  (await rolesScopedTo(payload, resource)).map((r) => r.name)

/**
 * Rolify `has_role?(:name, resource)` — does `userId` play role `name` on `resource`?
 * True iff a `binding:'document'` Role with that name is bound to the resource AND the user is
 * assigned to it via `user-roles`.
 */
export const hasRoleOn = async (
  payload: Payload,
  args: { userId: string | number; name: string; resource: ResourceRef },
): Promise<boolean> => {
  const roles = await rolesScopedTo(payload, args.resource, args.name)
  if (roles.length === 0) return false
  const res = (await payload.find({
    collection: 'user-roles',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      and: [{ role: { in: roles.map((r) => r.id) } }, { user: { equals: args.userId } }],
    },
  })) as unknown as { docs: unknown[] }
  return res.docs.length > 0
}
