/**
 * Pure predicates over {@link RoleDefinition} rows (`roles` collection).
 *
 * @standard NIST INCITS-359-2012 §5 core-rbac-predicates
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 */

import type {
  AnyScope,
  RoleDefinition,
  RoleMatch,
  ScopeResourceCollection,
} from '../types'

function tupleFromDocument(resource: RoleDefinition['resource']): {
  collection: ScopeResourceCollection
  id: number
} | null {
  if (!resource || typeof resource !== 'object' || !('relationTo' in resource)) return null
  const r = resource as { relationTo: string; value: unknown }
  // Payload polymorphic relationship value: a scalar id (number OR string, per the DB's id type) or
  // a populated doc `{ id }`. Coerce a numeric string — D1/SQLite hand back string ids — so a document
  // binding stored as `value: '42'` still matches a query for id 42.
  const raw = r.value && typeof r.value === 'object' && 'id' in r.value ? (r.value as { id: unknown }).id : r.value
  const id = typeof raw === 'number' ? raw : typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : null
  if (id == null || !Number.isFinite(id)) return null
  return { collection: r.relationTo as ScopeResourceCollection, id }
}

/** Global binding only: definition applies app-wide for `roleName`. */
export function hasRole(definition: RoleDefinition, roleName: string): boolean

/** Any binding that carries `roleName`. */
export function hasRole(definition: RoleDefinition, roleName: string, anyToken: AnyScope): boolean

/** Non-strict: global, matching collection scope, or matching document scope for `roleName`. */
export function hasRole(
  definition: RoleDefinition,
  roleName: string,
  collection: ScopeResourceCollection,
): boolean

/** Non-strict instance check; global definition satisfies any resource. */
export function hasRole(
  definition: RoleDefinition,
  roleName: string,
  collection: ScopeResourceCollection,
  id: number,
): boolean

export function hasRole(
  definition: RoleDefinition,
  roleName: string,
  resourceOrAny?: ScopeResourceCollection | AnyScope,
  maybeId?: number,
): boolean {
  if (definition.name !== roleName) return false

  if (resourceOrAny === undefined && maybeId === undefined) {
    return definition.binding === 'global'
  }

  if (resourceOrAny === 'any') {
    return true
  }

  const collection = typeof resourceOrAny === 'string' ? resourceOrAny : undefined
  const id = maybeId

  if (collection !== undefined && id === undefined) {
    if (definition.binding === 'global') return true
    if (definition.binding === 'collection') {
      return definition.scopedCollection === collection
    }
    if (definition.binding === 'document') {
      const t = tupleFromDocument(definition.resource)
      return t?.collection === collection
    }
    return false
  }

  if (collection !== undefined && id !== undefined) {
    if (definition.binding === 'global') return true
    if (definition.binding === 'collection') {
      return definition.scopedCollection === collection
    }
    if (definition.binding === 'document') {
      const t = tupleFromDocument(definition.resource)
      return t?.collection === collection && t.id === id
    }
    return false
  }

  return false
}

/** Strict: global row only (name-only query). */
export function hasStrictRole(definition: RoleDefinition, roleName: string): boolean

/** Strict: collection or document binding only (`any`). */
export function hasStrictRole(definition: RoleDefinition, roleName: string, anyToken: AnyScope): boolean

export function hasStrictRole(
  definition: RoleDefinition,
  roleName: string,
  collection: ScopeResourceCollection,
): boolean

export function hasStrictRole(
  definition: RoleDefinition,
  roleName: string,
  collection: ScopeResourceCollection,
  id: number,
): boolean

export function hasStrictRole(
  definition: RoleDefinition,
  roleName: string,
  resourceOrAny?: ScopeResourceCollection | AnyScope,
  maybeId?: number,
): boolean {
  if (definition.name !== roleName) return false

  if (resourceOrAny === undefined && maybeId === undefined) {
    return definition.binding === 'global'
  }

  if (resourceOrAny === 'any') {
    return definition.binding === 'collection' || definition.binding === 'document'
  }

  const collection = typeof resourceOrAny === 'string' ? resourceOrAny : undefined
  const id = maybeId

  if (definition.binding === 'global') return false

  if (collection !== undefined && id === undefined) {
    return definition.binding === 'collection' && definition.scopedCollection === collection
  }

  if (collection !== undefined && id !== undefined) {
    if (definition.binding !== 'document') return false
    const t = tupleFromDocument(definition.resource)
    return t?.collection === collection && t.id === id
  }

  return false
}

/** True if any `roleNames` entry matches `definitions` for the same resource args. */
export function hasAnyRole(
  definitions: RoleDefinition[],
  roleNames: string[],
  collection?: ScopeResourceCollection,
  id?: number,
): boolean {
  return roleNames.some((n) =>
    definitions.some((d) =>
      collection === undefined && id === undefined
        ? hasRole(d, n)
        : collection !== undefined && id === undefined
          ? hasRole(d, n, collection)
          : collection !== undefined && id !== undefined
            ? hasRole(d, n, collection, id)
            : false,
    ),
  )
}

/** Every {@link RoleMatch} must be satisfied by at least one definition row. */
export function hasAllRoles(definitions: RoleDefinition[], ...specs: RoleMatch[]): boolean {
  return specs.every((spec) => {
    if (typeof spec === 'string') {
      return definitions.some((d) => hasRole(d, spec))
    }
    const { name, resource } = spec
    if (resource === undefined) {
      return definitions.some((d) => hasRole(d, name))
    }
    if (resource === 'any') {
      return definitions.some((d) => hasRole(d, name, 'any'))
    }
    if (typeof resource === 'string') {
      return definitions.some((d) => hasRole(d, name, resource))
    }
    return definitions.some((d) => hasRole(d, name, resource.collection, resource.id))
  })
}

/** Same as {@link hasRole}; use when definitions are already loaded. */
export const hasCachedRole = hasRole

/** @index-cross.foldback child=nist/incits/359/predicates parent=nist/incits/359 — this cross folds back into its parent. */
