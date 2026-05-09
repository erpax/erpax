/**
 * @erpax/payables — accounts-payable management plugin.
 *
 * Master citation index for `aging`, `analytics`, `discounts`, `fields`,
 * `types`, `workflow`. Inner files inherit these standards.
 *
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-405 liabilities
 * @standard EN-16931:2017 §BG-4 seller
 * @standard Peppol-BIS-3.0 billing
 * @standard UN-EDIFACT INVOIC d96a
 * @standard UBL-2.1 universal-business-language
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time bill-date due-date
 * @standard US-IRS Form-1099 information-return
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §5
 */

export { APAgingCalculator } from './aging'
export { EarlyPaymentDiscountCalculator } from './discounts'
export { BillStatusWorkflow } from './workflow'
export { APAnalytics } from './analytics'

export type {
  Bill,
  BillStatus,
  BillLine,
  APAgingReport,
  PaymentScheduleItem,
  DiscountResult,
} from './types'

export {
  createBillNumberField,
  createBillStatusField,
  createDueDateField,
  createPaymentTermsField,
  createAPAnalysisFields,
} from './fields'
