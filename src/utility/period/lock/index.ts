/**
 * Period-lock enforcement for GL-posting collections — see ./SKILL.md.
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

// Incl. GLPostings' sourceDate/postedDate so the period-lock that is wired to
// gl-postings is actually functional (it stores no plain `date` field).
const POSTABLE_DATE_FIELDS = ['date', 'transactionDate', 'postingDate', 'effectiveDate', 'sourceDate', 'postedDate'] as const

/** The locked fiscal period covering `isoDate` for `tenantId`, or null. */
export async function findLockedPeriodForDate(
  req: PayloadRequest,
  isoDate: string,
  tenantId: string | number,
): Promise<{ id: string | number; status: string; periodNumber: number; fiscalYear: number } | null> {
  const { docs } = await req.payload.find({
    collection: 'fiscal-periods',
    overrideAccess: true,
    limit: 1,
    where: {
      and: [
        { tenant: { equals: tenantId } },
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

/** `beforeChange` drop-in for any GL-posting collection: pick the posting date, find a locked
 * fiscal period covering it, throw. Silent on a draft with no date and on an unresolved tenant. */
export const validateNotLocked: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (!data || !req.user) return data

  // Tenant from doc field if set, else from canonical multi-tenant plugin shape.
  const docTenant = (data as Record<string, unknown>).tenant
  const userTenantsArr = (req.user as unknown as { tenants?: Array<{ tenant?: number | string }> }).tenants
  const userTenant = userTenantsArr?.[0]?.tenant
  const tenantId = (docTenant as string | number | undefined) ?? userTenant
  if (tenantId === undefined || tenantId === null) return data

  let postingDate: string | undefined
  for (const f of POSTABLE_DATE_FIELDS) {
    const v = (data as Record<string, unknown>)[f]
    if (v) {
      postingDate = typeof v === 'string' ? v : new Date(v as string | number | Date).toISOString()
      break
    }
  }
  if (!postingDate) return data

  // Fail CLOSED on a date that does not parse — an unparseable date matches no period, and
  // "matched nothing" must never read as "nothing is locked". See ./SKILL.md.
  if (Number.isNaN(new Date(postingDate).getTime())) {
    throw new Error(
      `Period lock cannot evaluate posting date ${String(postingDate).slice(0, 32)} — refusing rather than ` +
        'allowing: an unparseable date matches no period and would post into a locked one unchecked.',
    )
  }

  const locked = await findLockedPeriodForDate(req, postingDate, tenantId as string | number)
  if (locked) {
    throw new Error(
      `Period is locked: cannot post on ${postingDate.slice(0, 10)} — ` +
        `fiscal-period FY${locked.fiscalYear} P${locked.periodNumber} is ${locked.status}.`,
    )
  }
  return data
}
