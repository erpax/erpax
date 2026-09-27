import { describe, it, expect } from 'vitest'
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
