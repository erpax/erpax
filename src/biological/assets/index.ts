/**
 * Biological Assets — IAS 41 living plants + animals at fair-value
 * less costs to sell.
 *
 * Slice BBBBB-prep (2026-05-11): each row is a biological-asset class
 * (cattle herd, vineyard, salmon stock, forest, dairy herd) measured at
 * fair-value-less-costs-to-sell per IAS 41 §12, with biological
 * transformation gains/losses in P&L (§26). Pairs with `harvest-events`
 * (the §13 transformation events: birth, death, growth, harvest) and
 * `fair-value-measurements` (the IFRS 13 hierarchy classification).
 *
 * @standard IFRS IAS-41 §10 recognition-criteria
 * @standard IFRS IAS-41 §12 measurement-fair-value-less-costs-to-sell
 * @standard IFRS IAS-41 §13 biological-transformation
 * @standard IFRS IAS-41 §26 gains-losses-recognised-in-pnl
 * @standard IFRS IAS-41 §30 bearer-plants-now-IAS-16-since-2016-amendment
 * @standard IFRS IAS-41 §40 disclosure-by-class
 * @standard IFRS IFRS-13 fair-value-input-hierarchy
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-biological-assets
 * @compliance SOX §404 internal-controls TOM-AGRI-01
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { currencyField, statusField, notesField, auditFields, referenceField, unitOfMeasureField } from '@/base/accounting/field'

const BiologicalAssets: CollectionConfig = {
  slug: 'biological-assets',
  labels: { singular: 'Biological Asset', plural: 'Biological Assets' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'classKind', 'name', 'unitsOnHand', 'fairValueLessCostsToSell', 'status'],
    description:
      'IAS 41 — living plants / animals measured at fair-value less costs to sell.',
  },
  access: accountingCollectionAccess({ feature: 'agriculture' }),
  fields: [
    referenceField({ description: 'Sequential reference (e.g. BIO-2026-001).' }),
    { name: 'name', type: 'text', required: true,
      admin: { description: 'Class name (e.g. "Holstein dairy herd #2", "Pinot Noir 2018 vineyard block").' } },
    {
      name: 'classKind',
      type: 'select',
      required: true,
      options: [
        { label: 'Livestock — Dairy', value: 'livestock_dairy' },
        { label: 'Livestock — Beef', value: 'livestock_beef' },
        { label: 'Livestock — Poultry', value: 'livestock_poultry' },
        { label: 'Aquaculture — Salmon / Fish', value: 'aquaculture' },
        { label: 'Crops — Annual', value: 'crop_annual' },
        { label: 'Crops — Perennial (non-bearer)', value: 'crop_perennial' },
        { label: 'Forestry — Timber', value: 'forestry' },
        { label: 'Vineyard / Orchard (PRODUCE; bearer plant ⇒ IAS 16)', value: 'vineyard_produce' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'unitsOnHand', type: 'number', required: true, min: 0,
      admin: { description: 'Count (head / hectares / kg) at reporting date.' } },
    unitOfMeasureField({ description: 'UN/CEFACT Rec 20 — C62 (head/count), KGM, HAR (hectare), MTQ (m³).' }),
    { name: 'fairValueLessCostsToSell', type: 'number', required: true,
      admin: { description: 'IAS 41 §12 — measurement basis (cents). Sum across all units.' } },
    { name: 'priorPeriodFvlcts', type: 'number',
      admin: { description: 'Previous reporting-date FVLCTS for change disclosure.' } },
    { name: 'biologicalTransformationGainLoss', type: 'number',
      admin: { readOnly: true, description: 'IAS 41 §26 — change in FVLCTS attributable to biological transformation (P&L).' } },
    { name: 'priceChangeGainLoss', type: 'number',
      admin: { readOnly: true, description: 'IAS 41 §51 — change due to price (separately disclosable).' } },
    currencyField(),
    {
      name: 'maturityStage',
      type: 'select',
      options: [
        { label: 'Immature (no produce yet)', value: 'immature' },
        { label: 'Mature (consumable / bearer-of-produce)', value: 'mature' },
        { label: 'Old (declining yield)', value: 'old' },
      ],
    },
    { name: 'fairValueMeasurement', type: 'relationship', relationTo: 'fair-value-measurements' },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Harvested (transferred to inventory at point of harvest — §13)', value: 'harvested' },
        { label: 'Sold', value: 'sold' },
        { label: 'Lost (mortality / disease)', value: 'lost' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('biological-assets'),
  timestamps: true,
}

export default BiologicalAssets
