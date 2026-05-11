/**
 * Deferred Tax Items — IAS 12 income-taxes timing differences.
 *
 * Slice BBBBB-prep (2026-05-11): each row is one origination or reversal
 * of a temporary difference between the tax base and carrying amount of
 * an asset/liability. The `kind` discriminator carries the IAS-12
 * classification (deductible vs taxable; current vs non-current).
 * Pairs with `tax-jurisdictions` (rate source) and `journal-entries`
 * (booking).
 *
 * @standard IFRS IAS-12 §15-§68 income-taxes
 * @standard IFRS IAS-12 §29 deductible-temporary-differences
 * @standard IFRS IAS-12 §34 deferred-tax-asset-recognition
 * @standard IFRS IAS-12 §47 measurement-using-substantively-enacted-rate
 * @standard IFRS IAS-12 §74 offsetting-deferred-tax-assets-and-liabilities
 * @standard US-GAAP ASC-740 income-taxes
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time origination-reversal
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-deferred-tax
 * @compliance SOX §404 internal-controls TOM-TAX-02
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'

const DeferredTaxItems: CollectionConfig = {
  slug: 'deferred-tax-items',
  labels: { singular: 'Deferred Tax Item', plural: 'Deferred Tax Items' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'kind', 'classification', 'temporaryDifference', 'deferredTaxAmount', 'jurisdiction', 'status'],
    description:
      'IAS-12 deferred-tax register. One row per origination or reversal of a temporary difference between tax base and carrying amount.',
  },
  access: accountingCollectionAccess({ feature: 'deferred_tax' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Sequential reference (e.g. DT-2026-04-001).' }),
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Deductible Temporary Difference (DTA)', value: 'deductible' },
        { label: 'Taxable Temporary Difference (DTL)', value: 'taxable' },
        { label: 'Tax Loss Carry-Forward', value: 'tax_loss_carryforward' },
        { label: 'Tax Credit Carry-Forward', value: 'tax_credit_carryforward' },
      ],
      admin: { description: 'IAS-12 §15 vs §24 classification — drives DTA vs DTL recognition.' },
    },
    {
      name: 'classification',
      type: 'select',
      required: true,
      defaultValue: 'non_current',
      options: [
        { label: 'Current (≤ 12 months reversal)', value: 'current' },
        { label: 'Non-current (> 12 months reversal)', value: 'non_current' },
      ],
    },
    { name: 'sourceCollection', type: 'text', admin: { description: 'Slug of the origin (e.g. fixed-assets / inventory-movements / provisions).' } },
    { name: 'sourceId', type: 'text', admin: { description: 'ID of the origin row.' } },
    { name: 'jurisdiction', type: 'relationship', relationTo: 'tax-jurisdictions', required: true, index: true,
      admin: { description: 'Tax jurisdiction whose rate applies.' } },
    { name: 'temporaryDifference', type: 'number', required: true,
      admin: { description: 'Carrying amount − Tax base (cents). Positive ⇒ taxable; negative ⇒ deductible.' } },
    { name: 'taxRate', type: 'number', required: true, min: 0, max: 100,
      admin: { description: 'IAS-12 §47 substantively-enacted rate at reporting date (%).', step: 0.01 } },
    { name: 'deferredTaxAmount', type: 'number', required: true,
      admin: { description: 'temporaryDifference × taxRate / 100 (cents). Signed.' } },
    currencyField(),
    { name: 'recognitionDate', type: 'date', required: true, index: true },
    { name: 'expectedReversalDate', type: 'date',
      admin: { description: 'IAS-12 §52 — when the difference is expected to reverse.' } },
    { name: 'realisationProbability', type: 'select',
      options: [
        { label: 'Probable (DTA recognisable)', value: 'probable' },
        { label: 'Possible (disclose only)', value: 'possible' },
        { label: 'Remote (no recognition)', value: 'remote' },
      ],
      admin: { description: 'IAS-12 §34 — DTA only recognised when realisation is probable.' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'JE that booked the deferred-tax accrual or reversal.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Recognised', value: 'recognised' },
        { label: 'Reversed', value: 'reversed' },
        { label: 'Derecognised (probability dropped)', value: 'derecognised' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('deferred-tax-items')],
  },
  timestamps: true,
}

export default DeferredTaxItems
