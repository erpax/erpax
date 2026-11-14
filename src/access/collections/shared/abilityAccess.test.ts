import { describe, it, expect } from 'vitest'
import type { Access, PayloadRequest } from 'payload'
import { abilityAccess, abilityOf, withAbility } from '@/access/collections/shared/abilityAccess'
import { defineAbility } from '@/utilities/ability'

type Args = Parameters<Access>[0]
const supervisor = () => defineAbility((can) => { can('read', 'work-orders', { supervisor: 'c1' }); can('create', 'work-orders') })

/** A request whose user holds these account roles (as the role engine would return them). */
const requestWith = (roles: string[], employee?: string) => {
  const calls: string[] = []
  const req = {
    user: { id: 'u1' },
    context: {},
    payload: {
      findByID: async ({ collection }: { collection: string }) => { calls.push(`findByID:${collection}`); return { id: 'u1', roleAssignments: roles.map((name, i) => ({ id: `r${i}`, name, binding: 'global' })) } },
      find: async ({ collection }: { collection: string }) => { calls.push(`find:${collection}`); return { docs: employee ? [{ id: employee }] : [] } },
    },
  } as unknown as PayloadRequest
  return { req, calls }
}

describe('abilityAccess — an ability as a collection\'s access', () => {
  const access = abilityAccess('work-orders', supervisor)
  const args = { req: {} } as Args
  it('create is the class-level can?; read, update and delete are accessible_by', async () => {
    expect(await access.create(args)).toBe(true)
    expect(await access.read(args)).toEqual({ supervisor: { equals: 'c1' } })
    expect(await access.update(args)).toBe(false)
    expect(await access.delete(args)).toBe(false)
  })
})

describe('abilityOf — the request\'s ability, from the role engine, once per request', () => {
  it('a signed-out request can do nothing', async () => {
    const ability = await abilityOf({ user: null, context: {} } as unknown as PayloadRequest)
    expect(ability.permits('read', 'lots')).toBe(false)
  })
  it('reads the user\'s account roles and turns them into rules', async () => {
    const { req } = requestWith(['production_manager'])
    const ability = await abilityOf(req)
    expect(ability.permits('delete', 'work-orders')).toBe(true)
    expect(ability.permits('read', 'orders')).toBe(false)
  })
  it('a role held on one document is not an account role', async () => {
    const req = { user: { id: 'u1' }, context: {}, payload: { findByID: async () => ({ id: 'u1', roleAssignments: [{ id: 'r1', name: 'admin', binding: 'document' }] }) } } as unknown as PayloadRequest
    expect((await abilityOf(req)).permits('read', 'lots')).toBe(false)
  })
  it('looks up the employee record only for the roles whose rules need it', async () => {
    const plain = requestWith(['production_manager'])
    await abilityOf(plain.req)
    expect(plain.calls).toEqual(['findByID:users'])
    const directing = requestWith(['work_manager'], 'e1')
    const ability = await abilityOf(directing.req)
    expect(directing.calls).toEqual(['findByID:users', 'find:employees'])
    expect(ability.accessibleBy('delete', 'work-orders')).toEqual({ director: { equals: 'e1' } })
  })
  it('is computed once per request — a second access check reuses it', async () => {
    const { req, calls } = requestWith(['user'])
    const [a, b] = await Promise.all([abilityOf(req), abilityOf(req)])
    expect(a).toBe(b)
    await abilityOf(req)
    expect(calls).toEqual(['findByID:users'])
  })
  it('an unreachable role engine grants nothing instead of failing the request', async () => {
    const req = { user: { id: 'u1' }, context: {}, payload: { findByID: async () => { throw new Error('db down') } } } as unknown as PayloadRequest
    expect((await abilityOf(req)).permits('read', 'lots')).toBe(false)
  })
})

describe('withAbility — the abilities are ADDED to a collection\'s own access', () => {
  const nobody = () => defineAbility(() => undefined)
  const manager = () => defineAbility((can) => can('manage', 'all'))
  const args = { req: {} } as Args
  it('what the collection allowed is still allowed', async () => {
    const access = withAbility({ read: () => true, update: () => ({ tenant: { equals: 't1' } }) }, 'lots', nobody)
    expect(await (access.read as Access)(args)).toBe(true)
    expect(await (access.update as Access)(args)).toEqual({ tenant: { equals: 't1' } })
  })
  it('what the collection denied stays denied without a role, and is granted with one', async () => {
    expect(await (withAbility({ delete: () => false }, 'lots', nobody).delete as Access)(args)).toBe(false)
    expect(await (withAbility({ delete: () => false }, 'lots', manager).delete as Access)(args)).toBe(true)
  })
  it('a conditional ability widens a constraint by OR, never replaces it', async () => {
    const supervising = () => defineAbility((can) => can('read', 'work-orders', { supervisor: 'c1' }))
    const access = withAbility({ read: () => ({ tenant: { equals: 't1' } }) }, 'work-orders', supervising)
    expect(await (access.read as Access)(args)).toEqual({ or: [{ tenant: { equals: 't1' } }, { supervisor: { equals: 'c1' } }] })
  })
  it('an operation with no rule keeps Payload\'s default — it is not narrowed to the ability', () => {
    const access = withAbility({ read: () => true }, 'lots', nobody)
    expect(access.create).toBeUndefined()
    expect(access.update).toBeUndefined()
  })
})
