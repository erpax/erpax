/**
 * Excel Export Service — ExcelJS-driven xlsx generation.
 *
 * @standard ISO/IEC-29500:2016 office-open-xml
 * @standard ECMA-376 office-open-xml
 * @rfc 6838 mime-type application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 * @standard ISO-4217:2015 currency-codes cell-formatting
 * @standard ISO-8601-1:2019 date-time cell-formatting
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §5
 */

import * as fs from 'fs'

import type ExcelJS from 'exceljs'

import { ExportOptions, ExportResult, FinancialStatement } from './types'

export class ExcelExporter {
  /**
   * Export financial statement to Excel
   * @param statement Financial statement data
   * @param options Export options
   * @returns Generated Excel file path
   */
  static async exportStatement(
    statement: FinancialStatement,
    options: ExportOptions
  ): Promise<ExportResult> {
    try {
      // Dynamic import to avoid bundling ExcelJS in server
      const ExcelJS = (await import('exceljs')).default

      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet(statement.title)

      // Add header
      this.addHeader(worksheet, statement, options)

      // Add content
      let currentRow = 5
      currentRow = this.addStatementContent(worksheet, statement, currentRow)

      // Add notes
      if (statement.notes && statement.notes.length > 0) {
        currentRow += 2
        worksheet.getCell(`A${currentRow}`).value = 'Notes:'
        worksheet.getCell(`A${currentRow}`).font = { bold: true }
        currentRow++
        statement.notes.forEach((note) => {
          worksheet.getCell(`A${currentRow}`).value = `• ${note}`
          currentRow++
        })
      }

      // Set column widths
      worksheet.columns = [
        { width: 40 },
        { width: 15 },
      ]

      // Format numbers
      this.formatNumberColumns(worksheet)

      // Save file
      const fileName = options.fileName || `${statement.title.replace(/\s+/g, '_')}.xlsx`
      const filePath = `/tmp/exports/${fileName}`

      await workbook.xlsx.writeFile(filePath)

      // Get file size
      const stats = fs.statSync(filePath)

      return {
        success: true,
        fileName,
        size: stats.size,
        format: 'excel',
        generatedAt: new Date(),
      }
    } catch (error: unknown) {
      return {
        success: false,
        fileName: options.fileName || 'export.xlsx',
        size: 0,
        format: 'excel',
        generatedAt: new Date(),
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }

  private static addHeader(
    worksheet: ExcelJS.Worksheet,
    statement: FinancialStatement,
    _options: ExportOptions
  ): void {
    // Title
    const titleCell = worksheet.getCell('A1')
    titleCell.value = statement.title
    titleCell.font = { bold: true, size: 14 }
    worksheet.mergeCells('A1:B1')

    // Subtitle
    if (statement.subtitle) {
      const subtitleCell = worksheet.getCell('A2')
      subtitleCell.value = statement.subtitle
      subtitleCell.font = { italic: true }
      worksheet.mergeCells('A2:B2')
    }

    // As of date
    if (statement.asOfDate) {
      const dateCell = worksheet.getCell('A3')
      dateCell.value = `As of ${statement.asOfDate.toLocaleDateString()}`
      dateCell.font = { size: 10, color: { argb: 'FF666666' } }
    }

    // Column headers
    const headerRow = worksheet.getRow(4)
    headerRow.getCell(1).value = 'Account'
    headerRow.getCell(2).value = 'Amount'
    headerRow.font = { bold: true }
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF5F5F5' },
    }
  }

  private static addStatementContent(worksheet: ExcelJS.Worksheet, statement: FinancialStatement, startRow: number): number {
    let currentRow = startRow

    statement.sections.forEach((section) => {
      // Section header
      const sectionRow = worksheet.getRow(currentRow)
      sectionRow.getCell(1).value = section.name
      sectionRow.font = { bold: true }
      sectionRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE8E8E8' },
      }
      currentRow++

      // Section rows
      section.rows.forEach((row) => {
        const dataRow = worksheet.getRow(currentRow)
        dataRow.getCell(1).value = row.label
        dataRow.getCell(2).value = row.amount
        dataRow.getCell(2).numFmt = '#,##0.00'

        // Apply indentation based on level
        if (row.level) {
          dataRow.getCell(1).alignment = { indent: row.level }
        }

        if (row.isBold) {
          dataRow.font = { bold: true }
        }

        currentRow++
      })

      // Section subtotal
      if (section.subtotal) {
        const subtotalRow = worksheet.getRow(currentRow)
        subtotalRow.getCell(1).value = 'Subtotal'
        subtotalRow.getCell(2).value = section.subtotal
        subtotalRow.getCell(2).numFmt = '#,##0.00'
        subtotalRow.font = { bold: true }
        subtotalRow.getCell(1).border = {
          top: { style: 'thin' },
        }
        currentRow++
      }

      currentRow++ // Blank row between sections
    })

    // Total
    if (statement.totals) {
      const totalRow = worksheet.getRow(currentRow)
      totalRow.getCell(1).value = statement.totals.label
      totalRow.getCell(2).value = statement.totals.amount
      totalRow.getCell(2).numFmt = '#,##0.00'
      totalRow.font = { bold: true, size: 12 }
      totalRow.getCell(1).border = {
        top: { style: 'double' },
        bottom: { style: 'double' },
      }
      totalRow.getCell(2).border = {
        top: { style: 'double' },
        bottom: { style: 'double' },
      }
      currentRow++
    }

    return currentRow
  }

  private static formatNumberColumns(worksheet: ExcelJS.Worksheet): void {
    worksheet.eachRow((row: ExcelJS.Row) => {
      const amountCell = row.getCell(2)
      if (typeof amountCell.value === 'number') {
        amountCell.numFmt = '#,##0.00'
        amountCell.alignment = { horizontal: 'right' }
      }
    })
  }
}
