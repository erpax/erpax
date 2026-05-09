/**
 * Early Payment Discount Calculator — vendor discount programs.
 *
 * Example: "2/10 Net 30" = 2% discount if paid within 10 days, full balance
 * due in 30. Encodes the discount-deadline window arithmetic.
 *
 * @standard EN-16931:2017 §BG-20 document-level-allowances
 * @standard EN-16931:2017 §BG-22 document-level-charges
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time discount-deadline
 * @accounting US-GAAP ASC-705 cost-of-sales-and-services discount-recognition
 * @see docs/STANDARDS.md §5
 */

import { Bill, DiscountResult } from './types'

export class EarlyPaymentDiscountCalculator {
  /**
   * Calculate if discount is available for a bill
   * Format: "2/10 Net 30" = 2% discount if paid within 10 days
   */
  static isDiscountAvailable(bill: Bill, asOfDate: Date = new Date()): boolean {
    if (!bill.discountDeadline) return false
    return asOfDate <= bill.discountDeadline && bill.balance > 0
  }

  /**
   * Get discount details for a bill
   */
  static getDiscountDetails(bill: Bill, asOfDate: Date = new Date()): DiscountResult | null {
    if (!bill.discountAvailable || !bill.discountDeadline) {
      return null
    }

    const isAvailable = this.isDiscountAvailable(bill, asOfDate)
    const daysTillDiscount = this.calculateDaysTillDiscount(bill.discountDeadline, asOfDate)

    // Extract discount percentage from payment terms (if encoded)
    // For now, assume discountAvailable is the discount amount in cents
    const discountAmount = isAvailable ? bill.discountAvailable : 0
    const discountPercentage = bill.balance > 0 ? (discountAmount / bill.balance) * 100 : 0

    return {
      billId: bill.id,
      discountPercentage,
      discountAmount,
      netAmount: bill.balance - discountAmount,
      discountDeadline: bill.discountDeadline,
      daysTillDiscount,
    }
  }

  /**
   * Calculate days remaining to claim discount
   */
  private static calculateDaysTillDiscount(discountDeadline: Date, asOfDate: Date): number {
    const diffTime = discountDeadline.getTime() - asOfDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  /**
   * Calculate ROI of early payment discount
   * Should we pay early to get the discount?
   */
  static calculateDiscountROI(
    discountAmount: number,
    daysEarlyPayment: number,
    borrowingCostPercentage: number = 5
  ): { roi: number; shouldTakeDiscount: boolean } {
    if (daysEarlyPayment === 0 || discountAmount === 0) {
      return { roi: 0, shouldTakeDiscount: false }
    }

    // Annual return if discount is claimed and money is borrowed for early payment
    const annualROI = (discountAmount / daysEarlyPayment) * 365
    const borrowingCost = annualROI * (borrowingCostPercentage / 100)

    // Should take discount if implied ROI > borrowing cost
    return {
      roi: annualROI,
      shouldTakeDiscount: annualROI > borrowingCost,
    }
  }

  /**
   * Get available discounts to prioritize payment
   */
  static getPrioritizedDiscounts(
    bills: Bill[],
    asOfDate: Date = new Date()
  ): DiscountResult[] {
    const availableDiscounts = bills
      .map((bill) => this.getDiscountDetails(bill, asOfDate))
      .filter((discount) => discount !== null && discount.discountAmount > 0) as DiscountResult[]

    // Prioritize by discount deadline (expire soonest first)
    return availableDiscounts.sort((a, b) => a.daysTillDiscount - b.daysTillDiscount)
  }

  /**
   * Calculate total potential savings from all available discounts
   */
  static calculateTotalAvailableSavings(bills: Bill[], asOfDate: Date = new Date()): number {
    return bills
      .filter((bill) => this.isDiscountAvailable(bill, asOfDate))
      .reduce((sum, bill) => sum + (bill.discountAvailable || 0), 0)
  }

  /**
   * Standard vendor discount terms decoder
   * "2/10 Net 30" = 2% discount if paid within 10 days, otherwise due in 30 days
   */
  static decodeDiscountTerms(
    termString: string
  ): { discountPercentage: number; discountDays: number; standardDays: number } | null {
    // Format: "X/Y Net Z"
    const match = termString.match(/(\d+)\/(\d+)\s+[Nn]et\s+(\d+)/)

    if (!match) return null

    return {
      discountPercentage: parseInt(match[1]),
      discountDays: parseInt(match[2]),
      standardDays: parseInt(match[3]),
    }
  }

  /**
   * Calculate implied annual percentage rate (APR) of discount
   * Example: 2/10 Net 30 has effective APR of ~36%
   */
  static calculateImpliedAPR(discountPercentage: number, discountDays: number, standardDays: number): number {
    const discountPeriods = 365 / (standardDays - discountDays)
    return Math.pow(1 + discountPercentage / 100, discountPeriods) - 1
  }

  /**
   * Generate cash savings projection
   */
  static projectCashSavings(
    bills: Bill[],
    discountTakingRate: number = 0.8,
    asOfDate: Date = new Date()
  ): {
    potentialSavings: number
    expectedSavings: number
    missedSavings: number
  } {
    const availableDiscounts = bills
      .filter((bill) => this.isDiscountAvailable(bill, asOfDate))
      .map((bill) => bill.discountAvailable || 0)
      .reduce((sum, amount) => sum + amount, 0)

    const expectedSavings = Math.round(availableDiscounts * discountTakingRate)
    const missedSavings = availableDiscounts - expectedSavings

    return {
      potentialSavings: availableDiscounts,
      expectedSavings,
      missedSavings,
    }
  }
}
