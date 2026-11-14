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
import { Ability, type Subject } from '@/utilities/ability'
import { abilityForRoles } from '@/utilities/ability/roles'
import { rolesOf } from '@/utilities/nist/incits/359'
import { whereAccessible } from '@/utilities/scope'

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
      const roles = (await rolesOf(req.payload, req, String(userId))).filter((role) => role.binding === 'global').map((role) => role.name)
      let employeeId: string | undefined
      if (roles.includes('work_manager') || roles.includes('work_supervisor')) {
        const found = await req.payload.find({ collection: 'employees', where: { user: { equals: userId } }, depth: 0, limit: 1, overrideAccess: true, req })
        const id = (found.docs[0] as { id?: string | number } | undefined)?.id
        employeeId = id === undefined ? undefined : String(id)
      }
      return abilityForRoles({ roles, employeeId })
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
