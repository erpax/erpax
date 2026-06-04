/**
 * Depreciation Schedules — period-by-period IAS 16 depreciation detail.
 *
 * Where FixedAssets carries the asset master (cost, useful life, method),
 * this collection records the actual depreciation expense booked each
 * period — auditable evidence for SOX §404 + IAS 16.
 *
 * @standard ISO-8601-1:2019 date-time period-end
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-16 property-plant-and-equipment depreciation
 * @accounting IFRS IAS-36 impairment-of-assets
 * @accounting US-GAAP ASC-360 property-plant-and-equipment
 * @audit ISO-19011:2018 audit-trail depreciation-evidence
 * @compliance SOX §404 internal-controls
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { autoPopulateCreatedBy } from '@/auto/populate/created/by'
import { autoSetTimestamp } from '@/auto/set/timestamp'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import { currencyField, statusField, notesField, auditFields } from '@/base/accounting/field'
import { validateNotLocked } from '@/accounting/utility/period-lock'
import { depreciationSchedulePostingHook } from '@/collections/accounting/depreciation.hook'

const DepreciationSchedules: CollectionConfig = {
  slug: 'depreciation-schedules',
  labels: { singular: 'Depreciation Schedule', plural: 'Depreciation Schedules' },
  admin: { useAsTitle: 'scheduleId', defaultColumns: ['fixedAsset', 'periodEnd', 'depreciationAmount', 'status'] },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    { name: 'scheduleId', type: 'text', required: true, unique: true, index: true },
    { name: 'fixedAsset', type: 'relationship', relationTo: 'fixed-assets', required: true, index: true },
    { name: 'periodEnd', type: 'date', required: true, index: true },
    { name: 'periodStart', type: 'date', required: true },
    { name: 'depreciationAmount', type: 'number', required: true, min: 0 },
    { name: 'accumulatedAfter', type: 'number', admin: { readOnly: true, description: 'Accumulated depreciation after this entry (cents).' } },
    { name: 'bookValueAfter', type: 'number', admin: { readOnly: true, description: 'Book value after this entry (cents).' } },
    currencyField(),
    {
      name: 'method',
      type: 'select',
      options: [
        { label: 'Straight Line', value: 'straight_line' },
        { label: 'Declining Balance', value: 'declining_balance' },
        { label: 'Double Declining', value: 'double_declining' },
        { label: 'Units of Activity', value: 'units_of_activity' },
        { label: 'Sum of Years Digits', value: 'sum_of_years_digits' },
      ],
    },
    statusField(
      [
        { label: 'Calculated', value: 'calculated' },
        { label: 'Posted', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'calculated',
    ),
    { name: 'postedAt', type: 'date', admin: { readOnly: true } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      autoSetTimestamp('postedAt', (d) => (d as { status?: string }).status === 'posted'),
    ],
    afterChange: [
      // GL post when status flips to 'posted' — emits depreciation:posted →
      // glPostingService books Dr Depreciation Expense / Cr Accumulated Depreciation.
      depreciationSchedulePostingHook,
      auditTrailAfterChange('depreciation-schedules'),
    ],
  },
  timestamps: true,
}

export default DepreciationSchedules
