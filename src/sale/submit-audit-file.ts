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
 * @see src/services/sales/audit-file.ts · src/services/country-clients/bg-nap-mtls.ts
 */

import type { Payload, PayloadRequest } from 'payload'
import {
  buildSalesAuditReport,
  toSalesAuditXml,
  type SalesAuditReport,
  type SalesAuditInput,
} from '@/sale/audit-file'
import { vatTotalForItems } from '@/sale/fiscal-receipt'

interface SaleRow {
  unp?: unknown
  fiscalDeviceNumber?: unknown
  operatorCode?: unknown
  saleDate?: unknown
  total?: unknown
  items?: unknown
  currency?: unknown
  paymentType?: unknown
  status?: unknown
  fiscalReceiptNumber?: unknown
  reversalOf?: unknown
}

/** Coerce a sale's `items` array to the {vatRate, amount} shape the VAT engine reads. */
function itemsOf(v: unknown): Array<{ vatRate?: number; amount?: number }> {
  if (!Array.isArray(v)) return []
  return v.map((i) => {
    const o = (i ?? {}) as { vatRate?: unknown; amount?: unknown }
    return {
      vatRate: typeof o.vatRate === 'number' ? o.vatRate : 0,
      amount: typeof o.amount === 'number' ? o.amount : 0,
    }
  })
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

function toInput(row: SaleRow): SalesAuditInput {
  return {
    unp: str(row.unp) ?? '',
    fiscalDeviceNumber: str(row.fiscalDeviceNumber) ?? '',
    operatorCode: str(row.operatorCode),
    saleDate: str(row.saleDate) ?? new Date(0).toISOString(),
    total: typeof row.total === 'number' ? row.total : 0,
    vatTotal: vatTotalForItems(itemsOf(row.items)),
    currency: str(row.currency),
    paymentType: str(row.paymentType),
    status: str(row.status),
    fiscalReceiptNumber: str(row.fiscalReceiptNumber),
    reversalOf: relId(row.reversalOf),
  }
}

/** Collect all sales in `[periodStart, periodEnd]` for a tenant (no pagination cap). */
export async function collectSales(
  payload: Payload,
  args: { tenant: string; periodStart: string; periodEnd: string; collection?: string; req?: PayloadRequest },
): Promise<SalesAuditInput[]> {
  const res = await payload.find({
    collection: (args.collection ?? 'sales') as never,
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

export interface SubmitSalesAuditResult {
  readonly report: SalesAuditReport
  readonly xml: string
  readonly submission: unknown
}

/** Collect → build → (optionally) submit the standardized audit file for a tenant period. */
export async function submitSalesAuditFile(
  payload: Payload,
  args: {
    tenant: string
    periodStart: string
    periodEnd: string
    tenantEik?: string
    collection?: string
    /** Pluggable submitter — default callers pass `(xml) => submitBgSaft(xml, config)`. */
    submit?: (xml: string, report: SalesAuditReport) => Promise<unknown>
    req?: PayloadRequest
  },
): Promise<SubmitSalesAuditResult> {
  const sales = await collectSales(payload, args)
  const report = buildSalesAuditReport({
    sales,
    periodStart: args.periodStart,
    periodEnd: args.periodEnd,
    tenantEik: args.tenantEik,
  })
  const xml = toSalesAuditXml(report)
  const submission = args.submit ? await args.submit(xml, report) : undefined
  return { report, xml, submission }
}
