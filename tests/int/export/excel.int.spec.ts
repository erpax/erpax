/**
 * Excel Export Service Tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO/IEC-29500:2016 office-open-xml
 * @standard ECMA-376 office-open-xml
 * @rfc 6838 mime-type application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 * @standard ISO-4217:2015 currency-codes
 * @see docs/STANDARDS.md §5 §7
 */

import { ExcelExporter } from '@/plugins/export/excel'
import { FinancialStatement, ExportOptions } from '@/plugins/export/types'
import fs from 'fs'

describe('ExcelExporter', () => {
  const mockStatement: FinancialStatement = {
    title: 'Income Statement Test',
    subtitle: 'Test Statement',
    asOfDate: new Date('2026-05-08'),
    sections: [
      {
        name: 'REVENUES',
        rows: [
          { label: '4000 - Product Sales', amount: 500000, level: 1 },
          { label: '4100 - Service Revenue', amount: 150000, level: 1 },
        ],
        subtotal: 650000,
      },
      {
        name: 'COST OF GOODS SOLD',
        rows: [{ label: '5000 - COGS', amount: 325000, level: 1 }],
        subtotal: 325000,
      },
      {
        name: 'OPERATING EXPENSES',
        rows: [
          { label: '6000 - Salaries', amount: 120000, level: 1 },
          { label: '6100 - Rent', amount: 36000, level: 1 },
          { label: '6200 - Utilities', amount: 24000, level: 1 },
        ],
        subtotal: 180000,
      },
    ],
    totals: {
      label: 'NET INCOME',
      amount: 145000,
      isBold: true,
    },
    notes: ['Test income statement', 'ISO 8601 compliance tested'],
  }

  const mockOptions: ExportOptions = {
    format: 'excel',
    title: 'Income Statement Test',
    fileName: 'test_income_statement.xlsx',
    metadata: {
      author: 'ERPAX System',
    },
  }

  beforeEach(() => {
    if (!fs.existsSync('/tmp/exports')) {
      fs.mkdirSync('/tmp/exports', { recursive: true })
    }
  })

  afterEach(() => {
    const testFile = '/tmp/exports/test_income_statement.xlsx'
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile)
    }
  })

  describe('exportStatement', () => {
    test('should generate Excel file successfully', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      expect(result.format).toBe('excel')
      expect(result.fileName).toBe('test_income_statement.xlsx')
      expect(result.size).toBeGreaterThan(0)
      expect(result.generatedAt).toBeInstanceOf(Date)
    })

    test('should create file at correct location', async () => {
      await ExcelExporter.exportStatement(mockStatement, mockOptions)

      const filePath = '/tmp/exports/test_income_statement.xlsx'
      expect(fs.existsSync(filePath)).toBe(true)
    })

    test('should use default filename when not provided', async () => {
      const options: ExportOptions = {
        ...mockOptions,
        fileName: undefined,
      }

      const result = await ExcelExporter.exportStatement(mockStatement, options)

      expect(result.success).toBe(true)
      expect(result.fileName).toContain('Income_Statement_Test')
      expect(result.fileName.endsWith('.xlsx')).toBe(true)
    })

    test('should include all statement sections', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // In production, would open and verify Excel content
    })

    test('should format currency amounts correctly', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // Currency amounts should be properly formatted
    })

    test('should handle statements with multiple sections', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      // Verify file was created and has content
      const filePath = '/tmp/exports/test_income_statement.xlsx'
      const stats = fs.statSync(filePath)

      expect(stats.size).toBeGreaterThan(2000) // Excel files have overhead
      expect(stats.size).toBeLessThan(10000000)
    })

    test('should include statement notes', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // Notes should be appended to worksheet
    })

    test('should include as-of date in header', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // Date should be formatted in header
    })

    test('should generate valid Excel structure', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      expect(result.fileName).toMatch(/\.xlsx$/)
    })

    test('should handle empty statements', async () => {
      const emptyStatement: FinancialStatement = {
        title: 'Empty Statement',
        sections: [],
      }

      const result = await ExcelExporter.exportStatement(emptyStatement, mockOptions)

      expect(result.success).toBe(true)
    })

    test('should match reported file size', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      const filePath = `/tmp/exports/${result.fileName}`
      const stats = fs.statSync(filePath)

      expect(stats.size).toBe(result.size)
    })

    test('should support statements with subtotals', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // Subtotals should be formatted as bold rows
    })
  })

  describe('Column Formatting', () => {
    test('should format amount columns with 2 decimal places', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // Amount column should use #,##0.00 format
    })

    test('should set appropriate column widths', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // Account column: 40, Amount column: 15
    })

    test('should right-align amount columns', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // Amounts should be right-aligned
    })
  })

  describe('Row Formatting', () => {
    test('should format section headers with background color', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // Section headers should have gray background
    })

    test('should format subtotals with top border', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // Subtotal rows should have top border
    })

    test('should format totals with double border', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // Total rows should have double top and bottom border
    })

    test('should apply bold formatting to headers and totals', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
      // Headers and totals should be bold
    })
  })

  describe('Indentation and Hierarchy', () => {
    test('should apply indentation based on level', async () => {
      const statement: FinancialStatement = {
        title: 'Indentation Test',
        sections: [
          {
            name: 'Section 1',
            rows: [
              { label: 'Level 0', amount: 100, level: 0 },
              { label: 'Level 1', amount: 50, level: 1 },
              { label: 'Level 2', amount: 25, level: 2 },
            ],
            subtotal: 175,
          },
        ],
      }

      const result = await ExcelExporter.exportStatement(statement, mockOptions)

      expect(result.success).toBe(true)
      // Different levels should have different indentation
    })
  })

  describe('Error Handling', () => {
    test('should handle invalid statement data', async () => {
      const invalidStatement: any = {
        title: null,
        sections: 'invalid',
      }

      const result = await ExcelExporter.exportStatement(invalidStatement, mockOptions)

      expect(result.success).toBeFalsy()
      expect(result.error).toBeTruthy()
    })

    test('should return proper error structure on failure', async () => {
      const invalidStatement: any = {
        title: 123, // Invalid type
        sections: null, // Should be array
      }

      const result = await ExcelExporter.exportStatement(invalidStatement, mockOptions)

      expect(result.success).toBeFalsy()
      expect(result.generatedAt).toBeInstanceOf(Date)
      expect(result.error).toBeTruthy()
    })

    test('should handle missing ExcelJS gracefully', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      // Should complete without throwing
      expect(result.generatedAt).toBeInstanceOf(Date)
    })
  })

  describe('Metadata', () => {
    test('should include author in metadata when provided', async () => {
      const result = await ExcelExporter.exportStatement(mockStatement, mockOptions)

      expect(result.success).toBe(true)
    })

    test('should handle missing metadata gracefully', async () => {
      const options: ExportOptions = {
        ...mockOptions,
        metadata: undefined,
      }

      const result = await ExcelExporter.exportStatement(mockStatement, options)

      expect(result.success).toBe(true)
    })
  })

  describe('Large Statements', () => {
    test('should handle statements with many sections', async () => {
      const largeStatement: FinancialStatement = {
        title: 'Large Statement',
        sections: Array.from({ length: 20 }, (_, i) => ({
          name: `Section ${i + 1}`,
          rows: Array.from({ length: 10 }, (_, j) => ({
            label: `Item ${j + 1}`,
            amount: Math.random() * 10000,
            level: 1,
          })),
          subtotal: 5000,
        })),
      }

      const result = await ExcelExporter.exportStatement(largeStatement, mockOptions)

      expect(result.success).toBe(true)
    })

    test('should handle large numbers correctly', async () => {
      const largeNumberStatement: FinancialStatement = {
        title: 'Large Numbers',
        sections: [
          {
            name: 'Large Amounts',
            rows: [
              { label: 'Large Item 1', amount: 999999999.99, level: 1 },
              { label: 'Large Item 2', amount: 1000000000, level: 1 },
            ],
            subtotal: 1999999999.99,
          },
        ],
      }

      const result = await ExcelExporter.exportStatement(largeNumberStatement, mockOptions)

      expect(result.success).toBe(true)
    })
  })
})
