import type { CollectionBeforeChangeHook } from 'payload'
import type { Where } from 'payload'

import type { User, Role, UserRole } from '@/payload-types'
import { extractID } from '../../../utilities/extractID'
import { apiErr, ERR } from '../../../utilities/errors'

/**
 * One row per (user, role definition). Uses `overrideAccess` only so the hook can enforce
 * uniqueness without granting the acting user read access to other assignments.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control role-assignment
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.4 segregation-of-duties
 * @compliance SOC-2 CC6.3 access-removal
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.4
 */
export const preventDuplicateAssignment: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  if (!data || typeof data !== 'object') return data

  const userRef = data.user as User | string | null | undefined
  const roleRef = data.role as Role | string | null | undefined
  const userId = userRef == null ? undefined : extractID(userRef)
  const roleId = roleRef == null ? undefined : extractID(roleRef)

  if (userId === undefined || roleId === undefined) return data

  const andClause: Where['and'] = [
    { user: { equals: userId } },
    { role: { equals: roleId } },
  ]
  if (operation === 'update' && originalDoc && 'id' in originalDoc && originalDoc.id != null) {
    andClause.push({ id: { not_equals: extractID(originalDoc as UserRole) } })
  }

  const existing = await req.payload.find({
    collection: 'user-roles',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { and: andClause },
  })

  if (existing.docs.length > 0) {
    throw apiErr(ERR.ROLE_DUPLICATE_ASSIGNMENT)
  }

  return data
}
