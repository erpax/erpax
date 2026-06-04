/**
 * A/R Analytics — KPIs (DSO, turnover, collection effectiveness).
 *
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-310 receivables
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time period
 * @see docs/STANDARDS.md §5
 */

import { Invoice, Customer } from '@/types/receivables'
import { calculateAverageRounded } from '@/average/calculator'

export class ARAnalytics {
  /**
   * Calculate Days Sales Outstanding (DSO)
   * DSO = (Accounts Receivable / Revenue) × Number of Days
   * Indicates how long it takes to collect payment
   */
  static calculateDSO(totalAR: number, totalRevenue: number, daysInPeriod: number = 365): number {
    if (totalRevenue === 0) return 0
    return (totalAR / totalRevenue) * daysInPeriod
  }

  /**
   * Calculate AR Turnover Ratio
   * AR Turnover = Revenue / Average AR
   * Higher is better (faster collections)
   */
  static calculateARTurnoverRatio(totalRevenue: number, avgAR: number): number {
    if (avgAR === 0) return 0
    return totalRevenue / avgAR
  }

  /**
   * Calculate Collection Effectiveness Index (CEI)
   * CEI = Cash Collected / Amount Owed
   * Measures how well collection efforts are working
   */
  static calculateCEI(cashCollected: number, amountOwed: number): number {
    if (amountOwed === 0) return 0
    return (cashCollected / amountOwed) * 100
  }

  /**
   * Bad Debt Ratio
   * Percentage of revenue written off as uncollectible
   */
  static calculateBadDebtRatio(writeOffsThisPeriod: number, totalRevenue: number): number {
    if (totalRevenue === 0) return 0
    return (writeOffsThisPeriod / totalRevenue) * 100
  }

  /**
   * Calculate average invoice amount
   */
  static calculateAvgInvoiceAmount(invoices: Invoice[]): number {
    return calculateAverageRounded(invoices.map((inv) => inv.totalAmount))
  }

  /**
   * Calculate customer concentration risk
   * What percentage of A/R is from top N customers?
   */
  static calculateCustomerConcentration(
    invoices: Invoice[],
    topNCustomers: number = 10
  ): { topCustomers: { customerId: string; amount: number; percentage: number }[]; concentration: number } {
    // Group by customer
    const byCustomer: { [key: string]: number } = {}
    invoices.forEach((inv) => {
      byCustomer[inv.customerId] = (byCustomer[inv.customerId] || 0) + inv.balance
    })

    const total = Object.values(byCustomer).reduce((sum, amount) => sum + amount, 0)
    const sorted = Object.entries(byCustomer)
      .sort(([, a], [, b]) => b - a)
      .slice(0, topNCustomers)
      .map(([customerId, amount]) => ({
        customerId,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
      }))

    const concentration = sorted.reduce((sum, c) => sum + c.percentage, 0)

    return {
      topCustomers: sorted,
      concentration,
    }
  }

  /**
   * Calculate cash flow impact
   * Estimate when outstanding A/R will be collected
   */
  static estimateCashFlowTiming(
    invoices: Invoice[],
    daysOutstandingBuckets: { days: number; collectPercentage: number }[] = [
      { days: 7, collectPercentage: 0.3 },
      { days: 14, collectPercentage: 0.6 },
      { days: 30, collectPercentage: 0.85 },
      { days: 60, collectPercentage: 0.95 },
    ]
  ): { days: number; estimatedCash: number }[] {
    const openInvoices = invoices.filter((inv) => inv.balance > 0)

    return daysOutstandingBuckets.map((bucket) => {
      const estimatedCash = Math.round(
        openInvoices.reduce((sum, inv) => {
          const daysSinceBilled = Math.ceil(
            (new Date().getTime() - inv.invoiceDate.getTime()) / (1000 * 60 * 60 * 24)
          )
          if (daysSinceBilled <= bucket.days) {
            return sum + inv.balance * bucket.collectPercentage
          }
          return sum
        }, 0)
      )

      return {
        days: bucket.days,
        estimatedCash,
      }
    })
  }

  /**
   * Identify at-risk customers
   * Customers with multiple overdue invoices or declining payment history
   */
  static identifyAtRiskCustomers(
    invoices: Invoice[],
    overdueThresholdDays: number = 30
  ): {
    customerId: string
    overdueCount: number
    totalOverdue: number
    riskLevel: 'low' | 'medium' | 'high'
  }[] {
    const byCustomer: {
      [key: string]: { overdueCount: number; totalOverdue: number }
    } = {}

    invoices.forEach((inv) => {
      const daysOverdue = Math.ceil(
        (new Date().getTime() - inv.dueDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysOverdue > overdueThresholdDays) {
        if (!byCustomer[inv.customerId]) {
          byCustomer[inv.customerId] = { overdueCount: 0, totalOverdue: 0 }
        }
        byCustomer[inv.customerId].overdueCount++
        byCustomer[inv.customerId].totalOverdue += inv.balance
      }
    })

    return Object.entries(byCustomer)
      .map(([customerId, data]) => {
        let riskLevel: 'low' | 'medium' | 'high' = 'low'
        if (data.overdueCount >= 3 || data.totalOverdue > 100000) {
          riskLevel = 'high'
        } else if (data.overdueCount >= 2 || data.totalOverdue > 50000) {
          riskLevel = 'medium'
        }

        return {
          customerId,
          overdueCount: data.overdueCount,
          totalOverdue: data.totalOverdue,
          riskLevel,
        }
      })
      .sort((a, b) => (b.riskLevel === 'high' ? 1 : -1))
  }

  /**
   * Calculate credit utilization
   * How much of customer's credit limit is being used?
   */
  static calculateCreditUtilization(
    customers: Customer[]
  ): {
    customerId: string
    creditLimit: number
    currentBalance: number
    utilizationPercentage: number
    availableCredit: number
  }[] {
    return customers.map((customer) => ({
      customerId: customer.id,
      creditLimit: customer.creditLimit,
      currentBalance: customer.currentBalance,
      utilizationPercentage:
        customer.creditLimit > 0
          ? parseFloat(((customer.currentBalance / customer.creditLimit) * 100).toFixed(2))
          : 0,
      availableCredit: customer.creditLimit - customer.currentBalance,
    }))
  }

  /**
   * Generate A/R dashboard metrics
   */
  static generateDashboardMetrics(invoices: Invoice[], _customers: Customer[]) {
    const totalAR = invoices
      .filter((inv) => inv.balance > 0)
      .reduce((sum, inv) => sum + inv.balance, 0)

    const overdueDays30 = invoices.filter((inv) => {
      const daysOverdue = Math.ceil(
        (new Date().getTime() - inv.dueDate.getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysOverdue > 30 && inv.balance > 0
    }).length

    const avgDSO = this.calculateDSO(totalAR, 100000000, 365) // Assuming 1M monthly revenue

    return {
      totalAR,
      invoiceCount: invoices.filter((inv) => inv.balance > 0).length,
      overdue30Plus: overdueDays30,
      avgDSO: avgDSO.toFixed(1),
      concentrationRisk: this.calculateCustomerConcentration(invoices, 5).concentration.toFixed(1),
      atRiskCustomers: this.identifyAtRiskCustomers(invoices).length,
      avgInvoice: this.calculateAvgInvoiceAmount(invoices),
    }
  }
}
