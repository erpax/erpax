/**
 * WIP Snapshots — periodic Work-in-Progress valuation per project.
 *
 * Slice AAAA (2026-05-10): IFRS-15 §B14-B19 cost-to-cost recognition
 * needs a frozen evidence trail per period of (cost-to-date,
 * estimate-at-completion, % complete, recognised-revenue,
 * unbilled-revenue / deferred-revenue). At period close, one snapshot
 * row is written per active project; the accruals JE that books the
 * unbilled WIP / deferred revenue is anchored to the snapshot.
 *
 * Pairs with `period-end-adjustments` (the JE) and `projects` (the
 * source). Auditors walk from the trial-balance unbilled-WIP balance
 * → snapshot rows → underlying time-entries / materials.
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 §B14 §B15 §B16 §B17 §B18 §B19 measurement-of-progress
 * @accounting IFRS IFRS-15 §107 §108 §109 contract-asset-contract-liability
 * @accounting US-GAAP ASC-606-10-45-1 contract-asset
 * @audit ISO-19011:2018 audit-trail wip-evidence
 * @compliance SOX §404 internal-controls revenue-recognition
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Projects.ts
 * @see ./PeriodEndAdjustments.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { currencyField, statusField, notesField, auditFields } from '@/base/accounting/field'
import { emitWipSnapshotPosted } from '@/chain/event/emitter'

const WipSnapshots: CollectionConfig = {
  slug: 'wip-snapshots',
  labels: { singular: 'WIP Snapshot', plural: 'WIP Snapshots' },
  admin: {
    useAsTitle: 'snapshotRef',
    defaultColumns: ['snapshotRef', 'project', 'period', 'percentComplete', 'recognisedRevenue', 'unbilledOrDeferred', 'status'],
    description:
      'Period-end WIP valuation per project — frozen evidence for the IFRS-15 §B18 cost-to-cost JE. One row per (project × fiscal-period).',
  },
  access: accountingCollectionAccess({ feature: 'project_accounting' }),
  fields: [
    { name: 'snapshotRef', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'Tenant-unique snapshot reference (e.g. WIP-2026-04-PRJ-001).' } },
    { name: 'project', type: 'relationship', relationTo: 'projects', required: true, index: true },
    { name: 'period', type: 'relationship', relationTo: 'fiscal-periods', required: true, index: true },
    { name: 'snapshotDate', type: 'date', required: true,
      admin: { description: 'ISO 8601 — period-end date the snapshot freezes.' } },
    {
      name: 'recognitionMethod',
      type: 'select',
      defaultValue: 'cost_to_cost',
      options: [
        { label: 'Cost-to-Cost (§B18)', value: 'cost_to_cost' },
        { label: 'Output — Units Delivered (§B15)', value: 'output_units' },
        { label: 'Output — Time Elapsed (§B15)', value: 'output_time' },
        { label: 'Output — Surveys (§B15)', value: 'output_survey' },
        { label: 'Milestone (§126)', value: 'milestone' },
      ],
      admin: { description: 'Snapshot of the project\'s recognitionMethod at period-close.' },
    },
    currencyField(),
    { name: 'contractedAmount', type: 'number', required: true,
      admin: { description: 'Total transaction price (cents).' } },
    { name: 'estimatedTotalCost', type: 'number', required: true,
      admin: { description: 'EAC (Estimate at Completion) at the snapshot date.' } },
    { name: 'costToDate', type: 'number', required: true,
      admin: { description: 'Cumulative posted cost (numerator in cost-to-cost % complete).' } },
    { name: 'percentComplete', type: 'number', required: true, min: 0, max: 100,
      admin: { description: 'costToDate / estimatedTotalCost × 100 (or output-method equivalent).' } },
    { name: 'recognisedRevenue', type: 'number', required: true,
      admin: { description: 'percentComplete × contractedAmount (cumulative recognised revenue).' } },
    { name: 'invoicedToDate', type: 'number', required: true,
      admin: { description: 'Σ posted-invoices.totalAmount through the snapshot date.' } },
    { name: 'unbilledOrDeferred', type: 'number',
      admin: { readOnly: true, description: 'recognisedRevenue − invoicedToDate. Positive = contract asset (unbilled WIP); negative = contract liability (deferred revenue).' } },
    { name: 'estimatedLossProvision', type: 'number', defaultValue: 0,
      admin: { description: 'IAS-37 §66 onerous-contract loss provision when EAC > contracted (booked in full at the snapshot).' } },
    { name: 'periodEndAdjustment', type: 'relationship', relationTo: 'period-end-adjustments',
      admin: { readOnly: true, description: 'The accrual JE that booked this snapshot\'s movement.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Reviewed (PM sign-off)', value: 'reviewed' },
        { label: 'Posted (JE booked)', value: 'posted' },
        { label: 'Reversed (next-period reverse)', value: 'reversed' },
        { label: 'Restated (IAS-8 §42 prior-period correction)', value: 'restated' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('wip-snapshots', { afterChange: [emitWipSnapshotPosted] }),
  timestamps: true,
}

export default WipSnapshots
