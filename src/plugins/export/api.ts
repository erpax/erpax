/**
 * Export Plugin REST API — generate + serve PDF / Excel statement files.
 *
 * @rfc 9110 http-semantics
 * @rfc 9110 §15 status-codes
 * @rfc 6838 mime-type
 * @rfc 6266 content-disposition attachment
 * @standard ISO-32000-2:2020 pdf
 * @standard ISO/IEC-29500:2016 office-open-xml xlsx
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2 §5
 */

import * as fs from 'fs'

import { Request, Response } from 'express'
import { PDFExporter } from './pdf'
import { ExcelExporter } from './excel'
import {
  exportStandards,
  type StandardsExportFormat,
  type StandardsExportRequest,
} from './standards-export'
import {
  BalanceSheetGenerator,
  IncomeStatementGenerator,
  CashFlowStatementGenerator,
} from './statements'
import { ExportFormat, ExportOptions } from './types'

/**
 * Generate and export Balance Sheet
 * POST /api/export/balance-sheet
 */
export const exportBalanceSheet = async (req: Request, res: Response) => {
  try {
    const { data, format = 'pdf', asOfDate = new Date() } = req.body

    // Validate input
    if (!data || !data.accounts || !Array.isArray(data.accounts)) {
      return res.status(400).json({ error: 'Invalid financial data format' })
    }

    if (!['pdf', 'excel'].includes(format)) {
      return res.status(400).json({ error: 'Invalid export format' })
    }

    // Generate statement
    const generator = new BalanceSheetGenerator(data, new Date(asOfDate))
    const statement = generator.generate()

    // Export
    const options: ExportOptions = {
      format: format as ExportFormat,
      fileName: `balance_sheet_${Date.now()}.${format === 'pdf' ? 'pdf' : 'xlsx'}`,
      metadata: {
        author: req.user?.name || 'ERPAX System',
      },
    }

    let result
    if (format === 'pdf') {
      result = await PDFExporter.exportStatement(statement, options)
    } else {
      result = await ExcelExporter.exportStatement(statement, options)
    }

    if (!result.success) {
      return res.status(500).json({ error: result.error })
    }

    // Return download URL or file
    res.json({
      success: true,
      fileName: result.fileName,
      size: result.size,
      format: result.format,
      generatedAt: result.generatedAt,
      downloadUrl: `/api/export/download/${result.fileName}`,
    })
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) })
  }
}

/**
 * Generate and export Income Statement
 * POST /api/export/income-statement
 */
export const exportIncomeStatement = async (req: Request, res: Response) => {
  try {
    const { data, format = 'pdf', asOfDate = new Date() } = req.body

    if (!data || !data.accounts || !Array.isArray(data.accounts)) {
      return res.status(400).json({ error: 'Invalid financial data format' })
    }

    if (!['pdf', 'excel'].includes(format)) {
      return res.status(400).json({ error: 'Invalid export format' })
    }

    const generator = new IncomeStatementGenerator(data, new Date(asOfDate))
    const statement = generator.generate()

    const options: ExportOptions = {
      format: format as ExportFormat,
      fileName: `income_statement_${Date.now()}.${format === 'pdf' ? 'pdf' : 'xlsx'}`,
      metadata: {
        author: req.user?.name || 'ERPAX System',
      },
    }

    let result
    if (format === 'pdf') {
      result = await PDFExporter.exportStatement(statement, options)
    } else {
      result = await ExcelExporter.exportStatement(statement, options)
    }

    if (!result.success) {
      return res.status(500).json({ error: result.error })
    }

    res.json({
      success: true,
      fileName: result.fileName,
      size: result.size,
      format: result.format,
      generatedAt: result.generatedAt,
      downloadUrl: `/api/export/download/${result.fileName}`,
    })
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) })
  }
}

/**
 * Generate and export Cash Flow Statement
 * POST /api/export/cash-flow-statement
 */
export const exportCashFlowStatement = async (req: Request, res: Response) => {
  try {
    const { data, format = 'pdf', asOfDate = new Date() } = req.body

    if (!data || !data.accounts || !Array.isArray(data.accounts)) {
      return res.status(400).json({ error: 'Invalid financial data format' })
    }

    if (!['pdf', 'excel'].includes(format)) {
      return res.status(400).json({ error: 'Invalid export format' })
    }

    const generator = new CashFlowStatementGenerator(data, new Date(asOfDate))
    const statement = generator.generate()

    const options: ExportOptions = {
      format: format as ExportFormat,
      fileName: `cash_flow_statement_${Date.now()}.${format === 'pdf' ? 'pdf' : 'xlsx'}`,
      metadata: {
        author: req.user?.name || 'ERPAX System',
      },
    }

    let result
    if (format === 'pdf') {
      result = await PDFExporter.exportStatement(statement, options)
    } else {
      result = await ExcelExporter.exportStatement(statement, options)
    }

    if (!result.success) {
      return res.status(500).json({ error: result.error })
    }

    res.json({
      success: true,
      fileName: result.fileName,
      size: result.size,
      format: result.format,
      generatedAt: result.generatedAt,
      downloadUrl: `/api/export/download/${result.fileName}`,
    })
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) })
  }
}

/**
 * Download exported file
 * GET /api/export/download/:fileName
 */
export const downloadExport = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.params

    // Security: prevent directory traversal
    if (fileName.includes('..') || fileName.includes('/')) {
      return res.status(400).json({ error: 'Invalid file name' })
    }

    const filePath = `/tmp/exports/${fileName}`

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' })
    }

    const mimeType = fileName.endsWith('.pdf') ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

    res.download(filePath, fileName, { type: mimeType })
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) })
  }
}

/**
 * Get export status
 * GET /api/export/status/:fileName
 */
export const getExportStatus = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.params

    if (fileName.includes('..') || fileName.includes('/')) {
      return res.status(400).json({ error: 'Invalid file name' })
    }

    const filePath = `/tmp/exports/${fileName}`

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' })
    }

    const stats = fs.statSync(filePath)

    res.json({
      fileName,
      exists: true,
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
      format: fileName.endsWith('.pdf') ? 'pdf' : 'excel',
    })
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) })
  }
}

/**
 * Generate all statements
 * POST /api/export/generate-all
 */
export const generateAllStatements = async (req: Request, res: Response) => {
  try {
    const { data, format = 'pdf', asOfDate = new Date() } = req.body

    if (!data || !data.accounts || !Array.isArray(data.accounts)) {
      return res.status(400).json({ error: 'Invalid financial data format' })
    }

    const dateObj = new Date(asOfDate)
    const results: Record<string, unknown> = {}

    // Generate Balance Sheet
    const bsGenerator = new BalanceSheetGenerator(data, dateObj)
    const bsStatement = bsGenerator.generate()

    const bsOptions: ExportOptions = {
      format: format as ExportFormat,
      fileName: `balance_sheet_${Date.now()}.${format === 'pdf' ? 'pdf' : 'xlsx'}`,
    }

    let bsResult
    if (format === 'pdf') {
      bsResult = await PDFExporter.exportStatement(bsStatement, bsOptions)
    } else {
      bsResult = await ExcelExporter.exportStatement(bsStatement, bsOptions)
    }

    results.balanceSheet = bsResult

    // Generate Income Statement
    const isGenerator = new IncomeStatementGenerator(data, dateObj)
    const isStatement = isGenerator.generate()

    const isOptions: ExportOptions = {
      format: format as ExportFormat,
      fileName: `income_statement_${Date.now()}.${format === 'pdf' ? 'pdf' : 'xlsx'}`,
    }

    let isResult
    if (format === 'pdf') {
      isResult = await PDFExporter.exportStatement(isStatement, isOptions)
    } else {
      isResult = await ExcelExporter.exportStatement(isStatement, isOptions)
    }

    results.incomeStatement = isResult

    // Generate Cash Flow Statement
    const cfGenerator = new CashFlowStatementGenerator(data, dateObj)
    const cfStatement = cfGenerator.generate()

    const cfOptions: ExportOptions = {
      format: format as ExportFormat,
      fileName: `cash_flow_statement_${Date.now()}.${format === 'pdf' ? 'pdf' : 'xlsx'}`,
    }

    let cfResult
    if (format === 'pdf') {
      cfResult = await PDFExporter.exportStatement(cfStatement, cfOptions)
    } else {
      cfResult = await ExcelExporter.exportStatement(cfStatement, cfOptions)
    }

    results.cashFlowStatement = cfResult

    // Return all results
    res.json({
      success: true,
      statements: results,
      format,
      generatedAt: new Date(),
    })
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) })
  }
}

/**
 * Generate a standards-bearing wire-format export — SAF-T / Peppol UBL /
 * EDIFACT / ISO 20022 pain.001 / pain.008.
 *
 * POST /api/export/standards
 *
 * Body shape mirrors {@link StandardsExportRequest}. The endpoint
 * dispatches to {@link exportStandards} and streams the rendered
 * content with the canonical MIME type + Content-Disposition.
 *
 * @standard OECD SAF-T 2.0
 * @standard Peppol-BIS-3.0 billing
 * @standard UN-EDIFACT D.96A
 * @standard ISO-20022:2022
 * @rfc 6266 content-disposition
 * @rfc 6838 mime-type
 */
export const exportStandardsEndpoint = async (
  req: Request & { payload?: unknown },
  res: Response,
) => {
  try {
    const body = req.body as Partial<StandardsExportRequest> & {
      format?: StandardsExportFormat
    }
    if (!body || !body.format) {
      return res
        .status(400)
        .json({ error: 'format is required (saf-t-xml / peppol-ubl / edifact / pain-001-xml / pain-008-xml)' })
    }
    if (
      ![
        'saf-t-xml',
        'peppol-ubl',
        'edifact',
        'pain-001-xml',
        'pain-008-xml',
      ].includes(body.format)
    ) {
      return res.status(400).json({ error: `Unknown format: ${body.format}` })
    }

    // For the saf-t-xml format the request needs a Payload instance —
    // accept the one attached to the request by the Payload middleware.
    const enriched =
      body.format === 'saf-t-xml'
        ? ({
            ...body,
            payload: (req as { payload?: unknown }).payload,
          } as StandardsExportRequest)
        : (body as StandardsExportRequest)

    const result = await exportStandards(enriched)

    res.setHeader('Content-Type', result.mimeType)
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${result.filename}"`,
    )
    res.status(200).send(result.content)
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
