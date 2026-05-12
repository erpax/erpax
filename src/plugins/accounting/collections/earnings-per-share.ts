/**
 * Earnings per Share — IAS 33 basic + diluted EPS calculations.
 *
 * Slice BBBBB-prep (2026-05-11): each row is one period's EPS computation
 * (basic + diluted) per IAS 33 §10-§11 / §31. Inputs come from the
 * income statement (net profit attributable to ordinary equity holders),
 * the share registry (weighted-average shares outstanding), and the
 * dilutive-instrument register (options + convertibles + share-based
 * payments under IFRS 2 — chained via `share-based-payments`).
 *
 * @standard IFRS IAS-33 §10 basic-eps
 * @standard IAS-33 §11-§19 weighted-average-number-of-ordinary-shares
 * @standard IFRS IAS-33 §30-§63 diluted-eps
 * @standard IFRS IAS-33 §66-§70 disclosure
 * @standard US-GAAP ASC-260 earnings-per-share
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time period-end
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-eps-computation
 * @compliance SOX §404 internal-controls
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/accounting/base-accounting-fields'

const EarningsPerShare: CollectionConfig = {
  slug: 'earnings-per-share',
  labels: { singular: 'EPS Computation', plural: 'EPS Computations' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'period', 'basicEps', 'dilutedEps', 'status'],
    description:
      'IAS 33 — basic + diluted EPS per period.',
  },
  access: accountingCollectionAccess({ feature: 'earnings_per_share' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Sequential reference (e.g. EPS-2026-Q1).' }),
    { name: 'period', type: 'relationship', relationTo: 'fiscal-periods', required: true, index: true },
    { name: 'periodEnd', type: 'date', required: true, index: true },
    { name: 'netProfitAttributableToOrdinary', type: 'number', required: true,
      admin: { description: 'IAS 33 §12 — net profit/loss attributable to ordinary equity holders (cents).' } },
    { name: 'preferredDividends', type: 'number', defaultValue: 0,
      admin: { description: 'IAS 33 §14 — deducted from net profit when computing basic-EPS numerator.' } },
    { name: 'basicEpsNumerator', type: 'number',
      admin: { readOnly: true, description: 'netProfit − preferredDividends (cents).' } },
    { name: 'weightedAverageOrdinaryShares', type: 'number', required: true,
      admin: { description: 'IAS 33 §19 — time-weighted shares outstanding during the period.' } },
    { name: 'basicEps', type: 'number',
      admin: { readOnly: true, description: 'basicEpsNumerator / weightedAverageOrdinaryShares (per share, in currency units).' } },
    { name: 'dilutivePotentialShares', type: 'number', defaultValue: 0,
      admin: { description: 'IAS 33 §31 — weighted-average dilutive potential ordinary shares (options + convertibles + IFRS 2 grants).' } },
    { name: 'antiDilutiveShares', type: 'number', defaultValue: 0,
      admin: { description: 'IAS 33 §41 — anti-dilutive shares EXCLUDED from diluted calculation (out-of-money options, etc.).' } },
    { name: 'dilutedEps', type: 'number',
      admin: { readOnly: true, description: 'basicEpsNumerator / (weightedAverageOrdinaryShares + dilutivePotentialShares).' } },
    {
      name: 'continuingVsDiscontinued',
      type: 'group',
      admin: { description: 'IAS 33 §66 — separate EPS for continuing vs discontinued operations.' },
      fields: [
        { name: 'continuingEpsBasic', type: 'number' },
        { name: 'continuingEpsDiluted', type: 'number' },
        { name: 'discontinuedEpsBasic', type: 'number' },
        { name: 'discontinuedEpsDiluted', type: 'number' },
      ],
    },
    currencyField(),
    {
      name: 'shareEvents',
      type: 'array',
      labels: { singular: 'Share Event', plural: 'Share Events' },
      admin: { description: 'Issuances / buy-backs / splits / bonus issues during the period — drive the weighted-average computation.' },
      dbName: 'eps_share_events',
      fields: [
        { name: 'eventDate', type: 'date', required: true },
        { name: 'eventKind', type: 'select', required: true, options: [
          { label: 'Issuance', value: 'issuance' },
          { label: 'Buy-back', value: 'buyback' },
          { label: 'Stock Split', value: 'split' },
          { label: 'Reverse Split', value: 'reverse_split' },
          { label: 'Bonus Issue', value: 'bonus' },
          { label: 'Conversion (debt → equity)', value: 'conversion' },
        ] },
        { name: 'sharesDelta', type: 'number', required: true,
          admin: { description: 'Change in shares outstanding (positive or negative).' } },
        { name: 'splitRatio', type: 'text',
          admin: { description: 'For splits: e.g. "2-for-1" or "1-for-3" (reverse).' } },
      ],
    },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Computed', value: 'computed' },
        { label: 'Published', value: 'published' },
        { label: 'Restated', value: 'restated' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('earnings-per-share')],
  },
  timestamps: true,
}

export default EarningsPerShare
