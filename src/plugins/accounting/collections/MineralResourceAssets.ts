/**
 * Mineral Resource Assets — IFRS 6 exploration & evaluation register.
 *
 * Slice BBBBB-prep (2026-05-11): each row is one E&E asset (well, mine,
 * concession block) capitalised under the IFRS 6 §8 temporary
 * accounting-policy-choice (cost vs revaluation). Reclassified to PPE
 * (IAS 16) or intangibles (IAS 38) once technical feasibility +
 * commercial viability are demonstrated (§17). Impairment per §18-§22
 * triggers when carrying amount unlikely to be recovered.
 *
 * @standard IFRS IFRS-6 §3 scope-exploration-and-evaluation
 * @standard IFRS IFRS-6 §8 measurement-policy-cost-or-revaluation
 * @standard IFRS IFRS-6 §17 reclassification-to-PPE-or-intangibles
 * @standard IFRS IFRS-6 §18-§22 impairment-of-EE-assets
 * @standard IFRS IFRS-6 §23-§25 disclosure
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-EE-assets
 * @compliance SOX §404 internal-controls
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'

const MineralResourceAssets: CollectionConfig = {
  slug: 'mineral-resource-assets',
  labels: { singular: 'Mineral Resource Asset', plural: 'Mineral Resource Assets' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'concessionType', 'jurisdiction', 'capitalisedAmount', 'status'],
    description:
      'IFRS 6 — exploration & evaluation assets (wells, mines, concessions). Reclassified to PPE/intangibles when commercial viability demonstrated.',
  },
  access: accountingCollectionAccess({ feature: 'extractive_industries' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Sequential reference (e.g. EE-2026-001).' }),
    {
      name: 'concessionType',
      type: 'select',
      required: true,
      options: [
        { label: 'Oil & Gas — Onshore Well', value: 'oil_gas_onshore' },
        { label: 'Oil & Gas — Offshore Well', value: 'oil_gas_offshore' },
        { label: 'Mining — Surface', value: 'mining_surface' },
        { label: 'Mining — Underground', value: 'mining_underground' },
        { label: 'Quarry', value: 'quarry' },
        { label: 'Geothermal', value: 'geothermal' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'jurisdiction', type: 'text', admin: { description: 'ISO 3166-1 alpha-2 country.' } },
    { name: 'concessionId', type: 'text', admin: { description: 'License / permit / lease identifier.' } },
    { name: 'capitalisedAmount', type: 'number', required: true,
      admin: { description: 'IFRS 6 §9 — accumulated E&E expenditure (cents).' } },
    { name: 'measurementPolicy', type: 'select', defaultValue: 'cost', options: [
      { label: 'Cost Model', value: 'cost' }, { label: 'Revaluation Model', value: 'revaluation' },
    ] },
    { name: 'commercialViabilityDate', type: 'date',
      admin: { description: 'IFRS 6 §17 — date technical feasibility + commercial viability demonstrated; triggers reclassification.' } },
    { name: 'reclassifiedToCollection', type: 'text',
      admin: { description: 'Slug of target collection (fixed-assets / intangible-assets).' } },
    { name: 'reclassifiedToId', type: 'text' },
    { name: 'impairmentLoss', type: 'number', defaultValue: 0,
      admin: { description: 'IFRS 6 §18 — recognised impairment (cents).' } },
    currencyField(),
    statusField(
      [
        { label: 'Exploring', value: 'exploring' },
        { label: 'Evaluating', value: 'evaluating' },
        { label: 'Reclassified to PPE/Intangibles', value: 'reclassified' },
        { label: 'Impaired', value: 'impaired' },
        { label: 'Abandoned', value: 'abandoned' },
      ],
      'exploring',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('mineral-resource-assets')],
  },
  timestamps: true,
}

export default MineralResourceAssets
