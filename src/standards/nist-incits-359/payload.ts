/**
 * Mutations for Payload `roles` + `user_roles` collections.
 *
 * @standard NIST INCITS-359-2012 §5.2 administrative-functions
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @audit ISO-19011:2018 audit-trail role-assignment
 */

import type { Payload, PayloadRequest, Where } from 'payload'

import type { Role } from '@/payload-types'
import { extractID } from '@/utilities/extractID'

import type { ScopeResourceCollection } from './types'

export type AddRoleResource =
  | undefined
  | ScopeResourceCollection
  | { collection: ScopeResourceCollection; id: number }

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

  const { collection, id } = resource
  const r = await payload.find({
    collection: 'roles',
    depth: 0,
    limit: 20,
    overrideAccess,
    req,
    where: {
      and: [baseWhere, { binding: { equals: 'document' } }],
    },
  })

  for (const doc of r.docs as Role[]) {
    const res = doc.resource
    if (!res || typeof res !== 'object' || !('relationTo' in res)) continue
    const rel = res as { relationTo: string; value: unknown }
    if (rel.relationTo !== collection) continue
    const vid =
      typeof rel.value === 'number'
        ? rel.value
        : rel.value &&
            typeof rel.value === 'object' &&
            'id' in rel.value &&
            typeof (rel.value as { id: unknown }).id === 'number'
          ? (rel.value as { id: number }).id
          : undefined
    if (vid === id) return doc
  }

  return null
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

export type MutationArgs = {
  userId: number
  roleName: string
  resource?: AddRoleResource
  /** Default true — system / admin callers. */
  overrideAccess?: boolean
}

/** Create user ↔ role assignment (duplicate rows prevented by `user_roles` hook). */
export async function addRole(payload: Payload, req: PayloadRequest, args: MutationArgs): Promise<void> {
  const overrideAccess = args.overrideAccess !== false
  const roleDoc = await findOrCreateRoleDefinition(
    payload,
    req,
    args.roleName,
    args.resource,
    overrideAccess,
  )

  await payload.create({
    collection: 'user-roles',
    data: {
      user: args.userId,
      role: roleDoc.id,
    },
    overrideAccess,
    req,
  })
}

/** Alias for {@link addRole}. */
export const grant = addRole

/** Remove matching assignment for user + role definition. */
export async function removeRole(payload: Payload, req: PayloadRequest, args: MutationArgs): Promise<void> {
  const overrideAccess = args.overrideAccess !== false
  const roleDoc = await findRoleDefinition(payload, req, args.roleName, args.resource ?? undefined, overrideAccess)
  if (!roleDoc) return

  const rows = await payload.find({
    collection: 'user-roles',
    depth: 0,
    limit: 50,
    overrideAccess,
    req,
    where: {
      and: [{ user: { equals: args.userId } }, { role: { equals: roleDoc.id } }],
    },
  })

  for (const row of rows.docs) {
    await payload.delete({
      collection: 'user-roles',
      id: extractID(row as { id: number }),
      overrideAccess,
      req,
    })
  }
}

/** Alias for {@link removeRole}. */
export const revoke = removeRole
