/**
 * Role-based access control types.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 */

import type { Role } from '@/types'

/** Minimal row shape from `roles` for predicate checks (matches stored docs). */
export type RoleDefinition = Pick<Role, 'name' | 'binding' | 'scopedCollection' | 'resource'>

/** Collections allowed on polymorphic `roles.resource` (matches collection config). */
export const scopeResourceCollections = [
  'tenants',
  'pages',
  'posts',
  'media',
  'categories',
  'products',
] as const

export type ScopeResourceCollection = (typeof scopeResourceCollections)[number]

/**
 * Resource argument when checking a role: whole collection vs one document.
 */
export type ScopedResource =
  | ScopeResourceCollection
  | { collection: ScopeResourceCollection; id: number }

/** Match `any` binding that carries the role name. */
export type AnyScope = 'any'

export type RoleMatch =
  | string
  | {
      name: string
      resource?: ScopeResourceCollection | ScopedResource | AnyScope
    }
