/**
 * Financial Statement types — Trial Balance, Balance Sheet, Income Statement,
 * Cash Flow Statement, ratios.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time fiscal-period
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @compliance SOX §302 disclosure-controls
 * @see docs/STANDARDS.md §4.2
 */

export interface TrialBalanceAccount {
  code: string;
  name: string;
  debit: number;
  credit: number;
}

export interface TrialBalance {
  tenantId: string;
  reportDate: Date;
  accounts: TrialBalanceAccount[];
  totalDebits: number;
  totalCredits: number;
  balanced: boolean;
}

/**
 * Balance Sheet
 */
export interface BalanceSheetLine {
  code: string;
  name: string;
  amount: number;
  indent: number;
  isSubtotal: boolean;
}

export interface BalanceSheetSection {
  title: string;
  lines: BalanceSheetLine[];
  subtotal: number;
}

export interface BalanceSheet {
  tenantId: string;
  reportDate: Date;
  asOfDate: Date;

  assets: BalanceSheetSection;
  liabilities: BalanceSheetSection;
  equity: BalanceSheetSection;

  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;

  balanced: boolean; // Assets = Liabilities + Equity
}

/**
 * Income Statement
 */
export interface IncomeStatementLine {
  code: string;
  name: string;
  amount: number;
  indent: number;
  isSubtotal: boolean;
  percentage?: number; // % of revenue
}

export interface IncomeStatementSection {
  title: string;
  lines: IncomeStatementLine[];
  subtotal: number;
}

export interface IncomeStatement {
  tenantId: string;
  reportDate: Date;
  periodStart: Date;
  periodEnd: Date;

  revenue: IncomeStatementSection;
  costOfGoodsSold: IncomeStatementSection;
  grossProfit: number;
  grossMargin: number;

  operatingExpenses: IncomeStatementSection;
  operatingIncome: number;

  otherIncomeExpense: IncomeStatementSection;

  netIncome: number;
  netMargin: number;
}

/**
 * Cash Flow Statement
 */
export interface CashFlowActivity {
  description: string;
  amount: number;
}

export interface CashFlowSection {
  title: string;
  activities: CashFlowActivity[];
  netCashFlow: number;
}

export interface CashFlowStatement {
  tenantId: string;
  reportDate: Date;
  periodStart: Date;
  periodEnd: Date;

  operatingActivities: CashFlowSection;
  investingActivities: CashFlowSection;
  financingActivities: CashFlowSection;

  netChangeInCash: number;
  cashBeginningOfPeriod: number;
  cashEndOfPeriod: number;
}

/**
 * Financial Report Package
 */
export interface FinancialReportPackage {
  tenantId: string;
  reportDate: Date;
  periodStart: Date;
  periodEnd: Date;

  companyName: string;
  currency: string;

  trialBalance: TrialBalance;
  balanceSheet: BalanceSheet;
  incomeStatement: IncomeStatement;
  cashFlowStatement: CashFlowStatement;

  notes: string[];
  preparedBy: string;
  preparedAt: Date;
  approved: boolean;
}

/**
 * Financial Ratios
 */
export interface FinancialRatios {
  // Liquidity Ratios
  currentRatio: number;
  quickRatio: number;

  // Profitability Ratios
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  roe: number; // Return on Equity
  roa: number; // Return on Assets

  // Leverage Ratios
  debtToEquity: number;
  debtToAssets: number;

  // Efficiency Ratios
  assetTurnover: number;
  inventoryTurnover: number;
}

/**
 * Period Comparison
 */
export interface ComparativePeriodStatement {
  currentPeriod: number;
  previousPeriod: number;
  change: number;
  changePercent: number;
}

/**
 * Export Format
 */
export type StatementFormat = 'json' | 'csv' | 'pdf' | 'excel';

export interface StatementExport {
  format: StatementFormat;
  content: string | Buffer;
  fileName: string;
  contentType: string;
}
