import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * pacs.004 Import Service — parses PaymentReturn XML into `Pacs004Return`.
 * Invert dual of pacs.004 types (and of outbound pain.001/pacs.008): returns
 * land as inbound wire, not only as Refunds collection fields.
 *
 * @standard ISO-20022 pacs.004 payment-return
 * @see src/iso/20022 Pacs004Return · src/pain002/import/service · src/bank/research invertBanking
 */
import type { Pacs004Return, Pacs004ReturnTransaction } from '@/iso/20022'
import {
  extractIso20022Tag,
  extractIso20022All,
  extractIso20022Attr,
} from '@/camt053/import/service'

const parseReturnTx = (txXml: string): Pacs004ReturnTransaction => {
  const endToEndId =
    extractIso20022Tag(txXml, 'RtrId') ??
    extractIso20022Tag(txXml, 'EndToEndId') ??
    'UNKNOWN'
  const originalEndToEndId =
    extractIso20022Tag(txXml, 'OrgnlEndToEndId') ??
    extractIso20022Tag(extractIso20022Tag(txXml, 'OrgnlTxRef') ?? '', 'EndToEndId')
  const amtBlock = extractIso20022Tag(txXml, 'RtrdIntrBkSttlmAmt') ?? extractIso20022Tag(txXml, 'Amt')
  const amountRaw = amtBlock ? amtBlock.replace(/<[^>]+>/g, '').trim() : '0'
  const amount = exactRound(parseFloat(amountRaw || '0') * 100)
  const currency =
    extractIso20022Attr(txXml, 'RtrdIntrBkSttlmAmt', 'Ccy') ??
    extractIso20022Attr(txXml, 'Amt', 'Ccy') ??
    'EUR'
  const reasonBlock = extractIso20022Tag(txXml, 'RtrRsnInf')
  const reasonCode =
    (reasonBlock
      ? extractIso20022Tag(extractIso20022Tag(reasonBlock, 'Rsn') ?? reasonBlock, 'Cd')
      : undefined) ?? undefined
  const reasonAdditionalInformation = reasonBlock
    ? extractIso20022Tag(reasonBlock, 'AddtlInf')
    : undefined
  return {
    endToEndId,
    originalEndToEndId: originalEndToEndId || undefined,
    amount,
    currency,
    reasonCode,
    reasonAdditionalInformation,
  }
}

/**
 * Parse a pacs.004 payment-return document.
 *
 * @standard ISO-20022 PaymentReturnV09
 */
export const parsePacs004 = (xml: string): Pacs004Return => {
  const hdr = extractIso20022Tag(xml, 'GrpHdr') ?? xml
  const messageId = extractIso20022Tag(hdr, 'MsgId') ?? extractIso20022Tag(xml, 'MsgId') ?? ''
  const creationDateTime = new Date(
    extractIso20022Tag(hdr, 'CreDtTm') ??
      extractIso20022Tag(xml, 'CreDtTm') ??
      new Date().toISOString(),
  )
  const txBlocks = extractIso20022All(xml, 'TxInf')
  const returns = txBlocks.map(parseReturnTx)
  const numberOfTransactions =
    Number(extractIso20022Tag(hdr, 'NbOfTxs') ?? returns.length) || returns.length
  const controlSumRaw = extractIso20022Tag(hdr, 'CtrlSum')
  const controlSum = controlSumRaw
    ? exactRound(parseFloat(controlSumRaw) * 100)
    : returns.reduce((s, r) => s + r.amount, 0)
  return {
    messageId,
    creationDateTime,
    numberOfTransactions,
    controlSum,
    returns,
  }
}
