/**
 * accounting — the atom's public face (its content-uuid contract).
 *
 * The import convention ([[tamper]]/import) is: anything importing the accounting
 * atom reaches its INDEX (`@/accounting`), never a deep internal file
 * (`@/accounting/reports.service`, `@/accounting/financial-analysis`). This index
 * re-exports the surface the rest of the corpus consumes — the financial-report
 * generators + their DTO types (the dashboard's localApi DataSources) and the
 * `FinancialAnalysisEngine` (trend/ratio compute) — so callers seal against the
 * face instead of an internal, and a refactor inside a leaf cannot silently break
 * a far importer.
 *
 * @audit re-exports only; the truth lives in the leaf modules (debit-credit / reports.service / financial-analysis / margin)
 * @see ./reports.service -- ./financial-analysis -- ./SKILL.md
 */

// The financial-statement generators (the dashboard's localApi DataSources read these).
export {
  generateTrialBalance,
  generateBalanceSheet,
  generateIncomeStatement,
  generateARAgingReport,
  generateAPAgingReport,
} from './reports.service'

// The DTOs those generators return — the seam the dashboard projection adapts to view-models.
export type {
  TrialBalanceRow,
  TrialBalanceDTO,
  AgingReportDTO,
  BalanceSheetSection,
  BalanceSheetDTO,
  IncomeStatementDTO,
} from './reports.service'

// The trend / ratio analysis engine (the analytics cards + trend widget compose it).
export { FinancialAnalysisEngine } from './financial-analysis'
