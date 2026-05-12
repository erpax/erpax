/**
 * PDF Export Service — Puppeteer-driven PDF generation with PDF/A archival
 * profile + optional PDF/UA accessibility declarations sourced from the
 * standards modules.
 *
 * Two-stage flow:
 *
 *   1. Puppeteer renders the HTML to PDF.
 *   2. The XMP packet from `@/standards/iso-19005` is exposed via
 *      `getPdfAMetadata()` so a downstream PDF/A converter (qpdf,
 *      ghostscript, veraPDF Greenfield) can inject it into `/Metadata`.
 *      Puppeteer alone does NOT produce a PDF/A-conforming file — the
 *      post-process is operational infrastructure (per-deployment) but
 *      the metadata it injects is governed here.
 *
 * @standard ISO-32000-2:2020 pdf
 * @standard ISO-19005-2:2011 pdf-a-2
 * @standard ISO-19005-3:2012 pdf-a-3
 * @standard ISO-14289-1:2014 pdf-ua-1
 * @standard W3C HTML5 source-rendering
 * @standard W3C CSS Print
 * @rfc 6838 mime-type application/pdf
 * @audit ISO-19011:2018 audit-trail document-archival-evidence
 * @compliance EU 2014/55 b2g-procurement-accessibility
 * @see docs/STANDARDS.md §5
 * @see src/standards/iso-19005
 * @see src/standards/iso-14289
 */

import * as fs from 'fs'

import { buildPdfAXmp, PDF_A_DEFAULT } from '@/standards/iso-19005'
import type { PdfAProfile } from '@/standards/iso-19005'
import { PDF_UA_DEFAULT } from '@/standards/iso-14289'
import type { PdfUaProfile } from '@/standards/iso-14289'

import { ExportOptions, ExportResult, FinancialStatement } from './types'

export class PDFExporter {
  /**
   * Export financial statement to PDF
   * @param statement Financial statement data
   * @param options Export options
   * @returns Generated PDF file path
   */
  static async exportStatement(
    statement: FinancialStatement,
    options: ExportOptions
  ): Promise<ExportResult> {
    try {
      // Dynamic import to avoid bundling Puppeteer in server
      const puppeteer = (await import('puppeteer')).default

      const html = this.generateHTML(statement, options)
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox'],
      })

      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'networkidle0' })

      const fileName = options.fileName || `${statement.title.replace(/\s+/g, '_')}.pdf`
      const pdfPath = `/tmp/exports/${fileName}`

      await page.pdf({
        path: pdfPath,
        format: 'A4',
        orientation: options.orientation || 'portrait',
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
        displayHeaderFooter: true,
        headerTemplate: '<div style="font-size: 10px; padding: 0 20px;">ERPAX Financial Statement</div>',
        footerTemplate: '<div style="font-size: 10px; padding: 0 20px;"><span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      })

      await browser.close()

      // Get file size
      const stats = fs.statSync(pdfPath)

      return {
        success: true,
        fileName,
        size: stats.size,
        format: 'pdf',
        generatedAt: new Date(),
      }
    } catch (error: unknown) {
      return {
        success: false,
        fileName: options.fileName || 'export.pdf',
        size: 0,
        format: 'pdf',
        generatedAt: new Date(),
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }

  /**
   * Build the XMP metadata packet a downstream PDF/A converter must inject
   * into the rendered PDF's `/Metadata` stream so the document declares
   * its archival + accessibility profile per ISO 19005 / ISO 14289.
   *
   * Defaults to PDF/A-2b + PDF/UA-1 — the dual baseline B2G procurement
   * accepts. Override via `options.pdfA` / `options.pdfUa` to opt into
   * PDF/A-3 hybrid (for embedded e-invoice XML) or skip the accessibility
   * declaration on docs that aren't user-facing.
   *
   * @standard ISO-19005-2:2011 pdf-a-2
   * @standard ISO-14289-1:2014 pdf-ua-1
   * @compliance EU 2014/55 b2g-procurement-accessibility
   */
  static buildArchivalMetadata(
    statement: FinancialStatement,
    options: ExportOptions & {
      pdfA?: PdfAProfile | null
      pdfUa?: PdfUaProfile | null
    },
  ): string {
    const pdfA = options.pdfA === undefined ? PDF_A_DEFAULT : options.pdfA
    const pdfUa = options.pdfUa === undefined ? PDF_UA_DEFAULT : options.pdfUa
    return buildPdfAXmp({
      title: statement.title,
      description: statement.subtitle,
      profile: pdfA ?? undefined,
      accessibility: pdfUa ?? undefined,
    })
  }

  /**
   * Generate HTML for PDF rendering
   */
  private static generateHTML(statement: FinancialStatement, options: ExportOptions): string {
    const cssStyles = `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.5; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
        .subtitle { font-size: 12px; color: #666; }
        .meta { font-size: 10px; color: #999; margin-top: 10px; }

        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { text-align: left; padding: 8px; border-bottom: 1px solid #000; font-weight: bold; }
        td { padding: 8px; border-bottom: 1px solid #eee; }
        tr.section-header { background-color: #f5f5f5; font-weight: bold; }
        tr.subtotal { border-top: 1px solid #000; font-weight: bold; }
        tr.total { border-top: 2px solid #000; font-weight: bold; font-size: 14px; }

        .amount { text-align: right; font-family: 'Courier New', monospace; }
        .level-1 { padding-left: 20px; }
        .level-2 { padding-left: 40px; }
        .notes { font-size: 10px; color: #666; margin-top: 20px; }
        .note-item { margin-bottom: 5px; }
      </style>
    `

    const headerHTML = `
      <div class="header">
        <div class="title">${statement.title}</div>
        ${statement.subtitle ? `<div class="subtitle">${statement.subtitle}</div>` : ''}
        <div class="meta">
          ${statement.asOfDate ? `As of ${statement.asOfDate.toLocaleDateString()}` : ''}
          ${options.metadata?.author ? ` | Generated by ${options.metadata.author}` : ''}
        </div>
      </div>
    `

    const tableHTML = `
      <table>
        <tbody>
          ${statement.sections
            .map(
              (section) => `
            <tr class="section-header">
              <td colspan="2">${section.name}</td>
            </tr>
            ${section.rows
              .map(
                (row) => `
              <tr class="level-${row.level || 0}">
                <td ${row.isBold ? 'style="font-weight: bold;"' : ''}>${row.label}</td>
                <td class="amount" ${row.isBold ? 'style="font-weight: bold;"' : ''}>${this.formatAmount(row.amount)}</td>
              </tr>
            `
              )
              .join('')}
            ${section.subtotal ? `<tr class="subtotal"><td>Subtotal</td><td class="amount">${this.formatAmount(section.subtotal)}</td></tr>` : ''}
          `
            )
            .join('')}
          ${
            statement.totals
              ? `
          <tr class="total">
            <td>${statement.totals.label}</td>
            <td class="amount">${this.formatAmount(statement.totals.amount)}</td>
          </tr>
          `
              : ''
          }
        </tbody>
      </table>
    `

    const notesHTML =
      statement.notes && statement.notes.length > 0
        ? `
      <div class="notes">
        <strong>Notes:</strong>
        ${statement.notes.map((note) => `<div class="note-item">• ${note}</div>`).join('')}
      </div>
    `
        : ''

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${cssStyles}
        </head>
        <body>
          ${headerHTML}
          ${tableHTML}
          ${notesHTML}
        </body>
      </html>
    `
  }

  private static formatAmount(amount: number): string {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
}
