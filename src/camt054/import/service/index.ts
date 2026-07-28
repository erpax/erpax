/**
 * camt.054 Import Service — parses BankToCustomerDebitCreditNotification XML
 * into `Camt054Notification`. Mirrors camt.053: same Ntry shape, no period
 * balances (notifications are advises between full statements).
 *
 * @standard ISO-20022 camt.054 bank-to-customer-debit-credit-notification
 * @see src/camt053/import/service · src/iso/20022 Camt054Notification
 */
import type { Camt054Notification } from '@/iso/20022'
import {
  extractIso20022Tag,
  extractIso20022All,
  parseCamt053Account,
  parseCamt053Party,
  parseCamt053Ntries,
} from '@/camt053/import/service'

/**
 * Parse a camt.054 notification document (single `<Ntfctn>`).
 *
 * @standard ISO-20022 BankToCustomerDebitCreditNotificationV08
 */
export const parseCamt054 = (xml: string): Camt054Notification => {
  const ntf = extractIso20022Tag(xml, 'Ntfctn') ?? xml
  const id = extractIso20022Tag(ntf, 'Id') ?? extractIso20022Tag(xml, 'MsgId') ?? ''
  const createdAt = new Date(
    extractIso20022Tag(ntf, 'CreDtTm') ??
      extractIso20022Tag(xml, 'CreDtTm') ??
      new Date().toISOString(),
  )
  const acctXml = extractIso20022Tag(ntf, 'Acct')
  const account = parseCamt053Account(acctXml)
  const owner = parseCamt053Party(acctXml ? extractIso20022Tag(acctXml, 'Ownr') : undefined)
  const currency = account.currency ?? 'EUR'
  const transactions = parseCamt053Ntries(ntf)
  return { id, createdAt, account, owner, currency, transactions }
}

/** Multi-notification file — one `Camt054Notification` per `<Ntfctn>`. */
export const parseCamt054Multi = (xml: string): Camt054Notification[] => {
  const blocks = extractIso20022All(xml, 'Ntfctn')
  if (blocks.length === 0) return [parseCamt054(xml)]
  return blocks.map((block) => parseCamt054(`<Ntfctn>${block}</Ntfctn>`))
}
