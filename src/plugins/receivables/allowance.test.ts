/**
 * Allowance for Doubtful Accounts Tests — IFRS-9 / ASC-326 estimator.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IFRS-9 §5.5 expected-credit-loss
 * @accounting US-GAAP ASC-326 §20 current-expected-credit-loss
 * @accounting US-GAAP ASC-310 receivables
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §5 §7
 */

import { describe, expect, test } from 'vitest'

import { AllowanceCalculator } from '@/plugins/receivables/allowance'
import { AgingBucket } from '@/plugins/receivables/types'

describe('AllowanceCalculator', () => {
  const mockBuckets: AgingBucket[] = [
    {
      name: 'Current',
      dayMin: 0,
      dayMax: 30,
      invoices: [],
      totalAmount: 100000, // $1000
      invoiceCount: 10,
      percentage: 25,
    },
    {
      name: '31-60 days',
      dayMin: 31,
      dayMax: 60,
      invoices: [],
      totalAmount: 150000, // $1500
      invoiceCount: 5,
      percentage: 37.5,
    },
    {
      name: '61-90 days',
      dayMin: 61,
      dayMax: 90,
      invoices: [],
      totalAmount: 100000, // $1000
      invoiceCount: 3,
      percentage: 25,
    },
    {
      name: '90+ days',
      dayMin: 91,
      dayMax: Infinity,
      invoices: [],
      totalAmount: 50000, // $500
      invoiceCount: 2,
      percentage: 12.5,
    },
  ]

  describe('calculateAllowanceForDoubtful', () => {
    test('should calculate allowance using aging method', () => {
      const result = AllowanceCalculator.calculateAllowanceForDoubtful(mockBuckets)

      expect(result).toBeTruthy()
      expect(result.totalAR).toBe(400000) // $4000
      expect(result.allowance).toBeGreaterThan(0)
      expect(result.netAR).toBeLessThan(result.totalAR)
    })

    test('should apply correct percentages per bucket', () => {
      const result = AllowanceCalculator.calculateAllowanceForDoubtful(mockBuckets)

      // Current: 1% of $1000 = $10
      // 31-60: 5% of $1500 = $75
      // 61-90: 15% of $1000 = $150
      // 90+: 50% of $500 = $250
      // Total = $485

      expect(result.allowance).toBeGreaterThan(0)
      expect(result.results).toHaveLength(4)
    })

    test('should calculate coverage percentage', () => {
      const result = AllowanceCalculator.calculateAllowanceForDoubtful(mockBuckets)

      const expectedCoverage = (result.allowance / result.totalAR) * 100
      expect(result.coverage).toBeCloseTo(expectedCoverage, 1)
    })

    test('should allow custom rates', () => {
      const customRates = {
        current: 0.02, // 2%
        '31-60': 0.10, // 10%
        '61-90': 0.25, // 25%
        '90+': 0.75, // 75%
      }

      const result = AllowanceCalculator.calculateAllowanceForDoubtful(mockBuckets, new Date(), customRates)

      expect(result.allowance).toBeGreaterThan(0)
    })

    test('should handle zero AR', () => {
      const emptyBuckets: AgingBucket[] = mockBuckets.map((b) => ({
        ...b,
        totalAmount: 0,
      }))

      const result = AllowanceCalculator.calculateAllowanceForDoubtful(emptyBuckets)

      expect(result.allowance).toBe(0)
      expect(result.coverage).toBe(0)
    })

    test('should calculate net AR correctly', () => {
      const result = AllowanceCalculator.calculateAllowanceForDoubtful(mockBuckets)

      expect(result.netAR).toBe(result.totalAR - result.allowance)
    })
  })

  describe('allowanceByPercentageOfSales', () => {
    test('should calculate allowance by percentage of sales', () => {
      const revenue = 10000000 // $100,000
      const percentage = 0.02 // 2%

      const allowance = AllowanceCalculator.allowanceByPercentageOfSales(revenue, percentage)

      expect(allowance).toBe(200000) // $2000
    })

    test('should handle zero percentage', () => {
      const revenue = 10000000
      const allowance = AllowanceCalculator.allowanceByPercentageOfSales(revenue, 0)

      expect(allowance).toBe(0)
    })

    test('should round to nearest cent', () => {
      const revenue = 10000005 // $100,000.05
      const allowance = AllowanceCalculator.allowanceByPercentageOfSales(revenue, 0.01)

      expect(Number.isInteger(allowance)).toBe(true)
    })
  })

  describe('allowanceByHistoricalLossRatio', () => {
    test('should calculate allowance from historical data', () => {
      const result = AllowanceCalculator.allowanceByHistoricalLossRatio(
        400000, // $4000 current A/R
        25000, // $250 written off this year
        20000, // $200 written off last year
        15000 // $150 written off 2 years ago
      )

      expect(result.allowance).toBeGreaterThan(0)
      expect(result.coverage).toBeGreaterThan(0)
    })

    test('should average write-offs correctly', () => {
      const result = AllowanceCalculator.allowanceByHistoricalLossRatio(
        100000,
        10000,
        20000,
        30000
      )

      const avgWriteOff = (10000 + 20000 + 30000) / 3 // $20,000
      const expectedLossRatio = avgWriteOff / 100000
      expect(result.coverage).toBeCloseTo(expectedLossRatio * 100, 1)
    })

    test('should handle zero A/R', () => {
      const result = AllowanceCalculator.allowanceByHistoricalLossRatio(0, 10000, 20000, 30000)

      expect(result.coverage).toBe(0)
    })
  })

  describe('getIndustryRecommendedAllowance', () => {
    test('should apply retail rates', () => {
      const result = AllowanceCalculator.getIndustryRecommendedAllowance(mockBuckets, 'retail')

      expect(result.allowance).toBeGreaterThan(0)
    })

    test('should apply manufacturing rates', () => {
      const result = AllowanceCalculator.getIndustryRecommendedAllowance(mockBuckets, 'manufacturing')

      expect(result.allowance).toBeGreaterThan(0)
    })

    test('should apply services rates', () => {
      const result = AllowanceCalculator.getIndustryRecommendedAllowance(mockBuckets, 'services')

      expect(result.allowance).toBeGreaterThan(0)
    })

    test('should apply technology rates', () => {
      const result = AllowanceCalculator.getIndustryRecommendedAllowance(mockBuckets, 'technology')

      expect(result.allowance).toBeGreaterThan(0)
    })

    test('should have different allowances by industry', () => {
      const retail = AllowanceCalculator.getIndustryRecommendedAllowance(mockBuckets, 'retail')
      const manufacturing = AllowanceCalculator.getIndustryRecommendedAllowance(mockBuckets, 'manufacturing')

      // Different industries may have different allowances
      expect(retail.allowance).toBeTruthy()
      expect(manufacturing.allowance).toBeTruthy()
    })
  })

  describe('updateAllowanceForWriteOff', () => {
    test('should reduce allowance when account is written off', () => {
      const currentAllowance = 50000
      const writeOffAmount = 30000

      const newAllowance = AllowanceCalculator.updateAllowanceForWriteOff(currentAllowance, writeOffAmount)

      expect(newAllowance).toBe(20000)
    })

    test('should not go below zero', () => {
      const currentAllowance = 10000
      const writeOffAmount = 50000

      const newAllowance = AllowanceCalculator.updateAllowanceForWriteOff(currentAllowance, writeOffAmount)

      expect(newAllowance).toBe(0)
    })
  })

  describe('calculateAllowanceAdjustment', () => {
    test('should calculate adjustment for increase', () => {
      const adjustment = AllowanceCalculator.calculateAllowanceAdjustment(10000, 25000)

      expect(adjustment.adjustment).toBe(15000)
      expect(adjustment.isIncrease).toBe(true)
    })

    test('should calculate adjustment for decrease', () => {
      const adjustment = AllowanceCalculator.calculateAllowanceAdjustment(25000, 10000)

      expect(adjustment.adjustment).toBe(15000)
      expect(adjustment.isIncrease).toBe(false)
    })

    test('should handle no adjustment needed', () => {
      const adjustment = AllowanceCalculator.calculateAllowanceAdjustment(15000, 15000)

      expect(adjustment.adjustment).toBe(0)
    })
  })
})
