/**
 * LotVariants — a lot's per-variant line, carrying the option (size/colour)
 * breakdown as a balanced roll-up.
 *
 * A `lot` is split into variants (one product-variant each); each variant is
 * split into up to 12 OPTIONS (the size/colour columns in the source). The
 * iron law the 20-yr data proves exactly: **the variant total equals the sum of
 * its options**, at every stage of the funnel. The 12 bespoke `option_N_*`
 * column-families fold into one `options[]` array (the [[discriminator]] /
 * collapse: many columns ⇒ one context-keyed array), with the roll-up enforced
 * as a hook (`@invariant`).
 *
 * Data-truth (etrima `lot_variants`, N=67 865):
 *  - `units = Σ option_N_units` holds **100.00%** (67 865/67 865). Likewise
 *    `units_produced = Σ option_N_units_produced` = **100.00%**. The roll-up is
 *    EXACT — encoded as a beforeChange hook, not a hope.
 *  - The funnel is monotonic: `units_ordered ≥ units ≥ units_produced ≥
 *    units_packed ≥ units_shipped ≥ units_delivered`. produced≤units 100%,
 *    delivered≤shipped 100%, packed≥shipped 100% (where both present, 55 748/55 748).
 *  - `status` is 100% NULL — a DEAD column. State is the lot's derived state;
 *    a variant carries only its counters. Dropped.
 *
 * @standard ISA-95:2013 / IEC-62264-1 material-lot sublot
 * @accounting double-entry — every counter is a balanced number; the variant
 *   total IS the sum of its option postings (Σ options = total, the balance law).
 * @audit ISO-19011:2018 audit-trail variant-counter-changes
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @invariant roll-up — `units = Σ options[].units` AND `unitsProduced = Σ options[].produced` (100% in etrima).
 * @invariant funnel — `ordered ≥ units ≥ produced ≥ packed ≥ shipped ≥ delivered` (monotonic).
 * @see src/lots (the parent funnel head) · src/lotworkphases (the routing step a variant rides)
 */

import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { auditFields, notesField } from '@/base/accounting/field'

/** A non-negative integer unit counter — a double-entry number (see src/accounting). */
const counter = (name: string, description: string): CollectionConfig['fields'][number] => ({
  name,
  type: 'number',
  min: 0,
  admin: { description },
})

type OptionRow = { units?: number | null; produced?: number | null }
type VariantData = {
  units?: number | null
  unitsProduced?: number | null
  options?: OptionRow[] | null
}

const sum = (rows: OptionRow[] | null | undefined, key: keyof OptionRow): number =>
  (rows ?? []).reduce((s, r) => s + Number(r?.[key] ?? 0), 0)

/**
 * The roll-up law as a guard: the variant total IS the sum of its options
 * (100.00% in 20 yrs of etrima data). When `options[]` is supplied, derive the
 * totals FROM the options — the sum is the source of truth, so the totals can
 * never silently drift from their parts (the balance law, computed-not-stored).
 */
export const rollUpLotVariantOptions: CollectionBeforeChangeHook = ({ data }) => {
  const d = data as VariantData
  if (Array.isArray(d.options) && d.options.length > 0) {
    d.units = sum(d.options, 'units')
    d.unitsProduced = sum(d.options, 'produced')
  }
  return d
}

const LotVariants: CollectionConfig = {
  slug: 'lot-variants',
  labels: { singular: 'Lot Variant', plural: 'Lot Variants' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['lot', 'code', 'name', 'unitsOrdered', 'units', 'unitsProduced', 'unitsDelivered'],
    group: 'Manufacturing',
    description:
      'A lot’s per-variant line with the size/colour option breakdown. The variant total is the sum of its options (100% data-verified); the funnel ordered→delivered is monotonic.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    {
      name: 'lot',
      type: 'relationship',
      relationTo: 'lots',
      required: true,
      index: true,
      admin: { description: 'The parent lot (the funnel head this variant rolls up into).' },
    },
    {
      name: 'productVariant',
      type: 'relationship',
      relationTo: 'items',
      index: true,
      admin: { description: 'The product variant produced (the catalog item).' },
    },
    {
      name: 'workPhase',
      type: 'relationship',
      relationTo: 'lot-work-phases',
      admin: { description: 'The current routing step this variant sits at (the coordinate cross to the chain).' },
    },
    { name: 'code', type: 'text', index: true, admin: { description: 'Variant code.' } },
    { name: 'name', type: 'text', admin: { description: 'Variant name.' } },
    { name: 'batch', type: 'text', admin: { description: 'Batch label (free-text grouping within the lot).' } },
    { name: 'subVariant', type: 'number', admin: { description: 'Sub-variant ordinal.' } },

    // The option breakdown — the 12 bespoke option_N_* column-families folded into
    // one context-keyed array. The variant total IS the sum of these (the roll-up law).
    {
      name: 'options',
      type: 'array',
      admin: {
        description:
          'Size/colour option breakdown — the variant total is the SUM of these rows (units = Σ options[].units, 100% data-verified). Was 12 option_N_* column-families.',
      },
      fields: [
        counter('units', 'Option units (a part of the variant total).'),
        counter('produced', 'Option units produced.'),
        counter('packed', 'Option units packed.'),
        counter('shipped', 'Option units shipped.'),
        counter('delivered', 'Option units delivered.'),
        counter('ordered', 'Option units ordered.'),
        counter('unitGrams', 'Per-unit weight for this option, in grams.'),
        counter('minutesOrdered', 'Option minutes ordered.'),
        counter('minutesProduced', 'Option minutes produced.'),
      ],
    },

    // The variant funnel — monotonic counters (double-entry numbers).
    // `units` / `unitsProduced` are DERIVED from options[] by the roll-up hook.
    counter('unitsOrdered', 'Units ordered (the funnel head; ≥ units).'),
    counter('units', 'Variant total units — DERIVED = Σ options[].units (the roll-up law).'),
    counter('unitsProduced', 'Units produced — DERIVED = Σ options[].produced (≤ units).'),
    counter('unitsPacked', 'Units packed (≤ unitsProduced).'),
    counter('unitsShipped', 'Units shipped (≤ unitsPacked).'),
    counter('unitsDelivered', 'Units delivered (≤ unitsShipped — the funnel tail).'),

    // Time + weight aggregates.
    counter('minutesOrdered', 'Variant minutes ordered.'),
    counter('minutesProduced', 'Variant minutes produced.'),
    counter('minutesToProduce', 'Variant minutes remaining to produce.'),
    counter('netWeight', 'Net weight (grams).'),
    counter('grossWeight', 'Gross weight (grams).'),
    counter('billableWeight', 'Billable weight (grams) — the freight basis.'),

    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('lot-variants', { beforeChange: [rollUpLotVariantOptions] }),
  timestamps: true,
}

export default LotVariants
