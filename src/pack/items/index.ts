/**
 * Pack Items — the pack line, evolved from 200,993 rows of the etrima `pack_items`
 * table. One line = the units of one produced variant (`lot_variant`) packed into one
 * `pack`. It is the entry the carton's `unitsPacked` total rolls up from.
 *
 * THE DATA-VERIFIED SHAPE:
 *
 *  • Header-primary, options optional. AUDIT: the header `units_packed` carries the
 *    quantity on 99.92% of rows; the 12 `option_N_units_*` slots are used on only
 *    0.17% — the fixed-width option breakdown was almost always collapsed to the
 *    header. So `options[]` is an OPTIONAL fine-grained breakdown; when present the
 *    header is its sum (the double-entry holds at 100.0000% in the data), when absent
 *    the recorded header stands. `rollUpOptions` (beforeChange) enforces exactly this.
 *
 *  • DEAD column dropped: `item_id` was NULL in 100% of rows — the line does NOT point
 *    at the catalog item; it points at the produced `lot_variant` (AUDIT: 0% null).
 *    So the cross is `pack` ⊕ `lotVariant`, both real relationships now that those
 *    collections are minted.
 *
 *  • `unitsBackordered` = unitsOrdered − unitsPacked (the unpacked remainder, ≥ 0).
 *
 *  • Per-option grams (`unitGrams` / `netUnitGrams`) kept on the option line for the
 *    rare weighed breakdown (AUDIT: ~0.03% populated) — feeds the pack mass balance.
 *
 * @invariant options present ⇒ unitsOrdered = Σ options[].ordered ∧ unitsPacked = Σ options[].packed
 * @invariant unitsBackordered = max(0, unitsOrdered − unitsPacked)
 *
 * @standard ISA-95:2013 §B.5 production-operations dispatch line
 * @standard UN/CEFACT Rec20 mass (gram) per-unit
 * @accounting IFRS IAS-2 §10 finished-goods at dispatch
 * @audit ISO-19011:2018 audit-trail dispatch line
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/packs/index.ts (the carton this line rolls up into)
 * @see src/lot/variants/index.ts (the produced variant this line packs)
 */
import type { CollectionConfig, CollectionBeforeChangeHook, Field } from 'payload'

import { createMembershipAdminMutateAccess } from '@/membership/admin/mutate/access'
import { tenantScopedCollectionReadAccess } from '@/tenant/scoped/read'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { referenceField, auditFields } from '@/fields'

const toInt = (v: unknown): number => {
  const n = Number(v)
  return Number.isFinite(n) ? Math.trunc(n) : 0
}

// ─── The option line (the collapse of the 48 fixed columns) ──────────
const optionLineFields: Field[] = [
  { name: 'label', type: 'text', admin: { description: 'Option / variant label (was the `option_N` slot).' } },
  { name: 'ordered', type: 'number', min: 0, defaultValue: 0, admin: { description: 'Units ordered for this option.' } },
  { name: 'packed', type: 'number', min: 0, defaultValue: 0, admin: { description: 'Units packed for this option.' } },
  { name: 'unitGrams', type: 'number', min: 0, admin: { description: 'Gross grams per unit (the weighed breakdown; sparse).' } },
  { name: 'netUnitGrams', type: 'number', min: 0, admin: { description: 'Net grams per unit (sparse).' } },
]

interface OptionLine {
  ordered?: number | null
  packed?: number | null
}

interface PackItemShape {
  options?: OptionLine[] | null
  unitsOrdered?: number | null
  unitsPacked?: number | null
  unitsBackordered?: number | null
}

const sumOptions = (options: readonly OptionLine[] | null | undefined, key: keyof OptionLine): number =>
  (options ?? []).reduce((acc, o) => acc + toInt(o?.[key]), 0)

/**
 * @invariant Header = Σ options WHEN options are supplied (the data's 100% double-entry);
 * else the recorded header stands (the 99.92% header-only rows). Always derive
 * `unitsBackordered` = max(0, ordered − packed) — the unpacked remainder.
 */
export const rollUpOptions: CollectionBeforeChangeHook = ({ data }) => {
  const d = data as PackItemShape
  const options = d.options ?? []
  if (options.length > 0) {
    d.unitsOrdered = sumOptions(options, 'ordered')
    d.unitsPacked = sumOptions(options, 'packed')
  }
  d.unitsBackordered = Math.max(0, toInt(d.unitsOrdered) - toInt(d.unitsPacked))
  return data
}

export const PackItems: CollectionConfig = {
  slug: 'pack-items',
  labels: { singular: 'Pack Item', plural: 'Pack Items' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'pack', 'lotVariant', 'unitsOrdered', 'unitsPacked'],
    group: 'Manufacturing',
    description:
      'The pack line (200,993-row etrima twin) — units of one produced lot-variant packed into one carton. Header-primary with an optional option breakdown; the double-entry holds when options are supplied.',
  },
  access: {
    create: createMembershipAdminMutateAccess('pack-items'),
    read: tenantScopedCollectionReadAccess,
    update: createMembershipAdminMutateAccess('pack-items'),
    delete: createMembershipAdminMutateAccess('pack-items'),
  },
  fields: [
    referenceField({ description: 'Pack-line reference.' }),

    // ── The cross — both real relationships (the minted siblings) ──
    { name: 'pack', type: 'relationship', relationTo: 'packs', index: true, required: true,
      admin: { description: 'The carton this line is packed into (AUDIT: 0% null).' } },
    { name: 'lotVariant', type: 'relationship', relationTo: 'lot-variants', index: true, required: true,
      admin: { description: 'The produced lot-variant this line packs (AUDIT: 0% null; the dead item_id was dropped).' } },

    // ── Header units (primary; 99.92% header-driven) ──
    { name: 'unitsOrdered', type: 'number', min: 0, defaultValue: 0,
      admin: { description: 'Units ordered for this line (= Σ options[].ordered when options are supplied).' } },
    { name: 'unitsPacked', type: 'number', min: 0, defaultValue: 0,
      admin: { description: 'Units packed for this line (= Σ options[].packed when options are supplied).' } },
    { name: 'unitsBackordered', type: 'number',
      admin: { readOnly: true, description: 'Derived = max(0, ordered − packed) — the unpacked remainder.' } },

    // ── The optional option breakdown (the 48-column collapse) ──
    {
      name: 'options',
      type: 'array',
      labels: { singular: 'Option', plural: 'Options' },
      fields: optionLineFields,
      admin: {
        description:
          'Optional per-option breakdown (the collapse of the 48 fixed `option_1..12_units_{ordered,packed}` + grams columns). AUDIT: used on only ~0.17% of rows — the header carries the rest.',
      },
    },

    { name: 'note', type: 'textarea', admin: { description: 'Free-text note.' } },

    ...auditFields({ readOnly: true }),
  ],
  hooks: standardCollectionHooks('pack-items', {
    beforeChange: [rollUpOptions],
  }),
  timestamps: true,
}

export default PackItems
