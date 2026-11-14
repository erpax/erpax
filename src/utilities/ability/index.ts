/**
 * Ability — a port of the CanCanCan gem (3.6): what a user can do, stated once.
 *
 * CanCanCan answers two questions from one list of rules, and they are the two halves of Payload's
 * `access` contract:
 *
 *   `can?(action, subject)`            → boolean         (Payload: `true` / `false`)
 *   `accessible_by(ability, action)`   → a query scope   (Payload: a `Where`)
 *
 * so a ported ability IS a Payload access function. This module is the pure engine — rules in,
 * decisions and scopes out, no request and no database. Where it meets Payload:
 *
 *   access   `@/access/collections/shared/abilityAccess`  an ability as a collection's `access`
 *   scope    `@/utilities/scope` (`whereAccessible`)     an ability as a `Where` for any query
 *   context  `@/hooks/context` (`remembered`)            the request's ability, computed once
 *   roles    `@/utilities/nist/incits/359`                who holds which role (the Rolify port)
 *
 * Ported faithfully, including the parts that are easy to get wrong:
 *  - LATER RULES WIN. `can?` walks the rules newest-first and the first relevant one decides.
 *  - `manage` is every action; `all` is every subject.
 *  - `alias_action`: `read` covers `index` and `show`, `create` covers `new`, `update` covers `edit`.
 *  - A rule with conditions, asked about a CLASS (no document): a `can` matches, a `cannot` is
 *    skipped ("don't stop at cannot definitions when there are conditions").
 *  - `accessible_by` folds the rules oldest-first from FALSE: a `can` ORs its conditions in, a
 *    `cannot` ANDs their negation on. A rule with no conditions is TRUE (can) or FALSE (cannot).
 *  - Hash conditions: a value is matched by equality, an array by inclusion, a nested hash by
 *    descending into the related document (any element, when the attribute is a list).
 *  - Attribute-level rules: `can :update, Article, [:title]`.
 *
 * Adapted to Payload: a relationship may arrive as an id or as a populated document, so a
 * condition on a relationship compares ids either way.
 *
 * @standard NIST INCITS-359-2012 §6.1 permission-assignment · §6.2 review-functions
 * @security ISO-27001 A.5.15 access-control · A.8.3 information-access-restriction
 * @security ISO-27002 §5.18 access-rights
 * @see https://github.com/CanCanCommunity/cancancan (lib/cancan/ability.rb · rule.rb · conditions_matcher.rb)
 * @see ~/github/ceccec/etrima/app/models/ability.rb (the abilities this port carries across)
 */
import type { Where } from 'payload'

export type Action = string
export type Subject = string
export type Conditions = Record<string, unknown>

export interface Rule {
  readonly actions: readonly Action[]
  readonly subjects: readonly Subject[]
  readonly conditions?: Conditions
  readonly fields?: readonly string[]
  /** `true` for `can`, `false` for `cannot` — CanCanCan's `base_behavior`. */
  readonly base: boolean
}

/** CanCanCan's `CanCan::AccessDenied`. */
export class AccessDenied extends Error {
  readonly action: Action
  readonly subject: Subject
  constructor(action: Action, subject: Subject, message?: string) {
    super(message ?? `You are not authorized to ${action} ${subject}.`)
    this.name = 'AccessDenied'
    this.action = action
    this.subject = subject
  }
}

const list = <T,>(value: T | readonly T[]): T[] => (Array.isArray(value) ? [...value] : [value as T])

/** A relationship value's id, whether it arrived as an id or as a populated document. */
const idOf = (value: unknown): unknown =>
  value !== null && typeof value === 'object' && !Array.isArray(value) && 'id' in (value as Record<string, unknown>)
    ? (value as { id: unknown }).id
    : value

const same = (a: unknown, b: unknown): boolean => {
  const x = idOf(a)
  const y = idOf(b)
  return x === y || (x != null && y != null && String(x) === String(y))
}

/** CanCanCan's `matches_conditions_hash?` — does this document satisfy the conditions? */
export const matchesConditions = (doc: unknown, conditions: Conditions): boolean => {
  if (doc === null || typeof doc !== 'object') return false
  for (const [key, expected] of Object.entries(conditions)) {
    const actual = (doc as Record<string, unknown>)[key]
    if (expected !== null && typeof expected === 'object' && !Array.isArray(expected)) {
      // a nested hash descends into the related document — any element, when the attribute is a list
      const matched = Array.isArray(actual)
        ? actual.some((element) => matchesConditions(element, expected as Conditions))
        : matchesConditions(actual, expected as Conditions)
      if (!matched) return false
    } else if (Array.isArray(expected)) {
      if (!expected.some((option) => same(actual, option))) return false
    } else if (!same(actual, expected)) return false
  }
  return true
}

// ─── conditions → a Payload Where ────────────────────────────────────────────

/** What an access rule or a scope resolves to: everything, nothing, or a constraint. */
export type Clause = boolean | Where

/** The union of two scopes — `true` wins, `false` is neutral, two constraints are OR-ed. */
export const or = (a: Clause, b: Clause): Clause => (a === true || b === true ? true : a === false ? b : b === false ? a : { or: [a, b] })
const and = (a: Clause, b: Clause): Clause => (a === false || b === false ? false : a === true ? b : b === true ? a : { and: [a, b] })

/** Each condition as one `{ path: operator }` clause; a nested hash becomes a dotted path. */
const clauses = (conditions: Conditions, negate: boolean, prefix = ''): Where[] =>
  Object.entries(conditions).flatMap(([key, expected]): Where[] => {
    const path = `${prefix}${key}`
    if (expected !== null && typeof expected === 'object' && !Array.isArray(expected)) return clauses(expected as Conditions, negate, `${path}.`)
    if (Array.isArray(expected)) return [{ [path]: negate ? { not_in: expected.map(idOf) } : { in: expected.map(idOf) } }]
    return [{ [path]: negate ? { not_equals: idOf(expected) } : { equals: idOf(expected) } }]
  })

/** The conditions as a Where: every one must hold. */
export const conditionsToWhere = (conditions: Conditions): Clause => {
  const parts = clauses(conditions, false)
  return parts.length === 0 ? true : parts.length === 1 ? parts[0]! : { and: parts }
}

/** The negation: ¬(a ∧ b) = ¬a ∨ ¬b. */
const notConditions = (conditions: Conditions): Clause => {
  const parts = clauses(conditions, true)
  return parts.length === 0 ? false : parts.length === 1 ? parts[0]! : { or: parts }
}

// ─── the ability ─────────────────────────────────────────────────────────────

export class Ability {
  readonly rules: Rule[] = []
  private readonly aliases = new Map<Action, Action[]>()

  constructor() {
    // CanCanCan's `default_alias_actions`
    this.aliasAction('read', ['index', 'show'])
    this.aliasAction('create', ['new'])
    this.aliasAction('update', ['edit'])
  }

  /** `alias_action :index, :show, to: :read` — the alias covers these actions as well. */
  aliasAction(alias: Action, actions: readonly Action[]): this {
    if (alias === 'manage') throw new Error("You can't specify target (manage) as alias because it is the real action name")
    this.aliases.set(alias, [...new Set([...(this.aliases.get(alias) ?? []), ...actions])])
    return this
  }

  /** `clear_aliased_actions` */
  clearAliasedActions(): this {
    this.aliases.clear()
    return this
  }

  /** `can :read, Article, published: true` · `can :update, Article, [:title]` · `can [:read, :create], [A, B]` */
  can(action: Action | readonly Action[], subject: Subject | readonly Subject[], conditionsOrFields?: Conditions | readonly string[], fields?: readonly string[]): this {
    return this.add(true, action, subject, conditionsOrFields, fields)
  }

  /** `cannot :destroy, Article` — a later `cannot` overrides an earlier `can`. */
  cannot(action: Action | readonly Action[], subject: Subject | readonly Subject[], conditionsOrFields?: Conditions | readonly string[], fields?: readonly string[]): this {
    return this.add(false, action, subject, conditionsOrFields, fields)
  }

  private add(base: boolean, action: Action | readonly Action[], subject: Subject | readonly Subject[], conditionsOrFields?: Conditions | readonly string[], fields?: readonly string[]): this {
    const onlyFields = Array.isArray(conditionsOrFields)
    const conditions = onlyFields ? undefined : (conditionsOrFields as Conditions | undefined)
    const attributes = onlyFields ? (conditionsOrFields as readonly string[]) : fields
    this.rules.push({
      actions: list(action),
      subjects: list(subject),
      ...(conditions && Object.keys(conditions).length > 0 ? { conditions } : {}),
      ...(attributes && attributes.length > 0 ? { fields: [...attributes] } : {}),
      base,
    })
    return this
  }

  /** Every action a rule's action stands for: itself plus what it aliases, recursively (`expand_actions`). */
  private expand(actions: readonly Action[]): Action[] {
    const out = new Set<Action>()
    const walk = (action: Action): void => {
      if (out.has(action)) return
      out.add(action)
      for (const covered of this.aliases.get(action) ?? []) walk(covered)
    }
    for (const action of actions) walk(action)
    return [...out]
  }

  /** The rules that speak about this action on this subject, in the order they were defined. */
  relevantRules(action: Action, subject: Subject): Rule[] {
    return this.rules.filter(
      (rule) =>
        (rule.actions.includes('manage') || this.expand(rule.actions).includes(action)) &&
        (rule.subjects.includes('all') || rule.subjects.includes(subject)),
    )
  }

  /**
   * `can?(action, subject)` — pass a document to ask about that document, omit it to ask about the
   * class. With `field`, an attribute-level question (`can? :update, article, :title`).
   */
  permits(action: Action, subject: Subject, doc?: unknown, field?: string): boolean {
    const rules = this.relevantRules(action, subject)
    for (let i = rules.length - 1; i >= 0; i--) {
      const rule = rules[i]!
      if (field !== undefined && rule.fields && !rule.fields.includes(field)) continue
      if (!rule.conditions) return rule.base
      if (doc === undefined) {
        // class-level question about a conditional rule: a `can` matches, a `cannot` is skipped
        if (rule.base) return true
        continue
      }
      if (matchesConditions(doc, rule.conditions)) return rule.base
    }
    return false
  }

  /** `cannot?` */
  forbids(action: Action, subject: Subject, doc?: unknown, field?: string): boolean {
    return !this.permits(action, subject, doc, field)
  }

  /** `authorize!` — throws `AccessDenied` unless permitted; returns the document. */
  authorize<T>(action: Action, subject: Subject, doc?: T, message?: string): T | undefined {
    if (this.forbids(action, subject, doc)) throw new AccessDenied(action, subject, message)
    return doc
  }

  /**
   * `accessible_by` — WHICH documents: `true` (all), `false` (none) or a Payload `Where`.
   * Folded oldest-first from FALSE: a `can` ORs its conditions in, a `cannot` ANDs their negation on.
   */
  accessibleBy(action: Action, subject: Subject): boolean | Where {
    let scope: Clause = false
    for (const rule of this.relevantRules(action, subject)) {
      if (rule.base) scope = or(scope, rule.conditions ? conditionsToWhere(rule.conditions) : true)
      else scope = and(rule.conditions ? notConditions(rule.conditions) : false, scope)
    }
    return scope
  }

  /** `permitted_attributes` — the fields this action may touch; `undefined` means every field. */
  permittedFields(action: Action, subject: Subject): string[] | undefined {
    const allowing = this.relevantRules(action, subject).filter((rule) => rule.base)
    if (allowing.length === 0) return []
    if (allowing.some((rule) => !rule.fields)) return undefined
    return [...new Set(allowing.flatMap((rule) => [...(rule.fields ?? [])]))]
  }

  /** `merge` — add another ability's rules (and aliases) after this one's. */
  merge(other: Ability): this {
    for (const [alias, actions] of other.aliases) this.aliasAction(alias, actions)
    this.rules.push(...other.rules)
    return this
  }
}

/** Define an ability the way a CanCanCan `Ability#initialize` reads. */
export const defineAbility = (define: (can: Ability['can'], cannot: Ability['cannot'], ability: Ability) => void): Ability => {
  const ability = new Ability()
  define(ability.can.bind(ability), ability.cannot.bind(ability), ability)
  return ability
}
