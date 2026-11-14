/**
 * Mutations for Payload `roles` definitions and the assignments on `users.roleAssignments`.
 *
 * @standard NIST INCITS-359-2012 §5.2 administrative-functions
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @audit ISO-19011:2018 audit-trail role-assignment
 */

import type { Payload, PayloadRequest, Where } from 'payload'

import type { Role } from '@/utilities/types'
import { extractID } from '@/utilities/extract/id'

import type { ScopeResourceCollection } from '@/utilities/nist/incits/359/types'

/**
 * Rolify role scopes (`Role.global` · `Role.class_scoped` · `Role.instance_scoped`) as Payload
 * where-clauses over the `roles` collection.
 */
export const roleScope = {
  global: (): Where[] => [{ binding: { equals: 'global' } }],
  collection: (collection?: string): Where[] => [{ binding: { equals: 'collection' } }, ...(collection ? [{ scopedCollection: { equals: collection } }] : [])],
  document: (resource?: { collection: string; id?: string }): Where[] => [
    { binding: { equals: 'document' } },
    ...(resource ? [{ 'resource.relationTo': { equals: resource.collection } }] : []),
    ...(resource?.id !== undefined ? [{ 'resource.value': { equals: resource.id } }] : []),
  ],
}

export type AddRoleResource =
  | undefined
  | ScopeResourceCollection
  | { collection: ScopeResourceCollection; id: string }

async function findRoleDefinition(
  payload: Payload,
  req: PayloadRequest,
  roleName: string,
  resource: AddRoleResource,
  overrideAccess: boolean,
): Promise<Role | null> {
  const baseWhere: Where = {
    name: { equals: roleName },
  }

  if (resource === undefined) {
    const r = await payload.find({
      collection: 'roles',
      depth: 0,
      limit: 1,
      overrideAccess,
      req,
      where: {
        and: [baseWhere, { binding: { equals: 'global' } }],
      },
    })
    return (r.docs[0] as Role | undefined) ?? null
  }

  if (typeof resource === 'string') {
    const r = await payload.find({
      collection: 'roles',
      depth: 0,
      limit: 1,
      overrideAccess,
      req,
      where: {
        and: [
          baseWhere,
          { binding: { equals: 'collection' } },
          { scopedCollection: { equals: resource } },
        ],
      },
    })
    return (r.docs[0] as Role | undefined) ?? null
  }

  // Ask for the exact document role. (This used to load 20 roles of that name and match in memory,
  // which silently missed the 21st — and a party role such as `buyer` exists once per document.)
  const { collection, id } = resource
  const r = await payload.find({
    collection: 'roles',
    depth: 0,
    limit: 1,
    overrideAccess,
    req,
    where: { and: [baseWhere, ...roleScope.document({ collection, id })] },
  })
  return (r.docs[0] as Role | undefined) ?? null
}

async function createRoleDefinition(
  payload: Payload,
  req: PayloadRequest,
  roleName: string,
  resource: AddRoleResource,
  overrideAccess: boolean,
): Promise<Role> {
  let data: Partial<Role>
  if (resource === undefined) {
    data = {
      name: roleName,
      binding: 'global',
      scopedCollection: null,
      resource: undefined,
    }
  } else if (typeof resource === 'string') {
    data = {
      name: roleName,
      binding: 'collection',
      scopedCollection: resource,
      resource: undefined,
    }
  } else {
    data = {
      name: roleName,
      binding: 'document',
      scopedCollection: null,
      resource: {
        relationTo: resource.collection,
        value: resource.id,
      } as Role['resource'],
    }
  }

  const created = await payload.create({
    collection: 'roles',
    data: data as Role,
    overrideAccess,
    req,
  })
  return created as Role
}

async function findOrCreateRoleDefinition(
  payload: Payload,
  req: PayloadRequest,
  roleName: string,
  resource: AddRoleResource,
  overrideAccess: boolean,
): Promise<Role> {
  const found = await findRoleDefinition(payload, req, roleName, resource, overrideAccess)
  if (found) return found
  return createRoleDefinition(payload, req, roleName, resource, overrideAccess)
}

/** Rolify callbacks: `before_add` · `after_add` · `before_remove` · `after_remove`. */
export interface RoleCallbacks {
  beforeAdd?: (role: Role, userId: string) => void | Promise<void>
  afterAdd?: (role: Role, userId: string) => void | Promise<void>
  beforeRemove?: (role: Role, userId: string) => void | Promise<void>
  afterRemove?: (role: Role, userId: string) => void | Promise<void>
}

export type MutationArgs = {
  userId: string
  roleName: string
  resource?: AddRoleResource
  /** Default true — system / admin callers. */
  overrideAccess?: boolean
  /** Run around the write; not run when the write is a no-op (role already held / not held). */
  callbacks?: RoleCallbacks
}

/** The ids of the role definitions a user holds — `users.roleAssignments`, read past field access. */
export async function assignedRoleIds(payload: Payload, req: PayloadRequest, userId: string): Promise<string[]> {
  const user = await payload.findByID({ collection: 'users', id: userId, depth: 0, overrideAccess: true, req })
  const held = (user as { roleAssignments?: unknown } | null)?.roleAssignments
  return Array.isArray(held) ? held.map((role) => String(extractID(role as never))) : []
}

const writeAssignments = (payload: Payload, req: PayloadRequest, userId: string, ids: string[], overrideAccess: boolean) =>
  payload.update({ collection: 'users', id: userId, data: { roleAssignments: ids } as never, depth: 0, overrideAccess, req })

/** Assign a role definition to a user. The assignments are a set: granting a role already held writes nothing. */
export async function addRole(payload: Payload, req: PayloadRequest, args: MutationArgs): Promise<void> {
  const overrideAccess = args.overrideAccess !== false
  const roleDoc = await findOrCreateRoleDefinition(
    payload,
    req,
    args.roleName,
    args.resource,
    overrideAccess,
  )
  const role = String(roleDoc.id)
  const held = await assignedRoleIds(payload, req, args.userId)
  if (held.includes(role)) return
  await args.callbacks?.beforeAdd?.(roleDoc, args.userId)
  await writeAssignments(payload, req, args.userId, [...held, role], overrideAccess)
  await args.callbacks?.afterAdd?.(roleDoc, args.userId)
}

/** Alias for {@link addRole}. */
export const grant = addRole

/** Remove the matching role definition from the user's assignments. Revoking a role not held writes nothing. */
export async function removeRole(payload: Payload, req: PayloadRequest, args: MutationArgs): Promise<void> {
  const overrideAccess = args.overrideAccess !== false
  const roleDoc = await findRoleDefinition(payload, req, args.roleName, args.resource ?? undefined, overrideAccess)
  if (!roleDoc) return
  const role = String(roleDoc.id)
  const held = await assignedRoleIds(payload, req, args.userId)
  if (!held.includes(role)) return
  await args.callbacks?.beforeRemove?.(roleDoc, args.userId)
  await writeAssignments(payload, req, args.userId, held.filter((id) => id !== role), overrideAccess)
  await args.callbacks?.afterRemove?.(roleDoc, args.userId)
}

/** Alias for {@link removeRole}. */
export const revoke = removeRole

// ─── finders: the user side (Rolify `User.with_role` …) ─────────────────────

const allPages = async <T,>(payload: Payload, req: PayloadRequest, collection: 'roles' | 'users', where: Where, depth = 0): Promise<T[]> => {
  const out: T[] = []
  for (let page = 1; ; page++) {
    const r = await payload.find({ collection, where, depth, limit: 500, page, overrideAccess: true, req })
    out.push(...(r.docs as T[]))
    if (!r.hasNextPage) return out
  }
}

/** The where-clauses that select the role definitions matching a name and a resource argument. */
const definitionWhere = (roleName: string | undefined, resource: AddRoleResource | 'any'): Where => {
  const name: Where[] = roleName === undefined ? [] : [{ name: { equals: roleName } }]
  if (resource === 'any') return name.length ? { and: name } : {}
  if (resource === undefined) return { and: [...name, ...roleScope.global()] }
  if (typeof resource === 'string') return { and: [...name, ...roleScope.collection(resource)] }
  return { and: [...name, ...roleScope.document(resource)] }
}

/**
 * Rolify `find_roles` — the role definitions matching a name and/or a resource. `'any'` ignores
 * the scope; `undefined` means global.
 */
export async function findRoles(payload: Payload, req: PayloadRequest, args: { roleName?: string; resource?: AddRoleResource | 'any' } = {}): Promise<Role[]> {
  return allPages<Role>(payload, req, 'roles', definitionWhere(args.roleName, args.resource === undefined && !('resource' in args) ? 'any' : args.resource))
}

/** Rolify `user.roles` — the role definitions a user holds, populated, ready for the predicates. */
export async function rolesOf(payload: Payload, req: PayloadRequest, userId: string): Promise<Role[]> {
  const user = await payload.findByID({ collection: 'users', id: userId, depth: 1, select: { roleAssignments: true }, overrideAccess: true, req })
  const held = (user as { roleAssignments?: unknown } | null)?.roleAssignments
  return Array.isArray(held) ? (held.filter((role) => role !== null && typeof role === 'object') as Role[]) : []
}

const userIdsHolding = async (payload: Payload, req: PayloadRequest, roleIds: string[]): Promise<string[]> => {
  if (roleIds.length === 0) return []
  const users = await allPages<{ id: string | number }>(payload, req, 'users', { roleAssignments: { in: roleIds } })
  return users.map((user) => String(user.id))
}

/** Rolify `User.with_role(role, resource)` — ids of the users holding the role on that scope. */
export async function usersWithRole(payload: Payload, req: PayloadRequest, roleName: string, resource?: AddRoleResource | 'any'): Promise<string[]> {
  const definitions = await allPages<Role>(payload, req, 'roles', definitionWhere(roleName, resource))
  return userIdsHolding(payload, req, definitions.map((role) => String(role.id)))
}

/** Rolify `User.with_any_role` — users holding at least one of the (global) roles named. */
export async function usersWithAnyRole(payload: Payload, req: PayloadRequest, roleNames: string[]): Promise<string[]> {
  const found = await Promise.all(roleNames.map((name) => usersWithRole(payload, req, name)))
  return [...new Set(found.flat())]
}

/** Rolify `User.with_all_roles` — users holding every one of the (global) roles named. */
export async function usersWithAllRoles(payload: Payload, req: PayloadRequest, roleNames: string[]): Promise<string[]> {
  if (roleNames.length === 0) return []
  const found = await Promise.all(roleNames.map((name) => usersWithRole(payload, req, name)))
  return found.reduce((all, next) => all.filter((id) => next.includes(id)))
}

/** Rolify `User.without_role` — users NOT holding the role on that scope. */
export async function usersWithoutRole(payload: Payload, req: PayloadRequest, roleName: string, resource?: AddRoleResource | 'any'): Promise<string[]> {
  const holding = new Set(await usersWithRole(payload, req, roleName, resource))
  const everyone = await allPages<{ id: string | number }>(payload, req, 'users', {})
  return everyone.map((user) => String(user.id)).filter((id) => !holding.has(id))
}

// ─── the resource side (Rolify `resourcify`) ───────────────────────────────

const documentIdOf = (role: Role): string | undefined => {
  const resource = role.resource as { value?: unknown } | null | undefined
  const value = resource?.value
  const id = value !== null && typeof value === 'object' ? (value as { id?: unknown }).id : value
  return typeof id === 'string' || typeof id === 'number' ? String(id) : undefined
}

/**
 * Rolify `Resource.with_role(role, user)` — ids of the documents in a collection on which the
 * role(s) are held; with `userId`, only those THAT user holds them on. One query for the role
 * definitions, at most one read of the user.
 */
export async function resourcesWithRole(payload: Payload, req: PayloadRequest, collection: string, roleName: string | readonly string[], userId?: string): Promise<string[]> {
  const names = Array.isArray(roleName) ? [...roleName] : [roleName as string]
  if (names.length === 0) return []
  if (userId !== undefined) {
    const held = await rolesOf(payload, req, userId)
    const ids = held
      .filter((role) => role.binding === 'document' && names.includes(role.name) && (role.resource as { relationTo?: string } | null)?.relationTo === collection)
      .map(documentIdOf)
    return [...new Set(ids.filter((id): id is string => id !== undefined))]
  }
  const definitions = await allPages<Role>(payload, req, 'roles', { and: [{ name: { in: names } }, ...roleScope.document({ collection })] })
  return [...new Set(definitions.map(documentIdOf).filter((id): id is string => id !== undefined))]
}

/** Rolify `resource.roles` — the role definitions scoped to exactly this document. */
export async function rolesOn(payload: Payload, req: PayloadRequest, resource: { collection: string; id: string }): Promise<Role[]> {
  return allPages<Role>(payload, req, 'roles', { and: roleScope.document(resource) })
}

/**
 * Rolify `resource.applied_roles` — every role that applies to this document: its own, the ones
 * scoped to its whole collection, and the global ones.
 */
export async function appliedRoles(payload: Payload, req: PayloadRequest, resource: { collection: string; id: string }): Promise<Role[]> {
  return allPages<Role>(payload, req, 'roles', {
    or: [{ and: roleScope.document(resource) }, { and: roleScope.collection(resource.collection) }, { and: roleScope.global() }],
  })
}
