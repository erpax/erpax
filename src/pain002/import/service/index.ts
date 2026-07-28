/**
 * pain.002 Import Service — parses CustomerPaymentStatusReport XML into
 * `Pain002Report`, then applies it onto a PaymentRun patch (group status +
 * reason). Closes the pain.001/008 initiation loop without Payload boot in
 * the pure apply path.
 *
 * @standard ISO-20022 pain.002 customer-payment-status-report
 * @see src/iso/20022 Pain002Report · src/bank/accounts/payment/runs
 */
import type { Pain002Report, Pain002Transaction, Pain002TransactionStatus } from '@/iso/20022'
import { isPain002TransactionStatus } from '@/iso/20022'
import {
  extractIso20022Tag,
  extractIso20022All,
} from '@/camt053/import/service'

const statusOf = (raw: string | undefined): Pain002TransactionStatus | undefined => {
  if (!raw) return undefined
  const code = raw.trim().toUpperCase()
  return isPain002TransactionStatus(code) ? code : undefined
}

const parseTx = (txXml: string): Pain002Transaction | null => {
  const status = statusOf(extractIso20022Tag(txXml, 'TxSts'))
  if (!status) return null
  const endToEndId =
    extractIso20022Tag(txXml, 'EndToEndId') ??
    extractIso20022Tag(txXml, 'OrgnlEndToEndId') ??
    ''
  const originalEndToEndId = extractIso20022Tag(txXml, 'OrgnlEndToEndId')
  const reasonBlock = extractIso20022Tag(txXml, 'StsRsnInf')
  const reasonCode =
    (reasonBlock ? extractIso20022Tag(extractIso20022Tag(reasonBlock, 'Rsn') ?? reasonBlock, 'Cd') : undefined) ??
    undefined
  const reasonAdditionalInformation = reasonBlock
    ? extractIso20022Tag(reasonBlock, 'AddtlInf')
    : undefined
  return {
    endToEndId: endToEndId || 'UNKNOWN',
    originalEndToEndId: originalEndToEndId || undefined,
    status,
    reasonCode,
    reasonAdditionalInformation,
  }
}

/**
 * Parse pain.002 XML → canonical `Pain002Report`.
 *
 * @standard ISO-20022 CustomerPaymentStatusReportV10
 */
export const parsePain002 = (xml: string): Pain002Report => {
  const root = extractIso20022Tag(xml, 'CstmrPmtStsRpt') ?? xml
  const hdr = extractIso20022Tag(root, 'GrpHdr') ?? root
  const messageId = extractIso20022Tag(hdr, 'MsgId') ?? ''
  const creationDateTime = new Date(extractIso20022Tag(hdr, 'CreDtTm') ?? new Date().toISOString())

  const orgnlGrp = extractIso20022Tag(root, 'OrgnlGrpInfAndSts') ?? ''
  const originalMessageId = extractIso20022Tag(orgnlGrp, 'OrgnlMsgId')
  const groupStatus = statusOf(extractIso20022Tag(orgnlGrp, 'GrpSts'))

  const txBlocks = [
    ...extractIso20022All(root, 'TxInfAndSts'),
    ...extractIso20022All(root, 'OrgnlPmtInfAndSts').flatMap((p) => extractIso20022All(p, 'TxInfAndSts')),
  ]
  const transactions = txBlocks.map(parseTx).filter((t): t is Pain002Transaction => t !== null)

  return {
    messageId,
    creationDateTime,
    originalMessageId,
    groupStatus,
    transactions,
  }
}

/** Payment-run fields the pain.002 apply path writes (pure — no Payload). */
export interface PaymentRunPain002Patch {
  readonly bankResponseStatus: Pain002TransactionStatus
  readonly bankResponseReasonCode?: string
  /** Suggested lifecycle status after bank ack. */
  readonly status: 'submitted' | 'rejected' | 'settled'
}

/**
 * Map a pain.002 report onto PaymentRun response fields + lifecycle hint.
 * Join key: `report.originalMessageId` ↔ PaymentRun.runId (caller enforces).
 */
export function applyPain002Report(report: Pain002Report): PaymentRunPain002Patch {
  const group =
    report.groupStatus ??
    (report.transactions.every((t) => t.status === 'RJCT')
      ? 'RJCT'
      : report.transactions.some((t) => t.status === 'RJCT')
        ? 'PART'
        : report.transactions[0]?.status ?? 'PDNG')

  const reason =
    report.transactions.find((t) => t.reasonCode)?.reasonCode ??
    report.transactions.find((t) => t.status === 'RJCT')?.reasonCode

  let status: PaymentRunPain002Patch['status'] = 'submitted'
  if (group === 'RJCT') status = 'rejected'
  else if (group === 'ACSC') status = 'settled'

  return {
    bankResponseStatus: group,
    bankResponseReasonCode: reason,
    status,
  }
}
