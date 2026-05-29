/**
 * Accounts Receivable — shared type definitions.
 *
 * @standard EN-16931:2017 §BG-7 buyer
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time invoice-date due-date
 * @accounting IFRS IFRS-9 IFRS-15
 * @accounting US-GAAP ASC-310 ASC-326 ASC-606
 * @see docs/STANDARDS.md §5
 */

export type InvoiceStatus = 'draft' | 'issued' | 'overdue' | 'partial' | 'paid' | 'written_off'
import type { PaymentTerm } from '../../services/parties'
export type { PaymentTerm }

export interface Invoice {
  id: string
  invoiceNumber: string
  customerId: string
  invoiceDate: Date
  dueDate: Date
  status: InvoiceStatus
  lines: InvoiceLine[]
  totalAmount: number // cents
  paidAmount: number // cents
  balance: number // cents
  paymentTerms: PaymentTerm
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface InvoiceLine {
  id: string
  description: string
  quantity: number
  unitPrice: number // cents
  amount: number // cents (quantity × unitPrice)
  accountCode: string // revenue account
}

export interface Customer {
  id: string
  name: string
  email: string
  creditLimit: number // cents
  currentBalance: number // cents
  status: 'active' | 'inactive' | 'suspended'
  termsOfPayment: PaymentTerm
  createdAt: Date
}

export interface Payment {
  id: string
  invoiceId: string
  customerId: string
  amount: number // cents
  paymentDate: Date
  paymentMethod: 'cash' | 'check' | 'credit_card' | 'bank_transfer'
  referenceNumber: string
  appliedToInvoice: boolean
  createdAt: Date
}

export interface AgingBucket {
  name: string
  dayMin: number
  dayMax: number
  invoices: Invoice[]
  totalAmount: number // cents
  invoiceCount: number
  percentage: number
}

export interface ARAgingReport {
  asOfDate: Date
  currency: string
  buckets: AgingBucket[]
  totalARBalance: number // cents
  totalInvoices: number
  overdueDays: number // threshold (usually 30)
  notes: string[]
}

export interface AllowanceResult {
  bucketName: string
  amount: number // cents
  percentage: number
  methodology: string
}

export interface AllowanceCalculation {
  totalAR: number // cents
  allowance: number // cents
  netAR: number // cents
  coverage: number // percentage
  results: AllowanceResult[]
  asOfDate: Date
}

export interface CollectionEvent {
  id: string
  invoiceId: string
  customerId: string
  eventType: 'email_sent' | 'call_made' | 'payment_received' | 'payment_promised' | 'escalated'
  description: string
  amount?: number // cents, for payment_received
  notes: string
  createdAt: Date
  createdBy: string
}

export interface PaymentSchedule {
  invoiceId: string
  customerId: string
  dueDate: Date
  amount: number // cents
  frequency: 'one_time' | 'weekly' | 'biweekly' | 'monthly'
  startDate: Date
  endDate?: Date
  status: 'scheduled' | 'in_progress' | 'completed'
}

export interface CreditMemo {
  id: string
  creditMemoNumber: string
  invoiceId: string
  customerId: string
  amount: number // cents
  reason: string
  date: Date
  status: 'draft' | 'issued' | 'applied'
  appliedToInvoiceId?: string
}

export interface DaysPayableOutstanding {
  invoiceId: string
  invoiceDate: Date
  dueDate: Date
  paidDate?: Date
  daysToPay?: number
  isOverdue: boolean
  daysOverdue?: number
}
