import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import { conform, mappers, oid, options, shiftStatus, type Row } from '@/seed/etrima'

const mapper = (collection: string) => {
  const found = mappers.find((m) => m.collection === collection)
  if (!found) throw new Error(`no mapper for ${collection}`)
  return found
}

describe('etrima port — every row gets a stable id', () => {
  it('the same table and id always give the same uuid', () => {
    expect(oid('lots', 42)).toBe(oid('lots', 42))
    expect(oid('lots', 42)).toBe(oid('lots', '42')) // an integer id and its text form are one row
  })
  it('different rows and different tables never share one', () => {
    expect(oid('lots', 42)).not.toBe(oid('lots', 43))
    expect(oid('lots', 42)).not.toBe(oid('packs', 42))
  })
  it('is laid out as a version-8 uuid', () => {
    expect(oid('lots', 42)).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })
})

describe('etrima port — the 12 option slots fold into options[]', () => {
  it('keeps the filled slots in order and drops the empty ones', () => {
    const row: Row = { option_1_units_ordered: 5, option_1_units_produced: 4, option_3_units_ordered: 2, option_3_units_produced: null }
    expect(options(row, { ordered: 'units_ordered', produced: 'units_produced' })).toEqual([{ ordered: 5, produced: 4 }, { ordered: 2 }])
  })
  it('a row with no option values has no options', () => {
    expect(options({}, { ordered: 'units_ordered' })).toEqual([])
  })
  it('a zero is a value, not an empty slot', () => {
    expect(options({ option_2_units_ordered: 0 }, { ordered: 'units_ordered' })).toEqual([{ ordered: 0 }])
  })
})

describe('etrima port — mappers are pure: one row in, one document out', () => {
  it('a work order points at its variant, step and shift by their stable ids', () => {
    const doc = mapper('work-orders').map({ id: 7, date: new Date('2020-03-04T00:00:00Z'), lot_variant_id: 11, lot_work_phase_id: 12, work_shift_id: 13, phase_sort: 3, option_1_units_ordered: 10, option_1_units_produced: 9, option_1_units_backordered: 1, unit_seconds: 60, pay_per_hour: '12.50' })
    expect(doc).toMatchObject({
      id: oid('work_orders', 7),
      reference: 'WO-7',
      date: '2020-03-04T00:00:00.000Z',
      lotVariant: oid('lot_variants', 11),
      lotWorkPhase: oid('lot_work_phases', 12),
      workShift: oid('work_shifts', 13),
      lotWorkPhaseSort: 3,
      options: [{ ordered: 10, produced: 9, backordered: 1 }],
      unitSeconds: 60,
      payPerHour: 12.5, // postgres numeric arrives as text
    })
    // header totals and the derived state are the hooks' to compute on import, not the port's to assert
    for (const derived of ['unitsOrdered', 'unitsProduced', 'unitsBackordered', 'state', 'wage']) expect(doc).not.toHaveProperty(derived)
  })
  it('an absent etrima column is an absent field, never an explicit null', () => {
    const doc = mapper('work-orders').map({ id: 8, lot_variant_id: null, note: '' })
    expect(Object.values(doc)).not.toContain(null)
    expect(doc).not.toHaveProperty('lotVariant')
    expect(doc).not.toHaveProperty('note')
  })
  it('a work phase with no name is named by its code (29,661 of 41,854 in etrima)', () => {
    expect(mapper('work-phases').map({ id: 1, code: 'CONF-12', name: null, parent_id: '5' })).toMatchObject({ code: 'CONF-12', name: 'CONF-12', parent: oid('work_phases', '5') })
    expect(mapper('work-phases').map({ id: 2, code: 'CUT', name: 'Cutting', parent_id: null })).not.toHaveProperty('parent')
  })
  it('a shift takes its status from the furthest watermark reached', () => {
    expect(shiftStatus({})).toBe('opened')
    expect(shiftStatus({ started_at: new Date() })).toBe('started')
    expect(shiftStatus({ started_at: new Date(), finished_at: new Date() })).toBe('finished')
    expect(shiftStatus({ started_at: new Date(), closed_at: new Date() })).toBe('closed')
  })
  it('an employee is exported as number, name and hire date only (data minimisation)', () => {
    const doc = mapper('employees').map({ id: 3, number: '0042', name: 'Ada Maria Lovelace', started_at: new Date('2010-01-02T00:00:00Z'), egn: '0000000000', phone: '555', address: 'somewhere' })
    expect(doc).toMatchObject({ employeeNumber: '0042', displayName: 'Ada Maria Lovelace', identity: { givenName: 'Ada', familyName: 'Maria Lovelace' }, hireDate: '2010-01-02T00:00:00.000Z' })
    expect(JSON.stringify(doc)).not.toMatch(/0000000000|555|somewhere/)
  })
  it('an account becomes a party with a unique code, a customer by default', () => {
    const a = mapper('parties').map({ id: 9, code: 'ACME', name: null, company: 'Acme Ltd', country_code: 'BG', currency_code: null, vat_registration: 'BG123' })
    const b = mapper('parties').map({ id: 10, code: 'ACME', name: 'Acme again' })
    expect(a).toMatchObject({ code: 'ACME-9', name: 'Acme Ltd', roles: ['customer'], country: 'BG', identity: { type: 'company', status: 'active' }, tax: { vatNumber: 'BG123' }, commercial: { defaultCurrency: 'EUR' } })
    expect(b.code).toBe('ACME-10') // etrima codes repeat; erpax codes are unique
    expect(mapper('parties').map({ id: 11 })).toMatchObject({ code: 'A-11', name: 'Account 11' })
  })
  it('a team becomes a crew work-center, and shifts and routing steps point at it', () => {
    expect(mapper('work-centers').map({ id: 4, code: 'T4', name: null })).toMatchObject({ id: oid('teams', 4), reference: 'TEAM-T4', name: 'T4', type: 'crew' })
    expect(mapper('work-shifts').map({ id: 1, team_id: 4, employee_id: 2 })).toMatchObject({ team: oid('teams', 4), actor: oid('employees', 2) })
    expect(mapper('lot-work-phases').map({ id: 1, lot_id: 3, work_phase_id: 5, team_id: 4 })).toMatchObject({ team: oid('teams', 4) })
  })
  it('an order carries its buyer as the party, and a lot points at its order', () => {
    expect(mapper('orders').map({ id: 6, number: 'SO-6', buyer_id: 9, date: new Date('2019-05-06T00:00:00Z'), total_price: '1200.50' })).toMatchObject({
      id: oid('orders', 6), orderNumber: 'SO-6', party: { relationTo: 'parties', value: oid('accounts', 9) }, orderDate: '2019-05-06T00:00:00.000Z', totalAmount: 1200.5,
    })
    expect(mapper('orders').map({ id: 7 }).orderNumber).toBe('O-7')
    expect(mapper('lots').map({ id: 3, order_id: 6 })).toMatchObject({ order: oid('orders', 6) })
  })
  it('a work order\'s worker is the employee behind the contract etrima recorded', () => {
    expect(mapper('work-orders').map({ id: 7, worker_id: 55, worker_employee_id: 2 })).toMatchObject({ worker: oid('employees', 2) })
    expect(mapper('work-orders').map({ id: 8, worker_id: 55, worker_employee_id: null })).not.toHaveProperty('worker')
  })
  it('lists a collection after everything it points at', () => {
    const order = mappers.map((m) => m.collection)
    const before = (a: string, b: string) => expect(order.indexOf(a), `${a} before ${b}`).toBeLessThan(order.indexOf(b))
    before('parties', 'orders'); before('orders', 'lots'); before('work-centers', 'lot-work-phases'); before('work-centers', 'work-shifts'); before('employees', 'work-orders')
    before('products', 'lots'); before('lots', 'lot-work-phases'); before('lot-work-phases', 'lot-variants'); before('work-phases', 'lot-work-phases')
    before('employees', 'work-shifts'); before('work-shifts', 'work-orders'); before('lot-variants', 'work-orders'); before('packs', 'pack-items'); before('lot-variants', 'pack-items')
  })
})

describe('etrima port — conform measures a document against the collection config', () => {
  const fields: Field[] = [
    { name: 'reference', type: 'text', required: true },
    { name: 'status', type: 'select', options: ['open', { label: 'Closed', value: 'closed' }] },
    { name: 'currency', type: 'text', required: true, defaultValue: 'EUR' },
    { name: 'totals', type: 'group', fields: [{ name: 'amount', type: 'number', required: true }] },
    { name: 'lines', type: 'array', fields: [{ name: 'quantity', type: 'number', required: true }, { name: 'note', type: 'text' }] },
  ]
  it('a conforming document has nothing against it', () => {
    expect(conform({ fields }, { id: 'x', reference: 'A', status: 'closed', totals: { amount: 1 }, lines: [{ quantity: 2 }] })).toEqual([])
  })
  it('names an unknown field, a missing required one, and a value outside a select', () => {
    expect(conform({ fields }, { reference: 'A', statuz: 'open', totals: { amount: 1 } })).toEqual(['unknown field statuz'])
    expect(conform({ fields }, { totals: { amount: 1 } })).toEqual(['missing required reference'])
    expect(conform({ fields }, { reference: 'A', status: 'draft', totals: { amount: 1 } })).toEqual(['status = "draft" is not an option'])
  })
  it('looks inside groups and array rows', () => {
    expect(conform({ fields }, { reference: 'A', totals: {}, lines: [{ quantity: 1 }, { note: 'x', extra: 1 }] })).toEqual(['missing required totals.amount', 'unknown field lines.extra', 'missing required lines.quantity'])
    expect(conform({ fields }, { reference: 'A' })).toEqual(['missing required totals'])
  })
  it('a required field with a default is Payload\'s to fill, not the document\'s', () => {
    expect(conform({ fields }, { reference: 'A', totals: { amount: 1 } })).toEqual([]) // no currency given
  })
})
