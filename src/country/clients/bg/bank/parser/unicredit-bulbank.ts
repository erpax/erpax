/**
 * UniCredit Bulbank PDF statement parser. The Bulgarian market leader's
 * statement layout — 7 columns: booking date, value date, description,
 * counterparty, debit, credit, balance.
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
} from '../../../../client/bg-bank-statement-pdf'

const BANK_CODE = 'UNCRBGSF' // SWIFT BIC for UniCredit Bulbank
const BANK_NAME = 'UniCredit Bulbank AD'

/**
 * Each statement row in UniCredit Bulbank's PDF starts with a BG-format
 * date pair (`DD.MM.YYYY  DD.MM.YYYY`) followed by the description text
 * and three trailing currency columns. We anchor on the date-pair
 * pattern + the bank's standard currency-column suffix.
 */
const ROW_RE =
  /(\d{2}\.\d{2}\.\d{4})\s+(\d{2}\.\d{2}\.\d{4})\s+(.+?)\s+(-?[\d\s.,()]+)\s+(-?[\d\s.,()]+)\s+(-?[\d\s.,()]+)$/gm

export function parseUniCreditBulbankStatement(text: string): BgBankStatement {
  const iban = extractBgIban(text) ?? ''
  const currency = extractCurrency(text)
  const period = extractPeriod(text)
  const balances = extractBalances(text)
  const rows = extractRows(text, currency)

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

// ─── Per-bank field extractors ───────────────────────────────────────────

function extractCurrency(text: string): string {
  const m = text.match(/Валута\s*[:|]\s*([A-Z]{3})/i)
  return (m?.[1] ?? 'BGN').toUpperCase()
}

function extractPeriod(text: string): { start: string; end: string } {
  const m = text.match(/Период\s*[:|]\s*(\d{2}\.\d{2}\.\d{4})\s*[-–]\s*(\d{2}\.\d{2}\.\d{4})/i)
  return {
    start: m ? parseBgDate(m[1]) : '',
    end: m ? parseBgDate(m[2]) : '',
  }
}

function extractBalances(text: string): { opening: number; closing: number } {
  const opening =
    parseBgAmount(text.match(/Начално салдо\s*[:|]\s*([\d\s.,()-]+)/i)?.[1] ?? '0') || 0
  const closing =
    parseBgAmount(text.match(/Крайно салдо\s*[:|]\s*([\d\s.,()-]+)/i)?.[1] ?? '0') || 0
  return { opening, closing }
}

function extractRows(text: string, currency: string): BgBankStatementRow[] {
  const rows: BgBankStatementRow[] = []
  const matches = text.matchAll(ROW_RE)
  for (const m of matches) {
    const debit = parseBgAmount(m[4]) || 0
    const credit = parseBgAmount(m[5]) || 0
    const balance = parseBgAmount(m[6])
    rows.push({
      bookingDate: parseBgDate(m[1]),
      valueDate: parseBgDate(m[2]),
      description: m[3].trim().replace(/\s+/g, ' '),
      amountMinor: credit > 0 ? credit : -debit,
      currency,
      balanceAfterMinor: Number.isFinite(balance) ? balance : undefined,
    })
  }
  return rows
}

// ─── Self-register on import ─────────────────────────────────────────────

registerBgBankParser({
  bankCode: BANK_CODE,
  bankName: BANK_NAME,
  parse: parseUniCreditBulbankStatement,
})
