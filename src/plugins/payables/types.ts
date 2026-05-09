/**
 * Accounts Payable — shared type definitions.
 *
 * @standard EN-16931:2017 §BG-4 seller
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time bill-date due-date
 * @standard ISO-17442-1:2020 lei vendor-identification
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @accounting US-GAAP ASC-405 liabilities
 * @standard US-IRS Form-1099 information-return
 * @see docs/STANDARDS.md §5
 */

export type BillStatus = 'draft' | 'received' | 'approved' | 'scheduled' | 'partial' | 'paid' | 'disputed'
export type { PaymentTerm } from '@/plugins/parties'

export interface Bill {
  id: string
  billNumber: string
  vendorId: string
  billDate: Date
  dueDate: Date
  status: BillStatus
  lines: BillLine[]
  totalAmount: number // cents
  paidAmount: number // cents
  balance: number // cents
  paymentTerms: PaymentTerm
  discountAvailable: number // cents (early payment discount)
  discountDeadline?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface BillLine {
  id: string
  description: string
  quantity: number
  unitPrice: number // cents
  amount: number // cents
  accountCode: string // expense or asset account
  poNumber?: string
}

export interface Vendor {
  id: string
  name: string
  email: string
  payableLimit: number // cents (credit limit)
  currentPayable: number // cents
  status: 'active' | 'inactive' | 'blocked'
  standardPaymentTerms: PaymentTerm
  earlyPaymentDiscount?: number // percentage (e.g., 2 for 2%)
  createdAt: Date
}

export interface VendorPayment {
  id: string
  billId: string
  vendorId: string
  amount: number // cents
  paymentDate: Date
  paymentMethod: 'check' | 'bank_transfer' | 'credit_card' | 'cash'
  referenceNumber: string
  discountTaken?: number // cents
  createdAt: Date
}

export interface APAgingReport {
  asOfDate: Date
  currency: string
  buckets: AgingBucket[]
  totalAPBalance: number // cents
  totalBills: number
  totalDueAmount: number // cents due within 30 days
  notes: string[]
}

export interface AgingBucket {
  name: string
  dayMin: number
  dayMax: number
  bills: Bill[]
  totalAmount: number // cents
  billCount: number
  percentage: number
}

export interface PaymentScheduleItem {
  billId: string
  vendorId: string
  paymentAmount: number // cents
  paymentDate: Date
  status: 'scheduled' | 'processed' | 'cancelled'
  discountEligible: boolean
}

export interface DiscountResult {
  billId: string
  discountPercentage: number
  discountAmount: number // cents
  netAmount: number // cents
  discountDeadline: Date
  daysTillDiscount: number
}

export interface PaymentRun {
  id: string
  runDate: Date
  bills: Bill[]
  totalPayment: number // cents
  paymentMethod: 'check' | 'bank_transfer'
  status: 'draft' | 'approved' | 'processed' | 'reconciled'
  checks?: { billId: string; checkNumber: string }[]
}

export interface VendorPerformance {
  vendorId: string
  vendorName: string
  totalBillsReceived: number
  avgBillAmount: number // cents
  avgDaysToReceiveBill: number
  avgDaysToPayBill: number
  discountsEarned: number // cents
  discountRate: number // percentage
  onTimePaymentRate: number // percentage
}
