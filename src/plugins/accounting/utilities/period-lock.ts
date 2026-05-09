/**
 * Period-lock enforcement for GL-posting collections.
 *
 * Mirrors Ruby ERPAX's `host.accounting_locked_for_date?(date)`: once a fiscal
 * period's status === 'locked', no transaction with a posting date inside
 * that period may be created or updated.
 *
 * @standard ISO-8601-1:2019 date-time utc-canonical-form
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
 * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
 * @compliance SOX §404 period-close-integrity
 * @security ISO-27002 §5.4 segregation-of-duties
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2
 */

import type { CollectionBeforeChangeHook, PayloadRequest } from 'payload'

const POSTABLE_DATE_FIELDS = ['date', 'transactionDate', 'postingDate', 'effectiveDate'] as const

/**
 * Returns the locked fiscal period covering `isoDate` for `host`,
 * or `null` if no locked period covers that date.
 */
export async function findLockedPeriodForDate(
  req: PayloadRequest,
  isoDate: string,
  host: string | number,
): Promise<{ id: string | number; status: string; periodNumber: number; fiscalYear: number } | null> {
  const { docs } = await req.payload.find({
    collection: 'fiscal-periods',
    overrideAccess: true,
    limit: 1,
    where: {
      and: [
        { host: { equals: host } },
        { status: { equals: 'locked' } },
        { startDate: { less_than_equal: isoDate } },
        { endDate: { greater_than_equal: isoDate } },
      ],
    },
  })
  return (docs[0] as unknown as {
    id: string | number; status: string; periodNumber: number; fiscalYear: number
  }) ?? null
}

/**
 * `beforeChange` hook drop-in for any GL-posting collection (Invoices, Payments,
 * Entries, Equations, JournalEntries, GLPostings, BankStatements,
 * PeriodEndAdjustments, …).
 *
 *   1. Picks the posting date — first present of: `date`, `transactionDate`,
 *      `postingDate`, `effectiveDate`.
 *   2. Looks up a locked fiscal-period covering that date for the host.
 *   3. Throws if found, blocking the write.
 *
 * Skips silently when no date is set yet (drafts) or no host has been resolved.
 */
export const validateNotLocked: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (!data || !req.user) return data

  const host = (data as Record<string, unknown>).host ?? (req.user as { host?: unknown }).host
  if (!host) return data

  let postingDate: string | undefined
  for (const f of POSTABLE_DATE_FIELDS) {
    const v = (data as Record<string, unknown>)[f]
    if (v) {
      postingDate = typeof v === 'string' ? v : new Date(v as string | number | Date).toISOString()
      break
    }
  }
  if (!postingDate) return data

  const locked = await findLockedPeriodForDate(req, postingDate, host as string | number)
  if (locked) {
    throw new Error(
      `Period is locked: cannot post on ${postingDate.slice(0, 10)} — ` +
        `fiscal-period FY${locked.fiscalYear} P${locked.periodNumber} is ${locked.status}.`,
    )
  }
  return data
}
