import { APIError, Forbidden, type CollectionBeforeChangeHook, type CollectionBeforeValidateHook } from 'payload'

import { getUser } from '@/access/collections/shared/multiTenantRead'
import { idOf } from '@/hooks/collections/shared/enforceSegregationOfDuties'

/**
 * A fiscal period's lifecycle — open → closed → locked, every rule reading the field where it is. The
 * hooks these replace read `status`, `startDate`, `fiscalYear` and `closedBy` at the top of the
 * document, where fiscal periods keep none of them (they sit in `lifecycle`, `dates` and `identity`):
 * so only-admins-lock never fired, no time was stamped, no date order was checked, no label derived,
 * and the four-eyes rule never saw the closer.
 *
 *   · the label is derived from the fiscal year and period number (`FY2026-P03`) unless one is given;
 *   · a period ends on or after it starts;
 *   · only an admin moves a period into or out of `locked`;
 *   · four eyes: whoever created the period does not close or lock it (ISO 27002 §5.3, SOX §404);
 *   · `closedAt/By`, `lockedAt/By` and `reopenedAt/By` are stamped by the server at the transition,
 *     and otherwise keep what is stored, whatever a caller sends.
 */

type Status = 'open' | 'closed' | 'locked'

interface Lifecycle {
  status?: Status | null
  closedAt?: string | null
  closedBy?: unknown
  lockedAt?: string | null
  lockedBy?: unknown
  reopenedAt?: string | null
  reopenedBy?: unknown
}

interface Period {
  label?: string | null
  identity?: { fiscalYear?: number | null; periodNumber?: number | null } | null
  dates?: { startDate?: string | null; endDate?: string | null } | null
  lifecycle?: Lifecycle | null
  createdBy?: unknown
}

/** `FY2026-P03`, from the fiscal year and period number. */
export const periodLabel = (identity: Period['identity']): string | undefined =>
  identity?.fiscalYear && identity.periodNumber != null ? `FY${identity.fiscalYear}-P${String(identity.periodNumber).padStart(2, '0')}` : undefined

/** A period ends on or after it starts. */
export const datesError = (dates: Period['dates']): string | true =>
  dates?.startDate && dates.endDate && new Date(dates.endDate).getTime() < new Date(dates.startDate).getTime() ? 'A fiscal period ends on or after it starts.' : true

const STAMPS = ['closedAt', 'closedBy', 'lockedAt', 'lockedBy', 'reopenedAt', 'reopenedBy'] as const

/**
 * The lifecycle after a change from `prev` to `next` by `actor`: the stamps of the transition set by the
 * server, every other stamp kept as stored. Throws the rule a transition breaks.
 */
export const nextLifecycle = (args: {
  prev: Status | undefined
  next: Status
  stored: Lifecycle
  actor: string | undefined
  creator: string | undefined
  isAdmin: boolean
  now: string
}): Lifecycle => {
  const { prev, next, stored, actor, creator, isAdmin, now } = args
  const intoLocked = next === 'locked' && prev !== 'locked'
  const outOfLocked = prev === 'locked' && next !== 'locked'
  if ((intoLocked || outOfLocked) && !isAdmin) throw new Forbidden()
  const closing = next === 'closed' && prev !== 'closed'
  if ((closing || intoLocked) && actor && creator && actor === creator)
    throw new APIError('Four eyes: whoever created a fiscal period does not close or lock it (ISO 27002 §5.3, SOX §404).', 403)
  const kept = Object.fromEntries(STAMPS.map((key) => [key, stored[key] ?? null])) as Lifecycle
  return {
    ...kept,
    status: next,
    ...(closing ? { closedAt: now, closedBy: actor ?? null } : {}),
    ...(intoLocked ? { lockedAt: now, lockedBy: actor ?? null } : {}),
    ...(outOfLocked ? { reopenedAt: now, reopenedBy: actor ?? null } : {}),
  }
}

export const deriveLabel: CollectionBeforeValidateHook = ({ data, originalDoc }) => {
  if (!data || data.label) return data
  const label = periodLabel((data as Period).identity ?? (originalDoc as Period | undefined)?.identity)
  return label ? { ...data, label } : data
}

export const periodLifecycle: CollectionBeforeChangeHook = ({ data, originalDoc, req }) => {
  if (!data) return data
  const period = data as Period
  const stored = (originalDoc ?? {}) as Period
  const dates = { ...stored.dates, ...period.dates }
  const error = datesError(dates)
  if (error !== true) throw new APIError(error, 400)
  const prev = (stored.lifecycle?.status ?? undefined) as Status | undefined
  const next = (period.lifecycle?.status ?? prev ?? 'open') as Status
  const lifecycle = nextLifecycle({
    prev,
    next,
    stored: stored.lifecycle ?? {},
    actor: idOf(req.user?.id),
    creator: idOf(stored.createdBy) ?? (originalDoc ? undefined : idOf(req.user?.id)),
    isAdmin: Boolean(getUser(req)?.roles?.includes('admin')),
    now: new Date().toISOString(),
  })
  return { ...data, lifecycle: { ...period.lifecycle, ...lifecycle } }
}
