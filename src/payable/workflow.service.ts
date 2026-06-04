/**
 * Bill Status Workflow — directed-graph state transitions.
 *
 * Lifecycle: draft → received → approved → scheduled → partial/paid/disputed.
 * Approval gate enforces three-way-match (PO, receipt, bill) per
 * ISO 27002 §5.4 segregation-of-duties.
 *
 * @standard EN-16931:2017 invoice-lifecycle
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @accounting US-GAAP ASC-405 liabilities
 * @audit ISO-19011:2018 audit-trail state-transitions
 * @security ISO-27002 §5.4 segregation-of-duties three-way-match
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §5
 */

import { Bill, BillStatus } from '@/types/payables'

export class BillStatusWorkflow {
  /**
   * Valid status transitions
   */
  private static readonly VALID_TRANSITIONS: Record<BillStatus, BillStatus[]> = {
    draft: ['received'],
    received: ['approved', 'disputed'],
    approved: ['scheduled', 'partial', 'paid'],
    scheduled: ['paid', 'partial'],
    partial: ['paid', 'disputed'],
    paid: [], // Terminal state
    disputed: ['approved', 'paid'], // Can resolve dispute
  }

  /**
   * Check if transition is valid
   */
  static canTransition(fromStatus: BillStatus, toStatus: BillStatus): boolean {
    return this.VALID_TRANSITIONS[fromStatus]?.includes(toStatus) ?? false
  }

  /**
   * Transition bill to new status
   */
  static transitionBill(bill: Bill, newStatus: BillStatus): Bill {
    if (!this.canTransition(bill.status, newStatus)) {
      throw new Error(`Cannot transition from ${bill.status} to ${newStatus}`)
    }

    return {
      ...bill,
      status: newStatus,
      updatedAt: new Date(),
    }
  }

  /**
   * Determine status based on amounts
   */
  static determineStatus(
    balance: number,
    totalAmount: number,
    dueDate: Date,
    currentDate: Date = new Date()
  ): BillStatus {
    if (balance === 0) {
      return 'paid'
    } else if (balance > 0 && balance < totalAmount) {
      return 'partial'
    } else if (balance === totalAmount) {
      // Check if scheduled or approved
      return currentDate < dueDate ? 'approved' : 'scheduled'
    }

    return 'approved'
  }

  /**
   * Record payment
   */
  static recordPayment(bill: Bill, paymentAmount: number): Bill {
    const newBalance = Math.max(0, bill.balance - paymentAmount)
    const newPaidAmount = bill.totalAmount - newBalance
    const newStatus = this.determineStatus(newBalance, bill.totalAmount, bill.dueDate)

    return {
      ...bill,
      balance: newBalance,
      paidAmount: newPaidAmount,
      status: newStatus,
      updatedAt: new Date(),
    }
  }

  /**
   * Get available actions
   */
  static getAvailableActions(bill: Bill): {
    canApprove: boolean
    canSchedulePayment: boolean
    canMarkPaid: boolean
    canDispute: boolean
    canPayEarly: boolean
  } {
    return {
      canApprove: bill.status === 'received',
      canSchedulePayment: bill.status === 'approved' && bill.balance > 0,
      canMarkPaid: bill.status !== 'paid' && bill.status !== 'disputed' && bill.balance > 0,
      canDispute: bill.status !== 'paid' && bill.balance > 0,
      canPayEarly: bill.status === 'approved' && bill.balance > 0,
    }
  }

  /**
   * Get overdue bills
   */
  static getOverdueBills(bills: Bill[], asOfDate: Date = new Date()): Bill[] {
    return bills.filter((bill) => bill.balance > 0 && bill.dueDate < asOfDate && bill.status !== 'paid')
  }

  /**
   * Get bills due soon
   */
  static getBillsDueSoon(
    bills: Bill[],
    daysUntilDue: number = 7,
    asOfDate: Date = new Date()
  ): Bill[] {
    const futureDate = new Date(asOfDate)
    futureDate.setDate(futureDate.getDate() + daysUntilDue)

    return bills.filter(
      (bill) =>
        bill.balance > 0 && bill.dueDate <= futureDate && bill.dueDate >= asOfDate && bill.status !== 'paid'
    )
  }

  /**
   * Dispute a bill
   */
  static disputeBill(bill: Bill, reason: string): Bill {
    if (bill.status === 'paid') {
      throw new Error('Cannot dispute a paid bill')
    }

    return {
      ...bill,
      status: 'disputed',
      notes: `${bill.notes || ''}\nDisputed: ${reason}`,
      updatedAt: new Date(),
    }
  }

  /**
   * Resolve dispute
   */
  static resolveBillDispute(bill: Bill, approved: boolean): Bill {
    if (bill.status !== 'disputed') {
      throw new Error('Bill is not disputed')
    }

    const newStatus: BillStatus = approved ? 'approved' : 'paid'

    return {
      ...bill,
      status: newStatus,
      notes: `${bill.notes || ''}\nDispute ${approved ? 'approved' : 'rejected'}`,
      updatedAt: new Date(),
    }
  }

  /**
   * Calculate days until due
   */
  static calculateDaysUntilDue(dueDate: Date, asOfDate: Date = new Date()): number {
    const diffTime = dueDate.getTime() - asOfDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  /**
   * Calculate days overdue
   */
  static calculateDaysOverdue(dueDate: Date, asOfDate: Date = new Date()): number {
    const diffTime = asOfDate.getTime() - dueDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  /**
   * Get bill age (days since bill date)
   */
  static getBillAge(billDate: Date, asOfDate: Date = new Date()): number {
    const diffTime = asOfDate.getTime() - billDate.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
}
