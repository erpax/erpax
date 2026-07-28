/**
 * camt.052 Import Service — parses BankToCustomerAccountReport XML into
 * `Camt052Report`. Invert dual of camt.053 (end-of-day statement): same Ntry
 * shape, `<Rpt>` instead of `<Stmt>`, intraday FrToDt window, no required
 * OPBD/CLBD balances.
 *
 * @standard ISO-20022 camt.052 bank-to-customer-account-report
 * @see src/camt053/import/service · src/iso/20022 Camt052Report · src/bank/research invertBanking
 */
import type { Camt052Report } from '@/iso/20022'
import {
  extractIso20022Tag,
  extractIso20022All,
  parseCamt053Account,
  parseCamt053Party,
  parseCamt053Ntries,
} from '@/camt053/import/service'

/**
 * Parse a camt.052 account-report document (single `<Rpt>`).
 *
 * @standard ISO-20022 BankToCustomerAccountReportV08
 */
export const parseCamt052 = (xml: string): Camt052Report => {
  const rpt = extractIso20022Tag(xml, 'Rpt') ?? xml
  const id = extractIso20022Tag(rpt, 'Id') ?? extractIso20022Tag(xml, 'MsgId') ?? ''
  const createdAt = new Date(
    extractIso20022Tag(rpt, 'CreDtTm') ??
      extractIso20022Tag(xml, 'CreDtTm') ??
      new Date().toISOString(),
  )
  const acctXml = extractIso20022Tag(rpt, 'Acct')
  const account = parseCamt053Account(acctXml)
  const owner = parseCamt053Party(acctXml ? extractIso20022Tag(acctXml, 'Ownr') : undefined)
  const currency = account.currency ?? 'EUR'
  const frToDt = extractIso20022Tag(rpt, 'FrToDt')
  const fromDateTime = new Date(
    (frToDt ? extractIso20022Tag(frToDt, 'FrDtTm') : undefined) ?? createdAt.toISOString(),
  )
  const toDateTime = new Date(
    (frToDt ? extractIso20022Tag(frToDt, 'ToDtTm') : undefined) ?? createdAt.toISOString(),
  )
  const transactions = parseCamt053Ntries(rpt)
  return { id, createdAt, account, owner, fromDateTime, toDateTime, currency, transactions }
}

/** Multi-report file — one `Camt052Report` per `<Rpt>`. */
export const parseCamt052Multi = (xml: string): Camt052Report[] => {
  const blocks = extractIso20022All(xml, 'Rpt')
  if (blocks.length === 0) return [parseCamt052(xml)]
  return blocks.map((block) => parseCamt052(`<Rpt>${block}</Rpt>`))
}
