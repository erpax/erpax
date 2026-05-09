/**
 * Standards Import — unified entry point for inbound wire-format
 * parsers. Inbound counterpart of `standards-export.ts`.
 *
 * Format coverage:
 *   camt.053         ISO 20022 bank-to-customer statement (XML) →
 *                    Camt053Statement
 *   camt.053-multi   Same, but one file with N statements
 *
 * Future: pain.002 (status report), EN-16931 inbound (UBL XML →
 * canonical InvoiceLine[] for AP-from-Peppol-network workflows),
 * EDIFACT INVOIC inbound parser.
 *
 * @standard ISO-20022:2022 universal-financial-industry-message-scheme
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/export/standards-export.ts
 * @see src/services/camt053-import.service.ts
 */

import {
  parseCamt053,
  parseCamt053Multi,
} from '@/services/camt053-import.service'
import { parsePeppolInvoice } from '@/services/peppol-import.service'
import type { Camt053Statement } from '@/standards/iso-20022'
import type { PeppolBillingMessage } from '@/standards/peppol-bis-3'

/**
 * Discriminator for inbound wire-format parsers. Mirrors
 * `StandardsExportFormat` but covers the inverse direction.
 */
export type StandardsImportFormat =
  | 'camt.053'
  | 'camt.053-multi'
  | 'peppol-ubl'

export type StandardsImportRequest =
  | { format: 'camt.053'; xml: string }
  | { format: 'camt.053-multi'; xml: string }
  | { format: 'peppol-ubl'; xml: string }

export interface StandardsImportResult<T = unknown> {
  format: StandardsImportFormat
  /** The parsed canonical structure. */
  data: T
}

/**
 * Unified dispatcher — routes inbound XML / EDI to the canonical
 * parser based on the format discriminator.
 */
export const importStandards = async (
  request: StandardsImportRequest,
): Promise<
  StandardsImportResult<
    Camt053Statement | Camt053Statement[] | PeppolBillingMessage
  >
> => {
  switch (request.format) {
    case 'camt.053':
      return {
        format: 'camt.053',
        data: parseCamt053(request.xml),
      }
    case 'camt.053-multi':
      return {
        format: 'camt.053-multi',
        data: parseCamt053Multi(request.xml),
      }
    case 'peppol-ubl':
      return {
        format: 'peppol-ubl',
        data: parsePeppolInvoice(request.xml),
      }
  }
}
