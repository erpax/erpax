import { describe, it, expect } from 'vitest'
import { ACCOUNT_ROLES, abilityForRoles } from '@/utilities/ability/roles'

const of = (roles: string[], employeeId?: string) => abilityForRoles({ roles, employeeId })

describe('role abilities — etrima\'s Ability on erpax collections', () => {
  it('no role, or an unknown one, grants nothing', () => {
    expect(of([]).permits('read', 'work-orders')).toBe(false)
    expect(of(['nonsense']).permits('read', 'work-orders')).toBe(false)
    expect(ACCOUNT_ROLES).toContain('work_supervisor')
  })
  it('admin and manager manage everything; user reads everything', () => {
    for (const role of ['admin', 'manager']) expect(of([role]).permits('delete', 'anything'), role).toBe(true)
    expect(of(['user']).permits('read', 'lots')).toBe(true)
    expect(of(['user']).permits('update', 'lots')).toBe(false)
  })
  it('hr_manager manages people and shifts, and only reads the routing', () => {
    const hr = of(['hr_manager'])
    for (const subject of ['employees', 'job-positions', 'work-shifts', 'work-centers']) expect(hr.permits('delete', subject), subject).toBe(true)
    for (const subject of ['work-phases', 'lot-work-phases', 'work-orders']) {
      expect(hr.permits('read', subject), subject).toBe(true)
      expect(hr.permits('update', subject), subject).toBe(false)
    }
    expect(hr.permits('read', 'orders')).toBe(false)
  })
  it('order_manager manages the order-to-pack chain; production_manager the shop floor', () => {
    for (const subject of ['parties', 'orders', 'lots', 'lot-variants', 'packs', 'pack-items', 'packages']) expect(of(['order_manager']).permits('create', subject), subject).toBe(true)
    expect(of(['order_manager']).permits('read', 'work-orders')).toBe(false)
    const pm = of(['production_manager'])
    for (const subject of ['work-centers', 'work-phases', 'lot-work-phases', 'work-shifts', 'work-orders']) expect(pm.permits('delete', subject), subject).toBe(true)
    expect(pm.permits('read', 'lot-variants')).toBe(true)
    expect(pm.permits('update', 'lot-variants')).toBe(false)
  })
  it('a work manager reads and creates orders, and manages only the ones they direct', () => {
    const wm = of(['work_manager'], 'e1')
    expect(wm.permits('create', 'work-orders')).toBe(true)
    expect(wm.permits('delete', 'work-orders', { director: 'e1' })).toBe(true)
    expect(wm.permits('delete', 'work-orders', { director: 'e2' })).toBe(false)
    expect(wm.accessibleBy('read', 'work-orders')).toBe(true)
    expect(wm.accessibleBy('delete', 'work-orders')).toEqual({ director: { equals: 'e1' } })
    // without a known employee record there is nobody to match `director` against: no manage rule at all
    expect(of(['work_manager']).permits('delete', 'work-orders', { director: undefined })).toBe(false)
  })
  it('a supervisor sees only their own orders, and updates them only while open', () => {
    const sup = of(['work_supervisor'], 'e1')
    expect(sup.accessibleBy('read', 'work-orders')).toEqual({ supervisor: { equals: 'e1' } })
    expect(sup.accessibleBy('update', 'work-orders')).toEqual({ and: [{ supervisor: { equals: 'e1' } }, { closedAt: { equals: null } }] })
    expect(sup.permits('update', 'work-orders', { supervisor: 'e1', closedAt: null })).toBe(true)
    expect(sup.permits('update', 'work-orders', { supervisor: 'e1', closedAt: '2026-01-01' })).toBe(false)
    expect(sup.permits('read', 'work-orders', { supervisor: 'e2' })).toBe(false)
    expect(of(['work_supervisor']).accessibleBy('read', 'work-orders')).toBe(false) // no employee record, no orders
  })
  it('a client reads the production view and nothing about orders account-wide (that is a party role)', () => {
    const client = of(['client'])
    for (const subject of ['lots', 'lot-variants', 'lot-work-phases', 'packs', 'pack-items']) expect(client.permits('read', subject), subject).toBe(true)
    expect(client.permits('read', 'orders')).toBe(false)
    expect(client.permits('update', 'lots')).toBe(false)
  })
  it('roles add up', () => {
    const both = of(['mechanic', 'packing_manager'])
    expect(both.permits('update', 'work-centers')).toBe(true)
    expect(both.permits('delete', 'work-centers')).toBe(false)
    expect(both.permits('delete', 'packs')).toBe(true)
  })
})
