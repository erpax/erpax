/**
 * Leave Requests — vacation / sick / parental / unpaid leave register.
 *
 * Slice GGGG (2026-05-10): per IAS-19 §13 short-term employee benefits
 * (paid leave), the entity must accrue obligations for unused
 * compensated absences. Each request decrements the employee's
 * entitlement balance; the running balance feeds the IAS-19 accrual.
 *
 * National labour codes (BG Labour Code Art.155-176, EU Working Time
 * Directive 2003/88/EC, US FMLA, etc.) drive the leave-type
 * categorisation + minimum entitlements.
 *
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-19 §11 §13 §14 short-term-employee-benefits
 * @accounting IFRS IAS-19 §16 accumulating-paid-absences
 * @accounting US-GAAP ASC-710-10-25 compensated-absences
 * @compliance EU Working Time Directive 2003/88/EC minimum-leave
 * @compliance US FMLA family-medical-leave-act
 * @compliance BG Labour Code Art.155-176
 * @audit ISO-19011:2018 audit-trail leave-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Employees.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'

const LeaveRequests: CollectionConfig = {
  slug: 'leave-requests',
  labels: { singular: 'Leave Request', plural: 'Leave Requests' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'employee', 'leaveType', 'startDate', 'endDate', 'workingDays', 'status'],
    description:
      'Vacation / sick / parental / unpaid leave register. Approved requests decrement entitlement balance + feed IAS-19 accrual.',
  },
  access: accountingCollectionAccess(),
  fields: [
    multiTenancyField(),
    referenceField(),
    { name: 'employee', type: 'relationship', relationTo: 'employees', required: true, index: true },
    {
      name: 'leaveType',
      type: 'select',
      required: true,
      options: [
        { label: 'Annual Vacation (paid)', value: 'annual' },
        { label: 'Sick Leave (paid)', value: 'sick' },
        { label: 'Sick Leave (unpaid)', value: 'sick_unpaid' },
        { label: 'Parental — Maternity', value: 'maternity' },
        { label: 'Parental — Paternity', value: 'paternity' },
        { label: 'Parental — Adoption', value: 'adoption' },
        { label: 'Bereavement', value: 'bereavement' },
        { label: 'Jury Duty', value: 'jury_duty' },
        { label: 'Military Service', value: 'military' },
        { label: 'Study / Training Leave', value: 'study' },
        { label: 'Sabbatical', value: 'sabbatical' },
        { label: 'Unpaid Personal Leave', value: 'unpaid_personal' },
        { label: 'Compassionate Leave', value: 'compassionate' },
        { label: 'TOIL (Time Off In Lieu)', value: 'toil' },
        { label: 'Public Holiday Substitute', value: 'public_holiday_sub' },
      ],
    },
    { name: 'isPaid', type: 'checkbox', defaultValue: true },
    { name: 'submittedDate', type: 'date', required: true },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date', required: true },
    { name: 'workingDays', type: 'number', required: true,
      admin: { description: 'Working days requested (excludes weekends + public holidays per local calendar).' } },
    { name: 'workingHours', type: 'number',
      admin: { description: 'For half-day or partial requests — total hours.' } },
    {
      name: 'partialDay',
      type: 'select',
      options: [
        { label: 'Full day', value: 'full' },
        { label: 'Half day — morning', value: 'half_morning' },
        { label: 'Half day — afternoon', value: 'half_afternoon' },
        { label: 'Custom hours', value: 'custom' },
      ],
    },
    { name: 'reason', type: 'textarea',
      admin: { description: 'Optional — required by some leave types (e.g. medical certificate ref for sick).' } },
    { name: 'medicalCertificateRef', type: 'text',
      admin: { description: 'Medical certificate reference (sick leave) — receipt-image attached separately.' } },
    {
      name: 'balanceImpact',
      type: 'group',
      fields: [
        { name: 'entitlementType', type: 'text',
          admin: { description: 'Which entitlement bucket this draws from (e.g. "annual_2026").' } },
        { name: 'beforeBalance', type: 'number',
          admin: { description: 'Days remaining before this request.' } },
        { name: 'afterBalance', type: 'number',
          admin: { description: 'Days remaining after this request approval.' } },
        { name: 'carryOverApplied', type: 'number',
          admin: { description: 'Days drawn from prior-year carry-over.' } },
      ],
    },
    // 'approver' is the manager assigned to action this request; distinct
    // from 'approvedBy' (who actually clicked approve — comes from auditFields).
    { name: 'approver', type: 'relationship', relationTo: 'users' },
    // 'approvedAt' removed — comes from auditFields() below; was a duplicate
    // that tripped Payload's DuplicateFieldName guard at config-load time.
    { name: 'rejectionReason', type: 'text' },
    { name: 'replacedByEmployee', type: 'relationship', relationTo: 'employees',
      admin: { description: 'Coverage employee during the absence (when applicable).' } },
    { name: 'isHandoverComplete', type: 'checkbox', defaultValue: false },
    { name: 'cancelledDate', type: 'date' },
    { name: 'cancelReason', type: 'text' },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted (awaiting approval)', value: 'submitted' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'In Progress (currently on leave)', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('leave-requests')],
  },
  timestamps: true,
}

export default LeaveRequests
