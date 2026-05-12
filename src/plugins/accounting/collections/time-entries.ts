/**
 * Time Entries — per-day / per-task time records for payroll + project costing.
 *
 * Drives both payroll variable pay (overtime, leave deductions) and
 * project / cost-center cost allocation. Each row is one (employee, date,
 * activity) tuple with a duration in minutes.
 *
 * @standard ISO-8601-1:2019 date-time work-date
 * @standard ISO-4217:2015 currency-codes hourly-rate
 * @accounting IFRS IAS-19 employee-benefits short-term
 * @accounting US-GAAP ASC-710 compensation-general
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers performance-obligation-progress
 * @audit ISO-19011:2018 audit-trail time-tracking-evidence
 * @compliance SOX §404 internal-controls payroll-evidence
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/plugins/accounting/collections/Employees.ts
 * @see src/plugins/accounting/collections/PayrollRuns.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import {
  multiTenancyField,
  statusField,
  notesField,
  auditFields,
} from '@/fields/accounting/base-accounting-fields'

const TimeEntries: CollectionConfig = {
  slug: 'time-entries',
  labels: { singular: 'Time Entry', plural: 'Time Entries' },
  admin: {
    useAsTitle: 'entryId',
    defaultColumns: [
      'entryId',
      'employee',
      'workDate',
      'minutes',
      'kind',
      'costCenter',
      'status',
    ],
    description:
      'Daily time records. Drives payroll variable pay + project / cost-center cost allocation.',
  },
  access: {
    // Each employee can read their own entries; payroll-officer / hr / admin
    // read all. Mutation requires either the employee themselves or the
    // approver flow.
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'hr', 'payroll-officer', 'employee'),
    update: roleScopedAccess('admin', 'hr', 'payroll-officer'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    {
      name: 'entryId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Stable id (e.g. TE-2026-04-001).' },
    },
    {
      name: 'employee',
      type: 'relationship',
      relationTo: 'employees',
      required: true,
      index: true,
    },
    { name: 'workDate', type: 'date', required: true, index: true },
    {
      name: 'minutes',
      type: 'number',
      required: true,
      min: 0,
      max: 1_440, // 24h cap per day
      admin: {
        description:
          'Duration in minutes. Capped at 1,440 per day; multi-day blocks split into separate rows.',
      },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'regular',
      options: [
        { label: 'Regular working hours', value: 'regular' },
        { label: 'Overtime (1.5×)', value: 'overtime_15' },
        { label: 'Overtime (2×)', value: 'overtime_2' },
        { label: 'Night shift', value: 'night_shift' },
        { label: 'Public holiday work', value: 'holiday_work' },
        { label: 'Paid time off (PTO)', value: 'pto' },
        { label: 'Sick leave', value: 'sick_leave' },
        { label: 'Parental leave', value: 'parental_leave' },
        { label: 'Bereavement leave', value: 'bereavement' },
        { label: 'Unpaid leave', value: 'unpaid_leave' },
        { label: 'Training', value: 'training' },
      ],
      admin: {
        description:
          'Drives the payroll multiplier and which GL accounts the cost posts to. PTO / sick / parental decrement the employee\'s benefits.paidTimeOffBalance.',
      },
    },
    {
      name: 'costCenter',
      type: 'relationship',
      relationTo: 'cost-centers',
      admin: {
        description:
          'Cost-center the labor cost allocates to. Defaults to the employee\'s department; can override per-entry for cross-charges.',
      },
    },
    {
      name: 'project',
      type: 'text',
      admin: {
        description:
          'Optional project / job code for project accounting. Free-text until a Projects collection lands.',
      },
    },
    {
      name: 'task',
      type: 'text',
      admin: { description: 'Optional task / work breakdown structure ref.' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'What was done. Required for billable / chargeable hours.' },
    },
    {
      name: 'billable',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Hours billable to a customer (project accounting / IFRS 15 input-method progress).',
      },
    },
    {
      name: 'billableRate',
      type: 'number',
      admin: {
        description:
          'Rate per hour in cents — for billable rows only. Drives the IFRS 15 over-time recognition when the PO uses labor_hours measurement.',
        condition: (data) => Boolean((data as { billable?: boolean })?.billable),
      },
    },
    // ── Approval lifecycle ──
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Posted to payroll', value: 'posted' },
      ],
      'draft',
    ),
    {
      name: 'submittedAt',
      type: 'date',
      admin: { readOnly: true },
    },
    {
      name: 'rejectionReason',
      type: 'textarea',
      admin: {
        condition: (data) => (data as { status?: string })?.status === 'rejected',
      },
    },
    {
      name: 'payrollRun',
      type: 'relationship',
      relationTo: 'payroll-runs',
      admin: {
        readOnly: true,
        description: 'Payroll run that consumed this entry — set when status flips to posted.',
      },
    },
    // approvedBy / approvedAt come from auditFields({ readOnly: true }) below.
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      autoSetTimestamp(
        'submittedAt',
        (d) => (d as { status?: string }).status === 'submitted',
      ),
      autoSetTimestamp(
        'approvedAt',
        (d) =>
          (d as { status?: string }).status === 'approved' ||
          (d as { status?: string }).status === 'rejected',
      ),
    ],
    afterChange: [auditTrailAfterChange('time-entries')],
  },
  timestamps: true,
}

export default TimeEntries
