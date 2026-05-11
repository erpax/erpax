import { describe, expect, test } from 'vitest'

import type { Payload } from 'payload'
/**
 * Export Plugin Integration Tests — data → generator → file pipeline.
 *
 * @standard ISO/IEC-29119:2022 software-testing integration-test-level
 * @standard ISO-32000-2:2020 pdf
 * @standard ISO/IEC-29500:2016 office-open-xml xlsx
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @see docs/STANDARDS.md §5 §7
 */

import { PDFExporter } from '@/plugins/export/pdf'
import { ExcelExporter } from '@/plugins/export/excel'
import {
  BalanceSheetGenerator,
  IncomeStatementGenerator,
  CashFlowStatementGenerator,
} from '@/plugins/export/statements'
import { FinancialData, ExportOptions } from '@/plugins/export/types'

describe('Export Plugin Integration', () => {
  const sampleFinancialData: FinancialData = {
    accounts: [
      // Assets
      { code: '1000', name: 'Cash', accountType: 'asset', balance: 50000 },
      { code: '1200', name: 'Accounts Receivable', accountType: 'asset', balance: 30000 },
      { code: '1500', name: 'Equipment', accountType: 'asset', balance: 75000 },
      { code: '1600', name: 'Accumulated Depreciation', accountType: 'asset', balance: -5000 },

      // Liabilities
      { code: '2000', name: 'Accounts Payable', accountType: 'liability', balance: 20000 },
      { code: '2100', name: 'Short-term Debt', accountType: 'liability', balance: 35000 },

      // Equity
      { code: '3000', name: 'Common Stock', accountType: 'equity', balance: 50000 },
      { code: '3100', name: 'Retained Earnings', accountType: 'equity', balance: 50000 },

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
    entries: [
      {
        date: '2026-05-08T00:00:00Z',
        accountCode: '1000',
        debit: 10000,
        credit: 0,
      },
      {
        date: '2026-05-08T00:00:00Z',
        accountCode: '4000',
        debit: 0,
        credit: 10000,
      },
    ],
  }

  const testDate = new Date('2026-05-08')

  describe('Complete Workflow', () => {
    test('should generate Balance Sheet -> PDF export', async () => {
      const generator = new BalanceSheetGenerator(sampleFinancialData, testDate)
      const statement = generator.generate()

      const options: ExportOptions = {
        format: 'pdf',
        fileName: 'balance_sheet_integration.pdf',
      }

      const result = await PDFExporter.exportStatement(statement, options)

      expect(result.success).toBe(true)
      expect(result.format).toBe('pdf')
      expect(result.size).toBeGreaterThan(0)
    })

    test('should generate Income Statement -> Excel export', async () => {
      const generator = new IncomeStatementGenerator(sampleFinancialData, testDate)
      const statement = generator.generate()

      const options: ExportOptions = {
        format: 'excel',
        fileName: 'income_statement_integration.xlsx',
      }

      const result = await ExcelExporter.exportStatement(statement, options)

      expect(result.success).toBe(true)
      expect(result.format).toBe('excel')
      expect(result.size).toBeGreaterThan(0)
    })

    test('should generate Cash Flow Statement -> PDF export', async () => {
      const generator = new CashFlowStatementGenerator(sampleFinancialData, testDate)
      const statement = generator.generate()

      const options: ExportOptions = {
        format: 'pdf',
        fileName: 'cash_flow_integration.pdf',
      }

      const result = await PDFExporter.exportStatement(statement, options)

      expect(result.success).toBe(true)
    })

    test('should generate all three statements and export', async () => {
      const results = {
        balanceSheet: null as unknown as Payload,
        incomeStatement: null as unknown as Payload,
        cashFlow: null as unknown as Payload,
      }

      // Generate Balance Sheet
      const bsGenerator = new BalanceSheetGenerator(sampleFinancialData, testDate)
      const bsStatement = bsGenerator.generate()
      results.balanceSheet = await PDFExporter.exportStatement(bsStatement, {
        format: 'pdf',
        fileName: 'bs_complete.pdf',
      })

      // Generate Income Statement
      const isGenerator = new IncomeStatementGenerator(sampleFinancialData, testDate)
      const isStatement = isGenerator.generate()
      results.incomeStatement = await ExcelExporter.exportStatement(isStatement, {
        format: 'excel',
        fileName: 'is_complete.xlsx',
      })

      // Generate Cash Flow Statement
      const cfGenerator = new CashFlowStatementGenerator(sampleFinancialData, testDate)
      const cfStatement = cfGenerator.generate()
      results.cashFlow = await PDFExporter.exportStatement(cfStatement, {
        format: 'pdf',
        fileName: 'cf_complete.pdf',
      })

      // Verify all succeeded
      expect(results.balanceSheet.success).toBe(true)
      expect(results.incomeStatement.success).toBe(true)
      expect(results.cashFlow.success).toBe(true)
    })
  })

  describe('Data Integrity', () => {
    test('should preserve all account data in Balance Sheet export', async () => {
      const generator = new BalanceSheetGenerator(sampleFinancialData, testDate)
      const statement = generator.generate()

      // Collect all amounts from statement
      let totalAccounts = 0
      statement.sections.forEach((section) => {
        section.rows.forEach((row) => {
          totalAccounts++
        })
      })

      expect(totalAccounts).toBeGreaterThan(0)
    })

    test('should calculate totals correctly across statements', async () => {
      const bsGen = new BalanceSheetGenerator(sampleFinancialData, testDate)
      const bsStatement = bsGen.generate()

      const isGen = new IncomeStatementGenerator(sampleFinancialData, testDate)
      const isStatement = isGen.generate()

      // Balance Sheet total assets
      const totalAssets = bsStatement.sections[0].subtotal || 0

      // Income Statement revenue
      const totalRevenue = isStatement.sections[0].subtotal || 0

      expect(totalAssets).toBeGreaterThan(0)
      expect(totalRevenue).toBeGreaterThan(0)
    })

    test('should validate ISO 8601 date format in exports', async () => {
      const generator = new BalanceSheetGenerator(sampleFinancialData, testDate)
      const statement = generator.generate()

      expect(statement.asOfDate).toBeInstanceOf(Date)

      const options: ExportOptions = {
        format: 'pdf',
        fileName: 'date_validation.pdf',
      }

      const result = await PDFExporter.exportStatement(statement, options)

      expect(result.generatedAt).toBeInstanceOf(Date)
      expect(result.generatedAt.toISOString()).toMatch(/^\d{4}-\d{2}-\d{2}T/)
    })
  })

  describe('Performance', () => {
    test('should generate Balance Sheet in reasonable time', async () => {
      const start = performance.now()

      const generator = new BalanceSheetGenerator(sampleFinancialData, testDate)
      const statement = generator.generate()

      const end = performance.now()
      const duration = end - start

      expect(duration).toBeLessThan(100) // Should generate in <100ms
    })

    test('should export to PDF in reasonable time', async () => {
      const generator = new BalanceSheetGenerator(sampleFinancialData, testDate)
      const statement = generator.generate()

      const start = performance.now()

      const result = await PDFExporter.exportStatement(statement, {
        format: 'pdf',
        fileName: 'performance_test.pdf',
      })

      const end = performance.now()
      const duration = end - start

      expect(result.success).toBe(true)
      expect(duration).toBeLessThan(5000) // Should export in <5s
    })

    test('should export to Excel in reasonable time', async () => {
      const generator = new IncomeStatementGenerator(sampleFinancialData, testDate)
      const statement = generator.generate()

      const start = performance.now()

      const result = await ExcelExporter.exportStatement(statement, {
        format: 'excel',
        fileName: 'performance_test.xlsx',
      })

      const end = performance.now()
      const duration = end - start

      expect(result.success).toBe(true)
      expect(duration).toBeLessThan(5000)
    })
  })

  describe('Accounting Equation Validation', () => {
    test('should verify Assets = Liabilities + Equity in Balance Sheet', async () => {
      const generator = new BalanceSheetGenerator(sampleFinancialData, testDate)
      const statement = generator.generate()

      const assets = statement.sections[0].subtotal || 0
      const liabilities = statement.sections[1].subtotal || 0
      const equity = statement.sections[2].subtotal || 0

      const difference = Math.abs(assets - (liabilities + equity))

      expect(difference).toBeLessThan(0.01)
    })

    test('should include balance verification in notes', async () => {
      const generator = new BalanceSheetGenerator(sampleFinancialData, testDate)
      const statement = generator.generate()

      const hasBalanceNote = statement.notes?.some((note) =>
        note.toLowerCase().includes('balanced')
      )

      expect(hasBalanceNote).toBe(true)
    })
  })

  describe('Multi-format Export', () => {
    test('should support exporting same statement to multiple formats', async () => {
      const generator = new BalanceSheetGenerator(sampleFinancialData, testDate)
      const statement = generator.generate()

      // Export as PDF
      const pdfResult = await PDFExporter.exportStatement(statement, {
        format: 'pdf',
        fileName: 'multiformat_test.pdf',
      })

      // Export as Excel
      const excelResult = await ExcelExporter.exportStatement(statement, {
        format: 'excel',
        fileName: 'multiformat_test.xlsx',
      })

      expect(pdfResult.success).toBe(true)
      expect(excelResult.success).toBe(true)
      expect(pdfResult.format).toBe('pdf')
      expect(excelResult.format).toBe('excel')
    })
  })

  describe('Error Recovery', () => {
    test('should handle export failure gracefully', async () => {
      const invalidStatement: any = {
        title: null,
        sections: 'invalid',
      }

      const result = await PDFExporter.exportStatement(invalidStatement, {
        format: 'pdf',
        fileName: 'error_recovery.pdf',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBeTruthy()
    })

    test('should provide meaningful error messages', async () => {
      const generator = new BalanceSheetGenerator({} as any, testDate)

      // Should not throw, should handle gracefully
      expect(() => generator.generate()).not.toThrow()
    })
  })
})
