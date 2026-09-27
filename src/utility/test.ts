import { describe, it, expect } from 'vitest'
import { exactAbs, exactFloor, exactMax } from '@/algebra'
import {
  calculateRatio,
  calculatePercentage,
  calculateVariancePercent,
  calculateGrowthRate,
  calculateStraightLineDepreciation,
  calculateDoubleDecliningBalanceDepreciation,
  calculateSumOfYearsDigitsDepreciation,
  calculateUnitsOfActivityDepreciation,
  calculateWeightedAverageCost,
  calculateGrossProfitMargin,
  calculateROA,
  calculateROE,
  bucketAgeDays,
  daysBetween,
  daysBetweenCeil,
  daysApart,
  daysExact,
  daysOverdue,
  daysUntil,
  addDays,
  hoursFromMs,
  msFromMinutes,
  formatClock,
  parseClock,
} from '@/utility'

// utility — the operational guard organ: no naked zero. Every quotient passes a
// guard chosen by what the denominator's zero MEANS, so ∞/NaN never enter an
// account (./calculations.ts). This atom's policy is COLLAPSE→0 for an
// undefined ratio.
describe('utility — no bare division escapes a guard (COLLAPSE→0)', () => {
  it('calculateRatio collapses a zero denominator to 0, never ∞/NaN', () => {
    expect(calculateRatio(10, 2)).toBe(5)
    expect(calculateRatio(10, 0)).toBe(0)
    expect(Number.isFinite(calculateRatio(10, 0))).toBe(true)
    expect(Number.isNaN(calculateRatio(0, 0))).toBe(false)
  })

  it('percentage / variance% / growth all collapse to 0 on a zero base', () => {
    expect(calculatePercentage(25, 100)).toBe(25)
    expect(calculatePercentage(5, 0)).toBe(0)
    expect(calculateVariancePercent(120, 100)).toBe(20)
    expect(calculateVariancePercent(120, 0)).toBe(0)
    expect(calculateGrowthRate(0, 100, 4)).toBe(0) // zero first value
    expect(calculateGrowthRate(100, 200, 0)).toBe(0) // zero periods
  })

  it('margins / ROA / ROE collapse to 0 on a zero denominator', () => {
    expect(calculateGrossProfitMargin(200, 50)).toBe(75)
    expect(calculateGrossProfitMargin(0, 50)).toBe(0)
    expect(calculateROA(50, 0)).toBe(0)
    expect(calculateROE(50, 0)).toBe(0)
  })

  it('depreciation methods guard useful-life / total-units zero with 0', () => {
    expect(calculateStraightLineDepreciation(1000, 5)).toBe(200)
    expect(calculateStraightLineDepreciation(1000, 0)).toBe(0)
    expect(calculateDoubleDecliningBalanceDepreciation(1000, 0)).toBe(0)
    expect(calculateSumOfYearsDigitsDepreciation(1000, 0, 1)).toBe(0)
    expect(calculateUnitsOfActivityDepreciation(1000, 0, 10)).toBe(0)
  })

  it('DDB stop rule never depreciates below residual', () => {
    // bookValue 100, residual 90: headroom is only 10, raw would be larger
    expect(calculateDoubleDecliningBalanceDepreciation(100, 2, 90)).toBe(10)
    // at residual: no headroom ⇒ 0
    expect(calculateDoubleDecliningBalanceDepreciation(90, 2, 90)).toBe(0)
  })

  it('units-of-activity caps billable units at the remaining life', () => {
    // perUnit = 1000/100 = 10; only 20 units remain ⇒ capped at 20 ⇒ 200
    expect(calculateUnitsOfActivityDepreciation(1000, 100, 50, 80)).toBe(200)
    // within remaining life ⇒ full
    expect(calculateUnitsOfActivityDepreciation(1000, 100, 10, 0)).toBe(100)
  })

  it('weighted-average cost collapses to 0 when total quantity is 0', () => {
    expect(calculateWeightedAverageCost(10, 5, 10, 7)).toBe(6) // (50+70)/20
    expect(calculateWeightedAverageCost(0, 5, 0, 7)).toBe(0)
  })

  it('aging buckets follow the canonical 30/60/90 boundaries', () => {
    expect(bucketAgeDays(0)).toBe('current')
    expect(bucketAgeDays(30)).toBe('current')
    expect(bucketAgeDays(31)).toBe('aging')
    expect(bucketAgeDays(60)).toBe('aging')
    expect(bucketAgeDays(61)).toBe('overdue')
    expect(bucketAgeDays(90)).toBe('overdue')
    expect(bucketAgeDays(91)).toBe('stale')
    expect(bucketAgeDays(-5)).toBe('current') // future-dated surfaces as current
  })

  it('daysBetween floors to whole days and accepts Date | string', () => {
    expect(daysBetween('2026-01-01T00:00:00.000Z', '2026-01-11T00:00:00.000Z')).toBe(10)
    expect(daysBetween(new Date('2026-01-01'), new Date('2026-01-02'))).toBe(1)
  })
})

/**
 * The unit family — one divisor, at one address, seeded by one literal.
 *
 * The day stood at 24 addresses in four notations and the hour and minute at eleven more, while
 * `daysBetween` called itself the single source of truth and three files used it ([[rules]]/unit).
 */
describe('utility — one day, and the roundings that travel with it', () => {
  const t0 = new Date('2026-01-01T00:00:00.000Z')

  it('floor and ceil DISAGREE on a partial day, which is why both are named', () => {
    const half = new Date('2026-01-01T12:00:00.000Z')
    expect(daysBetween(t0, half)).toBe(0)
    expect(daysBetweenCeil(t0, half)).toBe(1)
    // One day of difference moves an invoice across the 0-30 / 31-60 aging boundary, so the choice
    // is accounting policy and is made at the call site rather than buried in a divisor.
  })

  it('daysApart cannot be composed from daysBetween — abs belongs INSIDE the floor', () => {
    const back = new Date('2025-12-31T12:00:00.000Z') // half a day BEFORE t0
    expect(daysApart(t0, back)).toBe(0)
    expect(daysApart(back, t0)).toBe(0) // symmetric
    expect(exactAbs(daysBetween(t0, back))).toBe(1) // the composition a caller would reach for
  })

  it('daysExact keeps the fraction, because rounding belongs at the END of a calculation', () => {
    expect(daysExact(t0, new Date('2026-01-01T06:00:00.000Z'))).toBeCloseTo(0.25, 9)
  })

  it('overdue and remaining floor at zero in opposite directions', () => {
    const later = new Date('2026-01-11T00:00:00.000Z')
    expect(daysOverdue(t0, later)).toBe(10)
    expect(daysOverdue(later, t0)).toBe(0) // not yet due is zero overdue, never minus ten
    expect(daysUntil(later, t0)).toBe(10)
    // "days remaining" is this floored at zero, written at the one site that wants it rather than
    // carried as a second name for the same arithmetic.
    expect(exactMax(0, daysUntil(t0, later))).toBe(0)
  })

  it('addDays is the inverse of a difference, through the same one divisor', () => {
    expect(daysBetween(t0, addDays(t0, 30))).toBe(30)
    expect(addDays(t0, -1).toISOString()).toBe('2025-12-31T00:00:00.000Z')
  })

  it('the smaller units are DERIVED, so one literal seeds the family', () => {
    expect(msFromMinutes(60)).toBe(msFromMinutes(1) * 60)
    expect(hoursFromMs(msFromMinutes(90))).toBe(1.5) // fractional on purpose
    expect(hoursFromMs(msFromMinutes(24 * 60))).toBe(24)
  })

  it('daysApart COMPOSES from daysExact — the order of abs and floor is the whole point', () => {
    const back = new Date('2025-12-31T12:00:00.000Z')
    expect(exactFloor(exactAbs(daysExact(t0, back)))).toBe(daysApart(t0, back))
    // and flooring first does not: that is what makes the composition order load-bearing
    expect(exactAbs(daysBetween(t0, back))).not.toBe(daysApart(t0, back))
  })
})

/**
 * The codec whose two halves lived apart: `capture/media` formatted and `transcript` parsed, each
 * with its own inline unit arithmetic. Together they can state the round-trip.
 */
describe('utility — the cue-timing codec round-trips', () => {
  it('formats the WebVTT canonical form', () => {
    expect(formatClock(0)).toBe('00:00:00.000')
    expect(formatClock(3_723_456)).toBe('01:02:03.456')
  })

  it('parses both dialects — SRT writes the fraction with a comma', () => {
    expect(parseClock('01:02:03.456')).toBe(3_723_456)
    expect(parseClock('01:02:03,456')).toBe(3_723_456)
    expect(parseClock('02:03.456')).toBe(123_456) // hours optional
    expect(parseClock('nonsense')).toBeNaN()
  })

  it('parse ∘ format is the identity — the invariant neither half could state alone', () => {
    for (const ms of [0, 1, 999, 1_000, 61_000, 3_599_999, 3_723_456, 86_399_999]) {
      expect(parseClock(formatClock(ms))).toBe(ms)
    }
  })
})
