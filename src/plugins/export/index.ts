/**
 * @erpax/export — export & reporting infrastructure.
 *
 * Producers: PDF (Puppeteer / ISO 32000), Excel (ExcelJS / ISO/IEC 29500
 * Office Open XML), CSV (RFC 4180), and tax-authority audit files (OECD
 * SAF-T 2.0). Master citation index for `pdf`, `excel`, `statements`,
 * `statements-cents-aware`, `seeds`, `api`, `types`.
 *
 * @standard ISO-32000-2:2020 pdf
 * @standard ISO/IEC-29500:2016 office-open-xml xlsx
 * @standard ISO/IEC-26300 odf legacy-target
 * @standard EN-16931:2017 semantic-data-model-electronic-invoice
 * @standard Peppol-BIS-3.0 billing
 * @standard UBL-2.1 universal-business-language
 * @accounting OECD SAF-T 2.0 standard-audit-file-tax
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @rfc 4180 csv
 * @rfc 6838 mime-type
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §302 disclosure-controls
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2
 */

export { PDFExporter } from './pdf'
export { ExcelExporter } from './excel'
export {
  FinancialStatementGenerator,
  BalanceSheetGenerator,
  IncomeStatementGenerator,
  CashFlowStatementGenerator,
} from './statements'

export type {
  ExportFormat,
  ExportOptions,
  FinancialStatement,
  StatementRow,
  StatementSection,
} from './types'

// Standards-bearing wire-format exporters (saf-t / peppol / edifact / iso20022).
export { exportStandards, mimeTypeFor } from './standards-export'
export type {
  StandardsExportFormat,
  StandardsExportRequest,
  StandardsExportResult,
} from './standards-export'

// Standards-bearing wire-format importers (camt.053 → Camt053Statement[]).
export { importStandards } from './standards-import'
export type {
  StandardsImportFormat,
  StandardsImportRequest,
  StandardsImportResult,
} from './standards-import'
