import { describe, expect, it } from 'vitest'

import { partyRows, roleError, rowsKeptError } from '@/hooks/collections/parties/partyRows'

describe('partyRows — a party keeps its mandates and scorecards, each on its own side', () => {
  it('a stored row is never removed', () => {
    expect(rowsKeptError([{ id: 'a' }], [{ id: 'a' }, {}], 'scorecard')).toBe(true)
    expect(rowsKeptError([{ id: 'a' }, { id: 'b' }], [{ id: 'a' }], 'scorecard')).toMatch(/never removed/)
  })

  it('mandates belong to a customer, scorecards to a vendor', () => {
    expect(roleError([{}], ['customer'], 'customer', 'SEPA mandate')).toBe(true)
    expect(roleError([{}], ['vendor'], 'customer', 'SEPA mandate')).toMatch(/belongs to a customer/)
    expect(roleError([], ['vendor'], 'customer', 'SEPA mandate')).toBe(true)
  })

  it('the hook reads the stored roles and rows when the request leaves them out', () => {
    const run = (data: object, originalDoc?: object) => (partyRows as unknown as (a: object) => unknown)({ data, originalDoc })
    const original = { roles: ['vendor'], scorecards: [{ id: 'q1' }], mandates: [] }
    expect(() => run({ scorecards: [] }, original)).toThrow(/never removed/)
    expect(() => run({ mandates: [{ mandateId: 'M-1' }] }, original)).toThrow(/belongs to a customer/)
    expect(run({ name: 'Renamed' }, original)).toEqual({ name: 'Renamed' })
  })
})
