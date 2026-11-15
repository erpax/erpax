import { describe, it, expect } from 'vitest'

import { calendarConfig, updateFiscalCalendarOnPeriodChange } from '@/hooks/collections/fiscal-periods/updateFiscalCalendarOnPeriodChange'

type Doc = Record<string, unknown>
const run = (data: Doc, originalDoc?: Doc) => (updateFiscalCalendarOnPeriodChange as never as (a: unknown) => Doc | undefined)({ data, originalDoc })

const boundaries = [{ periodNumber: 1, periodLabel: 'P1', startDate: '2026-06-01', endDate: '2026-06-30' }]

describe('update/fiscal/calendar/on/period/change — validates the calendar the period keeps, where it keeps it', () => {
  it('reads identity.periodType and the configuration group', () => {
    expect(calendarConfig({ identity: { periodType: 'custom' }, configuration: { fiscalYearStartMonth: 7, customPeriodBoundaries: boundaries } })).toMatchObject({
      periodType: 'custom',
      fiscalYearStartMonth: 7,
      customPeriodBoundaries: boundaries,
    })
  })

  it('a custom period names its boundaries', () => {
    expect(() => run({ identity: { periodType: 'custom' } })).toThrow(/customPeriodBoundaries required/)
    expect(run({ identity: { periodType: 'custom' }, configuration: { customPeriodBoundaries: boundaries } })).toBeDefined()
  })

  it('the collection’s own period types pass — they are not the resolver’s vocabulary', () => {
    for (const periodType of ['monthly', 'weekly_445', 'quarterly', 'annual']) expect(run({ identity: { periodType } }), periodType).toBeDefined()
  })

  it('an update without the calendar keeps the stored one', () => {
    expect(() => run({ changeReason: 'rename' }, { identity: { periodType: 'custom' } })).toThrow(/customPeriodBoundaries required/)
    expect(run({ changeReason: 'rename' }, { identity: { periodType: 'monthly' } })).toEqual({ changeReason: 'rename' })
  })

  it('writes nothing it does not own', () => {
    expect(run({ identity: { periodType: 'monthly' } })).toEqual({ identity: { periodType: 'monthly' } })
  })
})
