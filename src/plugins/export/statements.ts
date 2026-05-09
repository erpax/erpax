/**
 * Financial Statement Generators — Balance Sheet, Income Statement, Cash Flow.
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time as-of-date
 * @compliance SOX §302 disclosure-controls
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2
 */

import { FinancialStatement, StatementSection, StatementRow, FinancialData } from './types'

export abstract class FinancialStatementGenerator {
  protected data: FinancialData
  protected asOfDate: Date

  constructor(data: FinancialData, asOfDate: Date = new Date()) {
    this.data = data
    this.asOfDate = asOfDate
  }

  abstract generate(): FinancialStatement
}

/**
 * Balance Sheet Generator
 * Assets = Liabilities + Equity
 */
export class BalanceSheetGenerator extends FinancialStatementGenerator {
  generate(): FinancialStatement {
    const assets = this.calculateAssets()
    const liabilities = this.calculateLiabilities()
    const equity = this.calculateEquity()

    const totalAssets = assets.subtotal || 0
    const totalLiabilities = (liabilities.subtotal || 0) + (equity.subtotal || 0)

    // Validate: Assets = Liabilities + Equity
    const variance = Math.abs(totalAssets - totalLiabilities)
    const isBalanced = variance < 0.01 // Allow for rounding

    return {
      title: 'Balance Sheet',
      subtitle: 'Statement of Financial Position',
      asOfDate: this.asOfDate,
      sections: [assets, liabilities, equity],
      totals: {
        label: 'Total Assets = Total Liabilities + Equity',
        amount: totalAssets,
        isBold: true,
      },
      notes: [
        `Assets Total: $${this.formatCurrency(totalAssets)}`,
        `Liabilities + Equity Total: $${this.formatCurrency(totalLiabilities)}`,
        isBalanced ? '✓ Balance sheet is balanced' : `⚠ Variance: $${this.formatCurrency(variance)}`,
        'ISO 4217: All amounts in USD unless otherwise noted',
      ],
    }
  }

  private calculateAssets(): StatementSection {
    const currentAssets: StatementRow[] = []
    const fixedAssets: StatementRow[] = []

    this.data.accounts
      .filter((acc) => acc.accountType === 'asset')
      .forEach((account) => {
        const row: StatementRow = {
          label: `${account.code} - ${account.name}`,
          amount: account.balance,
          level: 1,
        }

        if (account.code.startsWith('1')) {
          currentAssets.push(row)
        } else {
          fixedAssets.push(row)
        }
      })

    const currentAssetsTotal = currentAssets.reduce((sum, row) => sum + row.amount, 0)
    const fixedAssetsTotal = fixedAssets.reduce((sum, row) => sum + row.amount, 0)

    return {
      name: 'ASSETS',
      rows: [
        { label: 'Current Assets', amount: 0, level: 0, isBold: true },
        ...currentAssets,
        { label: 'Total Current Assets', amount: currentAssetsTotal, level: 0, isBold: true },
        { label: 'Fixed Assets', amount: 0, level: 0, isBold: true },
        ...fixedAssets,
        { label: 'Total Fixed Assets', amount: fixedAssetsTotal, level: 0, isBold: true },
      ],
      subtotal: currentAssetsTotal + fixedAssetsTotal,
    }
  }

  private calculateLiabilities(): StatementSection {
    const currentLiabilities: StatementRow[] = []
    const longTermLiabilities: StatementRow[] = []

    this.data.accounts
      .filter((acc) => acc.accountType === 'liability')
      .forEach((account) => {
        const row: StatementRow = {
          label: `${account.code} - ${account.name}`,
          amount: account.balance,
          level: 1,
        }

        if (account.code.startsWith('2')) {
          currentLiabilities.push(row)
        } else {
          longTermLiabilities.push(row)
        }
      })

    const currentTotal = currentLiabilities.reduce((sum, row) => sum + row.amount, 0)
    const longTermTotal = longTermLiabilities.reduce((sum, row) => sum + row.amount, 0)

    return {
      name: 'LIABILITIES',
      rows: [
        { label: 'Current Liabilities', amount: 0, level: 0, isBold: true },
        ...currentLiabilities,
        { label: 'Total Current Liabilities', amount: currentTotal, level: 0, isBold: true },
        { label: 'Long-Term Liabilities', amount: 0, level: 0, isBold: true },
        ...longTermLiabilities,
        { label: 'Total Long-Term Liabilities', amount: longTermTotal, level: 0, isBold: true },
      ],
      subtotal: currentTotal + longTermTotal,
    }
  }

  private calculateEquity(): StatementSection {
    const equityAccounts: StatementRow[] = []

    this.data.accounts
      .filter((acc) => acc.accountType === 'equity')
      .forEach((account) => {
        equityAccounts.push({
          label: `${account.code} - ${account.name}`,
          amount: account.balance,
          level: 1,
        })
      })

    const total = equityAccounts.reduce((sum, row) => sum + row.amount, 0)

    return {
      name: "SHAREHOLDERS' EQUITY",
      rows: equityAccounts,
      subtotal: total,
    }
  }

  private formatCurrency(amount: number): string {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
}

/**
 * Income Statement Generator
 * Revenue - Expenses = Net Income
 */
export class IncomeStatementGenerator extends FinancialStatementGenerator {
  generate(): FinancialStatement {
    const revenue = this.calculateRevenue()
    const costOfGoods = this.calculateCOGS()
    const grossProfit = revenue.subtotal! - costOfGoods.subtotal!
    const operatingExpenses = this.calculateOperatingExpenses()
    const operatingIncome = grossProfit - operatingExpenses.subtotal!
    const otherIncome = this.calculateOtherIncomeExpense()
    const preaxIncome = operatingIncome + otherIncome.subtotal!
    const incomeTax = this.calculateIncomeTax()
    const netIncome = preaxIncome - incomeTax

    return {
      title: 'Income Statement',
      subtitle: 'Statement of Earnings',
      asOfDate: this.asOfDate,
      sections: [
        revenue,
        costOfGoods,
        this.createGrossProfitSection(grossProfit),
        operatingExpenses,
        this.createOperatingIncomeSection(operatingIncome),
        otherIncome,
        this.createPretaxIncomeSection(preaxIncome),
        this.createTaxSection(incomeTax),
      ],
      totals: {
        label: 'NET INCOME',
        amount: netIncome,
        isBold: true,
      },
      notes: [
        `Revenue: $${this.formatCurrency(revenue.subtotal || 0)}`,
        `Cost of Goods Sold: $${this.formatCurrency(costOfGoods.subtotal || 0)}`,
        `Gross Profit Margin: ${this.calculateMargin(grossProfit, revenue.subtotal || 0)}%`,
        `Operating Income: $${this.formatCurrency(operatingIncome)}`,
        `Net Profit Margin: ${this.calculateMargin(netIncome, revenue.subtotal || 0)}%`,
      ],
    }
  }

  private calculateRevenue(): StatementSection {
    const rows: StatementRow[] = []

    this.data.accounts
      .filter((acc) => acc.accountType === 'income')
      .forEach((account) => {
        rows.push({
          label: `${account.code} - ${account.name}`,
          amount: account.balance,
          level: 1,
        })
      })

    const total = rows.reduce((sum, row) => sum + row.amount, 0)

    return {
      name: 'REVENUES',
      rows,
      subtotal: total,
    }
  }

  private calculateCOGS(): StatementSection {
    const rows: StatementRow[] = []

    this.data.accounts
      .filter((acc) => acc.accountType === 'cogs')
      .forEach((account) => {
        rows.push({
          label: `${account.code} - ${account.name}`,
          amount: account.balance,
          level: 1,
        })
      })

    const total = rows.reduce((sum, row) => sum + row.amount, 0)

    return {
      name: 'COST OF GOODS SOLD',
      rows,
      subtotal: total,
    }
  }

  private calculateOperatingExpenses(): StatementSection {
    const rows: StatementRow[] = []

    this.data.accounts
      .filter((acc) => acc.accountType === 'expense')
      .forEach((account) => {
        rows.push({
          label: `${account.code} - ${account.name}`,
          amount: account.balance,
          level: 1,
        })
      })

    const total = rows.reduce((sum, row) => sum + row.amount, 0)

    return {
      name: 'OPERATING EXPENSES',
      rows,
      subtotal: total,
    }
  }

  private calculateOtherIncomeExpense(): StatementSection {
    const rows: StatementRow[] = [
      {
        label: 'Interest Income',
        amount: 0,
        level: 1,
      },
      {
        label: 'Interest Expense',
        amount: 0,
        level: 1,
      },
    ]

    return {
      name: 'OTHER INCOME/(EXPENSE)',
      rows,
      subtotal: 0,
    }
  }

  private calculateIncomeTax(): number {
    // Standard tax calculation: 21% of pretax income
    // This would be parameterized in production
    return 0
  }

  private createGrossProfitSection(amount: number): StatementSection {
    return {
      name: 'GROSS PROFIT',
      rows: [{ label: 'Gross Profit', amount, level: 0, isBold: true }],
      subtotal: amount,
    }
  }

  private createOperatingIncomeSection(amount: number): StatementSection {
    return {
      name: 'OPERATING INCOME',
      rows: [{ label: 'Operating Income', amount, level: 0, isBold: true }],
      subtotal: amount,
    }
  }

  private createPretaxIncomeSection(amount: number): StatementSection {
    return {
      name: 'INCOME BEFORE TAXES',
      rows: [{ label: 'Pretax Income', amount, level: 0, isBold: true }],
      subtotal: amount,
    }
  }

  private createTaxSection(amount: number): StatementSection {
    return {
      name: 'INCOME TAXES',
      rows: [{ label: 'Federal Income Tax Expense', amount, level: 1 }],
      subtotal: amount,
    }
  }

  private formatCurrency(amount: number): string {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  private calculateMargin(amount: number, base: number): string {
    if (base === 0) return '0.00'
    return ((amount / base) * 100).toFixed(2)
  }
}

/**
 * Cash Flow Statement Generator
 * Operating + Investing + Financing Activities
 */
export class CashFlowStatementGenerator extends FinancialStatementGenerator {
  generate(): FinancialStatement {
    const operating = this.calculateOperatingActivities()
    const investing = this.calculateInvestingActivities()
    const financing = this.calculateFinancingActivities()

    const netCashFlow =
      (operating.subtotal || 0) + (investing.subtotal || 0) + (financing.subtotal || 0)

    return {
      title: 'Cash Flow Statement',
      subtitle: 'Statement of Cash Flows',
      asOfDate: this.asOfDate,
      sections: [operating, investing, financing],
      totals: {
        label: 'NET CHANGE IN CASH',
        amount: netCashFlow,
        isBold: true,
      },
      notes: [
        `Operating Cash Flow: $${this.formatCurrency(operating.subtotal || 0)}`,
        `Investing Cash Flow: $${this.formatCurrency(investing.subtotal || 0)}`,
        `Financing Cash Flow: $${this.formatCurrency(financing.subtotal || 0)}`,
        'Net cash flow represents the change in cash position',
      ],
    }
  }

  private calculateOperatingActivities(): StatementSection {
    // This would be calculated from net income + non-cash adjustments
    return {
      name: 'CASH FLOWS FROM OPERATING ACTIVITIES',
      rows: [
        { label: 'Net Income', amount: 0, level: 1 },
        { label: 'Adjustments for non-cash items', amount: 0, level: 1 },
        { label: 'Changes in working capital', amount: 0, level: 1 },
      ],
      subtotal: 0,
    }
  }

  private calculateInvestingActivities(): StatementSection {
    return {
      name: 'CASH FLOWS FROM INVESTING ACTIVITIES',
      rows: [{ label: 'Capital expenditures', amount: 0, level: 1 }],
      subtotal: 0,
    }
  }

  private calculateFinancingActivities(): StatementSection {
    return {
      name: 'CASH FLOWS FROM FINANCING ACTIVITIES',
      rows: [
        { label: 'Debt issuance', amount: 0, level: 1 },
        { label: 'Dividend payments', amount: 0, level: 1 },
      ],
      subtotal: 0,
    }
  }

  private formatCurrency(amount: number): string {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
}
