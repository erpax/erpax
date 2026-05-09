/**
 * Performance Obligations — IFRS 15 §22 distinct promises within a contract.
 *
 * Each PO has its own recognition timing (point-in-time vs over-time) and
 * standalone selling price. Recognition events fire from this collection,
 * not from Contracts directly.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time satisfaction-date
 * @accounting IFRS IFRS-15 §22 distinct-performance-obligation
 * @accounting IFRS IFRS-15 §31 satisfaction-of-performance-obligation
 * @accounting IFRS IFRS-15 §35 over-time-recognition
 * @accounting IFRS IFRS-15 §38 point-in-time-recognition
 * @accounting US-GAAP ASC-606-10-25-14 distinct-goods-services
 * @audit ISO-19011:2018 audit-trail po-satisfaction
 * @compliance SOX §404 internal-controls revenue-recognition
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateHost } from '@/hooks/autoPopulateHost'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'

const PerformanceObligations: CollectionConfig = {
  slug: 'performance-obligations',
  labels: { singular: 'Performance Obligation', plural: 'Performance Obligations' },
  admin: { useAsTitle: 'description', defaultColumns: ['contract', 'description', 'standaloneSellingPrice', 'recognitionMethod', 'status'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'contract', type: 'relationship', relationTo: 'contracts', required: true, index: true },
    { name: 'description', type: 'text', required: true },
    {
      name: 'recognitionMethod',
      type: 'select',
      required: true,
      options: [
        { label: 'Point-in-time (IFRS 15 §38)', value: 'point_in_time' },
        { label: 'Over-time — input method (IFRS 15 §35)', value: 'over_time_input' },
        { label: 'Over-time — output method (IFRS 15 §35)', value: 'over_time_output' },
      ],
    },
    { name: 'standaloneSellingPrice', type: 'number', required: true, min: 0, admin: { description: 'In cents.' } },
    currencyField(),
    { name: 'allocatedAmount', type: 'number', defaultValue: 0, admin: { description: 'Portion of contract transaction price allocated to this PO (cents).' } },
    { name: 'recognisedToDate', type: 'number', defaultValue: 0, admin: { readOnly: true, description: 'Cumulative recognised revenue (cents).' } },
    { name: 'percentComplete', type: 'number', defaultValue: 0, admin: { readOnly: true, description: 'For over-time methods: 0–100.' } },
    statusField(
      [
        { label: 'Pending', value: 'pending' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Satisfied', value: 'satisfied' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'pending',
    ),
    { name: 'satisfiedAt', type: 'date', admin: { readOnly: true } },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateHost],
    beforeChange: [
      autoPopulateCreatedBy,
      autoSetTimestamp('satisfiedAt', (d) => (d as { status?: string }).status === 'satisfied'),
    ],
    afterChange: [auditTrailAfterChange('performance-obligations')],
  },
  timestamps: true,
}

export default PerformanceObligations
