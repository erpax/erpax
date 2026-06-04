/**
 * Held-for-Sale Classifications — IFRS 5 non-current assets / disposal
 * groups classified as held-for-sale + discontinued-operations register.
 *
 * Slice BBBBB-prep (2026-05-11): each row is a classification event when
 * a non-current asset (or disposal group) meets IFRS 5 §6 criteria
 * (highly probable sale within 12 months at FV − costs to sell).
 * Triggers IFRS 5 §15 measurement at the lower of carrying amount and
 * FV − CTS, with depreciation suspended (§25) and balance-sheet
 * presentation as a separate line (§38).
 *
 * @standard IFRS IFRS-5 §6-§9 classification-criteria
 * @standard IFRS IFRS-5 §15 measurement-lower-of-cv-and-fv-less-cts
 * @standard IFRS IFRS-5 §25 depreciation-suspended
 * @standard IFRS IFRS-5 §31-§40 discontinued-operations-presentation
 * @standard IFRS IFRS-13 fair-value-input-hierarchy
 * @standard US-GAAP ASC-205-20 discontinued-operations
 * @standard US-GAAP ASC-360-10 long-lived-assets-held-for-sale
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time classification-date
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-disposal-classification
 * @compliance SOX §404 internal-controls
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '@/base/accounting/field'

const HeldForSaleClassifications: CollectionConfig = {
  slug: 'held-for-sale-classifications',
  labels: { singular: 'Held-for-Sale Classification', plural: 'Held-for-Sale Classifications' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'classificationKind', 'sourceCollection', 'classificationDate', 'fairValueLessCostsToSell', 'status'],
    description:
      'IFRS 5 — non-current assets / disposal groups / discontinued operations classified as held-for-sale.',
  },
  access: accountingCollectionAccess({ feature: 'held_for_sale' }),
  fields: [
    referenceField({ description: 'Sequential reference (e.g. HFS-2026-Q1-001).' }),
    {
      name: 'classificationKind',
      type: 'select',
      required: true,
      options: [
        { label: 'Single non-current asset', value: 'single_asset' },
        { label: 'Disposal group (multiple assets + liabs)', value: 'disposal_group' },
        { label: 'Discontinued operation (separate major line)', value: 'discontinued_op' },
      ],
    },
    { name: 'sourceCollection', type: 'text', required: true,
      admin: { description: 'Slug of the asset (e.g. fixed-assets / investment-properties / business-combinations).' } },
    { name: 'sourceId', type: 'text', required: true },
    { name: 'classificationDate', type: 'date', required: true, index: true },
    { name: 'expectedSaleDate', type: 'date',
      admin: { description: 'IFRS 5 §8 — sale highly probable within 12 months from classification.' } },
    { name: 'carryingAmountAtClassification', type: 'number', required: true },
    { name: 'fairValue', type: 'number', required: true },
    { name: 'costsToSell', type: 'number', defaultValue: 0 },
    { name: 'fairValueLessCostsToSell', type: 'number',
      admin: { readOnly: true, description: 'fairValue − costsToSell (cents).' } },
    { name: 'impairmentLoss', type: 'number',
      admin: { readOnly: true, description: 'IFRS 5 §15 — Max(0, carrying − FVLCTS) (cents).' } },
    currencyField(),
    { name: 'isDiscontinuedOperation', type: 'checkbox', defaultValue: false,
      admin: { description: 'IFRS 5 §32 — separate major line of business or geographical area.' } },
    { name: 'segment', type: 'text', admin: { description: 'IFRS 8 segment this disposal belongs to.' } },
    { name: 'actualSaleDate', type: 'date' },
    { name: 'actualSaleProceeds', type: 'number' },
    { name: 'gainLossOnDisposal', type: 'number', admin: { readOnly: true } },
    { name: 'fairValueMeasurement', type: 'relationship', relationTo: 'fair-value-measurements' },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
    statusField(
      [
        { label: 'Classified', value: 'classified' },
        { label: 'Re-measured', value: 'remeasured' },
        { label: 'Sale Pending', value: 'sale_pending' },
        { label: 'Sold', value: 'sold' },
        { label: 'Reclassified Back (criteria failed)', value: 'reclassified' },
      ],
      'classified',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('held-for-sale-classifications'),
  timestamps: true,
}

export default HeldForSaleClassifications
