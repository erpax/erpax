/**
 * Invoice Status Workflow Tests — directed-graph state-transition verification.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard EN-16931:2017 invoice-lifecycle
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail state-transitions
 * @see docs/STANDARDS.md §5 §7
 */

import { InvoiceStatusWorkflow } from '@/plugins/receivables/workflow'
import { Invoice } from '@/plugins/receivables/types'

describe('InvoiceStatusWorkflow', () => {
  const mockInvoice: Invoice = {
    id: '1',
    invoiceNumber: 'INV-2026-001',
    customerId: 'customer1',
    invoiceDate: new Date('2026-05-01'),
    dueDate: new Date('2026-05-31'),
    status: 'draft',
    lines: [],
    totalAmount: 50000, // $500
    paidAmount: 0,
    balance: 50000,
    paymentTerms: '30',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  describe('canTransition', () => {
    test('should allow valid transitions', () => {
      expect(InvoiceStatusWorkflow.canTransition('draft', 'issued')).toBe(true)
      expect(InvoiceStatusWorkflow.canTransition('issued', 'partial')).toBe(true)
      expect(InvoiceStatusWorkflow.canTransition('partial', 'paid')).toBe(true)
    })

    test('should reject invalid transitions', () => {
      expect(InvoiceStatusWorkflow.canTransition('draft', 'paid')).toBe(false)
      expect(InvoiceStatusWorkflow.canTransition('paid', 'draft')).toBe(false)
      expect(InvoiceStatusWorkflow.canTransition('written_off', 'issued')).toBe(false)
    })

    test('should not allow transitions from terminal states', () => {
      expect(InvoiceStatusWorkflow.canTransition('paid', 'partial')).toBe(false)
      expect(InvoiceStatusWorkflow.canTransition('written_off', 'paid')).toBe(false)
    })
  })

  describe('transitionInvoice', () => {
    test('should transition to valid status', () => {
      const updated = InvoiceStatusWorkflow.transitionInvoice(mockInvoice, 'issued')

      expect(updated.status).toBe('issued')
      expect(updated.updatedAt).toBeInstanceOf(Date)
    })

    test('should throw on invalid transition', () => {
      expect(() => {
        InvoiceStatusWorkflow.transitionInvoice(mockInvoice, 'paid')
      }).toThrow()
    })

    test('should not mutate original invoice', () => {
      const original = { ...mockInvoice }
      InvoiceStatusWorkflow.transitionInvoice(mockInvoice, 'issued')

      expect(mockInvoice.status).toBe(original.status)
    })
  })

  describe('determineStatus', () => {
    test('should return paid when balance is zero', () => {
      const status = InvoiceStatusWorkflow.determineStatus(0, 50000, new Date('2026-05-31'))

      expect(status).toBe('paid')
    })

    test('should return partial when balance < total', () => {
      const status = InvoiceStatusWorkflow.determineStatus(25000, 50000, new Date('2026-05-31'))

      expect(status).toBe('partial')
    })

    test('should return issued when balance = total and not overdue', () => {
      const status = InvoiceStatusWorkflow.determineStatus(50000, 50000, new Date('2026-05-31'))

      expect(status).toBe('issued')
    })

    test('should return overdue when past due date', () => {
      const pastDate = new Date('2026-05-01')
      const currentDate = new Date('2026-05-08')

      const status = InvoiceStatusWorkflow.determineStatus(50000, 50000, pastDate, currentDate)

      expect(status).toBe('overdue')
    })
  })

  describe('applyPayment', () => {
    test('should reduce balance after payment', () => {
      const updated = InvoiceStatusWorkflow.applyPayment(mockInvoice, 20000)

      expect(updated.balance).toBe(30000)
      expect(updated.paidAmount).toBe(20000)
    })

    test('should prevent negative balance', () => {
      const updated = InvoiceStatusWorkflow.applyPayment(mockInvoice, 100000)

      expect(updated.balance).toBe(0)
      expect(updated.status).toBe('paid')
    })

    test('should update status to paid when balance reaches zero', () => {
      const updated = InvoiceStatusWorkflow.applyPayment(mockInvoice, 50000)

      expect(updated.balance).toBe(0)
      expect(updated.status).toBe('paid')
    })

    test('should update status to partial for partial payment', () => {
      const updated = InvoiceStatusWorkflow.applyPayment(mockInvoice, 25000)

      expect(updated.balance).toBe(25000)
      expect(updated.status).toBe('partial')
    })
  })

  describe('getAvailableActions', () => {
    test('should allow payment on open invoice', () => {
      const actions = InvoiceStatusWorkflow.getAvailableActions(mockInvoice)

      expect(actions.canPay).toBe(true)
      expect(actions.canPartialPay).toBe(true)
    })

    test('should not allow payment on paid invoice', () => {
      const paidInvoice = { ...mockInvoice, status: 'paid' as const, balance: 0 }
      const actions = InvoiceStatusWorkflow.getAvailableActions(paidInvoice)

      expect(actions.canPay).toBe(false)
      expect(actions.canPartialPay).toBe(false)
    })

    test('should allow write-off on overdue invoice', () => {
      const overdueInvoice = { ...mockInvoice, status: 'overdue' as const }
      const actions = InvoiceStatusWorkflow.getAvailableActions(overdueInvoice)

      expect(actions.canWriteOff).toBe(true)
    })

    test('should allow reminders on open invoices', () => {
      const actions = InvoiceStatusWorkflow.getAvailableActions(mockInvoice)

      expect(actions.canSendReminder).toBe(true)
    })
  })

  describe('writeOffInvoice', () => {
    test('should write off invoice and reduce balance', () => {
      const result = InvoiceStatusWorkflow.writeOffInvoice(
        mockInvoice,
        'Customer bankruptcy'
      )

      expect(result.updatedInvoice.status).toBe('written_off')
      expect(result.updatedInvoice.balance).toBe(0)
      expect(result.writeOffAmount).toBe(50000)
    })

    test('should allow partial write-off', () => {
      const result = InvoiceStatusWorkflow.writeOffInvoice(
        mockInvoice,
        'Partial settlement',
        25000
      )

      expect(result.updatedInvoice.balance).toBe(25000)
      expect(result.updatedInvoice.status).toBe('partial')
      expect(result.writeOffAmount).toBe(25000)
    })

    test('should throw when write-off exceeds balance', () => {
      expect(() => {
        InvoiceStatusWorkflow.writeOffInvoice(mockInvoice, 'Test', 100000)
      }).toThrow()
    })

    test('should not allow write-off of paid invoice', () => {
      const paidInvoice = { ...mockInvoice, status: 'paid' as const, balance: 0 }

      expect(() => {
        InvoiceStatusWorkflow.writeOffInvoice(paidInvoice, 'Test')
      }).toThrow()
    })
  })

  describe('getOverdueInvoices', () => {
    test('should return invoices past due date', () => {
      const invoices: Invoice[] = [
        { ...mockInvoice, dueDate: new Date('2026-05-01'), balance: 50000 },
        { ...mockInvoice, id: '2', dueDate: new Date('2026-06-01'), balance: 50000 },
      ]

      const overdue = InvoiceStatusWorkflow.getOverdueInvoices(invoices, new Date('2026-05-08'))

      expect(overdue).toHaveLength(1)
      expect(overdue[0].dueDate).toEqual(new Date('2026-05-01'))
    })

    test('should not return paid invoices', () => {
      const invoices: Invoice[] = [
        { ...mockInvoice, dueDate: new Date('2026-05-01'), balance: 0, status: 'paid' },
      ]

      const overdue = InvoiceStatusWorkflow.getOverdueInvoices(invoices)

      expect(overdue).toHaveLength(0)
    })
  })

  describe('getUpcomingDueInvoices', () => {
    test('should return invoices due within N days', () => {
      const invoices: Invoice[] = [
        { ...mockInvoice, dueDate: new Date('2026-05-10'), balance: 50000 },
        { ...mockInvoice, id: '2', dueDate: new Date('2026-05-20'), balance: 50000 },
      ]

      const upcoming = InvoiceStatusWorkflow.getUpcomingDueInvoices(
        invoices,
        7,
        new Date('2026-05-08')
      )

      expect(upcoming.length).toBeGreaterThan(0)
    })

    test('should not return invoices past due', () => {
      const invoices: Invoice[] = [
        { ...mockInvoice, dueDate: new Date('2026-05-01'), balance: 50000 },
      ]

      const upcoming = InvoiceStatusWorkflow.getUpcomingDueInvoices(
        invoices,
        7,
        new Date('2026-05-08')
      )

      expect(upcoming).toHaveLength(0)
    })
  })

  describe('calculateDaysOverdue', () => {
    test('should calculate days overdue correctly', () => {
      const dueDate = new Date('2026-05-01')
      const currentDate = new Date('2026-05-08')

      const days = InvoiceStatusWorkflow.calculateDaysOverdue(dueDate, currentDate)

      expect(days).toBe(7)
    })

    test('should return 0 for future due dates', () => {
      const dueDate = new Date('2026-05-15')
      const currentDate = new Date('2026-05-08')

      const days = InvoiceStatusWorkflow.calculateDaysOverdue(dueDate, currentDate)

      expect(days).toBe(0)
    })
  })
})
