/**
 * BG bank-statement PDF parsers — barrel that imports every per-bank
 * parser, triggering their `registerBgBankParser` self-registration on
 * module load.
 *
 * Adding a new BG bank: drop a file under this folder following the
 * `unicredit-bulbank.ts` / `fibank.ts` pattern, then add it to the
 * import list below. Auto-registration via the side effect keeps the
 * dispatch surface (`getBgBankParser` / `parseBgBankStatementPdf`)
 * decoupled from the parser modules.
 *
 * @standard ISO-3166-1:2020 BG country-code
 * @audit ISO-19011:2018 audit-trail bank-statement-evidence
 * @see ../bg-bank-statement-pdf.ts
 */

import './unicredit-bulbank'
import './fibank'

// Re-export types for ergonomic consumption alongside the registry.
export type {
  BgBankStatement,
  BgBankStatementRow,
  BgBankStatementParser,
  PdfTextExtractor,
} from '@/services/country-clients/bg-bank-statement-pdf'
export {
  parseBgBankStatementPdf,
  detectBgBankCode,
  getBgBankParser,
  listBgBankParsers,
  registerBgBankParser,
  parseBgAmount,
  parseBgDate,
  extractBgIban,
} from '@/services/country-clients/bg-bank-statement-pdf'
