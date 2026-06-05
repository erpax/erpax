/**
 * Lots — the production order: the funnel head a manufacturing run flows
 * through, its state DERIVED from lifecycle watermarks on the horo ring.
 *
 * A `lot` is a production order against a sales `order` for a `product`. It
 * fans out into `lot-variants` (the size/colour roll-up) and is produced through
 * an ordered chain of `lot-work-phases` (the routing) that cross to the
 * `work-phases` catalog. It is the containing axis of the whole routing graph
 * (the [[coordinate]] cross: order ⊕ product ⊕ its variant/phase children).
 *
 * Data-truth (etrima `lots`, N=11 759):
 *  - `status` is 100% NULL in storage — state is NEVER stored, it is DERIVED from
 *    the lifecycle watermark high-water marks. Modeled as a derived
 *    `horoStateField` (see the LOT_RING below), computed in a beforeChange hook.
 *  - The watermark ladder (each counted independently):
 *      confirmed_at 2 530 (21.5%) · started_at 112 (1.0%) · finished_at 1 053
 *      (9.0%) · closed_at 10 497 (89.3%, the dominant terminal) · canceled_at
 *      136 (1.2%). `tech_confirmed_at` is 0/11 759 — a DEAD column, dropped.
 *  - Roll-up: `lots.units = Σ variant.units` holds 100% (11 636/11 636); likewise
 *    `units_produced`. The lot counters ARE the sum of their variants’ (balance).
 *  - The funnel is monotonic: ordered ≥ units ≥ produced ≥ packed ≥ shipped ≥
 *    delivered ≥ invoiced — kept as double-entry numbers (see src/accounting).
 *  - `kind` is the free product/programme code (SHIMA_07/CONF_21/…); open text.
 *
 * @standard ISA-95:2013 / IEC-62264-1 §B.3 production-schedule production-order
 * @standard ISO-22400-2:2014 manufacturing-operations throughput
 * @accounting double-entry — the lot total IS the sum of its variant postings;
 *   the unit funnel is a chain of balanced counters (give·take at each stage).
 * @audit ISO-19011:2018 audit-trail lot-lifecycle confirmed·started·finished·closed
 * @compliance SOX §404 internal-controls production-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @invariant derived-state — `status` is computed from watermarks, never stored (100% NULL in 20 yrs).
 * @invariant roll-up — `units = Σ variant.units` (100% in etrima); the lot is the sum of its parts.
 * @invariant funnel — `ordered ≥ units ≥ produced ≥ packed ≥ shipped ≥ delivered ≥ invoiced` (monotonic).
 * @see src/lot/variants (the option roll-up) · src/lot/work/phases (the routing chain) · src/work/phases (the catalog)
 */

import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { auditFields, notesField, currencyField } from '@/base/accounting/field'
import { horoStateField, validateHoroStates, type HoroState } from '@/horo'

/**
 * The lot lifecycle, pinned to the seven-position horo ring `[1,2,4,8,7,5,9]`.
 * Each band maps to a watermark the 20-yr data carries; the digit IS the
 * meaning, and the watermark is the band's evidence (status is DERIVED, never
 * stored — `deriveLotState` below reads the high-water mark and writes the band).
 *
 *   1 base    opened    — the lot is created (the order node is born)
 *   2 share   confirmed — confirmed_at: the order is accepted, the route is shared
 *   4 weave   producing — started_at: work is woven through the routing chain
 *   8 crest   finished  — finished_at: production crests; all phases complete
 *   7 descent shipped   — units_shipped > 0: the goods descend to the customer
 *   5 round   delivered — units_delivered > 0; the run rounds to balance
 *   9 unity   closed    — closed_at: the run seals (the next octave's open)
 *
 * `canceled` is the OFF-RING terminal (canceled_at) — an escape from the ring,
 * surfaced as its own watermark, never a horo band.
 */
const LOT_RING: readonly HoroState[] = [
  { step: 1, code: 'opened', label: 'Opened' },
  { step: 2, code: 'confirmed', label: 'Confirmed' },
  { step: 4, code: 'producing', label: 'Producing' },
  { step: 8, code: 'finished', label: 'Finished' },
  { step: 7, code: 'shipped', label: 'Shipped' },
  { step: 5, code: 'delivered', label: 'Delivered' },
  { step: 9, code: 'closed', label: 'Closed' },
]

// Harmony gate — a disharmonious ring is a build-time failure, not a runtime one.
const ring = validateHoroStates(LOT_RING)
if (!ring.ok) throw new Error(`lots: horo disharmony — ${ring.errors.join('; ')}`)

type LotData = {
  status?: string | null
  canceledAt?: unknown
  closedAt?: unknown
  finishedAt?: unknown
  startedAt?: unknown
  confirmedAt?: unknown
  unitsShipped?: number | null
  unitsDelivered?: number | null
}

const has = (v: unknown): boolean => v !== undefined && v !== null && v !== ''
const positive = (n: unknown): boolean => Number(n ?? 0) > 0

/**
 * Derive the lot's horo state from its lifecycle watermark high-water marks —
 * the data-true rule (status is 100% NULL in storage, always computed). Reads
 * top-down (the highest watermark reached wins) so the band always reflects the
 * furthest point the run has reached. Canceled is recorded separately (off-ring)
 * and does not overwrite the band.
 */
export const deriveLotState: CollectionBeforeChangeHook = ({ data }) => {
  const d = data as LotData
  if (has(d.closedAt)) d.status = 'closed'
  else if (positive(d.unitsDelivered)) d.status = 'delivered'
  else if (positive(d.unitsShipped)) d.status = 'shipped'
  else if (has(d.finishedAt)) d.status = 'finished'
  else if (has(d.startedAt)) d.status = 'producing'
  else if (has(d.confirmedAt)) d.status = 'confirmed'
  else d.status = 'opened'
  return d
}

/** A non-negative integer counter — a double-entry number (see src/accounting). */
const counter = (name: string, description: string): CollectionConfig['fields'][number] => ({
  name,
  type: 'number',
  min: 0,
  admin: { description },
})

const Lots: CollectionConfig = {
  slug: 'lots',
  labels: { singular: 'Lot', plural: 'Lots' },
  admin: {
    useAsTitle: 'number',
    defaultColumns: ['number', 'kind', 'status', 'unitsOrdered', 'unitsProduced', 'unitsDelivered'],
    group: 'Manufacturing',
    description:
      'The production order (funnel head). Fans into lot-variants and a lot-work-phases routing chain; its state is DERIVED from lifecycle watermarks on the horo ring (never stored).',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    { name: 'number', type: 'text', index: true, admin: { description: 'Lot number — the production-order reference.' } },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'sales-orders',
      index: true,
      admin: { description: 'The sales order this lot fulfils (the demand source).' },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'items',
      index: true,
      admin: { description: 'The product produced (the catalog item).' },
    },
    {
      name: 'kind',
      type: 'text',
      index: true,
      admin: { description: 'Product/programme code (e.g. `SHIMA_07`, `CONF_21`). Open text — 20 yrs of real codes.' },
    },

    // Derived state on the horo ring — status is COMPUTED by deriveLotState from
    // the watermarks below, never set by hand (100% NULL in storage).
    horoStateField('status', LOT_RING, {
      defaultValue: 'opened',
      required: false,
      description:
        'Lifecycle on the 1·2·4·8·7·5·9 ring: opened → confirmed → producing → finished → shipped → delivered → closed. DERIVED from watermarks (deriveLotState); off-ring = canceled.',
    }),

    // Lifecycle watermarks — the high-water marks state is DERIVED from (read-only;
    // the source of truth for the horo band). tech_confirmed_at dropped (dead column).
    { name: 'confirmedAt', type: 'date', admin: { description: 'Order accepted (band 2/share). 21.5% in etrima.' } },
    { name: 'startedAt', type: 'date', admin: { description: 'Production began (band 4/weave).' } },
    { name: 'finishedAt', type: 'date', admin: { description: 'Production complete (band 8/crest).' } },
    { name: 'closedAt', type: 'date', admin: { description: 'Run sealed (band 9/unity). 89.3% in etrima — the dominant terminal.' } },
    { name: 'canceledAt', type: 'date', admin: { description: 'Canceled — the OFF-RING terminal (escape from the ring). 1.2% in etrima.' } },
    { name: 'cancelReason', type: 'text', admin: { description: 'Why the run was canceled (paired with canceledAt).' } },

    // Dates (planning + actuals).
    { name: 'date', type: 'date', admin: { description: 'Lot date.' } },
    { name: 'deliveryDate', type: 'date', admin: { description: 'Planned delivery date.' } },
    { name: 'shippedAt', type: 'date', admin: { description: 'Actual ship date.' } },
    { name: 'deliveredAt', type: 'date', admin: { description: 'Actual delivery date.' } },

    // The unit funnel — monotonic double-entry counters; the lot total = Σ variant totals.
    counter('unitsOrdered', 'Units ordered (the funnel head; ≥ units).'),
    counter('units', 'Lot total units — = Σ variant.units (the roll-up law, 100% in etrima).'),
    counter('unitsProduced', 'Units produced (≤ units; = Σ variant.unitsProduced).'),
    counter('unitsPacked', 'Units packed (≤ produced).'),
    counter('unitsShipped', 'Units shipped (≤ packed) — drives band 7/descent.'),
    counter('unitsDelivered', 'Units delivered (≤ shipped) — drives band 5/round.'),
    counter('unitsInvoiced', 'Units invoiced (≤ delivered) — the funnel tail.'),

    // Money + time aggregates.
    currencyField({ name: 'currency', allowBlank: true }),
    { name: 'unitPrice', type: 'number', min: 0, admin: { description: 'Price per unit.' } },
    { name: 'unitCost', type: 'number', min: 0, admin: { description: 'Cost per unit.' } },
    { name: 'amountInvoiced', type: 'number', min: 0, admin: { description: 'Total amount invoiced.' } },
    { name: 'amountPaid', type: 'number', min: 0, admin: { description: 'Total amount paid.' } },
    counter('minutesOrdered', 'Lot minutes ordered.'),
    counter('minutesProduced', 'Lot minutes produced.'),
    counter('minutesToProduce', 'Lot minutes remaining to produce.'),

    // Weights (the freight basis).
    counter('netWeight', 'Net weight (grams).'),
    counter('grossWeight', 'Gross weight (grams).'),
    counter('billableWeight', 'Billable weight (grams).'),

    // Denormalized child counts (the fan-out).
    counter('lotVariantsCount', 'Number of lot-variants in this lot.'),
    counter('lotWorkPhasesCount', 'Number of routing steps in this lot’s phase chain.'),

    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('lots', { beforeChange: [deriveLotState] }),
  timestamps: true,
}

export default Lots
