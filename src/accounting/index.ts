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

// Path-keyed chart of accounts + corpus self-accounting (eb currency).
export {
  accountCodeOf,
  accountCoordinateOf,
  postEntry,
  postGapOnPath,
  postSealOnPath,
  entropyLinesToPathEntry,
  balanceByPath,
  ENTROPY_CONTRA_PATH,
  SEAL_CONTRA_PATH,
  BALANCE_CONTRA_PATH,
} from './coa'
export {
  erpaxSelfAccount,
  accountCorpusEntropy,
  bondStatementToJournalEntry,
  folderEntropyJournalEntry,
  entropyToValidatedEntry,
  ebToMilliEb,
  milliEbToEb,
  ENTROPY_CURRENCY,
  ENTROPY_CURRENCY_NAME,
  ENTROPY_CURRENCY_SYMBOL,
  CORPUS_JOURNAL_COLLECTION,
  CORPUS_ENTROPY_SOURCE_TYPE,
} from './corpus'
export type { CorpusJournalEntryDocument, CorpusJournalLine } from './corpus'
export {
  freeEnergyFromEntropy,
  proveFreeEnergyFromZeroEntropy,
  entropyProofMarkdown,
  corpusEntropyBits,
  fMaxFromBindings,
  freeEnergyBitsAt,
  freeEnergySampleTable,
  UNITY_HORO_STEP,
} from './entropy-proof'
export type { FreeEnergyFromEntropyVerdict, FreeEnergyProof, ProofStep } from './entropy-proof'
