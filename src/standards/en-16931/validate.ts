/**
 * Runtime guards for the EN 16931 code lists. Pair with the static `type`
 * exports in `./types.ts` so callers parsing untrusted input (CSV upload,
 * API payload, EDI message) can validate before binding.
 *
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @standard UN-CEFACT 5305 duty-tax-fee-category-code
 * @standard UN-CEFACT 1001 document-name-code
 * @standard UN-CEFACT 4461 payment-means
 * @see ./types.ts
 */

import type {
  InvoiceTypeCode,
  VatCategoryCode,
  PaymentMeansCode,
} from './types'

const INVOICE_TYPE_CODES = new Set<InvoiceTypeCode>([
  '326',
  '380',
  '381',
  '384',
  '386',
  '388',
  '389',
  '393',
  '395',
  '751',
])
const VAT_CATEGORY_CODES = new Set<VatCategoryCode>([
  'S',
  'Z',
  'E',
  'AE',
  'K',
  'G',
  'O',
  'L',
  'M',
])
const PAYMENT_MEANS_CODES = new Set<PaymentMeansCode>([
  '10',
  '20',
  '30',
  '42',
  '48',
  '49',
  '57',
  '58',
  '59',
  '97',
])

/** Type-narrowing guard for {@link InvoiceTypeCode}. */
export const isInvoiceTypeCode = (s: unknown): s is InvoiceTypeCode =>
  typeof s === 'string' && INVOICE_TYPE_CODES.has(s as InvoiceTypeCode)

/** Type-narrowing guard for {@link VatCategoryCode}. */
export const isVatCategoryCode = (s: unknown): s is VatCategoryCode =>
  typeof s === 'string' && VAT_CATEGORY_CODES.has(s as VatCategoryCode)

/** Type-narrowing guard for {@link PaymentMeansCode}. */
export const isPaymentMeansCode = (s: unknown): s is PaymentMeansCode =>
  typeof s === 'string' && PAYMENT_MEANS_CODES.has(s as PaymentMeansCode)
