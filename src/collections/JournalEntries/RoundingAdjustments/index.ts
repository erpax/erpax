/**
 * Rounding Adjustments — IAS-1 §51(e) presentation rounding entries
 * + IAS-21 §39 functional-to-presentation FX rounding fragments.
 *
 * Slice TTT (2026-05-10): added per Slice NNN gap discovery. Records
 * the small `±0.01` plug entries the GL needs when statement totals
 * presented at a rounded unit (thousands / millions) don't perfectly
 * reconcile to the integer-cents-precision underlying ledger.
 *
 * @standard ISO-4217:2015 currency-codes from-to-currency-pair
 * @standard ISO-8601-1:2019 date-time adjustment-date
 * @accounting IFRS IAS-1 §51(e) level-of-rounding-disclosure
 * @accounting IFRS IAS-21 §39 foreign-currency-translation
 * @accounting US-GAAP ASC-205-10-45 presentation-rounding
 * @audit ISO-19011:2018 audit-trail rounding-evidence
 * @compliance SOX §404 internal-controls rounding-control TOM-RND-01
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { tenantAdminWriteAccess } from '@/access/auth'
import { statusField, notesField, auditFields, referenceField } from '@/fields/base-accounting-fields'

const RoundingAdjustments: CollectionConfig = {
  slug: 'rounding-adjustments',
  labels: { singular: 'Rounding Adjustment', plural: 'Rounding Adjustments' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'adjustmentDate', 'fromCurrency', 'toCurrency', 'roundingAmount', 'reason', 'status'],
    description:
      'IAS-1 §51(e) presentation rounding plugs + IAS-21 §39 FX-translation rounding fragments. The small ±0.01 entries that keep statement totals tied.',
  },
  access: tenantAdminWriteAccess(), // Slice VVV: gated by feature 'period_end_closing' (see featureGuard wiring TBA)
  fields: [
    referenceField({ description: 'Sequential rounding-adjustment reference (e.g. `RND-2026-04-001`).' }),
    { name: 'adjustmentDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — the date the rounding plug applies to.' } },
    {
      name: 'fromCurrency',
      type: 'text',
      required: true,
      admin: {
        description: 'ISO 4217 source currency (functional / underlying ledger currency). Required by IAS-21 §39 when rounding crosses currency.',
      },
    },
    {
      name: 'toCurrency',
      type: 'text',
      required: true,
      admin: {
        description: 'ISO 4217 target currency (presentation currency). Equals fromCurrency for pure presentation-rounding plugs (IAS-1 §51(e)).',
      },
    },
    { name: 'roundingAmount', type: 'number', required: true,
      admin: { description: 'Signed rounding amount in cents (typically ±1 to ±100 cents). Hits a designated Rounding GL account.' } },
    {
      name: 'rounding',
      type: 'group',
      label: 'Rounding kind',
      fields: [
        {
          name: 'roundingType',
          type: 'select',
          defaultValue: 'presentation',
          options: [
            { label: 'Presentation Rounding (IAS-1 §51(e))', value: 'presentation' },
            { label: 'FX Translation Fragment (IAS-21 §39)', value: 'fx_translation' },
            { label: 'Tax Rounding (national VAT rule)', value: 'tax' },
            { label: 'Cash-Settlement Rounding', value: 'cash' },
          ],
        },
        {
          name: 'precisionUnit',
          type: 'select',
          defaultValue: 'cents',
          options: [
            { label: 'Cents (full precision)', value: 'cents' },
            { label: 'Whole units (no decimals)', value: 'units' },
            { label: 'Thousands', value: 'thousands' },
            { label: 'Millions', value: 'millions' },
          ],
        },
      ],
    },
    { name: 'reason', type: 'text', required: true,
      admin: { description: 'Free-text reason — must include the word "rounding" per the seed-validation rule.' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { description: 'JE booking the rounding plug.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Posted', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('rounding-adjustments'),
  timestamps: true,
}

export default RoundingAdjustments
