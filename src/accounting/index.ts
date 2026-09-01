/**
 * accounting — the atom's public face (its content-uuid contract).
 *
 * The import convention ([[tamper]]/import) is: anything importing the accounting
 * atom reaches its INDEX (`@/accounting`), never a deep internal file
 * (`@/accounting/reports`, `@/accounting/analysis`). This index
 * re-exports the surface the rest of the corpus consumes — the financial-report
 * generators + their DTO types (the dashboard's localApi DataSources) and the
 * `FinancialAnalysisEngine` (trend/ratio compute) — so callers seal against the
 * face instead of an internal, and a refactor inside a leaf cannot silently break
 * a far importer.
 *
 * @audit re-exports only; the truth lives in nested leaf atoms (debit / reports / analysis / margin)
 * @see ./reports -- ./analysis -- ./SKILL.md
 */

// The financial-statement generators (the dashboard's localApi DataSources read these).
export {
  generateTrialBalance,
  generateBalanceSheet,
  generateIncomeStatement,
  generateARAgingReport,
  generateAPAgingReport,
} from './reports'

// The DTOs those generators return — the seam the dashboard projection adapts to view-models.
export type {
  TrialBalanceRow,
  TrialBalanceDTO,
  AgingReportDTO,
  BalanceSheetSection,
  BalanceSheetDTO,
  IncomeStatementDTO,
} from './reports'

// The trend / ratio analysis engine (the analytics cards + trend widget compose it).
export { FinancialAnalysisEngine } from './analysis'

// Debit/credit lattice — journal hooks and reconciliation services reach the face, not the leaf.
export {
  AccountingEntryBuilder,
  AccountQueries,
  DebitCreditLogic,
  StandardTransactions,
} from './debit'
export type {
  AccountType,
  DebitCreditRule,
  JournalEntryLine,
  ValidatedEntry,
} from './debit'

// Corpus SELF-accounting lives at its child-atom faces — `@/accounting/coa`
// (eb-currency path ledger), `@/accounting/corpus` (journal projection), and
// `@/accounting/gaps` (wave-batch entropy scan) — the rules registry's own
// nesting. The mountable domain face re-exports none of it: a host app has no
// corpus to scan, and these edges pinned readme/compute plus the 4MB generated
// UUID matrix into every accounting bundle.

/*
 * NOT re-exported here: this atom is a published package face, and a barrel that
 * re-exports a child drags that child into every consumer's closure. The
 * index-cross wiring added those lines and blew the package's closure ratchet;
 * the ceiling is a CONSUMER-facing property, so it wins over an internal wiring
 * count. Reach these children at `@/<atom>/<child>` instead.
 */
