import { describe, it, expect } from 'vitest'
import { FiscalPeriodResolver } from '@/fiscal/period'

// The fiscal-period atom resolves calendar dates → fiscal year/period deterministically
// (pure, tamper-evident via chainLeafUuid). The period invariants: 1-indexed periods,
// the fiscal-year boundary, and contiguous/non-overlapping custom boundaries.
const monthly = {
  fiscalYearStartMonth: 1,
  fiscalYearStartDay: 1,
  periodType: 'monthly' as const,
  regulatoryFramework: 'ias-ifrs' as const,
  leapYearAdjustment: 'none' as const,
  localeCode: 'en-US',
  countryCode: 'US',
}

describe('fiscal/period — FiscalPeriodResolver: deterministic period boundaries', () => {
  it('resolution is pure/deterministic — same input ⇒ same chainLeafUuid', () => {
    const a = FiscalPeriodResolver.resolvePeriod(monthly, '2026-05-12')
    const b = FiscalPeriodResolver.resolvePeriod(monthly, '2026-05-12')
    expect(a).toEqual(b)
    expect(a.chainLeafUuid).toBe(b.chainLeafUuid)
    // the leaf is a content fingerprint of the resolved period — a different month
    // resolves to a different leaf (content-addressed)
    const c = FiscalPeriodResolver.resolvePeriod(monthly, '2026-08-12')
    expect(c.chainLeafUuid).not.toBe(a.chainLeafUuid)
  })

  it('periods are 1-indexed and the FY-start date lands in period 1', () => {
    const start = FiscalPeriodResolver.resolvePeriod(monthly, '2026-01-01')
    expect(start.fiscalYear).toBe(2026)
    expect(start.fiscalPeriod).toBe(1)
    expect(start.fiscalPeriod).toBeGreaterThanOrEqual(1)
    expect(start.quarterNumber).toBe(1)
    expect(start.monthNumber).toBe(1)
  })

  it('a date before the FY-start belongs to the prior fiscal year', () => {
    const aprilStart = { ...monthly, fiscalYearStartMonth: 4, fiscalYearStartDay: 1 }
    // Jan 2026 is before the FY2026 start (Apr 1 2026) ⇒ FY2025
    const r = FiscalPeriodResolver.resolvePeriod(aprilStart, '2026-01-15')
    expect(r.fiscalYear).toBe(2025)
  })

  it('quarterly periods step every ~91 days from the FY start (Q1 early, later quarters higher)', () => {
    const q1 = FiscalPeriodResolver.resolvePeriod({ ...monthly, periodType: 'quarterly' }, '2026-01-15')
    expect(q1.fiscalPeriod).toBe(1)
    expect(q1.periodLabel).toBe('Q1 2026')
    // ~92 days in ⇒ second quarter
    const q2 = FiscalPeriodResolver.resolvePeriod({ ...monthly, periodType: 'quarterly' }, '2026-04-15')
    expect(q2.fiscalPeriod).toBe(2)
    // later dates strictly advance the period (monotonic in day-offset)
    expect(q2.fiscalPeriod).toBeGreaterThan(q1.fiscalPeriod)
  })

  it('an invalid date throws', () => {
    expect(() => FiscalPeriodResolver.resolvePeriod(monthly, 'not-a-date')).toThrow()
  })

  it('validateConfiguration rejects out-of-range FY-start month', () => {
    expect(FiscalPeriodResolver.validateConfiguration(monthly).isValid).toBe(true)
    const bad = FiscalPeriodResolver.validateConfiguration({ ...monthly, fiscalYearStartMonth: 13 })
    expect(bad.isValid).toBe(false)
    expect(bad.errors.length).toBeGreaterThan(0)
  })

  it('validatePeriodBoundary: contiguous, sorted, non-overlapping boundaries pass; overlap fails', () => {
    const good = FiscalPeriodResolver.validatePeriodBoundary([
      { periodNumber: 1, periodLabel: 'P1', startDate: '2026-01-01', endDate: '2026-06-30' },
      { periodNumber: 2, periodLabel: 'P2', startDate: '2026-07-01', endDate: '2026-12-31' },
    ])
    expect(good.isValid).toBe(true)

    const overlap = FiscalPeriodResolver.validatePeriodBoundary([
      { periodNumber: 1, periodLabel: 'P1', startDate: '2026-01-01', endDate: '2026-07-15' },
      { periodNumber: 2, periodLabel: 'P2', startDate: '2026-07-01', endDate: '2026-12-31' },
    ])
    expect(overlap.isValid).toBe(false)
    expect(overlap.errors.length).toBeGreaterThan(0)
  })

  it('amendConfiguration applies the amendment and stamps a deterministic chainLeafUuid', () => {
    const first = FiscalPeriodResolver.amendConfiguration(monthly, { localeCode: 'bg-BG' })
    expect(first.localeCode).toBe('bg-BG')
    // the rest of the config is carried through unchanged
    expect(first.periodType).toBe('monthly')
    expect(first.chainLeafUuid).toBeTruthy()
    expect(typeof first.chainLeafUuid).toBe('string')
    // the leaf is a deterministic content fingerprint — same amendment ⇒ same leaf
    const again = FiscalPeriodResolver.amendConfiguration(monthly, { localeCode: 'bg-BG' })
    expect(again.chainLeafUuid).toBe(first.chainLeafUuid)
  })

  it('amendConfiguration rejects an amendment that violates the config invariants', () => {
    expect(() =>
      FiscalPeriodResolver.amendConfiguration(monthly, { fiscalYearStartMonth: 13 }),
    ).toThrow()
  })

  it('registeredPeriodTypes includes the six supported types', () => {
    const types = FiscalPeriodResolver.registeredPeriodTypes().map((t) => t.type)
    expect(types).toEqual(
      expect.arrayContaining(['monthly', 'quarterly', 'weekly', 'iso-week', 'retail-445', 'custom']),
    )
  })
})
