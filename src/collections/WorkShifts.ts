/**
 * Work Shifts — labor/time/cost roll-up for a worker at a work-center.
 *
 * Records the time a worker spent producing on a work-center (optionally
 * against a work-order), the quantity produced/scrapped, and the derived
 * `wage`. Wage uses the parallelism-aware roll-up
 * `wage = runTimeMinutes/60 · rate / parallelism` (a worker minding N
 * machines splits the labor cost N ways), feeding IAS-2 cost-of-conversion.
 *
 * @standard ISA-95:2013 / IEC-62264-1 §B.5 personnel + production-performance
 * @standard ISO-22400-2:2014 manufacturing-operations KPIs (labor utilization, OEE)
 * @standard ISO-8601-1:2019 date-time shift-start-end
 * @standard ILO C001 hours-of-work
 * @accounting IFRS IAS-2 §12 cost-of-conversion direct-labor
 * @accounting US-GAAP ASC-330-10-30 inventory-cost
 * @audit ISO-19011:2018 audit-trail labor-recording
 * @compliance SOX §404 internal-controls payroll-and-production-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./WorkCenters.ts
 * @see ./WorkOrders.ts
 */

import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '../access/auth'
import { referenceField, statusField, auditFields, notesField, currencyField } from '../fields/base-accounting-fields'

/**
 * Derive `wage` from run time, rate, and parallelism (machines-per-worker).
 * A worker running `parallelism` units in parallel splits the labor cost.
 */
const computeWage: CollectionBeforeChangeHook = ({ data }) => {
  const d = data as Record<string, unknown>
  const minutes = Number(d.runTimeMinutes) || 0
  const rate = Number(d.rate) || 0
  const parallelism = Number(d.parallelism) || 1
  d.wage = parallelism > 0 ? Math.round(((minutes / 60) * rate / parallelism) * 100) / 100 : 0
  return data
}

const WorkShifts: CollectionConfig = {
  slug: 'work-shifts',
  labels: { singular: 'Work Shift', plural: 'Work Shifts' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'worker', 'workCenter', 'shiftStart', 'qtyProduced', 'wage', 'status'],
    description:
      'Labor/time/cost roll-up: worker × work-center × time → wage (parallelism-aware), feeding IAS-2 cost-of-conversion.',
  },
  access: accountingCollectionAccess({ feature: 'manufacturing' }),
  fields: [
    referenceField({ description: 'Work-shift reference (e.g. `WS-2026-04-0042`).' }),
    { name: 'worker', type: 'relationship', relationTo: 'employees', required: true, index: true,
      admin: { description: 'Employee who worked the shift.' } },
    { name: 'workCenter', type: 'relationship', relationTo: 'work-centers', required: true, index: true,
      admin: { description: 'Work-center the labor was performed at.' } },
    { name: 'workOrder', type: 'relationship', relationTo: 'work-orders',
      admin: { description: 'Production order the shift contributed to (optional).' } },
    { name: 'shiftStart', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — shift start.' } },
    { name: 'shiftEnd', type: 'date',
      admin: { description: 'ISO 8601 — shift end.' } },
    { name: 'runTimeMinutes', type: 'number', min: 0, defaultValue: 0,
      admin: { description: 'Productive run time in minutes (drives wage).' } },
    { name: 'qtyProduced', type: 'number', min: 0, defaultValue: 0,
      admin: { description: 'Good units produced this shift.' } },
    { name: 'qtyScrap', type: 'number', min: 0, defaultValue: 0,
      admin: { description: 'Scrapped (NCR) units this shift.' } },
    { name: 'rate', type: 'number', min: 0,
      admin: { description: 'Labor pay rate per hour (defaults from the work-center `payPerHour`).' } },
    { name: 'parallelism', type: 'number', min: 1, defaultValue: 1,
      admin: { description: 'Units run in parallel by one worker (machines-per-worker) — divides the wage.' } },
    { name: 'wage', type: 'number',
      admin: { readOnly: true, description: 'Derived = runTimeMinutes/60 · rate / parallelism. Do not edit.' } },
    currencyField({ name: 'wageCurrency', allowBlank: true }),
    statusField(
      [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
        { label: 'Approved (payroll)', value: 'approved' },
      ],
      'open',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy, computeWage],
    afterChange: [auditTrailAfterChange('work-shifts')],
  },
  timestamps: true,
}

export default WorkShifts
