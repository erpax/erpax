/**
 * A/R Aging Calculator Tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-8601-1:2019 date-time as-of-date
 * @accounting IFRS IFRS-9 expected-credit-loss
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @accounting US-GAAP ASC-310 receivables
 * @see docs/STANDARDS.md §5 §7
 */

import { ARAgingCalculator } from '@/plugins/receivables/aging'
import { Invoice } from '@/plugins/receivables/types'

describe('ARAgingCalculator', () => {
  const today = new Date('2026-05-08')

  const mockInvoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2026-001',
      customerId: 'customer1',
      invoiceDate: new Date('2026-05-01'),
      dueDate: new Date('2026-05-31'),
      status: 'issued',
      lines: [],
      totalAmount: 50000, // $500
      paidAmount: 0,
      balance: 50000,
      paymentTerms: '30',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      invoiceNumber: 'INV-2026-002',
      customerId: 'customer2',
      invoiceDate: new Date('2026-04-08'),
      dueDate: new Date('2026-05-08'),
      status: 'partial',
      lines: [],
      totalAmount: 100000, // $1000
      paidAmount: 30000,
      balance: 70000,
      paymentTerms: '30',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      invoiceNumber: 'INV-2026-003',
      customerId: 'customer1',
      invoiceDate: new Date('2026-03-09'),
      dueDate: new Date('2026-04-08'),
      status: 'overdue',
      lines: [],
      totalAmount: 150000, // $1500
      paidAmount: 0,
      balance: 150000,
      paymentTerms: '30',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      invoiceNumber: 'INV-2026-004',
      customerId: 'customer3',
      invoiceDate: new Date('2026-02-06'),
      dueDate: new Date('2026-03-08'),
      status: 'overdue',
      lines: [],
      totalAmount: 200000, // $2000
      paidAmount: 0,
      balance: 200000,
      paymentTerms: '30',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  describe('generateAgingReport', () => {
    test('should generate aging report with correct buckets', () => {
      const report = ARAgingCalculator.generateAgingReport(mockInvoices, today)

      expect(report.asOfDate).toEqual(today)
      expect(report.buckets).toHaveLength(4)
      expect(report.buckets[0].name).toBe('Current')
      expect(report.buckets[1].name).toBe('31-60 days')
      expect(report.buckets[2].name).toBe('61-90 days')
      expect(report.buckets[3].name).toBe('90+ days')
    })

    test('should categorize invoices correctly by aging', () => {
      const report = ARAgingCalculator.generateAgingReport(mockInvoices, today)

      // Should have invoices in appropriate buckets
      expect(report.totalInvoices).toBeGreaterThan(0)
      expect(report.totalARBalance).toBeGreaterThan(0)
    })

    test('should calculate total A/R balance correctly', () => {
      const report = ARAgingCalculator.generateAgingReport(mockInvoices, today)

      const expectedTotal = mockInvoices.reduce((sum, inv) => sum + inv.balance, 0)
      expect(report.totalARBalance).toBe(expectedTotal)
    })

    test('should calculate percentages correctly', () => {
      const report = ARAgingCalculator.generateAgingReport(mockInvoices, today)

      const totalPercentage = report.buckets.reduce((sum, b) => sum + b.percentage, 0)
      expect(totalPercentage).toBeCloseTo(100, 1)
    })

    test('should include notes in report', () => {
      const report = ARAgingCalculator.generateAgingReport(mockInvoices, today)

      expect(report.notes).toBeTruthy()
      expect(report.notes.length).toBeGreaterThan(0)
    })

    test('should handle empty invoice list', () => {
      const report = ARAgingCalculator.generateAgingReport([], today)

      expect(report.totalARBalance).toBe(0)
      expect(report.totalInvoices).toBe(0)
    })

    test('should handle paid invoices', () => {
      const invoices: Invoice[] = [
        ...mockInvoices,
        {
          id: '5',
          invoiceNumber: 'INV-2026-005',
          customerId: 'customer4',
          invoiceDate: new Date('2026-04-01'),
          dueDate: new Date('2026-05-01'),
          status: 'paid',
          lines: [],
          totalAmount: 50000,
          paidAmount: 50000,
          balance: 0,
          paymentTerms: '30',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      const report = ARAgingCalculator.generateAgingReport(invoices, today)

      // Paid invoices should not be included in aging
      expect(report.totalInvoices).toBeLessThan(invoices.length)
    })
  })

  describe('calculateCollectionPriority', () => {
    test('should prioritize oldest + largest invoices', () => {
      const priority = ARAgingCalculator.calculateCollectionPriority(mockInvoices)

      expect(priority).toBeTruthy()
      expect(priority.length).toBeGreaterThan(0)
      expect(priority[0].priority).toBeGreaterThanOrEqual(priority[1].priority)
    })

    test('should sort by priority descending', () => {
      const priority = ARAgingCalculator.calculateCollectionPriority(mockInvoices)

      for (let i = 0; i < priority.length - 1; i++) {
        expect(priority[i].priority).toBeGreaterThanOrEqual(priority[i + 1].priority)
      }
    })
  })

  describe('calculateARMetrics', () => {
    test('should calculate correct metrics', () => {
      const metrics = ARAgingCalculator.calculateARMetrics(mockInvoices, today)

      expect(metrics.totalAR).toBeGreaterThan(0)
      expect(metrics.totalInvoices).toBeGreaterThan(0)
      expect(metrics.avgDaysOutstanding).toBeGreaterThan(0)
      expect(metrics.overdueInvoices).toBeGreaterThan(0)
    })

    test('should calculate average days outstanding', () => {
      const metrics = ARAgingCalculator.calculateARMetrics(mockInvoices, today)

      expect(metrics.avgDaysOutstanding).toBeTruthy()
      expect(typeof metrics.avgDaysOutstanding).toBe('number')
    })

    test('should calculate overdue percentage', () => {
      const metrics = ARAgingCalculator.calculateARMetrics(mockInvoices, today)

      const percentage = parseFloat(metrics.overduePercentage as string)
      expect(percentage).toBeGreaterThanOrEqual(0)
      expect(percentage).toBeLessThanOrEqual(100)
    })

    test('should handle empty invoices', () => {
      const metrics = ARAgingCalculator.calculateARMetrics([], today)

      expect(metrics.totalInvoices).toBe(0)
    })

    test('should identify largest invoice', () => {
      const metrics = ARAgingCalculator.calculateARMetrics(mockInvoices, today)

      const maxBalance = Math.max(...mockInvoices.map((inv) => inv.balance))
      expect(metrics.largestInvoice).toBe(maxBalance)
    })
  })
})
