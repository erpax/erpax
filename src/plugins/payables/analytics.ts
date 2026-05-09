/**
 * A/P Analytics — vendor performance, DPO, spend analysis.
 *
 * @accounting US-GAAP ASC-405 liabilities
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-17442-1:2020 lei vendor-identification
 * @see docs/STANDARDS.md §5
 */

import { Bill, Vendor, VendorPerformance } from './types'

export class APAnalytics {
  /**
   * Analyze vendor performance
   */
  static analyzeVendorPerformance(
    bills: Bill[],
    vendor: Vendor,
    asOfDate: Date = new Date()
  ): VendorPerformance {
    const vendorBills = bills.filter((b) => b.vendorId === vendor.id)

    const totalBills = vendorBills.length
    const avgBillAmount = totalBills > 0 ? vendorBills.reduce((sum, b) => sum + b.totalAmount, 0) / totalBills : 0

    const daysToReceive = vendorBills.map((b) => {
      return Math.ceil((b.billDate.getTime() - b.billDate.getTime()) / (1000 * 60 * 60 * 24))
    })
    const avgDaysToReceive = daysToReceive.length > 0 ? daysToReceive.reduce((a, b) => a + b, 0) / daysToReceive.length : 0

    const paidBills = vendorBills.filter((b) => b.status === 'paid')
    const daysToPay = paidBills.map((b) => {
      return Math.ceil((asOfDate.getTime() - b.dueDate.getTime()) / (1000 * 60 * 60 * 24))
    })
    const avgDaysToPay = daysToPay.length > 0 ? daysToPay.reduce((a, b) => a + b, 0) / daysToPay.length : 0

    const discountsEarned = vendorBills.reduce((sum, b) => sum + (b.discountAvailable || 0), 0)
    const discountRate = vendor.earlyPaymentDiscount || 0

    const onTimePayments = paidBills.filter((b) => {
      const daysToDue = Math.ceil((b.dueDate.getTime() - b.billDate.getTime()) / (1000 * 60 * 60 * 24))
      return daysToDue <= (b.paymentTerms === 'custom' ? 45 : parseInt(b.paymentTerms))
    }).length

    const onTimePaymentRate = paidBills.length > 0 ? (onTimePayments / paidBills.length) * 100 : 0

    return {
      vendorId: vendor.id,
      vendorName: vendor.name,
      totalBillsReceived: totalBills,
      avgBillAmount: Math.round(avgBillAmount),
      avgDaysToReceiveBill: Math.round(avgDaysToReceive),
      avgDaysToPayBill: Math.round(avgDaysToPay),
      discountsEarned,
      discountRate,
      onTimePaymentRate,
    }
  }

  /**
   * Identify optimization opportunities
   */
  static identifyOptimizations(
    bills: Bill[],
    vendor: Vendor
  ): {
    earlyPaymentOpportunity: number
    bulkingOpportunity: boolean
    paymentMethodSavings: number
  } {
    const vendorBills = bills.filter((b) => b.vendorId === vendor.id && b.balance > 0)

    // Early payment discount opportunity
    const earlyPaymentOpportunity = vendorBills.reduce((sum, b) => sum + (b.discountAvailable || 0), 0)

    // Bulking opportunity (group payments to reduce fees)
    const bulkingOpportunity = vendorBills.length > 10

    // Payment method savings (ACH vs. check vs. card)
    const paymentMethodSavings = vendor.earlyPaymentDiscount ? (vendor.earlyPaymentDiscount / 100) * vendorBills.reduce((sum, b) => sum + b.balance, 0) : 0

    return {
      earlyPaymentOpportunity,
      bulkingOpportunity,
      paymentMethodSavings: Math.round(paymentMethodSavings),
    }
  }

  /**
   * Analyze payment terms effectiveness
   */
  static analyzePaymentTermsEffectiveness(bills: Bill[]): {
    term: string
    count: number
    avgDaysOutstanding: number
    discountCaptureRate: number
  }[] {
    const byTerm: {
      [key: string]: {
        count: number
        daysOutstanding: number[]
        discountCount: number
      }
    } = {}

    bills.forEach((bill) => {
      const term = bill.paymentTerms
      if (!byTerm[term]) {
        byTerm[term] = { count: 0, daysOutstanding: [], discountCount: 0 }
      }

      byTerm[term].count++
      byTerm[term].daysOutstanding.push(Math.ceil((new Date().getTime() - bill.dueDate.getTime()) / (1000 * 60 * 60 * 24)))

      if (bill.discountAvailable) {
        byTerm[term].discountCount++
      }
    })

    return Object.entries(byTerm).map(([term, data]) => ({
      term,
      count: data.count,
      avgDaysOutstanding: Math.round(
        data.daysOutstanding.reduce((a, b) => a + b, 0) / data.daysOutstanding.length
      ),
      discountCaptureRate:
        data.count > 0 ? ((data.discountCount / data.count) * 100).toFixed(2) : '0.00',
    }))
  }

  /**
   * Calculate cash flow impact of payment schedule
   */
  static calculatePaymentImpact(
    bills: Bill[],
    paymentSchedule: Bill[],
    startDate: Date,
    endDate: Date
  ): {
    date: Date
    outflow: number
    billCount: number
  }[] {
    const impact: { [key: string]: { outflow: number; count: number } } = {}

    paymentSchedule.forEach((bill) => {
      if (bill.dueDate >= startDate && bill.dueDate <= endDate) {
        const dateKey = bill.dueDate.toISOString().split('T')[0]
        if (!impact[dateKey]) {
          impact[dateKey] = { outflow: 0, count: 0 }
        }
        impact[dateKey].outflow += bill.balance
        impact[dateKey].count++
      }
    })

    return Object.entries(impact)
      .map(([dateStr, data]) => ({
        date: new Date(dateStr),
        outflow: data.outflow,
        billCount: data.count,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  /**
   * Identify vendor concentration risk
   */
  static identifyVendorConcentration(bills: Bill[], topNVendors: number = 10) {
    const byVendor: { [key: string]: number } = {}

    bills.forEach((bill) => {
      byVendor[bill.vendorId] = (byVendor[bill.vendorId] || 0) + bill.balance
    })

    const total = Object.values(byVendor).reduce((sum, amount) => sum + amount, 0)
    const sorted = Object.entries(byVendor)
      .sort(([, a], [, b]) => b - a)
      .slice(0, topNVendors)
      .map(([vendorId, amount]) => ({
        vendorId,
        amount,
        percentage: total > 0 ? ((amount / total) * 100).toFixed(2) : '0.00',
      }))

    const concentration = sorted.reduce((sum, v) => sum + parseFloat(v.percentage), 0)

    return {
      topVendors: sorted,
      concentration: concentration.toFixed(2),
      isHealthy: concentration < 50, // <50% from top 10 is healthy
    }
  }

  /**
   * Generate A/P dashboard metrics
   */
  static generateDashboardMetrics(bills: Bill[], vendors: Vendor[]) {
    const openBills = bills.filter((b) => b.balance > 0)
    const totalAP = openBills.reduce((sum, b) => sum + b.balance, 0)

    const overdueBills = bills.filter((b) => {
      const daysOverdue = Math.ceil((new Date().getTime() - b.dueDate.getTime()) / (1000 * 60 * 60 * 24))
      return daysOverdue > 0 && b.balance > 0
    })

    const dueSoon = bills.filter((b) => {
      const daysToDue = Math.ceil((b.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      return daysToDue >= 0 && daysToDue <= 7 && b.balance > 0
    })

    const availableDiscounts = openBills.reduce((sum, b) => sum + (b.discountAvailable || 0), 0)

    const vendorConcentration = this.identifyVendorConcentration(bills, 5)

    return {
      totalAP,
      billCount: openBills.length,
      overdue: overdueBills.length,
      dueSoon: dueSoon.length,
      availableDiscounts,
      vendorCount: vendors.length,
      concentrationRisk: parseFloat(vendorConcentration.concentration),
    }
  }
}
