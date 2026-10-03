/**
 * fiscal/period/resolver/span — where in the fiscal year a calendar date falls, as a span.
 *
 * The period kinds the resolver knows — monthly · quarterly · weekly · ISO-week · retail 4-4-5 ·
 * custom boundaries — were private statics inside a 714-line class, the hub [[rules]]/concentration
 * named. They are pure functions of (config, day offset, fiscal year, date) and nothing else, so
 * they live here as the resolver's child; the class keeps its face and delegates.
 *
 * @standard ISO-8601:2019 week-numbering (the ISO week)
 * @accounting IAS-1 §36 reporting period
 * @see ../index.ts · ./SKILL.md
 */
import { exactCeil, exactFloor } from '@/algebra'
import { daysExact } from '@/utility'
import type { FiscalPeriodConfig } from '@/fiscal/period/resolver'

/** The span a date resolves to: its ordinal in the fiscal year, its label, and its bounds when the kind has them. */
export interface PeriodSpan {
  readonly fiscalPeriod: number
  readonly periodLabel: string
  readonly periodStartDate: string
  readonly periodEndDate: string
}

const isoDate = (d: Date): string => d.toISOString().split('T')[0] as string

/** The first day of a fiscal year, in UTC. */
export function fiscalYearStart(year: number, config: FiscalPeriodConfig): Date {
  return new Date(Date.UTC(year, config.fiscalYearStartMonth - 1, config.fiscalYearStartDay))
}

/** ISO-8601 week number of a date: the week holding the Thursday. */
export function isoWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return exactCeil((daysExact(yearStart, d) + 1) / 7)
}

export function monthlySpan(daysIntoFiscalYear: number, fiscalYear: number, config: FiscalPeriodConfig): PeriodSpan {
  const fyStart = fiscalYearStart(fiscalYear, config)
  const monthsIn = exactFloor(daysIntoFiscalYear / 30)
  const periodStart = new Date(fyStart)
  periodStart.setUTCMonth(periodStart.getUTCMonth() + monthsIn)
  const periodEnd = new Date(periodStart)
  periodEnd.setUTCMonth(periodEnd.getUTCMonth() + 1)
  periodEnd.setUTCDate(0)
  const monthName = periodStart.toLocaleString('en-US', { month: 'long' })
  return { fiscalPeriod: monthsIn + 1, periodLabel: `${monthName} ${fiscalYear}`, periodStartDate: isoDate(periodStart), periodEndDate: isoDate(periodEnd) }
}

export function quarterlySpan(daysIntoFiscalYear: number, fiscalYear: number): PeriodSpan {
  const fiscalPeriod = exactFloor(daysIntoFiscalYear / 91) + 1
  return { fiscalPeriod, periodLabel: `Q${fiscalPeriod} ${fiscalYear}`, periodStartDate: '', periodEndDate: '' }
}

export function weeklySpan(daysIntoFiscalYear: number, fiscalYear: number): PeriodSpan {
  const fiscalPeriod = exactFloor(daysIntoFiscalYear / 7) + 1
  return { fiscalPeriod, periodLabel: `W${fiscalPeriod} ${fiscalYear}`, periodStartDate: '', periodEndDate: '' }
}

export function isoWeekSpan(fiscalYear: number, date: Date): PeriodSpan {
  const week = isoWeek(date)
  return { fiscalPeriod: week, periodLabel: `W${week} ${fiscalYear}`, periodStartDate: '', periodEndDate: '' }
}

/** Retail 4-4-5: two four-week periods and a five-week one per quarter. */
export function retail445Span(daysIntoFiscalYear: number, fiscalYear: number): PeriodSpan {
  const fiscalPeriod = daysIntoFiscalYear >= 56 ? 3 : daysIntoFiscalYear >= 28 ? 2 : 1
  const labels = ['P1 (4w)', 'P2 (4w)', 'P3 (5w)']
  return { fiscalPeriod, periodLabel: `${labels[fiscalPeriod - 1]} ${fiscalYear}`, periodStartDate: '', periodEndDate: '' }
}

export function customSpan(date: Date, boundaries: NonNullable<FiscalPeriodConfig['customPeriodBoundaries']>): PeriodSpan {
  const dateStr = isoDate(date)
  for (const b of boundaries) {
    if (dateStr >= b.startDate && dateStr <= b.endDate) {
      return { fiscalPeriod: b.periodNumber, periodLabel: b.periodLabel, periodStartDate: b.startDate, periodEndDate: b.endDate }
    }
  }
  throw new Error(`Date ${dateStr} not found in custom boundaries`)
}

/** Dispatch on the configured kind — every kind the config can name resolves, and an unknown one refuses. */
export function spanOf(config: FiscalPeriodConfig, daysIntoFiscalYear: number, fiscalYear: number, date: Date): PeriodSpan {
  switch (config.periodType) {
    case 'monthly':
      return monthlySpan(daysIntoFiscalYear, fiscalYear, config)
    case 'quarterly':
      return quarterlySpan(daysIntoFiscalYear, fiscalYear)
    case 'weekly':
      return weeklySpan(daysIntoFiscalYear, fiscalYear)
    case 'iso-week':
      return isoWeekSpan(fiscalYear, date)
    case 'retail-445':
      return retail445Span(daysIntoFiscalYear, fiscalYear)
    case 'custom':
      if (!config.customPeriodBoundaries) throw new Error('customPeriodBoundaries required for periodType=custom')
      return customSpan(date, config.customPeriodBoundaries)
    default:
      throw new Error(`Unsupported periodType: ${String(config.periodType)}`)
  }
}
