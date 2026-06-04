/**
 * BG bank-statement PDF parser — fallback path when a tenant hasn't
 * onboarded PSD2 with their bank yet (or the bank doesn't expose a
 * Berlin-Group endpoint despite the BNB licence). Parses bank-issued
 * PDF statements into the same canonical shape camt.053 imports
 * produce, so downstream reconciliation runs against one row type
 * regardless of the source.
 *
 * Two-layer architecture:
 *
 *   1. **Text extraction** — `extractPdfText(bytes)` returns the
 *      per-page text. This module ships an interface; the actual
 *      extractor (pdf-parse / pdfjs-dist / Cloudflare Workers AI
 *      `@cf/unum/uform-gen2-qwen-500m`) is plugged in by the deployment.
 *      Sandbox-friendly: per-bank parsers consume already-extracted
 *      text + are testable without a real PDF.
 *
 *   2. **Per-bank parsing** — `BgBankStatementParser` registry, one
 *      entry per BG bank (UniCredit Bulbank / DSK / Postbank / Fibank /
 *      KBC / ProCredit / Allianz / Investbank / CCB / BACB). Each
 *      parser knows its bank's column layout + locale formatting and
 *      emits the canonical `BgBankStatement` row shape.
 *
 * Mirrors the camt.053 row shape so the existing reconciliation
 * service consumes both source paths interchangeably.
 *
 * @standard ISO-3166-1:2020 BG country-code
 * @standard ISO-13616-1:2020 iban BG-22
 * @standard ISO-20022 camt.053 bank-to-customer-statement (target shape)
 * @standard ISO-32000-2:2020 pdf source-document
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 audit-trail bank-statement-evidence
 * @compliance SOX §404 internal-controls fx-revaluation-evidence
 * @see ./bg-nap-mtls.ts (transport for НАП submissions)
 * @see ../camt053-import.service.ts (canonical row shape this module mirrors)
 */

import { isBgIban } from '@/iso/13616'

/** Canonical row produced by every BG bank parser — matches the camt.053 line shape. */
export interface BgBankStatementRow {
  /** ISO-8601 booking date (`YYYY-MM-DD`). */
  readonly bookingDate: string
  /** ISO-8601 value date (`YYYY-MM-DD`) — sometimes the same as booking. */
  readonly valueDate: string
  /** Free-text description from the bank statement line. */
  readonly description: string
  /** Amount in minor units (cents). Positive = credit, negative = debit. */
  readonly amountMinor: number
  /** ISO-4217 currency code. */
  readonly currency: string
  /** Running balance after this row, in minor units. Optional — some banks omit it. */
  readonly balanceAfterMinor?: number
  /** Counterparty name (extracted from the description / dedicated column). */
  readonly counterpartyName?: string
  /** Counterparty IBAN — verified BG-22 / generic IBAN. */
  readonly counterpartyIban?: string
  /** Bank's reference / confirmation number. */
  readonly reference?: string
}

export interface BgBankStatement {
  /** Bank code (`'UNCRBGSF'` for UniCredit Bulbank, etc.) — registry key. */
  readonly bankCode: string
  /** Account IBAN the statement covers. */
  readonly iban: string
  /** Period start (ISO-8601 `YYYY-MM-DD`). */
  readonly periodStart: string
  /** Period end (ISO-8601 `YYYY-MM-DD`). */
  readonly periodEnd: string
  /** Opening balance in minor units. */
  readonly openingBalanceMinor: number
  /** Closing balance in minor units. */
  readonly closingBalanceMinor: number
  /** Statement currency (ISO-4217). */
  readonly currency: string
  /** Per-row line items. */
  readonly rows: ReadonlyArray<BgBankStatementRow>
}

/**
 * Per-bank parser — consumes already-extracted text + returns the
 * canonical statement. Registered in `BG_BANK_PARSERS` keyed by SWIFT BIC.
 */
export interface BgBankStatementParser {
  /** SWIFT BIC of the bank (e.g. `'UNCRBGSF'`, `'STSABGSF'`). */
  readonly bankCode: string
  /** Display name (Cyrillic acceptable). */
  readonly bankName: string
  /** Convert extracted PDF text → canonical statement. */
  parse(extractedText: string): BgBankStatement
}

/**
 * Adapter the deployment plugs in to do the actual PDF→text extraction.
 * Returns the full document text (per-page strings joined with form-feed
 * `\f` so per-page reasoning is recoverable downstream).
 */
export type PdfTextExtractor = (bytes: Uint8Array) => Promise<string>

// ─── Parser helpers ──────────────────────────────────────────────────────
//
// Common parsing primitives every per-bank parser needs. Hoisted here so
// adding the next bank is shape-only — copy a parser, swap the column
// regexes, register it.

/**
 * Parse a BG-locale amount (`"1 234,56"` or `"1234.56"`) into minor units.
 * Returns NaN when the input doesn't match either format. Negative when
 * the input is wrapped in parens or starts with `-`.
 */
export function parseBgAmount(raw: string): number {
  const trimmed = raw.trim()
  if (!trimmed) return Number.NaN
  const negative = /^\(.*\)$/.test(trimmed) || trimmed.startsWith('-')
  const stripped = trimmed.replace(/[()]/g, '').replace(/^-/, '').replace(/\s+/g, '')
  // BG locale: comma as decimal separator. Accept dot too for interop.
  const normalised = stripped.includes(',') ? stripped.replace(/\./g, '').replace(',', '.') : stripped
  const value = Number(normalised)
  if (!Number.isFinite(value)) return Number.NaN
  const minor = Math.round(value * 100)
  return negative ? -minor : minor
}

/**
 * Parse a BG-format date (`"DD.MM.YYYY"`) to ISO-8601 `YYYY-MM-DD`.
 * Returns the empty string when the input doesn't match.
 */
export function parseBgDate(raw: string): string {
  const m = raw.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
  if (!m) return ''
  return `${m[3]}-${m[2]}-${m[1]}`
}

/**
 * Extract the first BG IBAN that appears in `text` (validated via
 * iso-13616 + the BG-22 shape check).
 */
export function extractBgIban(text: string): string | undefined {
  const candidates = text.match(/BG\d{2}[A-Z]{4}\d{6}[A-Z0-9]{8}/g) ?? []
  for (const c of candidates) {
    if (isBgIban(c)) return c
  }
  return undefined
}

// ─── Registry ────────────────────────────────────────────────────────────

const BG_BANK_PARSERS = new Map<string, BgBankStatementParser>()

/**
 * Register a per-bank parser. Idempotent — re-registering the same
 * `bankCode` replaces the existing entry (lets per-bank parsers ship
 * as separate modules that self-register on import).
 */
export function registerBgBankParser(parser: BgBankStatementParser): void {
  BG_BANK_PARSERS.set(parser.bankCode.toUpperCase(), parser)
}

/** Look up the parser for a SWIFT BIC. Returns undefined when unknown. */
export function getBgBankParser(bankCode: string): BgBankStatementParser | undefined {
  return BG_BANK_PARSERS.get(bankCode.toUpperCase())
}

/** Every registered parser — used by tests + the admin UI to surface coverage. */
export function listBgBankParsers(): ReadonlyArray<BgBankStatementParser> {
  return [...BG_BANK_PARSERS.values()]
}

// ─── Top-level dispatch ──────────────────────────────────────────────────

/**
 * Parse a BG bank-statement PDF end-to-end:
 *
 *   1. Run the deployment-supplied extractor on the bytes.
 *   2. Auto-detect the bank by SWIFT BIC scan in the first page (or
 *      use the explicit `bankCode` arg if the caller already knows).
 *   3. Dispatch to the registered per-bank parser.
 */
export async function parseBgBankStatementPdf(
  bytes: Uint8Array,
  extractor: PdfTextExtractor,
  options: { bankCode?: string } = {},
): Promise<BgBankStatement> {
  const text = await extractor(bytes)
  const bankCode = options.bankCode ?? detectBgBankCode(text)
  if (!bankCode) {
    throw new Error('BG bank-statement PDF: no SWIFT BIC detected — pass bankCode explicitly')
  }
  const parser = getBgBankParser(bankCode)
  if (!parser) {
    throw new Error(
      `BG bank-statement PDF: no parser registered for bank ${bankCode}. Known: ${listBgBankParsers().map((p) => p.bankCode).join(', ')}`,
    )
  }
  return parser.parse(text)
}

/**
 * Auto-detect the bank's SWIFT BIC by scanning for a known BG BIC token
 * in the text. Returns undefined when none of the registered parsers'
 * codes appear.
 */
export function detectBgBankCode(text: string): string | undefined {
  const upper = text.toUpperCase()
  for (const parser of BG_BANK_PARSERS.values()) {
    if (upper.includes(parser.bankCode.toUpperCase())) return parser.bankCode
  }
  return undefined
}
