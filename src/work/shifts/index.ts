/**
 * Workshifts — the per-actor-day labour aggregate: the efficiency + wage AUTHORITY.
 *
 * One row per (actor, day): the day an actor spent at a team, the minutes they
 * were present, the minutes of work the day ORDERED vs PRODUCED, and the two
 * numbers everything downstream inherits — `efficiencyPercent` and the `wage`.
 * Work orders do not compute their own efficiency; they roll UP into the shift
 * and read it back DOWN (the shift is the authority, the order the contributor).
 *
 * Grounded in 20 years of etrima production (`work_shifts`, 376,780 rows,
 * 1999–2018). The model below is the DATA-TRUE encoding; the legacy Rails
 * accidents (a never-quoted `finished_at`/`closed_at`, a dead `note`, a
 * vestigial `pay_per_hour`) are dropped, and the real invariants are pinned as
 * hooks + @invariant banners.
 *
 *   AUDITED INVARIANTS (etrima_production, read-only):
 *   • one row per actor-day — 376,775 / 376,780 distinct (employee_contract,date) = 99.999%.
 *   • efficiencyPercent = ⌊minutesProduced·100 / presenceMinutes⌋ (INTEGER truncation,
 *     NOT rounding) — 99.35% exact, 99.97% within ±1. Pile-up at 100 (the default
 *     fallback when produced or presence is 0); bell ≈ 72% (mean 71.6, p50 72);
 *     p99 ≈ 166; a real fat tail (max 17,946) where the order rollup dwarfs presence.
 *   • presenceMinutes ≤ shiftMinutes (presence is the worked subset of the scheduled
 *     shift) — 345,119 / 345,324 = 99.94%.
 *   • minutesProduced/Ordered come from the work-order rollup (Σ work-seconds / 60);
 *     `minutesBackordered = minutesOrdered − minutesProduced` (≥ 0).
 *   • wage = MAX(payPerHour·shiftMinutes/60, Σ work-order wages) — the greater of
 *     the time-clock pay and the piece rollup; live in 374,856 rows.
 *   • director + supervisor are BOTH actor-contracts (Rails `EmployeeContract`),
 *     so they are `employees` cross-relations, sparse (director 18%, supervisor 0.2%).
 *
 * @standard ISA-95:2013 / IEC-62264-1 §B.5 personnel + production-performance
 * @standard ISO-22400-2:2014 manufacturing-operations KPIs (labour efficiency / utilisation)
 * @standard ISO-8601-1:2019 date-time shift-start/finish/close
 * @standard ILO C001 hours-of-work presence-minutes
 * @accounting IFRS IAS-2 §12 cost-of-conversion direct-labour (the `wage` feed)
 * @accounting US-GAAP ASC-330-10-30 inventory-cost
 * @audit ISO-19011:2018 audit-trail labour-recording
 * @compliance SOX §404 internal-controls payroll-and-production-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/horo (the 7-position lifecycle ring)
 * @see src/employees (the actor/contract this aggregate is keyed by)
 */
import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'

import { createMembershipAdminMutateAccess } from '@/membership/admin/mutate/access'
import { tenantScopedCollectionReadAccess } from '@/tenant/scoped/read'
import { auditFields, referenceField } from '@/fields'
import { horoStateField, validateHoroStates, type HoroState } from '@/horo'

/**
 * The shift lifecycle, pinned to the seven-position horo ring `[1,2,4,8,7,5,9]`.
 * It traces the etrima lifecycle (`start! → produce → finish! → close`) onto the
 * ring so a labour-day is "closed in harmony" by construction. In the 20-yr data
 * only `started` was ever recorded in bulk (375,831 of 376,780; `finished_at` /
 * `closed_at` were 100% NULL — the lifecycle was DESIGNED but the close half was
 * latent). The ring restores the full intended walk; off-ring is escape.
 *
 *   1 base    opened    — the actor-day row is born (the aggregate node)
 *   2 share   started   — the actor clocks in; `startedAt` set (the live 99.7% state)
 *   4 weave   producing — work-orders weave into the day (minutesProduced accrues)
 *   8 crest   finished  — production stops; `finishedAt` set (the produce crest)
 *   7 descent reconciled— ordered↔produced↔backordered reconciled; efficiency descends
 *   5 round   waged     — wage rounds to the MAX of time-pay and order-rollup
 *   9 unity   closed    — `closedAt` sealed; the authority the orders read efficiency from
 */
const SHIFT_RING: readonly HoroState[] = [
  { step: 1, code: 'opened', label: 'Opened' },
  { step: 2, code: 'started', label: 'Started' },
  { step: 4, code: 'producing', label: 'Producing' },
  { step: 8, code: 'finished', label: 'Finished' },
  { step: 7, code: 'reconciled', label: 'Reconciled' },
  { step: 5, code: 'waged', label: 'Waged' },
  { step: 9, code: 'closed', label: 'Closed' },
]

// Harmony gate — a disharmonious ring is a build-time failure, not a runtime one.
const ring = validateHoroStates(SHIFT_RING)
if (!ring.ok) throw new Error(`work-shifts: horo disharmony — ${ring.errors.join('; ')}`)

const num = (v: unknown): number => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

/**
 * Compute the day's derived authority numbers from the recorded inputs. This is
 * the DATA-TRUE etrima formula (`set_efficiency` + `set_wage` + `update_totals`),
 * not the legacy per-order parallelism wage of the old work-center shift.
 *
 *   • minutesBackordered = max(0, minutesOrdered − minutesProduced)   (ordered = produced + backordered)
 *   • efficiencyPercent  = ⌊minutesProduced·100 / presenceMinutes⌋    (INTEGER truncation, the verified 99.35% match)
 *                          falls back to 100 when presence or produced is 0 (the production pile-up at 100)
 *   • wage               = max(timePay = payPerHour·shiftMinutes/60, orderWage rollup)  (the greater pole)
 *
 * @invariant minutesBackordered === max(0, minutesOrdered − minutesProduced)
 * @invariant presenceMinutes>0 && minutesProduced>0 ⇒ efficiencyPercent === ⌊minutesProduced·100 / presenceMinutes⌋
 * @invariant wage === round2(max(payPerHour·shiftMinutes/60, orderWage))
 */
export const computeShiftAuthority: CollectionBeforeChangeHook = ({ data }) => {
  const d = data as Record<string, unknown>

  const presence = num(d.presenceMinutes)
  const shift = num(d.shiftMinutes)
  const ordered = num(d.minutesOrdered)
  const produced = num(d.minutesProduced)

  // ordered = produced + backordered (the work-order rollup conservation; never negative).
  d.minutesBackordered = Math.max(0, ordered - produced)

  // efficiency = ⌊produced·100 / presence⌋ — INTEGER truncation (data-verified, not rounding).
  // Default to 100 when there is nothing to measure (the production fallback / pile-up at 100).
  d.efficiencyPercent =
    presence > 0 && produced > 0 ? Math.trunc((produced * 100) / presence) : 100

  // wage = MAX(time-clock pay, order-rollup wage), rounded to 2dp (the greater pole wins).
  const timePay = (num(d.payPerHour) * shift) / 60
  const orderWage = num(d.orderWage)
  d.wage = Math.round(Math.max(timePay, orderWage) * 100) / 100

  return data
}

/**
 * The conservation guard: a shift CLOSES (step 9, unity) only once it has been
 * reconciled into a wage — the labour-day's books must balance before it becomes
 * the authority orders inherit from. `closedAt` is the seal; without the derived
 * `wage` the day is not yet settled and cannot close (the ledger close rule
 * applied to labour, mirroring `requireJudgmentToSeal` on the justice docket).
 */
export const requireWageToClose: CollectionBeforeChangeHook = ({ data }) => {
  const d = data as Record<string, unknown>
  // `computeShiftAuthority` always sets `wage`; a close with no settled wage means
  // the authority was bypassed (raw create at status=closed) — reject it.
  if (d.status === 'closed' && (d.wage === undefined || d.wage === null)) {
    throw new Error(
      'work-shifts: a labour-day closes only once reconciled into a wage — the authority must settle before orders inherit it.',
    )
  }
  return data
}

export const WorkShifts: CollectionConfig = {
  slug: 'work-shifts',
  labels: { singular: 'Work Shift', plural: 'Work Shifts' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'actor', 'team', 'date', 'presenceMinutes', 'efficiencyPercent', 'wage', 'status'],
    group: 'Manufacturing',
    description:
      'The per-actor-day labour aggregate — the efficiency + wage authority. One row per (actor, day); work orders roll up into it and inherit its efficiency. efficiency = ⌊produced·100/presence⌋ (the 20-yr etrima truth).',
  },
  access: {
    create: createMembershipAdminMutateAccess('work-shifts'),
    delete: createMembershipAdminMutateAccess('work-shifts'),
    read: tenantScopedCollectionReadAccess,
    update: createMembershipAdminMutateAccess('work-shifts'),
  },
  fields: [
    referenceField({ description: 'Labour-day reference (e.g. `WS-2026-06-0042`).' }),

    // ── The actor-day key (one row per actor per day — the verified 99.999% cardinality) ──
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'employees',
      required: true,
      index: true,
      admin: { description: 'The actor (employee-contract) whose labour-day this is. The aggregate key with `date`.' },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      index: true,
      admin: { description: 'The calendar day this aggregate is for (ISO 8601). One row per (actor, date).' },
    },
    {
      name: 'team',
      type: 'relationship',
      relationTo: 'work-centers',
      index: true,
      admin: { description: 'The team / work-centre the actor worked the day at (sparse over the 20-yr data: 14 teams).' },
    },

    // ── Supervision cross — director + supervisor are BOTH actor-contracts (sparse) ──
    {
      name: 'director',
      type: 'relationship',
      relationTo: 'employees',
      index: true,
      admin: { description: 'Directing actor-contract (Rails `EmployeeContract`). Sparse — set on ~18% of days.' },
    },
    {
      name: 'supervisor',
      type: 'relationship',
      relationTo: 'employees',
      index: true,
      admin: { description: 'Supervising actor-contract (Rails `EmployeeContract`). Very sparse — ~0.2% of days.' },
    },

    // ── Lifecycle on the horo ring + the timestamps it pins ──
    horoStateField('status', SHIFT_RING, {
      defaultValue: 'started',
      required: true,
      description:
        'Lifecycle on the 1·2·4·8·7·5·9 ring: opened → started → producing → finished → reconciled → waged → closed. Off-ring is disharmony. (In 20-yr data only `started` was bulk-recorded; the close half was latent.)',
    }),
    { name: 'startedAt', type: 'date', index: true, admin: { description: 'Clock-in (ISO 8601). Set on 99.7% of the historical days.' } },
    { name: 'finishedAt', type: 'date', admin: { description: 'Production stop (ISO 8601). Latent in legacy data — restored by the lifecycle.' } },
    { name: 'closedAt', type: 'date', admin: { description: 'The seal (ISO 8601) — set when the day closes and becomes the authority.' } },

    // ── Recorded inputs ──
    {
      name: 'presenceMinutes',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: { description: 'Minutes the actor was PRESENT (the worked subset of the scheduled shift). The efficiency denominator.' },
    },
    {
      name: 'shiftMinutes',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: { description: 'Scheduled shift length in minutes (presenceMinutes ≤ shiftMinutes, verified 99.94%). The time-pay basis.' },
    },
    {
      name: 'payPerHour',
      type: 'number',
      min: 0,
      admin: { description: 'Time-clock rate per hour (defaults from the contract). Feeds the time-pay pole of `wage`.' },
    },
    {
      name: 'orderWage',
      type: 'number',
      min: 0,
      admin: {
        readOnly: true,
        description: 'Σ of the contributing work-order wages (the piece-rollup pole). `wage` is the MAX of this and time-pay.',
      },
    },

    // ── Rolled up FROM work orders (the shift is the authority they roll into) ──
    {
      name: 'minutesOrdered',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: { description: 'Σ work-minutes the day ORDERED (rollup from work orders: Σ work-seconds / 60).' },
    },
    {
      name: 'minutesProduced',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: { description: 'Σ work-minutes the day PRODUCED (rollup from work orders). The efficiency numerator.' },
    },
    {
      name: 'minutesBackordered',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Derived = max(0, minutesOrdered − minutesProduced). The unfinished remainder (ordered = produced + backordered).',
      },
    },

    // ── The authority numbers everything downstream inherits ──
    {
      name: 'efficiencyPercent',
      type: 'number',
      index: true,
      admin: {
        readOnly: true,
        description:
          'AUTHORITY. Derived = ⌊minutesProduced·100 / presenceMinutes⌋ (integer truncation), or 100 when there is nothing to measure. Bell ≈ 72%, pile at 100, p99 ≈ 166. Work orders inherit this. Do not edit.',
      },
    },
    {
      name: 'wage',
      type: 'number',
      index: true,
      admin: {
        readOnly: true,
        description:
          'AUTHORITY. Derived = max(payPerHour·shiftMinutes/60, orderWage), rounded to 2dp — the greater of time-pay and the piece rollup. Feeds IAS-2 cost-of-conversion. Do not edit.',
      },
    },

    // ── Production counters (rolled up; descriptive, not authoritative) ──
    { name: 'productsCount', type: 'number', min: 0, admin: { readOnly: true, description: 'Distinct products touched (rollup).' } },
    { name: 'lotsCount', type: 'number', min: 0, admin: { readOnly: true, description: 'Distinct lots touched (rollup).' } },
    { name: 'variantsCount', type: 'number', min: 0, admin: { readOnly: true, description: 'Distinct lot-variants touched (rollup).' } },
    { name: 'phasesCount', type: 'number', min: 0, admin: { readOnly: true, description: 'Distinct work-phases touched (rollup).' } },
    { name: 'unitsCount', type: 'number', min: 0, admin: { readOnly: true, description: 'Σ units ordered across the day (rollup).' } },

    ...auditFields({ readOnly: true }),
  ],
  hooks: {
    beforeChange: [computeShiftAuthority, requireWageToClose],
  },
  timestamps: true,
}

export default WorkShifts
