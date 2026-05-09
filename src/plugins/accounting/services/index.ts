/**
 * Accounting plugin — services barrel.
 *
 * Service-generated DTOs that replace the retired report-shaped collections.
 * Pure functions over `gl-accounts` + `journal-entries`; no in-memory state,
 * no side effects. Designed to be served from custom Payload endpoints.
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @accounting US-GAAP ASC-310 receivables ar-aging
 * @accounting US-GAAP ASC-405 liabilities ap-aging
 * @audit ISO-19011:2018 audit-trail
 * @see ./reports.ts
 * @see docs/STANDARDS.md §4.2
 */

export {
  generateTrialBalance,
  generateBalanceSheet,
  generateIncomeStatement,
  generateARAgingReport,
  generateAPAgingReport,
  type TrialBalanceRow,
  type TrialBalanceDTO,
  type AgingReportDTO,
  type BalanceSheetSection,
  type BalanceSheetDTO,
  type IncomeStatementDTO,
} from './reports'
