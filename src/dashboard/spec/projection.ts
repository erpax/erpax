/**
 * dashboard/spec/projection — the DTO → view-model adapter (the load-bearing seam).
 *
 * `src/accounting/reports.service.ts` returns DTOs shaped for an audit-file /
 * endpoint serialization (BalanceSheetDTO carries `assets: BalanceSheetSection
 * { accounts: TrialBalanceRow[] }`, etc.). The PURE widgets, by contract, consume
 * the render-time view-models from `@/analytics/types` (BalanceSheetData /
 * TrialBalanceData / IncomeStatementData — flat `AccountLine[]` + rolled totals).
 *
 * This projection runs in the Worker BEFORE serialization, so the client receives
 * exactly the shape the widget's prop type demands and the compiler still proves
 * widget-prop ⟷ page-data agreement (the law in `@/analytics/types`). It is the
 * ONLY place the DTO vocabulary meets the view-model vocabulary.
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @quality ISO-25010 maintainability shared-vocabulary
 * @see src/accounting/reports.service.ts  (the DTO source)
 * @see src/analytics/types.ts             (the view-model target)
 */

import type {
  BalanceSheetDTO,
  IncomeStatementDTO,
  TrialBalanceDTO,
  TrialBalanceRow,
} from '@/accounting'
import type {
  AccountLine,
  BalanceSheetData,
  IncomeStatementData,
  TrialBalanceData,
  TrialBalanceAccount,
} from '@/analytics'

/** One DTO ledger row → the flat `AccountLine` the BS/IS cards render. */
const toAccountLine = (r: TrialBalanceRow): AccountLine => ({
  accountCode: r.accountNumber,
  accountName: r.accountName,
  balance: r.balance,
})

/** One DTO ledger row → the un-netted debit/credit `TrialBalanceAccount`. */
const toTrialBalanceAccount = (r: TrialBalanceRow): TrialBalanceAccount => ({
  accountCode: r.accountNumber,
  accountName: r.accountName,
  classification: r.accountType,
  debitBalance: r.totalDebits,
  creditBalance: r.totalCredits,
  balance: r.balance,
})

/** TrialBalanceDTO → TrialBalanceData (the debit=credit evidence view-model). */
export function projectTrialBalance(dto: TrialBalanceDTO): TrialBalanceData {
  return {
    asOfDate: dto.asOfDate,
    accounts: dto.rows.map(toTrialBalanceAccount),
    totalDebits: dto.totalDebits,
    totalCredits: dto.totalCredits,
    isBalanced: dto.isBalanced,
  }
}

/** BalanceSheetDTO → BalanceSheetData (A = L + E sections, flat lines). */
export function projectBalanceSheet(dto: BalanceSheetDTO): BalanceSheetData {
  return {
    asOfDate: dto.asOfDate,
    assets: dto.assets.accounts.map(toAccountLine),
    liabilities: dto.liabilities.accounts.map(toAccountLine),
    equity: dto.equity.accounts.map(toAccountLine),
    totalAssets: dto.totalAssets,
    totalLiabilities: dto.liabilities.total,
    totalEquity: dto.equity.total,
    isBalanced: dto.isBalanced,
  }
}

/**
 * IncomeStatementDTO → IncomeStatementData. The DTO has the two top-level
 * sections (revenue / expenses); the richer view-model splits expenses into
 * COGS / operating / gains / losses. The reports.service only classifies
 * `revenue` and `expense` account types, so we map ALL expenses to
 * `operatingExpenses` (the honest projection — COGS/gains/losses stay empty
 * until the service distinguishes them) and derive grossProfit = revenue
 * (no separate COGS bucket yet) and operatingIncome = netIncome.
 */
export function projectIncomeStatement(dto: IncomeStatementDTO): IncomeStatementData {
  const revenues = dto.revenue.accounts.map(toAccountLine)
  const operatingExpenses = dto.expenses.accounts.map(toAccountLine)
  return {
    periodStart: dto.periodStart,
    periodEnd: dto.periodEnd,
    revenues,
    cogs: [],
    grossProfit: dto.totalRevenue,
    operatingExpenses,
    operatingIncome: dto.netIncome,
    gains: [],
    losses: [],
    netIncome: dto.netIncome,
    totalRevenues: dto.totalRevenue,
    totalCOGS: 0,
    totalOperatingExpenses: dto.totalExpenses,
    totalGains: 0,
    totalLosses: 0,
  }
}
