/**
 * Fibank (Първа инвестиционна банка) PDF statement parser. 5-column
 * layout: date, description, amount, currency, balance. Single date
 * column (booking == value), counterparty embedded in the description.
 *
 * @standard ISO-3166-1:2020 BG country-code
 * @standard ISO-13616-1:2020 iban BG-22
 * @standard ISO-32000-2:2020 pdf source-document
 * @audit ISO-19011:2018 audit-trail bank-statement-evidence
 * @see ../bg-bank-statement-pdf.ts
 */

import {
  extractBgIban,
  parseBgAmount,
  parseBgDate,
  registerBgBankParser,
  type BgBankStatement,
  type BgBankStatementRow,
} from '@/country/client/bg-bank-statement-pdf'

const BANK_CODE = 'FINVBGSF' // SWIFT BIC for Fibank
const BANK_NAME = 'Първа инвестиционна банка АД'

/**
 * Fibank rows: `DD.MM.YYYY  <description>  <signed-amount>  <CCY>  <balance>`.
 * The amount column already carries the sign (debits are negative).
 */
const ROW_RE =
  /(\d{2}\.\d{2}\.\d{4})\s+(.+?)\s+(-?[\d\s.,]+)\s+([A-Z]{3})\s+(-?[\d\s.,]+)$/gm

export function parseFibankStatement(text: string): BgBankStatement {
  const iban = extractBgIban(text) ?? ''
  const currency = extractCurrency(text)
  const period = extractPeriod(text)
  const balances = extractBalances(text)
  const rows = extractRows(text)

  return {
    bankCode: BANK_CODE,
    iban,
    periodStart: period.start,
    periodEnd: period.end,
    openingBalanceMinor: balances.opening,
    closingBalanceMinor: balances.closing,
    currency,
    rows,
  }
}

function extractCurrency(text: string): string {
  const m = text.match(/Валута\s*[:|]\s*([A-Z]{3})/i)
  return (m?.[1] ?? 'BGN').toUpperCase()
}

function extractPeriod(text: string): { start: string; end: string } {
  const m = text.match(
    /За периода\s*[:|]\s*(\d{2}\.\d{2}\.\d{4})\s*[-–]\s*(\d{2}\.\d{2}\.\d{4})/i,
  )
  return {
    start: m ? parseBgDate(m[1]) : '',
    end: m ? parseBgDate(m[2]) : '',
  }
}

function extractBalances(text: string): { opening: number; closing: number } {
  const opening = parseBgAmount(text.match(/Начално салдо\s*[:|]\s*([\d\s.,-]+)/i)?.[1] ?? '0') || 0
  const closing = parseBgAmount(text.match(/Крайно салдо\s*[:|]\s*([\d\s.,-]+)/i)?.[1] ?? '0') || 0
  return { opening, closing }
}

function extractRows(text: string): BgBankStatementRow[] {
  const rows: BgBankStatementRow[] = []
  const matches = text.matchAll(ROW_RE)
  for (const m of matches) {
    const amount = parseBgAmount(m[3])
    const balance = parseBgAmount(m[5])
    const date = parseBgDate(m[1])
    rows.push({
      bookingDate: date,
      valueDate: date, // Fibank: same column for booking + value
      description: m[2].trim().replace(/\s+/g, ' '),
      amountMinor: Number.isFinite(amount) ? amount : 0,
      currency: m[4].toUpperCase(),
      balanceAfterMinor: Number.isFinite(balance) ? balance : undefined,
    })
  }
  return rows
}

registerBgBankParser({
  bankCode: BANK_CODE,
  bankName: BANK_NAME,
  parse: parseFibankStatement,
})
