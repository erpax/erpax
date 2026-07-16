/**
 * СУПТО monthly audit-file job — builds (and, when an mTLS submitter is wired,
 * submits) each tenant's Приложение-38 standardized audit file for the prior
 * calendar month. Наредба Н-18 expects the file by the 15th, so the cron runs
 * early-month. Submission to НАП requires the mTLS config (certs, operational);
 * absent it, the handler builds + logs the report summary, ready for injection.
 *
 * Reachable via `/api/payload-jobs/run` + a wrangler `[[triggers]]` cron, or the
 * long-lived-Node autoRun. Degrades gracefully per tenant (never throws the run).
 *
 * @standard BG Наредба-Н-18 §Приложение-38 monthly-audit-file
 * @audit ISO-19011:2018 §6.4 audit-evidence
 * @see src/services/sales/submit-audit-file.ts
 */

import type { Payload } from 'payload'
import { submitSalesAuditFile } from '@/sale'

/** Prior calendar month as `[periodStart, periodEnd]` ISO strings (UTC). */
export function priorMonthUtc(now: Date = new Date()): { periodStart: string; periodEnd: string } {
  const y = now.getUTCFullYear()
  const m = now.getUTCMonth() // 0-based current month
  const start = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0, 0))
  const end = new Date(Date.UTC(y, m, 0, 23, 59, 59, 999)) // day 0 of current month = last day of prior
  return { periodStart: start.toISOString(), periodEnd: end.toISOString() }
}

export interface SalesAuditRunResult {
  readonly periodStart: string
  readonly periodEnd: string
  readonly tenants: number
  readonly built: number
}

export async function processSalesAuditFiles(
  payload: Payload,
  opts: { submit?: Parameters<typeof submitSalesAuditFile>[1]['submit']; now?: Date } = {},
): Promise<SalesAuditRunResult> {
  const { periodStart, periodEnd } = priorMonthUtc(opts.now)
  const tenants = await payload.find({
    collection: 'tenants' as never,
    pagination: false,
    overrideAccess: true,
  })
  let built = 0
  for (const t of tenants.docs as Array<{ id?: unknown }>) {
    const tenant = String(t.id)
    try {
      const { report, xml } = await submitSalesAuditFile(payload, { tenant, periodStart, periodEnd, submit: opts.submit })
      // Persist the file as the compliance evidence trail (audit-submissions).
      await payload.create({
        collection: 'audit-submissions' as never,
        overrideAccess: true,
        data: {
          tenant,
          periodStart,
          periodEnd,
          count: report.count,
          controlSum: report.controlSum,
          status: opts.submit ? 'submitted' : 'built',
          submittedAt: opts.submit ? new Date().toISOString() : undefined,
          xml,
        } as never,
      })
      built += 1
      payload.logger?.info?.({
        msg: 'sales:audit-file built',
        tenant,
        count: report.count,
        controlSum: report.controlSum,
        submitted: Boolean(opts.submit),
      })
    } catch (err) {
      payload.logger?.error?.({ msg: 'sales:audit-file failed', tenant, err: err instanceof Error ? err.message : String(err) })
    }
  }
  return { periodStart, periodEnd, tenants: tenants.docs.length, built }
}
