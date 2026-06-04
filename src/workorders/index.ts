/**
 * Workorders — the production EXECUTION leaf, evolved from 2.05M rows of the
 * etrima `work_orders` table (the 20-year manufacturing ledger).
 *
 * One work order = one (lotworkphase × lotvariant) production assignment for one
 * worker on one shift: "make these units of this phase". This is the per-phase,
 * per-worker shop-floor row the operator actually books production against, and the
 * unit the piece-rate wage is computed on. It carries the canonical slug
 * `work-orders`: it SUPERSEDED a former 2-field idealized MRP stub (the data is the
 * truth, not the speculative header) — the planning/header role now lives properly
 * in the lot funnel (`@/lots` → `@/lotvariants` → `@/lotworkphases`).
 *
 * THE DATA-VERIFIED COLLAPSE (the accidents the code carried, fixed):
 *
 *  • 36 option columns → ONE `options` array `[{label, ordered, produced, backordered}]`.
 *    The Rails schema hard-coded `option_1..12_units_{ordered,produced,backordered}`;
 *    AUDIT shows option-1 used in ~100% of rows, option-2 in 1.4%, option-3 in 773
 *    rows, option-6 in 38, option-12 in ZERO — the 36 columns were a fixed-width
 *    accident. The array models the real cardinality (mostly one option) without
 *    eleven dead columns.
 *
 *  • Header totals `unitsOrdered / unitsProduced / unitsBackordered` are DERIVED
 *    (the double-entry of options ⊕ header). AUDIT: `units_ordered = Σ option_n`
 *    held at EXACTLY 100.0000% over all 2,050,575 rows (and the same for produced
 *    and backordered). The header is the books; the options are the entries; they
 *    balance by construction. `assertTotalsBalance` (beforeChange) recomputes the
 *    totals from the array — the totals can never drift from the entries.
 *
 *  • Lifecycle → a DERIVED `state` on the seven-position horo ring, COMPUTED in an
 *    afterRead hook, NEVER stored. The Rails table carried five independent boolean
 *    flags (started/paused/completed/closed/archived). AUDIT: `paused` was true in
 *    ZERO of 2.05M rows (a dead flag), and the flags were not strictly nested (773
 *    rows completed-but-not-started) — so they are not a clean state. The true state
 *    is read from production progress + the seal flags: open·ordered·in-production·
 *    packed·shipped·delivered·closed.
 *
 *  • DEAD columns dropped (null/zero in 100% of rows): `manager_id`, `backorder_id`,
 *    `vendor_order_id`, `paused`, `cost_per_minute`, `price_per_minute`,
 *    `minutes_backordered`, `minutes_remaining` (the last is derived, not stored).
 *
 * THE RESOURCE CROSS (relationships): a work order sits at the meeting of the
 * lot-phase/variant axis, the shift/machine/team axis, and the unified-actor axis
 * (worker/supervisor/director — typeless actor = employee, per the actor-merge law).
 *
 * THE CONVEYOR (`forwardProducedToNextPhase`, afterChange): when this phase
 * completes, its produced units become the NEXT phase's ordered units — the
 * Rails `forward!`/`complete!` chain, the manufacturing routing made into a
 * data flow. Production flows phase→phase like a ledger posts account→account.
 *
 * THE WAGE (`pieceRateWage`, computed in afterRead): the canonical etrima formula,
 * verified to total €4,683,899.53 over 2,020,326 payable rows —
 *   wage = unitsProduced × unitSeconds × payPerHour / 3600 / mpw
 *   where mpw = (machinesPerWorker is null or 0) ? 1 : machinesPerWorker
 * Piece-rate: you are paid for what you PRODUCE, at the phase rate, divided by how
 * many machines you tend at once. This is the karma double-entry at the shop floor —
 * verified-produced-time-leveraged pay (the allocation law).
 *
 * @invariant unitsOrdered    = Σ options[].ordered     (100.0000% over 2.05M rows)
 * @invariant unitsProduced   = Σ options[].produced    (double-entry: header = Σ entries)
 * @invariant unitsBackordered= Σ options[].backordered
 * @invariant wage = unitsProduced·unitSeconds·payPerHour / 3600 / mpw  (mpw≥1)
 * @invariant state ∈ horo ring [1,2,4,8,7,5,9] — derived, never stored
 *
 * @standard ISA-95:2013 §B.5 production-operations-management work-order-execution
 * @standard ISO-8601-1:2019 date-time started·completed·estimated
 * @accounting IFRS IAS-2 §10 §12 cost-of-conversion (the piece-rate wage = direct labour)
 * @accounting IFRS IAS-19 §11 short-term-employee-benefits piece-rate
 * @audit ISO-19011:2018 audit-trail production-execution
 * @compliance SOX §404 internal-controls production-control TOM-PROD-01
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/lots/index.ts · src/lotworkphases/index.ts (the lot funnel = the planning/header layer)
 * @see src/horo/index.ts (the seven-position state ring)
 * @see src/allocation (the harmonic pay ladder this wage feeds)
 * @see ~/github/ceccec/etrima/app/models/work_order.rb (the source-of-truth formulas)
 */
import type {
  CollectionConfig,
  CollectionBeforeChangeHook,
  CollectionAfterChangeHook,
  CollectionAfterReadHook,
  Field,
} from 'payload'

import { createMembershipAdminMutateAccess } from '@/membership/admin/mutate/access'
import { tenantScopedCollectionReadAccess } from '@/tenant/scoped/read'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { referenceField, auditFields } from '@/fields'
import { HORO_DIGITS, isHoroStep, type HoroStep } from '@/horo'

// ─── The option line (the collapse of the 36 fixed columns) ──────────
//
// Each option is one variant-line of the phase's output. AUDIT: row ≈ one option;
// the array carries however many the real row has, no dead slots.
const optionLineFields: Field[] = [
  { name: 'label', type: 'text', admin: { description: 'Option / variant label (was the `option_N` slot).' } },
  { name: 'ordered', type: 'number', min: 0, defaultValue: 0, admin: { description: 'Units ordered for this option.' } },
  { name: 'produced', type: 'number', min: 0, defaultValue: 0, admin: { description: 'Units produced for this option.' } },
  { name: 'backordered', type: 'number', min: 0, defaultValue: 0, admin: { description: 'Units backordered for this option.' } },
]

interface OptionLine {
  label?: string | null
  ordered?: number | null
  produced?: number | null
  backordered?: number | null
}

const toInt = (v: unknown): number => {
  const n = Number(v)
  return Number.isFinite(n) ? Math.trunc(n) : 0
}

const sumOptions = (options: readonly OptionLine[] | null | undefined, key: keyof OptionLine): number =>
  (options ?? []).reduce((acc, o) => acc + toInt(o?.[key]), 0)

// ─── The state ring (DERIVED, never stored) ──────────────────────────
//
// The seven-position horo lifecycle. The brief's mapping, pinned to the ring:
//   1 base    open          — the order exists, nothing ordered yet
//   2 share   ordered       — units ordered, none produced (the demand is shared in)
//   4 weave   in-production — partially produced (the work is woven)
//   8 crest   packed        — fully produced, output assembled (the merge crest)
//   7 descent shipped       — completed + handed forward (descends to the next phase)
//   5 round   delivered     — the receiving phase/customer has it (rounds to balance)
//   9 unity   closed        — sealed; the next phase's open (the new 0)
export const WORKORDER_RING: readonly { step: HoroStep; code: string; label: string }[] = [
  { step: 1, code: 'open', label: 'Open' },
  { step: 2, code: 'ordered', label: 'Ordered' },
  { step: 4, code: 'in-production', label: 'In Production' },
  { step: 8, code: 'packed', label: 'Packed' },
  { step: 7, code: 'shipped', label: 'Shipped' },
  { step: 5, code: 'delivered', label: 'Delivered' },
  { step: 9, code: 'closed', label: 'Closed' },
]

// Harmony gate — a disharmonious ring is a build-time failure (the horo law).
{
  const steps = WORKORDER_RING.map((s) => s.step)
  if (JSON.stringify(steps) !== JSON.stringify([...HORO_DIGITS])) {
    throw new Error(`workorders: horo disharmony — expected ${HORO_DIGITS.join(',')}, got ${steps.join(',')}`)
  }
  for (const s of WORKORDER_RING) {
    if (!isHoroStep(s.step)) throw new Error(`workorders: state ${s.code} step ${s.step} is off-ring (escape)`)
  }
}

interface WorkorderShape {
  options?: OptionLine[] | null
  unitsOrdered?: number | null
  unitsProduced?: number | null
  unitsBackordered?: number | null
  machinesPerWorker?: number | null
  unitSeconds?: number | null
  payPerHour?: number | null
  completedAt?: string | null
  deliveredAt?: string | null
  closedAt?: string | null
  state?: string
  wage?: number
  minutesRemaining?: number
}

/**
 * The derived horo state from production progress + the seal timestamps.
 * Pure — given the row's totals and seal marks it returns exactly one ring
 * position. Closed/delivered/shipped are gated by their timestamps (the seal
 * flags); production progress drives open→ordered→in-production→packed.
 */
export const deriveState = (doc: WorkorderShape): string => {
  if (doc.closedAt) return 'closed'
  if (doc.deliveredAt) return 'delivered'
  if (doc.completedAt) return 'shipped'
  const ordered = toInt(doc.unitsOrdered)
  const produced = toInt(doc.unitsProduced)
  if (ordered === 0) return 'open'
  if (produced === 0) return 'ordered'
  if (produced >= ordered) return 'packed'
  return 'in-production'
}

/** mpw — the etrima rule: null or 0 ⇒ 1 (never divide by zero/null). */
export const machinesPerWorker = (v: unknown): number => {
  const n = toInt(v)
  return n <= 0 ? 1 : n
}

/**
 * The canonical piece-rate wage (verified €4,683,899.53 over 2.02M rows):
 *   unitsProduced × unitSeconds × payPerHour / 3600 / mpw
 */
export const pieceRateWage = (doc: WorkorderShape): number => {
  const produced = toInt(doc.unitsProduced)
  const unitSeconds = toInt(doc.unitSeconds)
  const pay = Number(doc.payPerHour)
  if (!Number.isFinite(pay) || pay <= 0 || unitSeconds <= 0 || produced <= 0) return 0
  const mpw = machinesPerWorker(doc.machinesPerWorker)
  return Math.round(((produced * unitSeconds * pay) / 3600 / mpw) * 100) / 100
}

/** work-minutes remaining = (ordered − produced) × unitSeconds / mpw / 60 (etrima `work_minutes_remaining`). */
export const minutesRemaining = (doc: WorkorderShape): number => {
  const remaining = toInt(doc.unitsOrdered) - toInt(doc.unitsProduced)
  const unitSeconds = toInt(doc.unitSeconds)
  if (remaining <= 0 || unitSeconds <= 0) return 0
  const mpw = machinesPerWorker(doc.machinesPerWorker)
  return Math.trunc((remaining * unitSeconds) / mpw / 60)
}

/**
 * @invariant Header totals = Σ options (the double-entry). Recompute the three
 * totals from the array on every write so the books can never drift from the
 * entries — exactly the property AUDIT found held at 100.0000% in production.
 */
export const assertTotalsBalance: CollectionBeforeChangeHook = ({ data }) => {
  const d = data as WorkorderShape
  const options = d.options ?? []
  d.unitsOrdered = sumOptions(options, 'ordered')
  d.unitsProduced = sumOptions(options, 'produced')
  d.unitsBackordered = sumOptions(options, 'backordered')
  return data
}

/**
 * Inherit efficiency from the work-shift AUTHORITY. A work order does NOT compute its
 * own efficiency — it rolls UP into the shift (its produced minutes) and reads it back
 * DOWN: on save, `efficiencyPercent` is denormalised from the related `work-shifts` row
 * (the per-actor-day authority, ⌊minutesProduced·100 / presenceMinutes⌋). The shift is
 * the authority, the order the contributor. Best-effort — an absent / unfetchable shift
 * leaves the prior value untouched, never blocking the booking.
 */
export const inheritShiftEfficiency: CollectionBeforeChangeHook = async ({ data, req }) => {
  const d = data as { workShift?: unknown; efficiencyPercent?: number }
  const ws = d.workShift
  if (ws == null) return data
  // The shift may arrive as an id (depth 0) or an already-populated object (depth ≥ 1).
  if (typeof ws === 'object' && typeof (ws as { efficiencyPercent?: unknown }).efficiencyPercent === 'number') {
    d.efficiencyPercent = (ws as { efficiencyPercent: number }).efficiencyPercent
    return data
  }
  const id = typeof ws === 'string' || typeof ws === 'number' ? ws : (ws as { id?: string | number })?.id
  if (id == null) return data
  try {
    const shift = await req.payload.findByID({ collection: 'work-shifts', id, depth: 0, overrideAccess: true, req })
    const eff = (shift as { efficiencyPercent?: unknown })?.efficiencyPercent
    if (typeof eff === 'number') d.efficiencyPercent = eff
  } catch {
    // The authority may be unreachable mid-transaction; keep the prior value (best-effort).
  }
  return data
}

/**
 * The forward! conveyor — when this phase completes, its produced units become
 * the NEXT phase's ordered units. Resolves the next lot-work-phase by sort order
 * within the same lot-variant and seeds (or tops up) its work order. Production
 * flows phase→phase the way a ledger posts account→account.
 *
 * Guarded: only fires once the order is `completed` (has a completedAt) and has
 * produced output, and only when a downstream phase exists. Best-effort and
 * idempotent on `forwardedFrom` so re-saves do not double-post (the conveyor
 * never creates two successors for one source).
 */
export const forwardProducedToNextPhase: CollectionAfterChangeHook = async ({ doc, req }) => {
  try {
    const d = doc as WorkorderShape & {
      id?: string
      completedAt?: string | null
      lotVariantCode?: string | null
      lotWorkPhaseCode?: string | null
      lotWorkPhaseSort?: number | null
      forwardedTo?: unknown
    }
    if (!d.completedAt) return doc
    const produced = sumOptions(d.options, 'produced')
    if (produced <= 0) return doc
    if (d.forwardedTo) return doc // already conveyed (idempotent)
    if (!d.lotVariantCode) return doc

    // Next phase = the smallest sort strictly greater than this one, same variant.
    const next = (await req.payload.find({
      collection: 'work-orders',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      req,
      sort: 'lotWorkPhaseSort',
      where: {
        and: [
          { lotVariantCode: { equals: d.lotVariantCode } },
          { lotWorkPhaseSort: { greater_than: toInt(d.lotWorkPhaseSort) } },
        ],
      },
    })) as unknown as { docs: Array<{ id: string; options?: OptionLine[] | null }> }

    const successor = next.docs[0]
    if (!successor) return doc // last phase — nothing downstream to feed

    // Top up the successor's ordered units from this phase's produced (per option).
    const merged: OptionLine[] = (d.options ?? []).map((o) => ({
      label: o.label ?? null,
      ordered: Math.max(toInt(o.produced), toInt(o.ordered)),
      produced: 0,
      backordered: 0,
    }))
    await req.payload.update({
      collection: 'work-orders',
      id: successor.id,
      depth: 0,
      overrideAccess: true,
      req,
      data: { options: merged, forwardedFrom: d.id },
    })
    await req.payload.update({
      collection: 'work-orders',
      id: d.id as string,
      depth: 0,
      overrideAccess: true,
      req,
      data: { forwardedTo: successor.id },
    })
  } catch {
    // Conveyor is best-effort; a downstream failure must not block the booking.
  }
  return doc
}

/**
 * Decorate every read with the DERIVED fields — state, wage, minutesRemaining —
 * computed, never stored (DERIVE-FROM-FS-FIRST: the computed value is the truth,
 * the stored copy would only drift).
 */
export const decorateDerived: CollectionAfterReadHook = ({ doc }) => {
  const d = doc as WorkorderShape
  d.state = deriveState(d)
  d.wage = pieceRateWage(d)
  d.minutesRemaining = minutesRemaining(d)
  return doc
}

export const Workorders: CollectionConfig = {
  slug: 'work-orders',
  labels: { singular: 'Work Order', plural: 'Work Orders' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'date', 'lotWorkPhaseCode', 'worker', 'unitsOrdered', 'unitsProduced'],
    group: 'Manufacturing',
    description:
      'The production execution leaf (2.05M-row etrima twin) — one (lotphase × variant) assignment per worker/shift. Options array ⊕ derived header totals (double-entry), derived horo state, the forward! conveyor, and the piece-rate wage.',
  },
  access: {
    create: createMembershipAdminMutateAccess('work-orders'),
    read: tenantScopedCollectionReadAccess,
    update: createMembershipAdminMutateAccess('work-orders'),
    delete: createMembershipAdminMutateAccess('work-orders'),
  },
  fields: [
    referenceField({ description: 'Work-order reference (e.g. `WO-2026-04-000123`).' }),
    { name: 'date', type: 'date', index: true, admin: { description: 'ISO 8601 — the production date (the shift date in etrima).' } },

    // ── The options array (the 36-column collapse) ──
    {
      name: 'options',
      type: 'array',
      labels: { singular: 'Option', plural: 'Options' },
      fields: optionLineFields,
      admin: {
        description:
          'Variant lines of this phase output — the collapse of the 36 fixed `option_1..12` columns. AUDIT: option-1 ~100%, option-12 0% of 2.05M rows, so the array models the real cardinality (mostly one line).',
      },
    },

    // ── Derived header totals (double-entry; recomputed from options on write) ──
    { name: 'unitsOrdered', type: 'number', min: 0, defaultValue: 0,
      admin: { readOnly: true, description: 'Σ options[].ordered — derived (100.0000% invariant over 2.05M rows).' } },
    { name: 'unitsProduced', type: 'number', min: 0, defaultValue: 0,
      admin: { readOnly: true, description: 'Σ options[].produced — derived (double-entry: header = Σ entries).' } },
    { name: 'unitsBackordered', type: 'number', min: 0, defaultValue: 0,
      admin: { readOnly: true, description: 'Σ options[].backordered — derived.' } },

    // ── The piece-rate inputs ──
    { name: 'unitSeconds', type: 'number', min: 0,
      admin: { description: 'Seconds of work per unit at this phase (the phase standard time).' } },
    { name: 'machinesPerWorker', type: 'number', min: 0,
      admin: { description: 'Machines one worker tends at once. Null/0 ⇒ 1 (the wage divisor; never divide by zero).' } },
    { name: 'payPerHour', type: 'number', min: 0,
      admin: { description: 'Pay rate per hour for this assignment (the phase / worker / vendor-order rate).' } },
    { name: 'efficiencyPercent', type: 'number', min: 0,
      admin: { readOnly: true, description: 'Shift efficiency % — INHERITED from the related work-shift authority on save (inheritShiftEfficiency); the shift is the authority, the order the contributor. Never hand-set. AUDIT avg ≈ 50.6%.' } },

    // ── The lifecycle seal timestamps (the state is DERIVED from these + progress) ──
    { name: 'startedAt', type: 'date', admin: { description: 'ISO 8601 — first production booked.' } },
    { name: 'completedAt', type: 'date', admin: { description: 'ISO 8601 — fully produced (→ shipped, fires the conveyor).' } },
    { name: 'deliveredAt', type: 'date', admin: { description: 'ISO 8601 — received by the next phase / customer (→ delivered).' } },
    { name: 'closedAt', type: 'date', admin: { description: 'ISO 8601 — sealed (→ closed, the next phase open).' } },
    { name: 'estimatedAt', type: 'date', admin: { readOnly: true, description: 'ISO 8601 — projected completion (now + minutesRemaining).' } },

    // ── The resource cross — the three axes that meet at a work order ──
    //
    // lot-phase / variant axis: content-addressed codes (the lot-routing collections
    // are not yet minted; codes keep the leaf self-consistent and merge-safe).
    { name: 'lotVariantCode', type: 'text', index: true,
      admin: { description: 'Lot-variant code — the product variant in this lot (the lotvariant cross).' } },
    { name: 'lotWorkPhaseCode', type: 'text', index: true,
      admin: { description: 'Lot-work-phase code — the routing step (the lotworkphase cross).' } },
    { name: 'lotWorkPhaseSort', type: 'number', index: true,
      admin: { description: 'Phase order within the routing — drives the forward! conveyor (next = smallest sort greater than this).' } },
    { name: 'machineCode', type: 'text',
      admin: { description: 'Machine code (AUDIT: set on only ~0.26% of rows — optional by data).' } },
    { name: 'teamCode', type: 'text', index: true, admin: { description: 'Team code — the producing team.' } },

    // shift axis: the one existing target collection.
    { name: 'workShift', type: 'relationship', relationTo: 'work-shifts',
      admin: { description: 'The work-shift this order was booked on.' } },

    // actor axis: worker / supervisor / director → the unified actor (typeless
    // user = employee, the actor-merge law). Rails `EmployeeContract` ⇒ `employees`.
    { name: 'worker', type: 'relationship', relationTo: 'employees', index: true,
      admin: { description: 'The producing actor (Rails EmployeeContract → the unified actor). AUDIT: present on ~99.99% of rows.' } },
    { name: 'supervisor', type: 'relationship', relationTo: 'employees',
      admin: { description: 'Supervising actor (AUDIT: ~91% of rows).' } },
    { name: 'director', type: 'relationship', relationTo: 'employees',
      admin: { description: 'Directing actor (AUDIT: ~21% of rows — optional by data).' } },

    // ── The conveyor links (idempotency for forward!) ──
    { name: 'forwardedFrom', type: 'relationship', relationTo: 'work-orders',
      admin: { readOnly: true, description: 'The upstream phase whose produced units seeded this order (the conveyor source).' } },
    { name: 'forwardedTo', type: 'relationship', relationTo: 'work-orders',
      admin: { readOnly: true, description: 'The downstream phase this order forwarded its output to (set once; the conveyor is idempotent).' } },

    { name: 'note', type: 'textarea', admin: { description: 'Free-text note (AUDIT: present on ~0.9% of rows).' } },

    ...auditFields({ readOnly: true }),
  ],
  hooks: standardCollectionHooks('work-orders', {
    beforeChange: [assertTotalsBalance, inheritShiftEfficiency],
    afterChange: [forwardProducedToNextPhase],
  }),
  timestamps: true,
}

// The derived decorator is registered separately so it never displaces the
// standard spine's afterChange audit hook (afterRead is its own lane).
Workorders.hooks = { ...Workorders.hooks, afterRead: [decorateDerived] }

export default Workorders
