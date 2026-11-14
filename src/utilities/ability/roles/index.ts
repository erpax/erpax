/**
 * The abilities each role carries — etrima's `Ability` (`app/models/ability.rb`), on erpax's
 * collections.
 *
 * Roles are assigned by the role engine (the Rolify port); this says what each one may do (the
 * CanCanCan port). As in etrima only ACCOUNT roles count here — global ones, `Role.account_roles` —
 * a role held on one document is a party to it and is handled by `@/utilities/party/roles`.
 *
 * etrima's models map onto the collections that took their place:
 *   Employee · EmployeeContract → employees     Position → job-positions      Machine · MachineType → work-centers
 *   WorkPhase → work-phases   LotWorkPhase → lot-work-phases   WorkOrder → work-orders   WorkShift → work-shifts
 *   Product · ProductVariant · Item → products · variants      Category → categories     Account → parties
 *   Order → orders   Lot → lots   LotVariant → lot-variants    PackingList · Pack · PackType → packs · pack-items · packages
 *
 * Not carried: the ActiveAdmin report pages (erpax has no such pages), the custom member actions
 * that are not CRUD in Payload (`start` · `pause` · `complete` · `backorder` · `print` are folded
 * into `update`), and the admin namespaces (every rule here applied inside `:production` there).
 *
 * @standard NIST INCITS-359-2012 §6.1 permission-assignment
 * @security ISO-27001 A.5.15 access-control · ISO-27002 §5.3 segregation-of-duties
 * @see ~/github/ceccec/etrima/app/models/ability.rb
 */
import { defineAbility, type Ability } from '@/utilities/ability'

/** etrima's role names, as they are assigned by the role engine. */
export const ACCOUNT_ROLES = [
  'admin', 'user', 'manager', 'hr_manager', 'product_manager', 'order_manager',
  'production_manager', 'work_manager', 'work_supervisor', 'worker', 'mechanic', 'packing_manager', 'client',
] as const

export interface AbilityContext {
  /** The user's account (global) role names. */
  readonly roles: readonly string[]
  /** The employee record behind the user — what `director` / `supervisor` on a work order point at. */
  readonly employeeId?: string
}

const each = (subjects: readonly string[], grant: (subject: string) => void): void => subjects.forEach(grant)

/** What a user holding these account roles may do. Unknown roles grant nothing. */
export const abilityForRoles = ({ roles, employeeId }: AbilityContext): Ability =>
  defineAbility((can) => {
    const has = (role: string): boolean => roles.includes(role)

    if (has('user')) can('read', 'all')
    if (has('admin') || has('manager')) can('manage', 'all')

    if (has('hr_manager')) {
      each(['employees', 'job-positions', 'work-shifts', 'work-centers'], (subject) => can('manage', subject))
      each(['work-phases', 'lot-work-phases', 'work-orders'], (subject) => can('read', subject))
    }

    if (has('product_manager')) each(['categories', 'products', 'variants'], (subject) => can('manage', subject))

    if (has('order_manager')) each(['parties', 'orders', 'lots', 'lot-variants', 'packs', 'pack-items', 'packages'], (subject) => can('manage', subject))

    if (has('production_manager')) {
      can('read', 'lot-variants')
      each(['work-centers', 'work-phases', 'lot-work-phases', 'work-shifts', 'work-orders'], (subject) => can('manage', subject))
    }

    if (has('work_manager')) {
      can('read', 'work-phases')
      can(['read', 'update'], 'lot-work-phases') // read + start
      can(['read', 'create'], ['work-orders', 'work-shifts'])
      // manages the orders and shifts they direct — only once we know who they are
      if (employeeId) each(['work-orders', 'work-shifts'], (subject) => can('manage', subject, { director: employeeId }))
    }

    if (has('work_supervisor') && employeeId) {
      can('read', 'work-orders', { supervisor: employeeId })
      // start · pause · complete · backorder · print, on an order that is not closed
      can('update', 'work-orders', { supervisor: employeeId, closedAt: null })
      can('read', 'work-shifts', { supervisor: employeeId })
    }

    if (has('mechanic')) can(['read', 'update'], 'work-centers')

    if (has('packing_manager')) each(['packs', 'pack-items', 'packages'], (subject) => can('manage', subject))

    // etrima left this as "TODO Client should see only their orders": that is the party role on the
    // order (`@/utilities/party/roles`), not an account-wide read, so a client gets the production view only.
    if (has('client')) each(['lots', 'lot-variants', 'lot-work-phases', 'packs', 'pack-items'], (subject) => can('read', subject))
  })
