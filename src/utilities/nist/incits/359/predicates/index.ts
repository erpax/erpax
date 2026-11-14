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
} from '@/utilities/nist/incits/359/types'

/** A document id as it is compared: the id's text. `42` and `'42'` are one row; a uuid is itself. */
const idText = (id: number | string): string => String(id).trim()

function tupleFromDocument(resource: RoleDefinition['resource']): {
  collection: ScopeResourceCollection
  id: string
} | null {
  if (!resource || typeof resource !== 'object' || !('relationTo' in resource)) return null
  const r = resource as { relationTo: string; value: unknown }
  // Payload polymorphic relationship value: a scalar id or a populated doc `{ id }`. This database
  // uses uuid text ids (`idType: 'uuid'`), so an id is compared as text — the earlier numeric-only
  // parse made every document-scoped role unmatchable. A numeric id and its text form still match
  // each other; two different ids never do, so there is no over-grant.
  const raw = r.value && typeof r.value === 'object' && 'id' in r.value ? (r.value as { id: unknown }).id : r.value
  if (typeof raw !== 'number' && typeof raw !== 'string') return null
  const id = idText(raw)
  if (id === '') return null
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
  id: number | string,
): boolean

export function hasRole(
  definition: RoleDefinition,
  roleName: string,
  resourceOrAny?: ScopeResourceCollection | AnyScope,
  maybeId?: number | string,
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
      return t?.collection === collection && t.id === idText(id)
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
  id: number | string,
): boolean

export function hasStrictRole(
  definition: RoleDefinition,
  roleName: string,
  resourceOrAny?: ScopeResourceCollection | AnyScope,
  maybeId?: number | string,
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
    return t?.collection === collection && t.id === idText(id)
  }

  return false
}

/** True if any `roleNames` entry matches `definitions` for the same resource args. */
export function hasAnyRole(
  definitions: RoleDefinition[],
  roleNames: string[],
  collection?: ScopeResourceCollection,
  id?: number | string,
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

/**
 * Rolify `only_has_role?` — the role is held (for the same resource arguments) AND it is the only
 * role definition the user has.
 */
export function onlyHasRole(
  definitions: RoleDefinition[],
  roleName: string,
  collection?: ScopeResourceCollection,
  id?: number | string,
): boolean {
  return definitions.length === 1 && hasAnyRole(definitions, [roleName], collection, id)
}

/** Rolify `roles_name` — the distinct role names among the definitions. */
export const roleNames = (definitions: readonly Pick<RoleDefinition, 'name'>[]): string[] => [...new Set(definitions.map((d) => d.name))]

/** Same as {@link hasRole}; use when definitions are already loaded. */
export const hasCachedRole = hasRole

/** @index-cross.foldback child=nist/incits/359/predicates parent=nist/incits/359 — this cross folds back into its parent. */
