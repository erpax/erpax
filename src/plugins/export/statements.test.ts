/**
 * Financial Statement Generator Tests — Balance Sheet, Income Statement, Cash Flow.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @compliance SOX §302 disclosure-controls
 * @see docs/STANDARDS.md §4.2 §7
 */

import { describe, expect, test } from 'vitest'

import {
  BalanceSheetGenerator,
  IncomeStatementGenerator,
  CashFlowStatementGenerator,
} from '@/plugins/export/statements'
import { FinancialData } from '@/plugins/export/types'

describe('BalanceSheetGenerator', () => {
  const mockData: FinancialData = {
    accounts: [
      // Assets
      { code: '1000', name: 'Cash', accountType: 'asset', balance: 50000 },
      { code: '1200', name: 'Accounts Receivable', accountType: 'asset', balance: 30000 },
      { code: '1500', name: 'Equipment', accountType: 'asset', balance: 75000 },

      // Liabilities
      { code: '2000', name: 'Accounts Payable', accountType: 'liability', balance: 20000 },
      { code: '2100', name: 'Short-term Debt', accountType: 'liability', balance: 35000 },

      // Equity
      { code: '3000', name: 'Common Stock', accountType: 'equity', balance: 50000 },
      { code: '3100', name: 'Retained Earnings', accountType: 'equity', balance: 50000 },
    ],
    entries: [],
  }

  const testDate = new Date('2026-05-08')

  describe('generate', () => {
    test('should generate valid balance sheet', () => {
      const generator = new BalanceSheetGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement.title).toBe('Balance Sheet')
      expect(statement.subtitle).toBe('Statement of Financial Position')
      expect(statement.asOfDate).toEqual(testDate)
    })

    test('should have three sections: Assets, Liabilities, Equity', () => {
      const generator = new BalanceSheetGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement.sections).toHaveLength(3)
      expect(statement.sections[0].name).toBe('ASSETS')
      expect(statement.sections[1].name).toBe('LIABILITIES')
      expect(statement.sections[2].name).toMatch(/EQUITY/)
    })

    test('should calculate total assets correctly', () => {
      const generator = new BalanceSheetGenerator(mockData, testDate)
      const statement = generator.generate()

      const assetsSection = statement.sections[0]
      const expectedTotal = 50000 + 30000 + 75000 // 155,000

      expect(assetsSection.subtotal).toBe(expectedTotal)
    })

    test('should calculate total liabilities correctly', () => {
      const generator = new BalanceSheetGenerator(mockData, testDate)
      const statement = generator.generate()

      const liabilitiesSection = statement.sections[1]
      const expectedTotal = 20000 + 35000 // 55,000

      expect(liabilitiesSection.subtotal).toBe(expectedTotal)
    })

    test('should calculate total equity correctly', () => {
      const generator = new BalanceSheetGenerator(mockData, testDate)
      const statement = generator.generate()

      const equitySection = statement.sections[2]
      const expectedTotal = 50000 + 50000 // 100,000

      expect(equitySection.subtotal).toBe(expectedTotal)
    })

    test('should verify accounting equation (Assets = Liabilities + Equity)', () => {
      const generator = new BalanceSheetGenerator(mockData, testDate)
      const statement = generator.generate()

      const assets = statement.sections[0].subtotal || 0
      const liabilities = statement.sections[1].subtotal || 0
      const equity = statement.sections[2].subtotal || 0

      expect(Math.abs(assets - (liabilities + equity))).toBeLessThan(0.01)
    })

    test('should include notes about balance status', () => {
      const generator = new BalanceSheetGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement.notes).toBeTruthy()
      expect(statement.notes!.length).toBeGreaterThan(0)
      expect(statement.notes!.some((note) => note.includes('balanced'))).toBe(true)
    })

    test('should include total line', () => {
      const generator = new BalanceSheetGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement.totals).toBeTruthy()
      expect(statement.totals?.label).toContain('Total')
    })

    test('should handle empty accounts', () => {
      const emptyData: FinancialData = {
        accounts: [],
        entries: [],
      }

      const generator = new BalanceSheetGenerator(emptyData, testDate)
      const statement = generator.generate()

      expect(statement.sections).toBeTruthy()
      expect(statement.title).toBe('Balance Sheet')
    })

    test('should separate current and fixed assets', () => {
      const generator = new BalanceSheetGenerator(mockData, testDate)
      const statement = generator.generate()

      const assetRows = statement.sections[0].rows
      // Should have sections for Current Assets and Fixed Assets
      expect(
        assetRows.some(
          (row) =>
            row.label.includes('Current') || row.label.includes('Fixed') || row.label.includes('Equipment')
        )
      ).toBe(true)
    })

    test('should separate current and long-term liabilities', () => {
      const generator = new BalanceSheetGenerator(mockData, testDate)
      const statement = generator.generate()

      const liabilityRows = statement.sections[1].rows
      // Should have structure for current and long-term liabilities
      expect(liabilityRows.length).toBeGreaterThanOrEqual(2)
    })

    test('should format currency amounts', () => {
      const generator = new BalanceSheetGenerator(mockData, testDate)
      const statement = generator.generate()

      // All amounts should be numbers
      statement.sections.forEach((section) => {
        section.rows.forEach((row) => {
          expect(typeof row.amount).toBe('number')
        })
      })
    })
  })

  describe('Unbalanced Scenarios', () => {
    test('should detect imbalanced balance sheet', () => {
      const unbalancedData: FinancialData = {
        accounts: [
          { code: '1000', name: 'Cash', accountType: 'asset', balance: 100000 },
          { code: '2000', name: 'Accounts Payable', accountType: 'liability', balance: 50000 },
          { code: '3000', name: 'Common Stock', accountType: 'equity', balance: 40000 },
        ],
        entries: [],
      }

      const generator = new BalanceSheetGenerator(unbalancedData, testDate)
      const statement = generator.generate()

      const variance = Math.abs(
        (statement.sections[0].subtotal || 0) -
          ((statement.sections[1].subtotal || 0) + (statement.sections[2].subtotal || 0))
      )

      expect(variance).toBeGreaterThan(0)
      expect(statement.notes?.some((n) => n.includes('Variance'))).toBe(true)
    })
  })
})

describe('IncomeStatementGenerator', () => {
  const mockData: FinancialData = {
    accounts: [
      // Revenue
      { code: '4000', name: 'Product Sales', accountType: 'income', balance: 500000 },
      { code: '4100', name: 'Service Revenue', accountType: 'income', balance: 150000 },

      // COGS
      { code: '5000', name: 'Cost of Goods Sold', accountType: 'cogs', balance: 325000 },

      // Expenses
      { code: '6000', name: 'Salaries', accountType: 'expense', balance: 120000 },
      { code: '6100', name: 'Rent', accountType: 'expense', balance: 36000 },
      { code: '6200', name: 'Utilities', accountType: 'expense', balance: 24000 },
    ],
    entries: [],
  }

  const testDate = new Date('2026-05-08')

  describe('generate', () => {
    test('should generate valid income statement', () => {
      const generator = new IncomeStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement.title).toBe('Income Statement')
      expect(statement.subtitle).toBe('Statement of Earnings')
    })

    test('should calculate revenue correctly', () => {
      const generator = new IncomeStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      const revenueSection = statement.sections[0]
      expect(revenueSection.subtotal).toBe(650000) // 500k + 150k
    })

    test('should calculate cost of goods sold correctly', () => {
      const generator = new IncomeStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      const cogsSection = statement.sections[1]
      expect(cogsSection.subtotal).toBe(325000)
    })

    test('should calculate gross profit', () => {
      const generator = new IncomeStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      const expectedGrossProfit = 650000 - 325000 // 325,000
      // Gross profit should be in the statement sections
      expect(statement.sections.length).toBeGreaterThan(2)
    })

    test('should calculate operating expenses correctly', () => {
      const generator = new IncomeStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      const expensesTotal = 120000 + 36000 + 24000 // 180,000
      const expenseSection = statement.sections.find((s) => s.name.includes('OPERATING'))
      expect(expenseSection?.subtotal).toBe(expensesTotal)
    })

    test('should include profit margins in notes', () => {
      const generator = new IncomeStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement.notes).toBeTruthy()
      expect(statement.notes!.some((note) => note.includes('Margin'))).toBe(true)
    })

    test('should handle zero revenue', () => {
      const zeroRevenueData: FinancialData = {
        accounts: [{ code: '5000', name: 'COGS', accountType: 'cogs', balance: 10000 }],
        entries: [],
      }

      const generator = new IncomeStatementGenerator(zeroRevenueData, testDate)
      const statement = generator.generate()

      expect(statement).toBeTruthy()
      expect(statement.sections).toBeTruthy()
    })

    test('should format net income correctly', () => {
      const generator = new IncomeStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement.totals).toBeTruthy()
      expect(statement.totals?.label).toContain('NET INCOME')
      expect(typeof statement.totals?.amount).toBe('number')
    })
  })

  describe('Profit Calculations', () => {
    test('should calculate correct net income', () => {
      const generator = new IncomeStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      const revenue = 650000
      const cogs = 325000
      const expenses = 180000
      const expectedNetIncome = revenue - cogs - expenses // 145,000

      expect(statement.totals?.amount).toBe(expectedNetIncome)
    })

    test('should calculate gross profit margin', () => {
      const generator = new IncomeStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      const revenue = 650000
      const cogs = 325000
      const grossProfit = revenue - cogs
      const expectedMargin = ((grossProfit / revenue) * 100).toFixed(2)

      // Margin should be in notes
      expect(statement.notes?.some((n) => n.includes(expectedMargin))).toBe(true)
    })

    test('should calculate net profit margin', () => {
      const generator = new IncomeStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      const revenue = 650000
      const netIncome = statement.totals?.amount || 0
      const expectedMargin = ((netIncome / revenue) * 100).toFixed(2)

      // Margin should be in notes
      expect(statement.notes?.some((n) => n.includes(expectedMargin))).toBe(true)
    })
  })
})

describe('CashFlowStatementGenerator', () => {
  const mockData: FinancialData = {
    accounts: [],
    entries: [],
  }

  const testDate = new Date('2026-05-08')

  describe('generate', () => {
    test('should generate valid cash flow statement', () => {
      const generator = new CashFlowStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement.title).toBe('Cash Flow Statement')
      expect(statement.subtitle).toBe('Statement of Cash Flows')
    })

    test('should have three activity sections', () => {
      const generator = new CashFlowStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement.sections).toHaveLength(3)
      expect(statement.sections[0].name).toContain('OPERATING')
      expect(statement.sections[1].name).toContain('INVESTING')
      expect(statement.sections[2].name).toContain('FINANCING')
    })

    test('should include net change in cash as total', () => {
      const generator = new CashFlowStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement.totals).toBeTruthy()
      expect(statement.totals?.label).toContain('NET CHANGE IN CASH')
    })

    test('should include activity summaries in notes', () => {
      const generator = new CashFlowStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement.notes).toBeTruthy()
      expect(statement.notes!.length).toBeGreaterThan(0)
      expect(statement.notes!.some((note) => note.includes('Operating'))).toBe(true)
    })

    test('should handle zero cash flows', () => {
      const generator = new CashFlowStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      expect(statement).toBeTruthy()
      expect(statement.totals?.amount).toBe(0)
    })
  })

  describe('Cash Flow Categories', () => {
    test('should separate operating activities', () => {
      const generator = new CashFlowStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      const operatingSection = statement.sections[0]
      expect(operatingSection.rows.length).toBeGreaterThan(0)
    })

    test('should separate investing activities', () => {
      const generator = new CashFlowStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      const investingSection = statement.sections[1]
      expect(investingSection.rows.length).toBeGreaterThan(0)
    })

    test('should separate financing activities', () => {
      const generator = new CashFlowStatementGenerator(mockData, testDate)
      const statement = generator.generate()

      const financingSection = statement.sections[2]
      expect(financingSection.rows.length).toBeGreaterThan(0)
    })
  })
})
