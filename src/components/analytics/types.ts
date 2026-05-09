/**
 * Analytics view-model shapes — shared by KPI / FinancialRatios / BudgetVsActual /
 * CostAnalysis / Dashboard cards. The cards consume balance-sheet and
 * income-statement data already aggregated by `services/financial-reporting.service.ts`;
 * these types are the *render-time* projection of those statements, not the GL primitives.
 *
 * @standard ISO-4217:2015 currency-codes monetary-amount-display
 * @standard ISO-8601-1:2019 date-time as-of-date
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @quality ISO-25010 maintainability shared-vocabulary
 * @see docs/STANDARDS.md §4.1 §4.2
 * @see src/services/financial-reporting.service.ts
 */

/**
 * Single chart-of-accounts line used by every analytics card.
 * `accountName` is a free-form display label (not the COA code); `balance`
 * is in the report's display unit (post-conversion from integer-cents).
 */
export interface AccountLine {
  accountName: string;
  balance: number;
}

/**
 * Aggregated balance-sheet sections grouped by IFRS IAS-1 §54 categories.
 * Optional fields — empty arrays render as zero in the cards.
 */
export interface BalanceSheetData {
  asOfDate?: string | Date;
  assets?: AccountLine[];
  liabilities?: AccountLine[];
  equity?: AccountLine[];
}

/**
 * Aggregated income-statement totals per IFRS IAS-1 §82-§91 line items.
 * Card components access these directly (no further breakdown at render time).
 */
export interface IncomeStatementData {
  totalRevenues: number;
  totalCOGS: number;
  grossProfit: number;
  totalOperatingExpenses: number;
  operatingIncome: number;
  netIncome: number;
}

/**
 * Trial-balance projection used by the Dashboard widget.
 * Each row is one COA account; `code` and `name` are display-only.
 */
export interface TrialBalanceData {
  accounts?: Array<{ code: string; name: string; debit: number; credit: number }>;
}
