/**
 * Invoice Status Workflow — directed-graph state transitions.
 *
 * Lifecycle: draft → issued → partial/paid/overdue/written_off.
 *
 * @standard EN-16931:2017 invoice-lifecycle
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting IFRS IFRS-9 written_off impairment
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail state-transitions
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §5
 */

import { Invoice, InvoiceStatus, CollectionEvent } from './types'

export class InvoiceStatusWorkflow {
  /**
   * Valid status transitions
   */
  private static readonly VALID_TRANSITIONS: Record<InvoiceStatus, InvoiceStatus[]> = {
    draft: ['issued'],
    issued: ['partial', 'paid', 'overdue'],
    partial: ['paid', 'overdue', 'written_off'],
    overdue: ['partial', 'paid', 'written_off'],
    paid: [], // Terminal state
    written_off: [], // Terminal state
  }

  /**
   * Check if status transition is valid
   */
  static canTransition(fromStatus: InvoiceStatus, toStatus: InvoiceStatus): boolean {
    return this.VALID_TRANSITIONS[fromStatus]?.includes(toStatus) ?? false
  }

  /**
   * Transition invoice to new status
   */
  static transitionInvoice(invoice: Invoice, newStatus: InvoiceStatus): Invoice {
    if (!this.canTransition(invoice.status, newStatus)) {
      throw new Error(
        `Cannot transition from ${invoice.status} to ${newStatus}`
      )
    }

    return {
      ...invoice,
      status: newStatus,
      updatedAt: new Date(),
    }
  }

  /**
   * Automatically determine invoice status based on amounts
   */
  static determineStatus(
    balance: number,
    totalAmount: number,
    dueDate: Date,
    currentDate: Date = new Date()
  ): InvoiceStatus {
    // Check if overdue
    const isOverdue = currentDate > dueDate

    if (balance === 0) {
      return 'paid'
    } else if (balance > 0 && balance < totalAmount) {
      return isOverdue ? 'overdue' : 'partial'
    } else if (balance === totalAmount) {
      return isOverdue ? 'overdue' : 'issued'
    }

    return 'issued'
  }

  /**
   * Update invoice after payment
   */
  static applyPayment(invoice: Invoice, paymentAmount: number): Invoice {
    const newBalance = Math.max(0, invoice.balance - paymentAmount)
    const newPaidAmount = invoice.totalAmount - newBalance
    const newStatus = this.determineStatus(
      newBalance,
      invoice.totalAmount,
      invoice.dueDate
    )

    return {
      ...invoice,
      balance: newBalance,
      paidAmount: newPaidAmount,
      status: newStatus,
      updatedAt: new Date(),
    }
  }

  /**
   * Get available actions for an invoice
   */
  static getAvailableActions(invoice: Invoice): {
    canPay: boolean
    canPartialPay: boolean
    canWriteOff: boolean
    canSendReminder: boolean
  } {
    return {
      canPay: invoice.balance > 0 && invoice.status !== 'paid' && invoice.status !== 'written_off',
      canPartialPay: invoice.balance > 0 && invoice.status !== 'paid' && invoice.status !== 'written_off',
      canWriteOff: invoice.balance > 0 && (invoice.status === 'overdue' || invoice.status === 'partial'),
      canSendReminder: invoice.balance > 0 && invoice.status !== 'paid',
    }
  }

  /**
   * Write off an invoice (uncollectible)
   */
  static writeOffInvoice(
    invoice: Invoice,
    reason: string,
    amount?: number
  ): { updatedInvoice: Invoice; writeOffAmount: number } {
    if (invoice.status === 'paid' || invoice.status === 'written_off') {
      throw new Error(`Cannot write off invoice with status: ${invoice.status}`)
    }

    const writeOffAmount = amount || invoice.balance

    if (writeOffAmount > invoice.balance) {
      throw new Error('Write-off amount cannot exceed invoice balance')
    }

    const newBalance = invoice.balance - writeOffAmount
    const newStatus = newBalance === 0 ? 'written_off' : 'partial'

    return {
      updatedInvoice: {
        ...invoice,
        balance: newBalance,
        status: newStatus,
        notes: `${invoice.notes || ''}\nWritten off: ${reason}`,
        updatedAt: new Date(),
      },
      writeOffAmount,
    }
  }

  /**
   * Create collection event for audit trail
   */
  static createCollectionEvent(
    invoiceId: string,
    customerId: string,
    eventType: 'email_sent' | 'call_made' | 'payment_received' | 'payment_promised' | 'escalated',
    description: string,
    userId: string,
    amount?: number
  ): CollectionEvent {
    return {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      invoiceId,
      customerId,
      eventType,
      description,
      amount,
      notes: '',
      createdAt: new Date(),
      createdBy: userId,
    }
  }

  /**
   * Get overdue invoices
   */
  static getOverdueInvoices(
    invoices: Invoice[],
    asOfDate: Date = new Date()
  ): Invoice[] {
    return invoices.filter(
      (inv) => inv.balance > 0 && inv.dueDate < asOfDate
    )
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
   * Get invoices due within N days
   */
  static getUpcomingDueInvoices(
    invoices: Invoice[],
    daysUntilDue: number = 7,
    asOfDate: Date = new Date()
  ): Invoice[] {
    const futureDate = new Date(asOfDate)
    futureDate.setDate(futureDate.getDate() + daysUntilDue)

    return invoices.filter(
      (inv) => inv.balance > 0 && inv.dueDate <= futureDate && inv.dueDate >= asOfDate
    )
  }

  /**
   * Calculate invoice age
   */
  static getInvoiceAge(invoiceDate: Date, asOfDate: Date = new Date()): number {
    const diffTime = asOfDate.getTime() - invoiceDate.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
}
