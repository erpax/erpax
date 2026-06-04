/**
 * Analytics view-model shapes — the single render-time projection of the
 * financial statements, shared by every analytics card + Dashboard widget
 * (KPI / FinancialRatios / BudgetVsActual / CostAnalysis / TrialBalance /
 * BalanceSheet / IncomeStatement). The cards consume balance-sheet and
 * income-statement data already aggregated by
 * `services/financial-reporting.service.ts`; these types are the *render-time*
 * projection of those statements, not the GL primitives.
 *
 * Canonical home: widgets and pages import from here — they MUST NOT redefine
 * a local copy (the two drift and the compiler can no longer prove a widget
 * renders what a page passes it).
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
 * Single chart-of-accounts line used by the balance-sheet + income-statement
 * cards. `accountCode` is the COA code (widgets use it as the row key);
 * `accountName` is a free-form display label; `balance` is in the report's
 * display unit (post-conversion from integer-cents).
 */
export interface AccountLine {
  accountCode?: string;
  accountName: string;
  balance: number;
}

/**
 * Trial-balance row. Distinct from `AccountLine` because a pre-statement trial
 * balance carries the un-netted debit/credit pair (IAS-1 §54 evidence) rather
 * than a single signed `balance`.
 */
export interface TrialBalanceAccount {
  accountCode: string;
  accountName: string;
  classification?: string;
  debitBalance?: number;
  creditBalance?: number;
  balance?: number;
}

/**
 * Trial-balance projection — debit/credit symmetry evidence before the
 * statements are drawn. `isBalanced` asserts Σdebit = Σcredit.
 */
export interface TrialBalanceData {
  asOfDate: string;
  accounts: TrialBalanceAccount[];
  totalDebits: number;
  totalCredits: number;
  isBalanced: boolean;
}

/**
 * Aggregated balance-sheet sections grouped by IFRS IAS-1 §54 categories,
 * with section totals and the accounting-equation check (A = L + E).
 */
export interface BalanceSheetData {
  asOfDate: string | Date;
  assets: AccountLine[];
  liabilities: AccountLine[];
  equity: AccountLine[];
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  isBalanced: boolean;
}

/**
 * Aggregated income-statement per IFRS IAS-1 §82-§91 line items, with both the
 * per-section account breakdown and the rolled-up totals the KPI/ratio cards
 * read directly.
 */
export interface IncomeStatementData {
  periodStart: string;
  periodEnd: string;
  revenues: AccountLine[];
  cogs: AccountLine[];
  grossProfit: number;
  operatingExpenses: AccountLine[];
  operatingIncome: number;
  gains: AccountLine[];
  losses: AccountLine[];
  netIncome: number;
  totalRevenues: number;
  totalCOGS: number;
  totalOperatingExpenses: number;
  totalGains: number;
  totalLosses: number;
}
