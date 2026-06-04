/**
 * Allowance for Doubtful Accounts — aging-bucket-based ECL estimator.
 *
 * @accounting IFRS IFRS-9 §5.5 expected-credit-loss
 * @accounting US-GAAP ASC-326 §20 current-expected-credit-loss
 * @accounting US-GAAP ASC-310 receivables
 * @standard ISO-4217:2015 currency-codes
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §5
 */

import { ARAgingBucket, AllowanceCalculation, AllowanceResult } from '@/types/receivables'

export class AllowanceCalculator {
  /**
   * Standard allowance percentages by aging bucket
   * Based on industry experience and historical data
   */
  private static readonly DEFAULT_ALLOWANCE_RATES = {
    current: 0.01, // 1% of current A/R
    '31-60': 0.05, // 5% of 31-60 day invoices
    '61-90': 0.15, // 15% of 61-90 day invoices
    '90+': 0.50, // 50% of 90+ day invoices
  }

  /**
   * Calculate allowance using aging method
   * @param buckets Aging buckets from ARAgingCalculator
   * @param asOfDate Calculation date
   * @param customRates Optional custom allowance percentages
   */
  static calculateAllowanceForDoubtful(
    buckets: ARAgingBucket[],
    asOfDate: Date = new Date(),
    customRates?: Partial<typeof AllowanceCalculator.DEFAULT_ALLOWANCE_RATES>
  ): AllowanceCalculation {
    const rates = { ...AllowanceCalculator.DEFAULT_ALLOWANCE_RATES, ...customRates }

    const results: AllowanceResult[] = buckets.map((bucket) => {
      let rate = 0.01
      if (bucket.name === 'Current') {
        rate = rates.current
      } else if (bucket.name === '31-60 days') {
        rate = rates['31-60']
      } else if (bucket.name === '61-90 days') {
        rate = rates['61-90']
      } else if (bucket.name === '90+ days') {
        rate = rates['90+']
      }

      const allowance = Math.round(bucket.totalAmount * rate)

      return {
        bucketName: bucket.name,
        amount: allowance,
        percentage: parseFloat((rate * 100).toFixed(2)),
        methodology: `${bucket.invoiceCount} invoices × ${(rate * 100).toFixed(1)}% = $${(allowance / 100).toFixed(2)}`,
      }
    })

    const totalAllowance = results.reduce((sum, r) => sum + r.amount, 0)
    const totalAR = buckets.reduce((sum, b) => sum + b.totalAmount, 0)
    const netAR = totalAR - totalAllowance
    const coverage = totalAR > 0 ? ((totalAllowance / totalAR) * 100).toFixed(2) : '0.00'

    return {
      totalAR,
      allowance: totalAllowance,
      netAR,
      coverage: parseFloat(coverage as string),
      results,
      asOfDate,
    }
  }

  /**
   * Percentage of Net Sales method
   * Simple method: Apply fixed percentage to total sales
   * @param totalSales Total sales for period (cents)
   * @param percentage Allowance percentage (0.01 = 1%)
   */
  static allowanceByPercentageOfSales(totalSales: number, percentage: number = 0.02): number {
    return Math.round(totalSales * percentage)
  }

  /**
   * Historical Loss Ratio method
   * Use historical write-off data to calculate allowance
   */
  static allowanceByHistoricalLossRatio(
    totalAR: number,
    writtenOffThisYear: number,
    previousYearWrittenOff: number,
    twoYearsAgoWrittenOff: number
  ): AllowanceCalculation {
    const avgWriteOff = (writtenOffThisYear + previousYearWrittenOff + twoYearsAgoWrittenOff) / 3
    const lossRatio = totalAR > 0 ? avgWriteOff / totalAR : 0

    const allowance = Math.round(totalAR * lossRatio)

    return {
      totalAR,
      allowance,
      netAR: totalAR - allowance,
      coverage: parseFloat((lossRatio * 100).toFixed(2)),
      results: [
        {
          bucketName: 'All A/R',
          amount: allowance,
          percentage: parseFloat((lossRatio * 100).toFixed(2)),
          methodology: `Historical loss ratio: ${(lossRatio * 100).toFixed(2)}%`,
        },
      ],
      asOfDate: new Date(),
    }
  }

  /**
   * Get recommended allowance based on industry standard
   */
  static getIndustryRecommendedAllowance(
    buckets: ARAgingBucket[],
    industry: 'retail' | 'manufacturing' | 'services' | 'technology' = 'services'
  ): AllowanceCalculation {
    // Industry-specific default rates
    const industryRates = {
      retail: { current: 0.005, '31-60': 0.03, '61-90': 0.10, '90+': 0.40 },
      manufacturing: { current: 0.01, '31-60': 0.05, '61-90': 0.15, '90+': 0.50 },
      services: { current: 0.01, '31-60': 0.05, '61-90': 0.15, '90+': 0.50 },
      technology: { current: 0.005, '31-60': 0.02, '61-90': 0.08, '90+': 0.30 },
    }

    const rates = industryRates[industry]
    return this.calculateAllowanceForDoubtful(buckets, new Date(), rates)
  }

  /**
   * Update allowance based on write-offs
   */
  static updateAllowanceForWriteOff(
    currentAllowance: number,
    writeOffAmount: number
  ): number {
    // When account is written off, reduce allowance
    return Math.max(0, currentAllowance - writeOffAmount)
  }

  /**
   * Calculate required allowance adjustment
   */
  static calculateAllowanceAdjustment(
    currentAllowance: number,
    requiredAllowance: number
  ): { adjustment: number; isIncrease: boolean } {
    const adjustment = requiredAllowance - currentAllowance
    return {
      adjustment: Math.abs(adjustment),
      isIncrease: adjustment > 0,
    }
  }
}
