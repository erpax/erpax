/**
 * BG bank-statement PDF parser tests — pin the canonical row shape, the
 * BG-locale amount/date helpers, and the registry dispatch.
 *
 * Tests use synthetic text input (no real PDFs) so the suite runs in
 * any environment without needing a `pdf-parse` / `pdfjs-dist` runtime
 * dependency. Real PDF extraction is the deployment-supplied adapter.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-3166-1:2020 BG country-code
 * @standard ISO-13616-1:2020 iban BG-22
 * @standard ISO-32000-2:2020 pdf source-document
 * @audit ISO-19011:2018 audit-trail bank-statement-evidence
 * @see src/services/country-clients/bg-bank-statement-pdf.ts
 */

import { describe, expect, it } from 'vitest'
import {
  detectBgBankCode,
  extractBgIban,
  getBgBankParser,
  listBgBankParsers,
  parseBgAmount,
  parseBgBankStatementPdf,
  parseBgDate,
  registerBgBankParser,
} from '@/country/clients/bg/bank/parser'

describe('parseBgAmount — BG-locale amount parsing', () => {
  it.each([
    ['1 234,56', 123_456],
    ['1234.56', 123_456],
    ['1 234,56', 123_456],
    ['-1 234,56', -123_456],
    ['(1 234,56)', -123_456],
    ['0,01', 1],
    ['100', 10_000],
  ])('parseBgAmount("%s") → %d minor', (input, expected) => {
    expect(parseBgAmount(input)).toBe(expected)
  })

  it('returns NaN on non-numeric input', () => {
    expect(parseBgAmount('abc')).toBeNaN()
    expect(parseBgAmount('')).toBeNaN()
  })
})

describe('parseBgDate — DD.MM.YYYY → ISO-8601', () => {
  it.each([
    ['01.05.2026', '2026-05-01'],
    ['31.12.2025', '2025-12-31'],
    [' 01.05.2026 ', '2026-05-01'],
  ])('parseBgDate("%s") → "%s"', (input, expected) => {
    expect(parseBgDate(input)).toBe(expected)
  })

  it('returns empty string on malformed input', () => {
    expect(parseBgDate('2026-05-01')).toBe('')
    expect(parseBgDate('not a date')).toBe('')
  })
})

describe('extractBgIban — first valid BG-22 in text', () => {
  it('extracts a valid BG-22 IBAN from surrounding text', () => {
    const iban = extractBgIban('IBAN: BG80BNBG96611020345678 — main account')
    expect(iban).toBe('BG80BNBG96611020345678')
  })

  it('returns undefined when no BG IBAN is present', () => {
    expect(extractBgIban('No IBAN here')).toBeUndefined()
  })
})

describe('parser registry', () => {
  it('lists at least UniCredit Bulbank + Fibank (two worked examples)', () => {
    const parsers = listBgBankParsers()
    const codes = parsers.map((p) => p.bankCode)
    expect(codes).toContain('UNCRBGSF')
    expect(codes).toContain('FINVBGSF')
  })

  it('getBgBankParser is case-insensitive on the bankCode', () => {
    expect(getBgBankParser('uncrbgsf')?.bankCode).toBe('UNCRBGSF')
    expect(getBgBankParser('UNCRBGSF')?.bankCode).toBe('UNCRBGSF')
  })

  it('registerBgBankParser is idempotent (re-registering replaces)', () => {
    const original = getBgBankParser('UNCRBGSF')
    registerBgBankParser({
      bankCode: 'UNCRBGSF',
      bankName: 'Test Replacement',
      parse: () => ({
        bankCode: 'UNCRBGSF',
        iban: '',
        periodStart: '',
        periodEnd: '',
        openingBalanceMinor: 0,
        closingBalanceMinor: 0,
        currency: 'BGN',
        rows: [],
      }),
    })
    expect(getBgBankParser('UNCRBGSF')?.bankName).toBe('Test Replacement')
    // Restore original
    if (original) registerBgBankParser(original)
  })
})

describe('detectBgBankCode — auto-detect from text', () => {
  it('finds UNCRBGSF when the BIC appears in the text', () => {
    expect(detectBgBankCode('SWIFT: UNCRBGSF')).toBe('UNCRBGSF')
  })

  it('returns undefined when no known BIC is present', () => {
    expect(detectBgBankCode('No bank here')).toBeUndefined()
  })
})

describe('parseBgBankStatementPdf — end-to-end dispatch', () => {
  it('throws when the bank cannot be detected + no explicit code', async () => {
    const extractor = async () => 'No SWIFT BIC here'
    await expect(parseBgBankStatementPdf(new Uint8Array(), extractor)).rejects.toThrow(
      /no SWIFT BIC detected/,
    )
  })

  it('dispatches to the registered parser when bankCode is given', async () => {
    const extractor = async () =>
      [
        'IBAN: BG80BNBG96611020345678',
        'Валута: EUR',
        'Период: 01.04.2026 - 30.04.2026',
        'Начално салдо: 1 000,00',
        'Крайно салдо: 950,00',
        '01.04.2026  01.04.2026  Test transfer  Counterparty  50,00  0,00  950,00',
      ].join('\n')
    const stmt = await parseBgBankStatementPdf(new Uint8Array(), extractor, {
      bankCode: 'UNCRBGSF',
    })
    expect(stmt.bankCode).toBe('UNCRBGSF')
    expect(stmt.iban).toBe('BG80BNBG96611020345678')
    expect(stmt.currency).toBe('EUR')
    expect(stmt.periodStart).toBe('2026-04-01')
    expect(stmt.periodEnd).toBe('2026-04-30')
    expect(stmt.openingBalanceMinor).toBe(100_000)
    expect(stmt.closingBalanceMinor).toBe(95_000)
    expect(stmt.rows.length).toBeGreaterThanOrEqual(1)
  })
})

describe('Fibank parser — single-date column shape', () => {
  it('parses a synthetic Fibank statement with negative debit + positive credit', async () => {
    const extractor = async () =>
      [
        'IBAN: BG18FINV91501016043950',
        'Валута: BGN',
        'За периода: 01.05.2026 - 31.05.2026',
        'Начално салдо: 5 000,00',
        'Крайно салдо: 4 750,00',
        '15.05.2026  Покупка с карта  -250,00  BGN  4 750,00',
      ].join('\n')
    const stmt = await parseBgBankStatementPdf(new Uint8Array(), extractor, {
      bankCode: 'FINVBGSF',
    })
    expect(stmt.bankCode).toBe('FINVBGSF')
    expect(stmt.currency).toBe('BGN')
    expect(stmt.openingBalanceMinor).toBe(500_000)
    expect(stmt.closingBalanceMinor).toBe(475_000)
    expect(stmt.rows[0]).toMatchObject({
      bookingDate: '2026-05-15',
      valueDate: '2026-05-15',
      amountMinor: -25_000,
      currency: 'BGN',
    })
  })
})
