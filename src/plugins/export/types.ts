/**
 * Export plugin — shared type definitions.
 *
 * @standard ISO-32000-2:2020 pdf
 * @standard ISO/IEC-29500:2016 xlsx
 * @standard W3C HTML5 html-output
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @standard BCP-47 language-tag report-locale
 * @see docs/STANDARDS.md §5
 */

export type ExportFormat = 'pdf' | 'excel' | 'html'

export interface ExportOptions {
  format: ExportFormat
  title?: string
  subtitle?: string
  fileName?: string
  includeCharts?: boolean
  orientation?: 'portrait' | 'landscape'
  metadata?: {
    author?: string
    subject?: string
    createdAt?: Date
  }
}

export interface FinancialStatement {
  title: string
  subtitle?: string
  asOfDate?: Date
  sections: StatementSection[]
  totals?: StatementRow
  notes?: string[]
}

export interface StatementSection {
  name: string
  rows: StatementRow[]
  subtotal?: number
  level?: number // For hierarchical display
}

export interface StatementRow {
  label: string
  amount: number
  level?: number // 0=main, 1=sub, 2=detail
  isBold?: boolean
  percentage?: number // For vertical analysis
}

export interface FinancialData {
  accounts: {
    code: string
    name: string
    accountType: string
    balance: number
  }[]
  entries: {
    date: string
    accountCode: string
    debit: number
    credit: number
  }[]
  invoices?: {
    amount: number
    status: string
  }[]
}

export interface ExportResult {
  success: boolean
  fileName: string
  size: number
  format: ExportFormat
  generatedAt: Date
  error?: string
}
