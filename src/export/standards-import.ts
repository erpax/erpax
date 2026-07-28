/**
 * Standards Import — unified entry point for inbound wire-format
 * parsers. Inbound (take) dual of `standards.service.ts` (give): banks
 * and Peppol Access Points hand erpax an XML document; this module
 * routes it to the canonical parser by a `format` discriminator and
 * returns the typed structure for the write path to ingest.
 *
 * Format coverage (banking invert fills the inbound duals):
 *   camt.052         ISO 20022 bank-to-customer account report (intraday)
 *   camt.053         ISO 20022 bank-to-customer statement (XML)
 *   camt.053-multi   Same, batched N statements
 *   camt.054         ISO 20022 debit/credit notification (XML)
 *   pain.002         ISO 20022 customer payment status report (XML)
 *   pacs.004         ISO 20022 payment return (XML)
 *   peppol-ubl       Peppol BIS Billing 3.0 invoice (UBL 2.1 XML)
 *
 * @standard ISO-20022 camt.052 · camt.053 · camt.054 · pain.002 · pacs.004
 * @standard Peppol-BIS-3.0 billing
 * @see src/camt052/import/service · src/camt053/import/service · src/camt054/import/service
 * @see src/pain002/import/service · src/pacs004/import/service
 */

import {
  parseCamt053,
  parseCamt053Multi,
} from '@/camt053/import/service'
import { parseCamt052 } from '@/camt052/import/service'
import { parseCamt054 } from '@/camt054/import/service'
import { parsePain002 } from '@/pain002/import/service'
import { parsePacs004 } from '@/pacs004/import/service'
import { parsePeppolInvoice } from '@/peppol/import/service'
import type {
  Camt052Report,
  Camt053Statement,
  Camt054Notification,
  Pain002Report,
  Pacs004Return,
} from '@/iso/20022'
import type { PeppolBillingMessage } from '@/peppol/bis/3'

export type StandardsImportFormat =
  | 'camt.052'
  | 'camt.053'
  | 'camt.053-multi'
  | 'camt.054'
  | 'pain.002'
  | 'pacs.004'
  | 'peppol-ubl'

export type StandardsImportRequest =
  | { format: 'camt.052'; xml: string }
  | { format: 'camt.053'; xml: string }
  | { format: 'camt.053-multi'; xml: string }
  | { format: 'camt.054'; xml: string }
  | { format: 'pain.002'; xml: string }
  | { format: 'pacs.004'; xml: string }
  | { format: 'peppol-ubl'; xml: string }

export interface StandardsImportResult<T = unknown> {
  format: StandardsImportFormat
  /** The parsed canonical structure. */
  data: T
}

export const importStandards = async (
  request: StandardsImportRequest,
): Promise<
  StandardsImportResult<
    | Camt052Report
    | Camt053Statement
    | Camt053Statement[]
    | Camt054Notification
    | Pain002Report
    | Pacs004Return
    | PeppolBillingMessage
  >
> => {
  switch (request.format) {
    case 'camt.052':
      return { format: 'camt.052', data: parseCamt052(request.xml) }
    case 'camt.053':
      return { format: 'camt.053', data: parseCamt053(request.xml) }
    case 'camt.053-multi':
      return { format: 'camt.053-multi', data: parseCamt053Multi(request.xml) }
    case 'camt.054':
      return { format: 'camt.054', data: parseCamt054(request.xml) }
    case 'pain.002':
      return { format: 'pain.002', data: parsePain002(request.xml) }
    case 'pacs.004':
      return { format: 'pacs.004', data: parsePacs004(request.xml) }
    case 'peppol-ubl':
      return { format: 'peppol-ubl', data: parsePeppolInvoice(request.xml) }
  }
}
