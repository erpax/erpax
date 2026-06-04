/**
 * Investment Properties — IAS 40 land/buildings held to earn rental
 * income or capital appreciation (NOT for own use; NOT for sale in
 * ordinary course).
 *
 * Slice BBBBB-prep (2026-05-11): each row is one investment property
 * with the §30 measurement model election (cost vs fair-value). The
 * fair-value model (§33) reflects gains/losses in P&L; the cost model
 * (§56) follows IAS 16 with disclosure of fair value.
 *
 * @standard IFRS IAS-40 §5 definition-investment-property
 * @standard IFRS IAS-40 §30 measurement-model-election
 * @standard IFRS IAS-40 §33 fair-value-model
 * @standard IFRS IAS-40 §56 cost-model
 * @standard IFRS IAS-40 §57-§65 transfers-into-out-of-investment-property
 * @standard IFRS IAS-40 §74 disclosure-requirements
 * @standard IFRS IFRS-13 fair-value-input-hierarchy
 * @standard US-GAAP ASC-360 long-lived-assets (no separate IP standard)
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-investment-property
 * @compliance SOX §404 internal-controls
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '@/access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/base-accounting-fields'

const InvestmentProperties: CollectionConfig = {
  slug: 'investment-properties',
  labels: { singular: 'Investment Property', plural: 'Investment Properties' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'property', 'measurementModel', 'currentFairValue', 'rentalIncomeYtd', 'status'],
    description:
      'IAS 40 — property held to earn rentals or capital appreciation (not own-use, not held-for-sale).',
  },
  access: accountingCollectionAccess({ feature: 'investment_property' }),
  fields: [
    referenceField({ description: 'Sequential reference (e.g. IP-2026-001).' }),
    { name: 'property', type: 'relationship', relationTo: 'properties', required: true, index: true },
    { name: 'acquisitionDate', type: 'date', required: true },
    { name: 'acquisitionCost', type: 'number', required: true,
      admin: { description: 'IAS 40 §20-§29 — purchase price + directly attributable costs (cents).' } },
    {
      name: 'measurementModel',
      type: 'select',
      required: true,
      defaultValue: 'fair_value',
      options: [
        { label: 'Fair Value Model (IAS 40 §33)', value: 'fair_value' },
        { label: 'Cost Model (IAS 40 §56 — follows IAS 16)', value: 'cost' },
      ],
      admin: { description: 'IAS 40 §30 election — applied uniformly to all investment property.' },
    },
    { name: 'currentFairValue', type: 'number',
      admin: { description: 'IFRS 13 fair value at reporting date (cents). Required when measurementModel = fair_value; disclosed only when = cost.' } },
    { name: 'fairValueChangeYtd', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'IAS 40 §35 — gain/loss on remeasurement (P&L) under fair-value model.' } },
    { name: 'rentalIncomeYtd', type: 'number', defaultValue: 0,
      admin: { description: 'IAS 17/IFRS 16 lease income recognised YTD (cents).' } },
    { name: 'directOperatingExpensesYtd', type: 'number', defaultValue: 0,
      admin: { description: 'IAS 40 §75(f) — operating expenses disclosure split.' } },
    currencyField(),
    {
      name: 'transferReason',
      type: 'select',
      options: [
        { label: 'Owner-occupation begins (transfer OUT to PPE)', value: 'transfer_to_ppe' },
        { label: 'Owner-occupation ends (transfer IN from PPE)', value: 'transfer_from_ppe' },
        { label: 'Development for sale begins (transfer OUT to inventory)', value: 'transfer_to_inventory' },
        { label: 'Development complete + lease commenced (transfer IN from inventory)', value: 'transfer_from_inventory' },
      ],
      admin: { description: 'IAS 40 §57-§65 — change-in-use trigger.' },
    },
    { name: 'lease', type: 'relationship', relationTo: 'leases',
      admin: { description: 'When the IP is leased OUT to a tenant (lessor side).' } },
    { name: 'fairValueMeasurement', type: 'relationship', relationTo: 'fair-value-measurements',
      admin: { description: 'IFRS 13 hierarchy classification (Level 1/2/3).' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Under Construction (IAS 40 §8)', value: 'construction' },
        { label: 'Vacant', value: 'vacant' },
        { label: 'Transferred Out', value: 'transferred_out' },
        { label: 'Disposed', value: 'disposed' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('investment-properties'),
  timestamps: true,
}

export default InvestmentProperties
