/**
 * Financial Reporting Service — generate TB / BS / IS / CF statements.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time fiscal-period
 * @standard BCP-47 language-tag i18n
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §302 disclosure-controls
 * @see docs/STANDARDS.md §4.2
 */

import {
  TrialBalance,
  TrialBalanceAccount,
  BalanceSheet,
  BalanceSheetLine,
  IncomeStatement,
  IncomeStatementLine,
  CashFlowStatement,
  FinancialReportPackage,
  FinancialRatios,
} from '@/types/financial-statements';
import { journalEntryService, type JournalEntryBalance } from '@/journal/entry/service';
import { DebitCreditLogic } from '@/accounting/debit-credit';

/**
 * GL balance bucket — the canonical JournalEntryBalance (accountId, debit, credit,
 * balance, normalBalance, accountType) produced by journalEntryService.getTrialBalance.
 */

/**
 * Report-section labels. Only 5 are actually consumed by the service.
 * Full multilingual rendering happens at the consumer layer through next-intl
 * + `src/i18n/messages/*.json`. If you add a non-English render path here,
 * source the strings from there instead of growing this dict.
 */
const REPORT_LABELS = {
  generatingReport: 'Generating financial report from',
  trialBalance: 'Trial Balance',
  balanceSheet: 'Balance Sheet',
  incomeStatement: 'Income Statement',
  cashFlowStatement: 'Cash Flow Statement',
} as const

/** Locale codes the report layer is willing to receive. Render-time-only — */
/** the actual translation tables live in `src/i18n/messages/*.json`. */
export type ReportLanguage =
  | 'en' | 'bg' | 'cs' | 'da' | 'de' | 'el' | 'es' | 'et' | 'fi' | 'fr'
  | 'ga' | 'hr' | 'hu' | 'is' | 'it' | 'ja' | 'lt' | 'lv' | 'mt' | 'nb'
  | 'nl' | 'pl' | 'pt' | 'ro' | 'ru' | 'sk' | 'sl' | 'sv' | 'uk' | 'ar'

interface _GLBalance {
  code: string;
  name: string;
  type: string;
  debit: number;
  credit: number;
  normalBalance: 'debit' | 'credit';
}

class FinancialReportingService {
  private currentLanguage: ReportLanguage = 'en';

  /** Set the locale for report generation. */
  setLanguage(language: ReportLanguage): void {
    this.currentLanguage = language;
  }

  /** Get the active report locale. */
  getLanguage(): ReportLanguage {
    return this.currentLanguage;
  }

  /**
   * Generate complete financial report package
   */
  async generateFinancialReports(
    tenantId: string,
    periodStart: Date,
    periodEnd: Date,
    companyName: string,
    currency: string = 'EUR',
    userId: string = 'system',
    language: ReportLanguage = 'en'
  ): Promise<FinancialReportPackage> {
    this.setLanguage(language);
    console.log(`\n${REPORT_LABELS.generatingReport} ${periodStart.toDateString()} to ${periodEnd.toDateString()}...\n`);

    // Get GL balances
    const balances = await journalEntryService.getTrialBalance(tenantId, periodStart, periodEnd);

    // Generate each statement
    const trialBalance = await this.generateTrialBalance(tenantId, periodEnd, balances);
    const balanceSheet = await this.generateBalanceSheet(tenantId, periodEnd, balances);
    const incomeStatement = await this.generateIncomeStatement(
      tenantId,
      periodStart,
      periodEnd,
      balances
    );
    const cashFlowStatement = await this.generateCashFlowStatement(
      tenantId,
      periodStart,
      periodEnd,
      balances
    );

    console.log(`✓ ${REPORT_LABELS.trialBalance} generated`);
    console.log(`✓ ${REPORT_LABELS.balanceSheet} generated`);
    console.log(`✓ ${REPORT_LABELS.incomeStatement} generated`);
    console.log(`✓ ${REPORT_LABELS.cashFlowStatement} generated\n`);

    return {
      tenantId,
      reportDate: new Date(),
      periodStart,
      periodEnd,
      companyName,
      currency,
      trialBalance,
      balanceSheet,
      incomeStatement,
      cashFlowStatement,
      notes: [],
      preparedBy: userId,
      preparedAt: new Date(),
      approved: false,
    };
  }

  /**
   * Generate Trial Balance
   */
  private async generateTrialBalance(
    tenantId: string,
    reportDate: Date,
    balances: Map<string, JournalEntryBalance>
  ): Promise<TrialBalance> {
    const accounts: TrialBalanceAccount[] = [];
    let totalDebits = 0;
    let totalCredits = 0;

    // Convert GL balances to trial balance accounts
    for (const [accountId, balance] of balances) {
      const debit = balance.debit || 0;
      const credit = balance.credit || 0;

      if (debit > 0 || credit > 0) {
        accounts.push({
          code: accountId,
          name: accountId, // TODO: Get actual account name from GL service
          debit,
          credit,
        });

        totalDebits += debit;
        totalCredits += credit;
      }
    }

    // Sort by code
    accounts.sort((a, b) => a.code.localeCompare(b.code));

    const balanced = Math.abs(totalDebits - totalCredits) < 0.01;

    return {
      tenantId,
      reportDate,
      accounts,
      totalDebits,
      totalCredits,
      balanced,
    };
  }

  /**
   * Generate Balance Sheet
   */
  private async generateBalanceSheet(
    tenantId: string,
    reportDate: Date,
    balances: Map<string, JournalEntryBalance>
  ): Promise<BalanceSheet> {
    // Categorize accounts by type
    const assets: BalanceSheetLine[] = [];
    const liabilities: BalanceSheetLine[] = [];
    const equity: BalanceSheetLine[] = [];

    let totalAssets = 0;
    let totalLiabilities = 0;
    let totalEquity = 0;

    for (const [accountId, balance] of balances) {
      // Use canonical DebitCreditLogic to compute normal-side balance.
      // 'asset' is debit-normal; 'liability' is credit-normal — pick whichever
      // matches the row's declared normalBalance and let the canonical math win.
      const amount = DebitCreditLogic.getBalance(
        balance.normalBalance === 'debit' ? 'asset' : 'liability',
        balance.debit || 0,
        balance.credit || 0,
      );

      if (amount === 0) continue;

      const line: BalanceSheetLine = {
        code: accountId,
        name: accountId, // TODO: Get actual name
        amount,
        indent: 1,
        isSubtotal: false,
      };

      // Classify by account code prefix
      if (accountId.startsWith('1')) {
        // Assets
        assets.push(line);
        totalAssets += amount;
      } else if (accountId.startsWith('2')) {
        // Liabilities
        liabilities.push(line);
        totalLiabilities += amount;
      } else if (accountId.startsWith('3')) {
        // Equity
        equity.push(line);
        totalEquity += amount;
      }
    }

    // Add subtotals
    assets.push({
      code: 'TOTAL_ASSETS',
      name: 'TOTAL ASSETS',
      amount: totalAssets,
      indent: 0,
      isSubtotal: true,
    });

    liabilities.push({
      code: 'TOTAL_LIABILITIES',
      name: 'TOTAL LIABILITIES',
      amount: totalLiabilities,
      indent: 0,
      isSubtotal: true,
    });

    equity.push({
      code: 'TOTAL_EQUITY',
      name: 'TOTAL EQUITY',
      amount: totalEquity,
      indent: 0,
      isSubtotal: true,
    });

    const balanced = Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 0.01;

    return {
      tenantId,
      reportDate,
      asOfDate: reportDate,
      assets: {
        title: 'ASSETS',
        lines: assets,
        subtotal: totalAssets,
      },
      liabilities: {
        title: 'LIABILITIES',
        lines: liabilities,
        subtotal: totalLiabilities,
      },
      equity: {
        title: 'EQUITY',
        lines: equity,
        subtotal: totalEquity,
      },
      totalAssets,
      totalLiabilities,
      totalEquity,
      balanced,
    };
  }

  /**
   * Generate Income Statement
   */
  private async generateIncomeStatement(
    tenantId: string,
    periodStart: Date,
    periodEnd: Date,
    balances: Map<string, JournalEntryBalance>
  ): Promise<IncomeStatement> {
    const revenue: IncomeStatementLine[] = [];
    const cogs: IncomeStatementLine[] = [];
    const expenses: IncomeStatementLine[] = [];
    const otherIncome: IncomeStatementLine[] = [];

    let totalRevenue = 0;
    let totalCOGS = 0;
    let totalExpenses = 0;
    let totalOtherIncome = 0;

    for (const [accountId, balance] of balances) {
      const amount = Math.abs(balance.debit || 0) + Math.abs(balance.credit || 0);
      if (amount === 0) continue;

      const line: IncomeStatementLine = {
        code: accountId,
        name: accountId,
        amount,
        indent: 1,
        isSubtotal: false,
      };

      if (accountId.startsWith('4')) {
        // Revenue
        revenue.push(line);
        totalRevenue += amount;
      } else if (accountId.startsWith('5')) {
        // COGS
        cogs.push(line);
        totalCOGS += amount;
      } else if (accountId.startsWith('6') || accountId.startsWith('7')) {
        // Expenses
        expenses.push(line);
        totalExpenses += amount;
      } else if (accountId.startsWith('8')) {
        // Other income
        otherIncome.push(line);
        totalOtherIncome += amount;
      }
    }

    const grossProfit = totalRevenue - totalCOGS;
    const operatingIncome = grossProfit - totalExpenses;
    const netIncome = operatingIncome + totalOtherIncome;

    const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
    const netMargin = totalRevenue > 0 ? (netIncome / totalRevenue) * 100 : 0;

    // Add revenue percentage
    for (const line of revenue) {
      line.percentage = totalRevenue > 0 ? (line.amount / totalRevenue) * 100 : 0;
    }

    revenue.push({
      code: 'TOTAL_REVENUE',
      name: 'TOTAL REVENUE',
      amount: totalRevenue,
      indent: 0,
      isSubtotal: true,
    });

    cogs.push({
      code: 'TOTAL_COGS',
      name: 'TOTAL COST OF GOODS SOLD',
      amount: totalCOGS,
      indent: 0,
      isSubtotal: true,
    });

    expenses.push({
      code: 'TOTAL_EXPENSES',
      name: 'TOTAL OPERATING EXPENSES',
      amount: totalExpenses,
      indent: 0,
      isSubtotal: true,
    });

    return {
      tenantId,
      reportDate: new Date(),
      periodStart,
      periodEnd,
      revenue: {
        title: 'REVENUE',
        lines: revenue,
        subtotal: totalRevenue,
      },
      costOfGoodsSold: {
        title: 'COST OF GOODS SOLD',
        lines: cogs,
        subtotal: totalCOGS,
      },
      grossProfit,
      grossMargin,
      operatingExpenses: {
        title: 'OPERATING EXPENSES',
        lines: expenses,
        subtotal: totalExpenses,
      },
      operatingIncome,
      otherIncomeExpense: {
        title: 'OTHER INCOME/(EXPENSE)',
        lines: otherIncome,
        subtotal: totalOtherIncome,
      },
      netIncome,
      netMargin,
    };
  }

  /**
   * Generate Cash Flow Statement
   */
  private async generateCashFlowStatement(
    tenantId: string,
    periodStart: Date,
    periodEnd: Date,
    balances: Map<string, JournalEntryBalance>
  ): Promise<CashFlowStatement> {
    // Simplified indirect method
    const incomeStatement = await this.generateIncomeStatement(
      tenantId,
      periodStart,
      periodEnd,
      balances
    );

    let operatingCashFlow = incomeStatement.netIncome;

    // Adjust for non-cash items (simplified)
    // In production, would parse actual GL entries
    const adjustments = 0;
    operatingCashFlow += adjustments;

    const investingCashFlow = -100000; // Placeholder: asset purchases
    const financingCashFlow = 50000; // Placeholder: debt payments

    const netChangeInCash = operatingCashFlow + investingCashFlow + financingCashFlow;

    return {
      tenantId,
      reportDate: new Date(),
      periodStart,
      periodEnd,
      operatingActivities: {
        title: 'Operating Activities',
        activities: [
          { description: 'Net Income', amount: incomeStatement.netIncome },
          { description: 'Adjustments', amount: adjustments },
        ],
        netCashFlow: operatingCashFlow,
      },
      investingActivities: {
        title: 'Investing Activities',
        activities: [
          { description: 'Asset Purchases', amount: investingCashFlow },
        ],
        netCashFlow: investingCashFlow,
      },
      financingActivities: {
        title: 'Financing Activities',
        activities: [
          { description: 'Debt Repayment', amount: -financingCashFlow },
        ],
        netCashFlow: financingCashFlow,
      },
      netChangeInCash,
      cashBeginningOfPeriod: 100000, // Placeholder
      cashEndOfPeriod: 100000 + netChangeInCash,
    };
  }

  /**
   * Calculate financial ratios
   */
  calculateRatios(balanceSheet: BalanceSheet, incomeStatement: IncomeStatement): FinancialRatios {
    // Liquidity Ratios
    const currentAssets = balanceSheet.totalAssets * 0.4; // Simplified
    const currentLiabilities = balanceSheet.totalLiabilities * 0.6; // Simplified
    const currentRatio = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
    const quickRatio = Math.max(0, (currentAssets - 0.2 * balanceSheet.totalAssets) / currentLiabilities);

    // Profitability Ratios
    const grossMargin = incomeStatement.grossMargin;
    const operatingMargin = balanceSheet.totalAssets > 0
      ? (incomeStatement.operatingIncome / incomeStatement.revenue.subtotal) * 100
      : 0;
    const netMargin = incomeStatement.netMargin;
    const roe = balanceSheet.totalEquity > 0
      ? (incomeStatement.netIncome / balanceSheet.totalEquity) * 100
      : 0;
    const roa = balanceSheet.totalAssets > 0
      ? (incomeStatement.netIncome / balanceSheet.totalAssets) * 100
      : 0;

    // Leverage Ratios
    const debtToEquity = balanceSheet.totalEquity > 0
      ? balanceSheet.totalLiabilities / balanceSheet.totalEquity
      : 0;
    const debtToAssets = balanceSheet.totalAssets > 0
      ? balanceSheet.totalLiabilities / balanceSheet.totalAssets
      : 0;

    // Efficiency Ratios
    const assetTurnover = balanceSheet.totalAssets > 0
      ? incomeStatement.revenue.subtotal / balanceSheet.totalAssets
      : 0;
    const inventoryTurnover = 0; // Would need inventory data

    return {
      currentRatio,
      quickRatio,
      grossMargin,
      operatingMargin,
      netMargin,
      roe,
      roa,
      debtToEquity,
      debtToAssets,
      assetTurnover,
      inventoryTurnover,
    };
  }

  /**
   * Export statement as JSON
   */
  exportAsJSON(report: FinancialReportPackage): string {
    return JSON.stringify(report, null, 2);
  }

  /**
   * Export statement as CSV (simplified)
   */
  exportAsCSV(report: FinancialReportPackage): string {
    const lines: string[] = [];

    lines.push(`${report.companyName}`);
    lines.push(`Financial Statements for Period ${report.periodStart.toDateString()} to ${report.periodEnd.toDateString()}`);
    lines.push('');

    // Trial Balance
    lines.push('TRIAL BALANCE');
    lines.push('Code,Name,Debit,Credit');
    for (const account of report.trialBalance.accounts) {
      lines.push(`${account.code},${account.name},${account.debit},${account.credit}`);
    }
    lines.push(`Totals,${report.trialBalance.totalDebits},${report.trialBalance.totalCredits}`);
    lines.push('');

    // Balance Sheet
    lines.push('BALANCE SHEET');
    lines.push('ASSETS');
    for (const line of report.balanceSheet.assets.lines) {
      lines.push(`${line.name},${line.amount}`);
    }
    lines.push('');
    lines.push('LIABILITIES');
    for (const line of report.balanceSheet.liabilities.lines) {
      lines.push(`${line.name},${line.amount}`);
    }
    lines.push('');
    lines.push('EQUITY');
    for (const line of report.balanceSheet.equity.lines) {
      lines.push(`${line.name},${line.amount}`);
    }
    lines.push('');

    // Income Statement
    lines.push('INCOME STATEMENT');
    lines.push('REVENUE');
    for (const line of report.incomeStatement.revenue.lines) {
      lines.push(`${line.name},${line.amount}`);
    }
    lines.push('');

    return lines.join('\n');
  }
}

export const financialReportingService = new FinancialReportingService();
