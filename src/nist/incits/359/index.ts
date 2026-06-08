/**
 * Public surface of the NIST INCITS 359 standards module.
 *
 * Permission helpers: role predicates + Payload `roles` / `user_roles` mutations.
 * For Unix **rwx** naming layered on Payload access, see `conventions.ts`
 * (`permissionTripletToString`).
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @standard NIST SP-800-162 attribute-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §5.16 identity-management
 * @security ISO-27002 §5.4 segregation-of-duties
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @compliance SOC-2 CC6.3 access-removal
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.4
 */

export type { AddRoleResource, MutationArgs } from './payload'

export { addRole, grant, removeRole, revoke } from './payload'

export type {
  AnyScope,
  RoleDefinition,
  RoleMatch,
  ScopedResource,
  ScopeResourceCollection,
} from './types'

export { scopeResourceCollections } from './types'

export { hasAllRoles, hasAnyRole, hasCachedRole, hasRole, hasStrictRole } from './predicates'

export {
  BIT_DELETE,
  BIT_READ,
  BIT_WRITE,
  permissionStringToTriplet,
  permissionTripletToString,
} from './conventions'

export type { PermissionDigit, PermissionTriplet } from './conventions'
