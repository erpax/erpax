/**
 * Roles from groups — Google's model: a role is a group, and being in it is holding the role.
 *
 * A group is a named address. When the address is `<role>@<app>.<domain>` (`manager@sales.erpax.com`,
 * or `manager@sales` as a handle) the group IS that role in that app, so nothing about the role is
 * stored: it is read off the address. Members are users or other groups, so a user holds a role
 * through any group they are in, directly or through nesting. The walk is bounded in depth and safe
 * against a group that (indirectly) contains itself.
 *
 * Pure: it takes the groups already loaded, so it is the same for a directory synced from Google
 * Workspace as for one edited by hand.
 *
 * @standard NIST INCITS-359-2012 §5.1 users and groups · role hierarchy through group nesting
 * @standard RFC-7643 §4.2 SCIM group resource — members may be groups
 * @security ISO-27002 §5.18 access-rights · §5.15 access-control
 * @see src/collections/groups/index.ts · src/packages/engine/index.ts (`roleAddress` · `parseRoleAddress`)
 */
import type { Iso27002ControlId } from '@/utilities/iso/27002'
import { parseRoleAddress, type App } from '@/packages/engine'

/** Canonical ISO 27002:2022 controls this module exercises: 5.15 access control · 5.18 access rights. */
export const controlsApplied: ReadonlyArray<Iso27002ControlId> = ['5.15', '5.18'] as const

/** What the resolver needs of a group: who is in it (users and groups) and the addresses that reach it. */
export interface GroupShape {
  readonly id: string
  readonly userIds: readonly string[]
  readonly groupIds: readonly string[]
  /** The group's address and its aliases. */
  readonly addresses: readonly string[]
  /** The tenant the group belongs to; a group with none grants nothing. */
  readonly tenant?: string
}

/** A role held in one app, in one tenant — the tenant of the group it comes through. */
export interface Grant {
  readonly role: string
  readonly app: string
  readonly tenant: string
}

/** Nesting deeper than this is ignored: a directory this deep is a mistake, and the walk must end. */
export const MAX_GROUP_DEPTH = 5

/** The groups a user is in, directly or through nesting, each once. */
export const groupsOfUser = (userId: string, groups: readonly GroupShape[], depth: number = MAX_GROUP_DEPTH): GroupShape[] => {
  const reached = new Map<string, GroupShape>()
  let frontier = groups.filter((group) => group.userIds.includes(userId))
  for (let level = 0; level < depth && frontier.length > 0; level++) {
    for (const group of frontier) reached.set(group.id, group)
    const ids = new Set(frontier.map((group) => group.id))
    frontier = groups.filter((group) => !reached.has(group.id) && group.groupIds.some((id) => ids.has(id)))
  }
  return [...reached.values()]
}

/**
 * The roles a user holds through groups, each with the app and the tenant it is held in (the group's own).
 * A group whose address names no app, or that belongs to no tenant, grants nothing.
 */
export const grantsFromGroups = (userId: string, groups: readonly GroupShape[], apps: readonly App[], depth?: number): Grant[] => {
  const seen = new Set<string>()
  return groupsOfUser(userId, groups, depth)
    .flatMap((group) => (group.tenant === undefined ? [] : group.addresses.flatMap((address) => parseRoleAddress(address, apps) ?? []).map(({ role, app }): Grant => ({ role, app: app.slug, tenant: group.tenant! }))))
    .filter((grant) => {
      const key = `${grant.role}@${grant.app}#${grant.tenant}`
      return seen.has(key) ? false : (seen.add(key), true)
    })
}
