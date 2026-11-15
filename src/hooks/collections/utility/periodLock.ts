/**
 * Period-lock enforcement for GL-posting collections — see ./SKILL.md.
 *
 * @standard ISO-8601-1:2019 date-time utc-canonical-form
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
 * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
 * @compliance SOX §404 period-close-integrity
 * @security ISO-27002 §5.3 segregation-of-duties
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2
 */

import { APIError, type CollectionBeforeChangeHook, type PayloadRequest } from 'payload'

/**
 * The period lock. Every collection that posts to the ledger names the field that dates its postings
 * (`periodLock('entryDate')`, `periodLock('dates.date')`): a fixed list of candidate names guessed
 * wrong for the two that matter most — journal entries date by `entryDate` and invoices by
 * `dates.date`, neither on the list — so the lock never looked at them. And the period was asked for
 * `status`, `startDate` and `endDate`, which fiscal periods keep under `lifecycle` and `dates`.
 *
 * Both the date being written and the date already stored are checked: a locked posting can be
 * neither edited nor moved out of its period by leaving the date out of the request.
 */

interface LockedPeriod {
  id: string | number
  label?: string | null
  identity?: { fiscalYear?: number | null; periodNumber?: number | null } | null
}

/** The value at a dot path (`dates.date`). */
const at = (doc: unknown, path: string): unknown =>
  path.split('.').reduce<unknown>((value, key) => (value && typeof value === 'object' ? (value as Record<string, unknown>)[key] : undefined), doc)

/** The locked fiscal period covering `isoDate` for `tenantId`, or null. */
export async function findLockedPeriodForDate(req: PayloadRequest, isoDate: string, tenantId: string | number): Promise<LockedPeriod | null> {
  const { docs } = await req.payload.find({
    collection: 'fiscal-periods',
    overrideAccess: true,
    depth: 0,
    limit: 1,
    req,
    where: {
      and: [
        { tenant: { equals: tenantId } },
        { 'lifecycle.status': { equals: 'locked' } },
        { 'dates.startDate': { less_than_equal: isoDate } },
        { 'dates.endDate': { greater_than_equal: isoDate } },
      ],
    },
  })
  return (docs[0] as unknown as LockedPeriod | undefined) ?? null
}

const nameOf = (period: LockedPeriod): string =>
  period.label || (period.identity?.fiscalYear ? `FY${period.identity.fiscalYear} P${period.identity.periodNumber ?? '?'}` : String(period.id))

/** A date as an ISO string, refusing (fail closed) one that does not parse: it would match no period. */
const isoOf = (value: unknown): string => {
  const iso = typeof value === 'string' ? value : new Date(value as string | number | Date).toISOString()
  if (Number.isNaN(new Date(iso).getTime()))
    throw new APIError(
      `Period lock cannot evaluate posting date ${String(value).slice(0, 32)} — refusing rather than allowing: an unparseable date matches no period and would post into a locked one unchecked.`,
      400,
    )
  return iso
}

/** The period lock for a collection whose postings are dated at `path`. Silent with no user, no tenant or no date. */
export const periodLock = (path: string): CollectionBeforeChangeHook => {
  const hook: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
    if (!data || !req.user) return data
    const userTenant = (req.user as unknown as { tenants?: { tenant?: string | number }[] }).tenants?.[0]?.tenant
    const tenantId = ((data as Record<string, unknown>).tenant ?? (originalDoc as Record<string, unknown> | undefined)?.tenant ?? userTenant) as
      | string
      | number
      | undefined
    if (tenantId === undefined || tenantId === null) return data
    const dates = new Set([at(data, path), at(originalDoc, path)].filter((v) => v !== undefined && v !== null && v !== '').map(isoOf))
    for (const iso of dates) {
      const locked = await findLockedPeriodForDate(req, iso, tenantId)
      if (locked) throw new APIError(`Period is locked: cannot post on ${iso.slice(0, 10)} — fiscal period ${nameOf(locked)} is locked.`, 403)
    }
    return data
  }
  Object.defineProperty(hook, 'name', { value: 'periodLock' })
  return hook
}
