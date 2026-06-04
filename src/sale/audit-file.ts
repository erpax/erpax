/**
 * СУПТО standardized audit file — Наредба Н-18, Приложение 38.
 *
 * For НАП control activity each commercial outlet submits a standardized,
 * logically- and arithmetically-correct export of its sales. This builder is
 * the country profile over the universal SAF-T base (`saf-t-export.service`):
 * it projects the СУПТО `sales` rows for a period into the audit rows
 * НАП expects (УНП, fiscal device, operator, datetime, totals, VAT, payment,
 * status + reversal linkage) and a control header (count + control sum) that
 * makes the file self-checking. `reversal` rows (сторно) net into the control
 * sum, so a tampered or missing row breaks arithmetic — the same content-
 * integrity guarantee as the content-uuid (see the `identity`/`supto` skills).
 *
 * Pure: takes the sales, returns the report + its XML serialization. The
 * period query + НАП mTLS submission ride `submitBgSaft` (see `bindings`).
 *
 * @standard BG Наредба-Н-18 §Приложение-38 standardized-audit-file
 * @standard OECD SAF-T 2.0 (universal base profile)
 * @audit ISO-19011:2018 §6.4 audit-evidence
 * @rfc 8259 json
 * @see src/services/saf-t-export.service.ts · .claude/skills/supto/SKILL.md
 */

export interface SalesAuditInput {
  readonly unp: string
  readonly fiscalDeviceNumber: string
  readonly operatorCode?: string
  readonly saleDate: string | Date
  readonly total: number
  /** VAT total (cents) for the sale — computed via the canonical BG calculator. */
  readonly vatTotal?: number
  readonly currency?: string
  readonly paymentType?: string
  readonly status?: string
  readonly fiscalReceiptNumber?: string
  readonly reversalOf?: string | null
}

export interface SalesAuditRow {
  readonly unp: string
  readonly fiscalDeviceNumber: string
  readonly operatorCode: string
  readonly saleDateTime: string
  readonly total: number
  readonly vatTotal: number
  readonly currency: string
  readonly paymentType: string
  readonly status: string
  readonly fiscalReceiptNumber: string | null
  readonly reversalOf: string | null
}

export interface SalesAuditReport {
  readonly periodStart: string
  readonly periodEnd: string
  readonly generatedAt: string
  readonly tenantEik: string | null
  readonly count: number
  /** Net arithmetic total across all rows (reversals subtract) — the integrity check. */
  readonly controlSum: number
  /** Net VAT total across all rows (reversals subtract) — the VAT integrity check. */
  readonly vatControlSum: number
  readonly rows: ReadonlyArray<SalesAuditRow>
}

function isoDateTime(d: string | Date): string {
  return (d instanceof Date ? d : new Date(d)).toISOString()
}

/** Project one sale into a canonical audit row (totality: blanks → identity elements). */
function toRow(s: SalesAuditInput): SalesAuditRow {
  return {
    unp: s.unp,
    fiscalDeviceNumber: s.fiscalDeviceNumber,
    operatorCode: s.operatorCode ?? '0000',
    saleDateTime: isoDateTime(s.saleDate),
    total: s.total,
    vatTotal: s.vatTotal ?? 0,
    currency: s.currency ?? 'BGN',
    paymentType: s.paymentType ?? 'cash',
    status: s.status ?? 'closed',
    fiscalReceiptNumber: s.fiscalReceiptNumber ?? null,
    reversalOf: s.reversalOf ?? null,
  }
}

/** Build the standardized СУПТО audit report for a period. Rows sort by УНП (deterministic). */
export function buildSalesAuditReport(args: {
  sales: ReadonlyArray<SalesAuditInput>
  periodStart: string
  periodEnd: string
  tenantEik?: string
  generatedAt?: string | Date
}): SalesAuditReport {
  const rows = args.sales.map(toRow).sort((a, b) => (a.unp < b.unp ? -1 : a.unp > b.unp ? 1 : 0))
  const controlSum = rows.reduce((sum, r) => sum + (Number.isFinite(r.total) ? r.total : 0), 0)
  const vatControlSum = rows.reduce((sum, r) => sum + (Number.isFinite(r.vatTotal) ? r.vatTotal : 0), 0)
  return {
    periodStart: args.periodStart,
    periodEnd: args.periodEnd,
    generatedAt: isoDateTime(args.generatedAt ?? new Date()),
    tenantEik: args.tenantEik ?? null,
    count: rows.length,
    controlSum,
    vatControlSum,
    rows,
  }
}

const xmlEscape = (v: string): string =>
  v.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!)

const tag = (name: string, value: string | number | null): string =>
  value === null || value === '' ? `<${name}/>` : `<${name}>${xmlEscape(String(value))}</${name}>`

/** Serialize the report to the СУПТО audit XML (Приложение-38 shape). */
export function toSalesAuditXml(report: SalesAuditReport): string {
  const rows = report.rows
    .map(
      (r) =>
        `    <Sale>${tag('UNP', r.unp)}${tag('FiscalDevice', r.fiscalDeviceNumber)}` +
        `${tag('Operator', r.operatorCode)}${tag('DateTime', r.saleDateTime)}` +
        `${tag('Total', r.total)}${tag('Vat', r.vatTotal)}${tag('Currency', r.currency)}${tag('PaymentType', r.paymentType)}` +
        `${tag('Status', r.status)}${tag('FiscalReceipt', r.fiscalReceiptNumber)}${tag('ReversalOf', r.reversalOf)}</Sale>`,
    )
    .join('\n')
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<AuditFile xmlns="urn:bg:nra:audit:1">\n` +
    `  <Header>${tag('PeriodStart', report.periodStart)}${tag('PeriodEnd', report.periodEnd)}` +
    `${tag('GeneratedAt', report.generatedAt)}${tag('TenantEIK', report.tenantEik)}` +
    `${tag('Count', report.count)}${tag('ControlSum', report.controlSum)}${tag('VatControlSum', report.vatControlSum)}</Header>\n` +
    `  <Sales>\n${rows}${rows ? '\n' : ''}  </Sales>\n` +
    `</AuditFile>`
  )
}
