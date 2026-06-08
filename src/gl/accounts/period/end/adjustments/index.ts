import type { CollectionConfig } from 'payload'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import { notesField } from '@/base/accounting/field'
import { autoPopulateTenant } from '@/auto/populate/tenant';
import { autoPopulateCreatedBy } from '@/auto/populate/created/by';
import { autoSetTimestamp } from '@/auto/set/timestamp';
import { auditTrailAfterChange } from '@/audit/trail/after/change';
import { enforceSegregationOfDuties } from '@/enforce/segregation/of/duty';
import { validateNotLocked } from '@/utility';
import { periodEndAdjustmentPostingHook } from './hooks/period-end-adjustment';

/**
 * Period-End Adjustments — accruals, deferrals, depreciation, allocation entries.
 *
 * Slice ZZ: full canonical hook chain wired (autoPopulateTenant +
 * autoPopulateCreatedBy + validateNotLocked + segregation of duties on
 * approval + ISO-8601 postedAt timestamp + audit-trail emission).
 *
 * @standard ISO-8601-1:2019 date-time period posted-at
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
 * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.4 segregation-of-duties approval-vs-creation
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2
 */
const PeriodEndAdjustments: CollectionConfig = {
  slug: 'period-end-adjustments',
  labels: { singular: 'Period-End Adjustment', plural: 'Period-End Adjustments' },
  admin: {
    useAsTitle: 'adjustmentId',
    defaultColumns: ['adjustmentId', 'adjustmentType', 'period', 'adjustmentAmount', 'status'],
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    { name: 'adjustmentId', type: 'text', required: true, unique: true },
    {
      name: 'adjustmentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Depreciation', value: 'depreciation' },
        { label: 'Interest Accrual', value: 'interest_accrual' },
        { label: 'Salary Accrual', value: 'salary_accrual' },
        { label: 'Inventory Variance', value: 'inventory_variance' },
        { label: 'Allowance for Doubtful Accounts', value: 'allowance_doubtful' },
        { label: 'Accrued Expenses', value: 'accrued_expenses' },
        { label: 'Deferred Income', value: 'deferred_income' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'period', type: 'date', required: true },
    { name: 'description', type: 'textarea', localized: true, required: true },
    { name: 'adjustmentAmount', type: 'number', required: true },
    { name: 'debitAccount', type: 'relationship', relationTo: 'gl-accounts', required: true },
    { name: 'creditAccount', type: 'relationship', relationTo: 'gl-accounts', required: true },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { disabled: true } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Calculated', value: 'calculated' },
        { label: 'Approved', value: 'approved' },
        { label: 'Posted', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
      ],
    },
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      // SOX §404 four-eyes: the user who created the adjustment cannot
      // also approve it. ISO-27002 §5.4 segregation of duties.
      enforceSegregationOfDuties(),
      // ISO-8601 stamp on `postedAt` when status flips to 'posted'.
      autoSetTimestamp(
        'postedAt',
        (data) => (data as { status?: string }).status === 'posted',
      ),
    ],
    afterChange: [
      // GL post when status flips to 'posted' — closes the
      // period-end-adjustment.service.ts DOA. Books a real JE via
      // journalEntryService and back-links it to the adjustment doc.
      periodEndAdjustmentPostingHook,
      auditTrailAfterChange('period-end-adjustments'),
    ],
  },
  timestamps: true,
};

export default PeriodEndAdjustments;
