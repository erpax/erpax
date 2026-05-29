/**
 * СУПТО audit-file submission — collect a tenant's sales for a period, build the
 * Приложение-38 report (+ XML), and submit it to НАП. The submit step is
 * pluggable (default wiring is `submitBgSaft` over mTLS — see `bindings`); the
 * collect + build core is pure-ish (only `payload.find`) and fully testable.
 * Wire on a monthly [[jobs]] cron (НАП expects the file by the 15th).
 *
 * @standard BG Наредба-Н-18 §Приложение-38 audit-file-submission
 * @standard OECD SAF-T 2.0 (universal base)
 * @audit ISO-19011:2018 §6.4 audit-evidence
 * @see src/services/supto/audit-file.ts · src/services/country-clients/bg-nap-mtls.ts
 */

import type { Payload, PayloadRequest } from 'payload'
import {
  buildSuptoAuditReport,
  toSuptoAuditXml,
  type SuptoAuditReport,
  type SuptoSaleInput,
} from './audit-file'

interface SaleRow {
  unp?: unknown
  fiscalDeviceNumber?: unknown
  operatorCode?: unknown
  saleDate?: unknown
  total?: unknown
  currency?: unknown
  paymentType?: unknown
  status?: unknown
  fiscalReceiptNumber?: unknown
  reversalOf?: unknown
}

const str = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined)

/** Resolve a relationship value to its id string (or null). */
function relId(v: unknown): string | null {
  if (typeof v === 'string') return v
  if (v && typeof v === 'object' && 'id' in v) {
    const id = (v as { id?: unknown }).id
    return typeof id === 'string' ? id : null
  }
  return null
}

function toInput(row: SaleRow): SuptoSaleInput {
  return {
    unp: str(row.unp) ?? '',
    fiscalDeviceNumber: str(row.fiscalDeviceNumber) ?? '',
    operatorCode: str(row.operatorCode),
    saleDate: str(row.saleDate) ?? new Date(0).toISOString(),
    total: typeof row.total === 'number' ? row.total : 0,
    currency: str(row.currency),
    paymentType: str(row.paymentType),
    status: str(row.status),
    fiscalReceiptNumber: str(row.fiscalReceiptNumber),
    reversalOf: relId(row.reversalOf),
  }
}

/** Collect all sales in `[periodStart, periodEnd]` for a tenant (no pagination cap). */
export async function collectSuptoSales(
  payload: Payload,
  args: { tenant: string; periodStart: string; periodEnd: string; collection?: string; req?: PayloadRequest },
): Promise<SuptoSaleInput[]> {
  const res = await payload.find({
    collection: (args.collection ?? 'supto-sales') as never,
    where: {
      tenant: { equals: args.tenant },
      saleDate: { greater_than_equal: args.periodStart, less_than_equal: args.periodEnd },
    },
    pagination: false,
    overrideAccess: true,
    req: args.req,
  })
  return (res.docs as SaleRow[]).map(toInput)
}

export interface SubmitSuptoAuditResult {
  readonly report: SuptoAuditReport
  readonly xml: string
  readonly submission: unknown
}

/** Collect → build → (optionally) submit the standardized audit file for a tenant period. */
export async function submitSuptoAuditFile(
  payload: Payload,
  args: {
    tenant: string
    periodStart: string
    periodEnd: string
    tenantEik?: string
    collection?: string
    /** Pluggable submitter — default callers pass `(xml) => submitBgSaft(xml, config)`. */
    submit?: (xml: string, report: SuptoAuditReport) => Promise<unknown>
    req?: PayloadRequest
  },
): Promise<SubmitSuptoAuditResult> {
  const sales = await collectSuptoSales(payload, args)
  const report = buildSuptoAuditReport({
    sales,
    periodStart: args.periodStart,
    periodEnd: args.periodEnd,
    tenantEik: args.tenantEik,
  })
  const xml = toSuptoAuditXml(report)
  const submission = args.submit ? await args.submit(xml, report) : undefined
  return { report, xml, submission }
}
