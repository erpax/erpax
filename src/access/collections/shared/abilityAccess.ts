/**
 * Ability access — a collection's `access`, decided by the signed-in user's ability.
 *
 * The CanCanCan port (`@/utilities/ability`) answers `can?` and `accessible_by`; those are the two
 * things a Payload access function may return. `create` is the class-level `can?`; `read`,
 * `update` and `delete` are `accessible_by`, so a conditional rule becomes a query constraint and
 * a user only ever loads the documents the ability allows.
 *
 * The ability itself is the request's: roles from the role engine (the Rolify port), computed
 * once and kept on the hook context (`remembered`, `@/hooks/context`).
 *
 * @standard NIST INCITS-359-2012 §6.1 permission-assignment · §6.2 review-functions
 * @security ISO-27001 A.5.15 access-control · A.8.3 information-access-restriction
 */
import type { Access, CollectionConfig, PayloadRequest } from 'payload'

import { either } from '@/access/collections/shared/either'
import { remembered } from '@/hooks/context'
import { Ability, restrictSubjects, type Subject } from '@/utilities/ability'
import { abilityForRoles } from '@/utilities/ability/roles'
import type { Iso27002ControlId } from '@/utilities/iso/27002'
import { APPS } from '@/packages'
import { appSlugs } from '@/plugins/mcp/apps'
import { MAX_GROUP_DEPTH, grantsFromGroups, type GroupShape } from '@/utilities/roles/groups'
import { rolesOf } from '@/utilities/nist/incits/359'
import { whereAccessible } from '@/utilities/scope'

/**
 * Canonical ISO 27002:2022 controls this module exercises:
 *   5.15 — Access control (role-based rules per collection)
 *   5.18 — Access rights (the role engine assigns; the ability enforces)
 *   8.3  — Information access restriction (read narrowed to what the ability allows)
 */
export const controlsApplied: ReadonlyArray<Iso27002ControlId> = ['5.15', '5.18', '8.3'] as const

const idOf = (value: unknown): string | undefined =>
  value !== null && typeof value === 'object' ? (value as { id?: string | number }).id !== undefined ? String((value as { id: string | number }).id) : undefined : value === undefined || value === null ? undefined : String(value)

/**
 * The groups the user is in, directly or through nesting, as the resolver reads them. One query per
 * level of nesting (bounded by `MAX_GROUP_DEPTH`): the groups naming the user, then those naming those.
 * A group's role comes from its address (`<role>@<app>`), and applies inside that app only.
 */
const groupsAround = (req: PayloadRequest, userId: string): Promise<GroupShape[]> =>
  remembered(req, 'groupsAround', async () => {
    const seen = new Map<string, GroupShape>()
    let frontier: Array<{ relationTo: 'users' | 'groups'; value: string }> = [{ relationTo: 'users', value: userId }]
    for (let level = 0; level < MAX_GROUP_DEPTH && frontier.length > 0; level++) {
      const found = await req.payload.find({ collection: 'groups', where: { or: frontier.map((member) => ({ 'members.member': { equals: member } })) }, depth: 1, limit: 200, pagination: false, overrideAccess: true, req })
      const fresh = found.docs.filter((doc) => !seen.has(String(doc.id)))
      for (const doc of fresh) {
        const members = ((doc as { members?: Array<{ member?: { relationTo?: string; value?: unknown } | null }> }).members ?? []).flatMap((row) => (row.member ? [{ relationTo: row.member.relationTo, id: idOf(row.member.value) }] : []))
        const { email, aliases } = doc as { email?: string | null; aliases?: string[] | null }
        seen.set(String(doc.id), {
          id: String(doc.id),
          userIds: members.filter((m) => m.relationTo === 'users' && m.id).map((m) => m.id!),
          groupIds: members.filter((m) => m.relationTo === 'groups' && m.id).map((m) => m.id!),
          addresses: [...(email ? [email] : []), ...(aliases ?? [])],
        })
      }
      frontier = fresh.map((doc) => ({ relationTo: 'groups', value: String(doc.id) }))
    }
    return [...seen.values()]
  })

/** The current user's ability. */
export type AbilityOf = (req: PayloadRequest) => Ability | Promise<Ability>

/**
 * The signed-in user's ability: their ACCOUNT (global) roles from the role engine, plus the
 * employee record behind them when a role's rules depend on it. Computed once per request.
 */
export const abilityOf: AbilityOf = (req) =>
  remembered(req, 'ability', async () => {
    const userId = req.user?.id
    if (userId === undefined || userId === null) return new Ability()
    try {
      const direct = (await rolesOf(req.payload, req, String(userId))).filter((role) => role.binding === 'global').map((role) => role.name)
      // roles held through groups: `<role>@<app>` groups, each role kept inside its app
      const grants = grantsFromGroups(String(userId), await groupsAround(req, String(userId)), APPS)
      const roles = [...direct, ...grants.map((grant) => grant.role)]
      let employeeId: string | undefined
      if (roles.includes('work_manager') || roles.includes('work_supervisor')) {
        const found = await req.payload.find({ collection: 'employees', where: { user: { equals: userId } }, depth: 0, limit: 1, overrideAccess: true, req })
        const id = (found.docs[0] as { id?: string | number } | undefined)?.id
        employeeId = id === undefined ? undefined : String(id)
      }
      const ability = abilityForRoles({ roles: direct, employeeId })
      if (grants.length > 0) {
        const owned = appSlugs(req.payload.config.collections, APPS)
        for (const app of new Set(grants.map((grant) => grant.app))) {
          const held = grants.filter((grant) => grant.app === app).map((grant) => grant.role)
          ability.rules.push(...restrictSubjects(abilityForRoles({ roles: held, employeeId }), owned.get(app) ?? []).rules)
        }
      }
      return ability
    } catch {
      // the role engine is unreachable: grant nothing through this path (a collection's own access still applies)
      return new Ability()
    }
  })

/** A collection's four access functions, decided by an ability. */
export const abilityAccess = (subject: Subject, of: AbilityOf = abilityOf): Required<Pick<NonNullable<CollectionConfig['access']>, 'create' | 'read' | 'update' | 'delete'>> => ({
  create: async ({ req }) => (await of(req)).permits('create', subject),
  read: async ({ req }) => whereAccessible(await of(req), 'read', subject),
  update: async ({ req }) => whereAccessible(await of(req), 'update', subject),
  delete: async ({ req }) => whereAccessible(await of(req), 'delete', subject),
})

/**
 * ADD the role abilities to a collection's existing access: each operation is permitted when the
 * collection's own rule permits it OR the user's ability does. Nothing a collection allowed
 * before is taken away.
 */
export const withAbility = (access: CollectionConfig['access'], subject: Subject, of: AbilityOf = abilityOf): NonNullable<CollectionConfig['access']> => {
  const byAbility = abilityAccess(subject, of)
  const out: Record<string, Access> = { ...(access as Record<string, Access> | undefined) }
  for (const op of ['create', 'read', 'update', 'delete'] as const) {
    const own = access?.[op] as Access | undefined
    // No rule of its own means Payload's default (any signed-in user): leave that alone — putting a
    // rule here would NARROW it to the ability, which is the opposite of adding.
    if (own) out[op] = either(own, byAbility[op] as Access)
  }
  return out as NonNullable<CollectionConfig['access']>
}
