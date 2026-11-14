import { describe, expect, it } from 'vitest'

import { APPS } from '@/packages'
import { parseRoleAddress, roleAddress } from '@/packages/engine'
import { MAX_GROUP_DEPTH, grantsFromGroups, groupsOfUser, type GroupShape } from '@/utilities/roles/groups'

const group = (id: string, userIds: string[], groupIds: string[], addresses: string[]): GroupShape => ({ id, userIds, groupIds, addresses })

describe('role addresses', () => {
  it('<role>@<app> and <role>@<app>.<domain> name the same role in the same app', () => {
    expect(parseRoleAddress('manager@sales', APPS)).toMatchObject({ role: 'manager', app: { slug: 'sales' } })
    expect(parseRoleAddress('Manager@Sales.ERPAX.com', APPS)).toMatchObject({ role: 'manager', app: { slug: 'sales' } })
    expect(roleAddress('manager', 'sales', 'erpax.com')).toBe('manager@sales.erpax.com')
    expect(roleAddress('manager', 'sales')).toBe('manager@sales')
  })
  it('an address that names no app, or is not an address, names no role', () => {
    expect(parseRoleAddress('manager@acme.com', APPS)).toBeUndefined()
    expect(parseRoleAddress('sales@erpax.com', APPS)).toBeUndefined()
    expect(parseRoleAddress('nonsense', APPS)).toBeUndefined()
    expect(parseRoleAddress(undefined, APPS)).toBeUndefined()
  })
})

describe('roles from groups', () => {
  const managers = group('managers', ['ann'], [], ['manager@sales.erpax.com'])
  const staff = group('staff', ['bob'], ['managers'], ['user@sales.erpax.com'])
  const stockAdmins = group('stock-admins', ['ann'], [], ['admin@stock'])

  it('a user holds the role of every group they are in, in that group\'s app', () => {
    expect(grantsFromGroups('ann', [managers, staff, stockAdmins], APPS)).toEqual(
      expect.arrayContaining([{ role: 'manager', app: 'sales' }, { role: 'user', app: 'sales' }, { role: 'admin', app: 'stock' }]),
    )
  })
  it('a member of an inner group does not get the roles of the groups inside it', () => {
    expect(grantsFromGroups('bob', [managers, staff], APPS)).toEqual([{ role: 'user', app: 'sales' }])
  })
  it('a group with no role address (an ordinary team) grants nothing', () => {
    expect(grantsFromGroups('ann', [group('team', ['ann'], [], ['team@acme.com'])], APPS)).toEqual([])
  })
  it('an alias that is a role address grants that role too', () => {
    expect(grantsFromGroups('ann', [group('g', ['ann'], [], ['team@acme.com', 'manager@people'])], APPS)).toEqual([{ role: 'manager', app: 'people' }])
  })
  it('the same grant through two groups is one grant', () => {
    expect(grantsFromGroups('ann', [managers, group('copy', ['ann'], [], ['manager@sales'])], APPS)).toEqual([{ role: 'manager', app: 'sales' }])
  })
  it('a group that contains itself ends the walk', () => {
    const a = group('a', ['ann'], ['b'], ['user@sales'])
    const b = group('b', [], ['a'], ['manager@sales'])
    expect(groupsOfUser('ann', [a, b]).map((g) => g.id).sort()).toEqual(['a', 'b'])
  })
  it('nesting deeper than the limit is not followed', () => {
    const chain = Array.from({ length: MAX_GROUP_DEPTH + 3 }, (_, i) => group(`g${i}`, i === 0 ? ['ann'] : [], i === 0 ? [] : [`g${i - 1}`], [`r${i}@sales`]))
    expect(groupsOfUser('ann', chain)).toHaveLength(MAX_GROUP_DEPTH)
  })
})
