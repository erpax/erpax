/**
 * Runtime guards for the OECD SAF-T 2.0 enums.
 *
 * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
 * @see ./types.ts
 */

import type {
  SafTSourceDocumentType,
  SafTPaymentMechanism,
} from '@/saf/t/types'

const SOURCE_DOCUMENT_TYPES = new Set<SafTSourceDocumentType>([
  'sales_invoice',
  'purchase_invoice',
  'payment',
  'movement_of_goods',
])

const PAYMENT_MECHANISMS = new Set<SafTPaymentMechanism>([
  'CC',
  'CD',
  'CH',
  'CO',
  'CS',
  'DE',
  'LC',
  'MB',
  'NU',
  'OU',
  'PR',
  'TB',
  'TR',
])

/** Type-narrowing guard for {@link SafTSourceDocumentType}. */
export const isSafTSourceDocumentType = (
  s: unknown,
): s is SafTSourceDocumentType =>
  typeof s === 'string' && SOURCE_DOCUMENT_TYPES.has(s as SafTSourceDocumentType)

/** Type-narrowing guard for {@link SafTPaymentMechanism}. */
export const isSafTPaymentMechanism = (
  s: unknown,
): s is SafTPaymentMechanism =>
  typeof s === 'string' && PAYMENT_MECHANISMS.has(s as SafTPaymentMechanism)

/**
 * Quick balance check on a SAF-T `GeneralLedgerEntries` section —
 * Σ debits should equal Σ credits across all lines. Tax authorities
 * reject files that fail this invariant.
 *
 * @standard OECD SAF-T 2.0 GeneralLedgerEntries
 */
export const isBalancedGeneralLedger = (entries: {
  totalDebit: number
  totalCredit: number
}): boolean => entries.totalDebit === entries.totalCredit
