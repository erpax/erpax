/**
 * @erpax/receivables — accounts-receivable management plugin.
 *
 * Master citation index for `aging`, `allowance`, `analytics`, `fields`,
 * `types`, `workflow`. Inner files inherit these standards.
 *
 * @accounting IFRS IFRS-9 financial-instruments expected-credit-loss
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @accounting US-GAAP ASC-310 receivables
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @standard EN-16931:2017 §BG-7 buyer
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time invoice-date due-date
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §5
 */

export { ARAgingCalculator } from './aging'
export { AllowanceCalculator } from './allowance'
export { InvoiceStatusWorkflow } from './workflow'
export { ARAnalytics } from './analytics'

export type {
  Invoice,
  InvoiceStatus,
  InvoiceLine,
  AgingBucket,
  ARAgingReport,
  AllowanceResult,
  CollectionEvent,
} from './types'

export {
  createInvoiceNumberField,
  createInvoiceStatusField,
  createDueDateField,
  createPaymentTermsField,
  createARAnalysisFields,
} from './fields'
