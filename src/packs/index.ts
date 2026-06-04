/**
 * Packs — the shipping carton, evolved from 118,716 rows of the etrima `packs`
 * table (the 20-year dispatch ledger). One pack = one packed unit of dispatch
 * (a carton/parcel) drawn from a production lot, carrying weight + counts and a
 * derived lifecycle.
 *
 * THE DATA-VERIFIED SHAPE (the accidents the code carried, fixed):
 *
 *  • Lifecycle → a DERIVED `state` on the seven-position horo ring, COMPUTED in
 *    an afterRead hook, NEVER stored. AUDIT: `status` was NULL in 100% of 118,716
 *    rows — the lifecycle lived in the unit/weight watermarks, not a column (the
 *    same "status is a where-clause" truth as lots/work-orders).
 *
 *  • Weight conservation: `grossWeight = netWeight + tareWeight` (the carton law).
 *    AUDIT: net/gross populated on ~42% of rows (weight tracked when weighed). The
 *    beforeChange derives gross from net+tare so the three can never drift — a
 *    balance, the double-entry of mass.
 *
 *  • DEAD columns dropped (null/empty in ~100% of rows): `order_id` (100% null),
 *    `tracking_number` (0% populated), `status` (derived), `barcode` (kept, sparse).
 *
 *  • The resource cross — the not-yet-minted dispatch siblings (pallet, packaging,
 *    packing-list, client) are content-addressed CODES so the leaf stays
 *    merge-safe; `lot` is a real relationship (AUDIT: 0.02% null — effectively
 *    required), the lot this carton was packed from.
 *
 * @invariant grossWeight = netWeight + tareWeight  (when net+tare given) — mass balance
 * @invariant unitsPacked = Σ pack-items.unitsPacked (the rollup; enforced on the line side)
 * @invariant state ∈ horo ring [1,2,4,8,7,5,9] — derived, never stored
 *
 * @standard ISA-95:2013 §B.5 production-operations dispatch
 * @standard UN/CEFACT Rec20 weight (kilogram) · volume (cubic-metre)
 * @standard GS1 logistics SSCC carton-identity (the `number` / `barcode`)
 * @accounting IFRS IAS-2 §10 finished-goods carried to dispatch
 * @audit ISO-19011:2018 audit-trail dispatch
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/packitems/index.ts (the pack lines that roll up into this carton)
 * @see src/lots/index.ts (the production lot this carton draws from)
 */
import type {
  CollectionConfig,
  CollectionBeforeChangeHook,
  CollectionAfterReadHook,
} from 'payload'

import { createMembershipAdminMutateAccess } from '@/membership/admin/mutate/access'
import { tenantScopedCollectionReadAccess } from '@/tenant/scoped/read'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { auditFields } from '@/fields'
import { HORO_DIGITS, isHoroStep, type HoroStep } from '@/horo'

const toNum = (v: unknown): number => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

// ─── The packing lifecycle ring (DERIVED, never stored) ──────────────
//   1 base    open     — the carton exists, nothing packed yet
//   2 share   packing  — units accruing into the carton
//   4 weave   packed   — fully packed (units_packed reached the order)
//   8 crest   weighed  — weight sealed (gross = net + tare recorded)
//   7 descent shipped  — dispatched
//   5 round   delivered— received by the consignee
//   9 unity   closed   — sealed
export const PACK_RING: readonly { step: HoroStep; code: string; label: string }[] = [
  { step: 1, code: 'open', label: 'Open' },
  { step: 2, code: 'packing', label: 'Packing' },
  { step: 4, code: 'packed', label: 'Packed' },
  { step: 8, code: 'weighed', label: 'Weighed' },
  { step: 7, code: 'shipped', label: 'Shipped' },
  { step: 5, code: 'delivered', label: 'Delivered' },
  { step: 9, code: 'closed', label: 'Closed' },
]

// Harmony gate — a disharmonious ring is a build-time failure (the horo law).
{
  const steps = PACK_RING.map((s) => s.step)
  if (JSON.stringify(steps) !== JSON.stringify([...HORO_DIGITS])) {
    throw new Error(`packs: horo disharmony — expected ${HORO_DIGITS.join(',')}, got ${steps.join(',')}`)
  }
  for (const s of PACK_RING) {
    if (!isHoroStep(s.step)) throw new Error(`packs: state ${s.code} step ${s.step} is off-ring (escape)`)
  }
}

interface PackShape {
  unitsOrdered?: number | null
  unitsPacked?: number | null
  netWeight?: number | null
  tareWeight?: number | null
  grossWeight?: number | null
  shippedAt?: string | null
  deliveredAt?: string | null
  closedAt?: string | null
  state?: string
}

/** The derived horo state from packing progress + the seal timestamps. Pure. */
export const derivePackState = (doc: PackShape): string => {
  if (doc.closedAt) return 'closed'
  if (doc.deliveredAt) return 'delivered'
  if (doc.shippedAt) return 'shipped'
  const ordered = toNum(doc.unitsOrdered)
  const packed = toNum(doc.unitsPacked)
  if (packed === 0) return 'open'
  if (ordered > 0 && packed >= ordered) {
    // fully packed — weighed once gross is sealed, else just packed
    return toNum(doc.grossWeight) > 0 ? 'weighed' : 'packed'
  }
  return 'packing'
}

/**
 * @invariant grossWeight = netWeight + tareWeight. The mass balance — when net and
 * tare are both given, gross is their sum so the three can never drift (the carton's
 * double-entry of mass). If only gross is recorded (a weigh-bridge reading), it stands.
 */
export const balanceWeight: CollectionBeforeChangeHook = ({ data }) => {
  const d = data as PackShape
  const net = toNum(d.netWeight)
  const tare = toNum(d.tareWeight)
  if (net > 0 && tare > 0) d.grossWeight = Math.round((net + tare) * 1000) / 1000
  return data
}

/** Decorate every read with the derived state (computed, never stored). */
export const decoratePackState: CollectionAfterReadHook = ({ doc }) => {
  const d = doc as PackShape
  d.state = derivePackState(d)
  return doc
}

export const Packs: CollectionConfig = {
  slug: 'packs',
  labels: { singular: 'Pack', plural: 'Packs' },
  admin: {
    useAsTitle: 'number',
    defaultColumns: ['number', 'lot', 'unitsPacked', 'grossWeight', 'itemsCount'],
    group: 'Manufacturing',
    description:
      'The shipping carton (118,716-row etrima twin) — units packed from a production lot, with mass balance (gross = net + tare), rollup counts, and a derived horo lifecycle.',
  },
  access: {
    create: createMembershipAdminMutateAccess('packs'),
    read: tenantScopedCollectionReadAccess,
    update: createMembershipAdminMutateAccess('packs'),
    delete: createMembershipAdminMutateAccess('packs'),
  },
  fields: [
    { name: 'number', type: 'text', index: true, admin: { description: 'Carton number / SSCC (the dispatch identity).' } },
    { name: 'barcode', type: 'text', admin: { description: 'Scanned barcode (sparse in the data).' } },

    // ── Units (rolled up from pack-items) ──
    { name: 'unitsOrdered', type: 'number', min: 0, defaultValue: 0,
      admin: { readOnly: true, description: 'Σ pack-items[].unitsOrdered (rollup).' } },
    { name: 'unitsPacked', type: 'number', min: 0, defaultValue: 0,
      admin: { readOnly: true, description: 'Σ pack-items[].unitsPacked — the carton total (AUDIT: >0 on 99.99% of rows).' } },

    // ── Mass balance (gross = net + tare) ──
    { name: 'netWeight', type: 'number', min: 0, admin: { description: 'Net weight, kg (AUDIT: ~42% weighed).' } },
    { name: 'tareWeight', type: 'number', min: 0, admin: { description: 'Tare (packaging) weight, kg.' } },
    { name: 'grossWeight', type: 'number', min: 0,
      admin: { description: 'Gross weight, kg — derived = net + tare when both given (the mass balance).' } },
    { name: 'volume', type: 'number', min: 0, admin: { description: 'Volume, m³ (UN/CEFACT Rec20).' } },

    // ── Rollup counts ──
    { name: 'productsCount', type: 'number', min: 0, admin: { readOnly: true, description: 'Distinct products in the carton (rollup).' } },
    { name: 'variantsCount', type: 'number', min: 0, admin: { readOnly: true, description: 'Distinct variants (rollup).' } },
    { name: 'itemsCount', type: 'number', min: 0, admin: { readOnly: true, description: 'Distinct items (rollup).' } },

    // ── The seal timestamps (the state is DERIVED from these + progress) ──
    { name: 'shippedAt', type: 'date', admin: { description: 'ISO 8601 — dispatched (→ shipped).' } },
    { name: 'deliveredAt', type: 'date', admin: { description: 'ISO 8601 — received by consignee (→ delivered).' } },
    { name: 'closedAt', type: 'date', admin: { description: 'ISO 8601 — sealed (→ closed).' } },

    // ── The resource cross ──
    // lot: a real relationship (AUDIT: 0.02% null — effectively required).
    { name: 'lot', type: 'relationship', relationTo: 'lots', index: true,
      admin: { description: 'The production lot this carton was packed from.' } },
    // not-yet-minted dispatch siblings — content-addressed codes (merge-safe).
    { name: 'palletCode', type: 'text', admin: { description: 'Pallet code (the pallet this carton sits on — collection not yet minted).' } },
    { name: 'packagingCode', type: 'text', admin: { description: 'Packaging code (the carton spec — collection not yet minted).' } },
    { name: 'packingListCode', type: 'text', index: true, admin: { description: 'Packing-list code (the dispatch document — collection not yet minted).' } },
    { name: 'clientCode', type: 'text', index: true, admin: { description: 'Client code (the consignee — resolved to the unified actor later).' } },

    { name: 'note', type: 'textarea', admin: { description: 'Free-text note.' } },

    ...auditFields({ readOnly: true }),
  ],
  hooks: standardCollectionHooks('packs', {
    beforeChange: [balanceWeight],
  }),
  timestamps: true,
}

// The derived decorator rides afterRead (its own lane; never displaces the spine).
Packs.hooks = { ...Packs.hooks, afterRead: [decoratePackState] }

export default Packs
