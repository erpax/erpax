/**
 * Party access — a party reads the documents it is a party to.
 *
 * A signed-in user reads exactly the documents of a collection on which they hold one of the party
 * roles (seller, buyer, consignee …) — a role held ON the document, in the role engine. Meant to
 * be combined with a collection's other access (`either`): it only ever ADDS documents.
 *
 * The scope is `whereParty` (`@/utilities/scope`): the ids the user is a party to, or nothing.
 *
 * @standard NIST INCITS-359-2012 §6.1 object-scoped role assignment
 * @security ISO-27001 A.5.15 access-control · A.8.3 information-access-restriction
 */
import type { Access } from 'payload'

import { resourcesWithRole } from '@/utilities/nist/incits/359'
import type { ScopeResourceCollection } from '@/utilities/nist/incits/359'
import { allPartyRoles } from '@/utilities/party/roles'
import { whereParty } from '@/utilities/scope'

export const partyAccess = (collection: ScopeResourceCollection, roles: readonly string[] = allPartyRoles()): Access => async ({ req }) => {
  const userId = req.user?.id
  if (userId === undefined || userId === null) return false
  return whereParty(await resourcesWithRole(req.payload, req, collection, roles, String(userId)))
}
