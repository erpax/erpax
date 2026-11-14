import { describe, it, expect } from 'vitest'
import { AccessDenied, conditionsToWhere, defineAbility, matchesConditions, or } from '@/utilities/ability'

describe('ability — can? (CanCanCan)', () => {
  it('nothing is permitted until a rule says so', () => {
    expect(defineAbility(() => undefined).permits('read', 'articles')).toBe(false)
  })
  it('manage is every action, all is every subject', () => {
    const admin = defineAbility((can) => can('manage', 'all'))
    for (const action of ['read', 'create', 'update', 'delete', 'start', 'print']) expect(admin.permits(action, 'anything'), action).toBe(true)
    const editor = defineAbility((can) => can('manage', 'articles'))
    expect(editor.permits('delete', 'articles')).toBe(true)
    expect(editor.permits('read', 'comments')).toBe(false)
  })
  it('takes several actions and several subjects in one rule', () => {
    const a = defineAbility((can) => can(['read', 'create'], ['work-orders', 'work-shifts']))
    expect(a.permits('create', 'work-shifts')).toBe(true)
    expect(a.permits('update', 'work-orders')).toBe(false)
  })
  it('a LATER rule wins: cannot after can forbids, can after cannot permits', () => {
    const a = defineAbility((can, cannot) => { can('manage', 'articles'); cannot('delete', 'articles') })
    expect(a.permits('update', 'articles')).toBe(true)
    expect(a.permits('delete', 'articles')).toBe(false)
    const b = defineAbility((can, cannot) => { cannot('delete', 'articles'); can('manage', 'articles') })
    expect(b.permits('delete', 'articles')).toBe(true)
  })
  it('read covers index and show; create covers new; update covers edit (alias_action)', () => {
    const a = defineAbility((can) => can(['read', 'update'], 'articles'))
    for (const action of ['index', 'show', 'edit']) expect(a.permits(action, 'articles'), action).toBe(true)
    expect(a.permits('new', 'articles')).toBe(false)
    const custom = defineAbility((can, _cannot, ability) => { ability.aliasAction('operate', ['start', 'pause', 'complete']); can('operate', 'work-orders') })
    expect(custom.permits('pause', 'work-orders')).toBe(true)
    expect(() => defineAbility((_can, _cannot, ability) => ability.aliasAction('manage', ['x']))).toThrow(/manage/)
  })
})

describe('ability — conditions', () => {
  const supervisor = defineAbility((can) => {
    can('read', 'work-orders', { supervisor: 'c1' })
    can('update', 'work-orders', { supervisor: 'c1', closed: false })
  })
  it('a hash condition is matched against the document', () => {
    expect(supervisor.permits('read', 'work-orders', { supervisor: 'c1' })).toBe(true)
    expect(supervisor.permits('read', 'work-orders', { supervisor: 'c2' })).toBe(false)
    expect(supervisor.permits('update', 'work-orders', { supervisor: 'c1', closed: true })).toBe(false)
  })
  it('a relationship matches by id whether it arrived as an id or populated', () => {
    expect(supervisor.permits('read', 'work-orders', { supervisor: { id: 'c1', name: 'x' } })).toBe(true)
    expect(matchesConditions({ owner: 7 }, { owner: '7' })).toBe(true)
  })
  it('an array is inclusion; a nested hash descends (any element of a list)', () => {
    expect(matchesConditions({ status: 'sent' }, { status: ['draft', 'sent'] })).toBe(true)
    expect(matchesConditions({ status: 'closed' }, { status: ['draft', 'sent'] })).toBe(false)
    expect(matchesConditions({ lot: { order: { party: 'p1' } } }, { lot: { order: { party: 'p1' } } })).toBe(true)
    expect(matchesConditions({ lines: [{ item: 'a' }, { item: 'b' }] }, { lines: { item: 'b' } })).toBe(true)
    expect(matchesConditions({ lines: [{ item: 'a' }] }, { lines: { item: 'b' } })).toBe(false)
  })
  it('asked about the CLASS, a conditional can matches and a conditional cannot is skipped', () => {
    expect(supervisor.permits('read', 'work-orders')).toBe(true) // "can this user read any work order at all?"
    const a = defineAbility((can, cannot) => { can('read', 'articles'); cannot('read', 'articles', { secret: true }) })
    expect(a.permits('read', 'articles')).toBe(true) // the conditional cannot does not stop a class-level yes
    expect(a.permits('read', 'articles', { secret: true })).toBe(false)
    expect(a.permits('read', 'articles', { secret: false })).toBe(true)
  })
})

describe('ability — accessible_by becomes a Payload Where', () => {
  it('no rule is nothing; an unconditional can is everything', () => {
    expect(defineAbility(() => undefined).accessibleBy('read', 'articles')).toBe(false)
    expect(defineAbility((can) => can('read', 'articles')).accessibleBy('read', 'articles')).toBe(true)
  })
  it('one conditional rule is its conditions', () => {
    expect(defineAbility((can) => can('read', 'work-orders', { supervisor: 'c1' })).accessibleBy('read', 'work-orders')).toEqual({ supervisor: { equals: 'c1' } })
    expect(conditionsToWhere({ supervisor: 'c1', closed: false })).toEqual({ and: [{ supervisor: { equals: 'c1' } }, { closed: { equals: false } }] })
    expect(conditionsToWhere({ status: ['a', 'b'], lot: { order: 'o1' } })).toEqual({ and: [{ status: { in: ['a', 'b'] } }, { 'lot.order': { equals: 'o1' } }] })
  })
  it('several can rules are OR-ed; an unconditional one makes it everything', () => {
    const a = defineAbility((can) => { can('read', 'work-orders', { supervisor: 'c1' }); can('read', 'work-orders', { director: 'c1' }) })
    expect(a.accessibleBy('read', 'work-orders')).toEqual({ or: [{ supervisor: { equals: 'c1' } }, { director: { equals: 'c1' } }] })
    const b = defineAbility((can) => { can('read', 'work-orders', { supervisor: 'c1' }); can('manage', 'all') })
    expect(b.accessibleBy('read', 'work-orders')).toBe(true)
  })
  it('a cannot ANDs its negation onto what came before, and an unconditional cannot empties it', () => {
    const a = defineAbility((can, cannot) => { can('read', 'articles'); cannot('read', 'articles', { secret: true }) })
    expect(a.accessibleBy('read', 'articles')).toEqual({ secret: { not_equals: true } })
    const b = defineAbility((can, cannot) => { can('read', 'articles', { tenant: 't1' }); cannot('read', 'articles', { secret: true, draft: true }) })
    expect(b.accessibleBy('read', 'articles')).toEqual({ and: [{ or: [{ secret: { not_equals: true } }, { draft: { not_equals: true } }] }, { tenant: { equals: 't1' } }] })
    const c = defineAbility((can, cannot) => { can('read', 'articles'); cannot('read', 'articles') })
    expect(c.accessibleBy('read', 'articles')).toBe(false)
  })
  it('agrees with can? document by document', () => {
    const a = defineAbility((can, cannot) => { can('read', 'docs', { owner: 'u1' }); can('read', 'docs', { public: true }); cannot('read', 'docs', { archived: true }) })
    // ((owner = u1) OR (public)) AND NOT archived
    const scope = a.accessibleBy('read', 'docs')
    expect(scope).toEqual({ and: [{ archived: { not_equals: true } }, { or: [{ owner: { equals: 'u1' } }, { public: { equals: true } }] }] })
    const rows = [{ owner: 'u1', public: false, archived: false }, { owner: 'u2', public: true, archived: false }, { owner: 'u1', public: true, archived: true }, { owner: 'u2', public: false, archived: false }]
    expect(rows.map((r) => a.permits('read', 'docs', r))).toEqual([true, true, false, false])
  })
})

describe('ability — fields, authorize, merge', () => {
  it('an attribute-level rule limits which fields the action may touch', () => {
    const a = defineAbility((can) => can('update', 'articles', ['title', 'body']))
    expect(a.permits('update', 'articles', undefined, 'title')).toBe(true)
    expect(a.permits('update', 'articles', undefined, 'author')).toBe(false)
    expect(a.permittedFields('update', 'articles')).toEqual(['title', 'body'])
    expect(defineAbility((can) => can('update', 'articles')).permittedFields('update', 'articles')).toBeUndefined() // every field
    expect(defineAbility(() => undefined).permittedFields('update', 'articles')).toEqual([])
  })
  it('authorize throws AccessDenied naming the action and subject, and returns the document otherwise', () => {
    const a = defineAbility((can) => can('read', 'articles'))
    const doc = { id: 1 }
    expect(a.authorize('read', 'articles', doc)).toBe(doc)
    try {
      a.authorize('delete', 'articles', doc)
      throw new Error('should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(AccessDenied)
      expect(error).toMatchObject({ action: 'delete', subject: 'articles' })
    }
  })
  it('merge adds another ability after this one, so its rules win', () => {
    const base = defineAbility((can) => can('manage', 'articles'))
    base.merge(defineAbility((_can, cannot) => cannot('delete', 'articles')))
    expect(base.permits('delete', 'articles')).toBe(false)
    expect(base.permits('update', 'articles')).toBe(true)
  })
})

describe('ability — scopes combine', () => {
  it('or: true wins, false is neutral, two constraints are OR-ed', () => {
    const a = { owner: { equals: 'u1' } }
    const b = { tenant: { equals: 't1' } }
    expect(or(false, true)).toBe(true)
    expect(or(a, true)).toBe(true)
    expect(or(false, false)).toBe(false)
    expect(or(false, a)).toEqual(a)
    expect(or(a, b)).toEqual({ or: [a, b] })
  })
})
