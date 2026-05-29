/**
 * СУПТО дневен отчет (daily turnover report) — a per-ФУ summary of a day's sales.
 *
 * In the hardware regime a fiscal device prints a daily Z-report (дневен
 * финансов отчет с нулиране); in the *alternative regime* (e-shop, no hardware)
 * NA-П reporting is the monthly audit file, so this daily report is the
 * informational equivalent: per fiscal device, for one calendar day, the count,
 * gross turnover, net VAT, turnover by payment type, and VAT by tax group
 * (Приложение № 1 А/Б/В/Г). Reversals (сторно) net into every total.
 *
 * Pure: takes the day's sales, returns the report. The period query reuses the
 * `collectSales` pattern (see `submit-audit-file.ts`).
 *
 * @standard BG Наредба-Н-18 §дневен-отчет · §Приложение-1 tax-groups
 * @audit ISO-19011:2018 §6.4 audit-evidence
 * @see src/services/sales/fiscal-receipt.ts (the shared VAT engine) · src/services/sales/audit-file.ts
 */

import { vatBreakdownForItems, type FiscalVatSubtotal } from './fiscal-receipt'

export interface DailySaleInput {
  readonly fiscalDeviceNumber: string
  readonly saleDate: string | Date
  readonly total: number
  readonly paymentType?: string
  readonly items?: ReadonlyArray<{ vatRate?: number; amount?: number }>
}

export interface DailyReport {
  readonly fiscalDeviceNumber: string
  /** Calendar day (UTC) `YYYY-MM-DD`. */
  readonly date: string
  readonly count: number
  /** Gross turnover (cents) — reversals subtract. */
  readonly grossTotal: number
  /** Net VAT (cents) across the day — reversals subtract. */
  readonly vatTotal: number
  /** Turnover (cents) per payment type. */
  readonly byPaymentType: Readonly<Record<string, number>>
  /** Net + VAT per fiscal tax group (А/Б/В/Г). */
  readonly vatByGroup: ReadonlyArray<FiscalVatSubtotal>
}

/** UTC calendar day (`YYYY-MM-DD`) of a date. */
function dayOf(d: string | Date): string {
  return (d instanceof Date ? d : new Date(d)).toISOString().slice(0, 10)
}

/**
 * Build the дневен отчет for one fiscal device + day. Defensively filters the
 * provided sales to the device + day, so a caller may pass a wider window.
 */
export function buildDailyReport(args: {
  sales: ReadonlyArray<DailySaleInput>
  fiscalDeviceNumber: string
  date: string // YYYY-MM-DD (UTC)
}): DailyReport {
  const day = args.sales.filter(
    (s) => s.fiscalDeviceNumber === args.fiscalDeviceNumber && dayOf(s.saleDate) === args.date,
  )

  const grossTotal = day.reduce((sum, s) => sum + (Number.isFinite(s.total) ? s.total : 0), 0)

  const byPaymentType: Record<string, number> = {}
  for (const s of day) {
    const pt = s.paymentType ?? 'cash'
    byPaymentType[pt] = (byPaymentType[pt] ?? 0) + (Number.isFinite(s.total) ? s.total : 0)
  }

  // One VAT pass over all the day's line items (reversal lines are negative).
  const allItems = day.flatMap((s) => s.items ?? [])
  const vatByGroup = vatBreakdownForItems(allItems)
  const vatTotal = vatByGroup.reduce((sum, g) => sum + g.vat, 0)

  return {
    fiscalDeviceNumber: args.fiscalDeviceNumber,
    date: args.date,
    count: day.length,
    grossTotal,
    vatTotal,
    byPaymentType,
    vatByGroup,
  }
}
