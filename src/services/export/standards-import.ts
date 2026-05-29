/**
 * Standards Import — unified entry point for inbound wire-format
 * parsers. Inbound (take) dual of `standards.service.ts` (give): banks
 * and Peppol Access Points hand erpax an XML document; this module
 * routes it to the canonical parser by a `format` discriminator and
 * returns the typed structure for the write path to ingest.
 *
 * Format coverage:
 *   camt.053         ISO 20022 bank-to-customer statement (XML) →
 *                    Camt053Statement (single-statement file)
 *   camt.053-multi   Same, but one file batching N statements →
 *                    Camt053Statement[]
 *   peppol-ubl       Peppol BIS Billing 3.0 invoice (UBL 2.1 XML) →
 *                    PeppolBillingMessage
 *
 * Shared shape: each request carries the raw `xml`; the result pairs the
 * echoed `format` with the parsed canonical `data`. The standards each
 * route honours are declared on the parser it delegates to (see @see).
 *
 * Future formats: pain.002 (status report), EDIFACT INVOIC inbound.
 *
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard Peppol-BIS-3.0 billing
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @standard UBL-2.1 universal-business-language
 * @audit ISO-19011:2018 audit-trail
 * @see src/services/export/standards.service.ts (outbound counterpart)
 * @see src/services/camt053-import.service.ts
 * @see src/services/peppol-import.service.ts
 */

import {
  parseCamt053,
  parseCamt053Multi,
} from '@/services/camt053-import.service'
import { parsePeppolInvoice } from '@/services/peppol-import.service'
import type { Camt053Statement } from '@/standards/iso-20022'
import type { PeppolBillingMessage } from '@/standards/peppol-bis-3'

/**
 * Inbound wire-format discriminator. Mirrors `StandardsExportFormat`
 * but covers the inverse direction.
 */
export type StandardsImportFormat = 'camt.053' | 'camt.053-multi' | 'peppol-ubl'

/**
 * Discriminated request — every inbound format is fed the raw `xml`.
 */
export type StandardsImportRequest =
  | { format: 'camt.053'; xml: string }
  | { format: 'camt.053-multi'; xml: string }
  | { format: 'peppol-ubl'; xml: string }

/**
 * Result of a standards import — the echoed format plus the parsed
 * canonical structure.
 */
export interface StandardsImportResult<T = unknown> {
  format: StandardsImportFormat
  /** The parsed canonical structure. */
  data: T
}

/**
 * Unified dispatcher — routes inbound XML to the canonical parser based
 * on the format discriminator. Inverse of `exportStandards`.
 */
export const importStandards = async (
  request: StandardsImportRequest,
): Promise<
  StandardsImportResult<Camt053Statement | Camt053Statement[] | PeppolBillingMessage>
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
