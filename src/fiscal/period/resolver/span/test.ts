import { describe, expect, it } from 'vitest'
import type { FiscalPeriodConfig } from '@/fiscal/period/resolver'
import { customSpan, fiscalYearStart, isoWeek, monthlySpan, quarterlySpan, retail445Span, spanOf, weeklySpan } from './index'

const config = (periodType: FiscalPeriodConfig['periodType'], extra: Partial<FiscalPeriodConfig> = {}): FiscalPeriodConfig => ({
  fiscalYearStartMonth: 1,
  fiscalYearStartDay: 1,
  periodType,
  regulatoryFramework: 'ias-ifrs',
  leapYearAdjustment: 'none',
  localeCode: 'en-US',
  countryCode: 'BG',
  ...extra,
})

describe('fiscal/period/resolver/span — the period kinds as pure functions', () => {
  it('a fiscal year starts where the config says, in UTC', () => {
    expect(fiscalYearStart(2026, config('monthly', { fiscalYearStartMonth: 4, fiscalYearStartDay: 6 })).toISOString()).toBe('2026-04-06T00:00:00.000Z')
  })

  it('ISO week: the week holding the Thursday — 2026-01-01 is week 1, 2027-01-01 is week 53 of 2026', () => {
    expect(isoWeek(new Date('2026-01-01T00:00:00Z'))).toBe(1)
    expect(isoWeek(new Date('2027-01-01T00:00:00Z'))).toBe(53)
    expect(isoWeek(new Date('2026-06-15T00:00:00Z'))).toBe(25)
  })

  it('monthly spans carry real bounds; the thin kinds carry ordinal and label only', () => {
    const m = monthlySpan(45, 2026, config('monthly'))
    expect(m).toEqual({ fiscalPeriod: 2, periodLabel: 'February 2026', periodStartDate: '2026-02-01', periodEndDate: '2026-02-28' })
    expect(quarterlySpan(200, 2026)).toMatchObject({ fiscalPeriod: 3, periodLabel: 'Q3 2026' })
    expect(weeklySpan(13, 2026)).toMatchObject({ fiscalPeriod: 2, periodLabel: 'W2 2026' })
    expect(retail445Span(27, 2026).fiscalPeriod).toBe(1)
    expect(retail445Span(28, 2026).fiscalPeriod).toBe(2)
    expect(retail445Span(56, 2026)).toMatchObject({ fiscalPeriod: 3, periodLabel: 'P3 (5w) 2026' })
  })

  it('custom boundaries resolve by inclusive date range and refuse a date outside every boundary', () => {
    const b = [{ periodNumber: 7, periodLabel: 'Seven', startDate: '2026-03-01', endDate: '2026-03-31' }]
    expect(customSpan(new Date('2026-03-31T12:00:00Z'), b)).toEqual({ fiscalPeriod: 7, periodLabel: 'Seven', periodStartDate: '2026-03-01', periodEndDate: '2026-03-31' })
    expect(() => customSpan(new Date('2026-04-01T00:00:00Z'), b)).toThrow(/not found in custom boundaries/)
  })

  it('spanOf dispatches every kind the config can name, and refuses custom without boundaries', () => {
    const d = new Date('2026-06-15T00:00:00Z')
    expect(spanOf(config('iso-week'), 165, 2026, d).fiscalPeriod).toBe(25)
    expect(spanOf(config('quarterly'), 165, 2026, d).fiscalPeriod).toBe(2)
    expect(() => spanOf(config('custom'), 165, 2026, d)).toThrow(/customPeriodBoundaries required/)
    expect(() => spanOf(config('lunar' as FiscalPeriodConfig['periodType']), 0, 2026, d)).toThrow(/Unsupported periodType/)
  })
})
