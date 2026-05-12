/**
 * Sales Commissions — IFRS-15 §91-94 incremental costs of obtaining a
 * contract (capitalisable when amortisation period ≥ 1 year).
 *
 * Slice EEEE (2026-05-10): each commission accrual on a closed-won
 * deal must be assessed against IFRS-15 §91-94 — if the contract life
 * makes the commission an "incremental cost of obtaining the contract"
 * with amortisation period ≥ 1 year, it's capitalised and amortised;
 * else it's expensed when paid.
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 §91 §92 §93 §94 incremental-costs-of-obtaining
 * @accounting IFRS IFRS-15 §99 §103 §104 §105 §106 amortisation
 * @accounting US-GAAP ASC-340-40-25-1 incremental-costs
 * @audit ISO-19011:2018 audit-trail commission-evidence
 * @compliance SOX §404 internal-controls commission-completeness
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Opportunities.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/accounting/base-accounting-fields'

const SalesCommissions: CollectionConfig = {
  slug: 'sales-commissions',
  labels: { singular: 'Sales Commission', plural: 'Sales Commissions' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'salesperson', 'opportunity', 'commissionAmount', 'recognitionTreatment', 'status'],
    description:
      'IFRS-15 §91-94 commission record. Capitalised + amortised when contract life makes amortisation ≥ 1 year; otherwise expensed.',
  },
  access: accountingCollectionAccess({ feature: 'crm' }),
  fields: [
    multiTenancyField(),
    referenceField(),
    { name: 'salesperson', type: 'relationship', relationTo: 'users', required: true },
    { name: 'employee', type: 'relationship', relationTo: 'employees',
      admin: { description: 'When commission flows through payroll.' } },
    { name: 'opportunity', type: 'relationship', relationTo: 'opportunities', required: true, index: true },
    { name: 'contract', type: 'relationship', relationTo: 'contracts', index: true,
      admin: { description: 'Contract created on close-won (drives the amortisation period).' } },
    { name: 'customer', type: 'relationship', relationTo: 'customers' },
    { name: 'closedWonDate', type: 'date', required: true },
    currencyField(),
    {
      name: 'commissionRule',
      type: 'group',
      fields: [
        { name: 'planName', type: 'text' },
        { name: 'ratePercent', type: 'number',
          admin: { description: 'Commission % on contract value.' } },
        { name: 'tieredOverride', type: 'textarea',
          admin: { description: 'Optional tiered-plan detail (e.g. 5% to quota, 10% over quota).' } },
      ],
    },
    { name: 'contractValue', type: 'number', required: true,
      admin: { description: 'Contract value the commission was calculated on (cents).' } },
    { name: 'commissionAmount', type: 'number', required: true,
      admin: { description: 'Gross commission (cents).' } },
    {
      name: 'recognitionTreatment',
      type: 'select',
      required: true,
      defaultValue: 'expense_immediately',
      options: [
        { label: 'Capitalise + Amortise (IFRS-15 §99)', value: 'capitalise_amortise' },
        { label: 'Expense Immediately (practical expedient §94 — amortisation < 1y)', value: 'expense_immediately' },
        { label: 'Renewal Commission (separate amortisation)', value: 'renewal' },
      ],
    },
    { name: 'amortisationPeriodMonths', type: 'number',
      admin: { description: 'Months over which capitalised commission is amortised (typically the contract life including expected renewals per IFRS-15 §99).' } },
    { name: 'amortisedToDate', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Cumulative amortisation expense recognised.' } },
    { name: 'capitalisedAssetBalance', type: 'number', defaultValue: 0,
      admin: { readOnly: true, description: 'Outstanding capitalised commission asset (cents).' } },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending Approval', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Paid (via payroll)', value: 'paid' },
        { label: 'Clawed Back (revoked)', value: 'clawed_back' },
        { label: 'Disputed', value: 'disputed' },
      ],
    },
    { name: 'paymentDate', type: 'date' },
    { name: 'paidViaPayrollRun', type: 'relationship', relationTo: 'payroll-runs' },
    { name: 'clawbackProvision', type: 'relationship', relationTo: 'provisions',
      admin: { description: 'IAS-37 clawback-risk provision (when contract churns / refunds within clawback window).' } },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Approved', value: 'approved' },
        { label: 'Posted (booked)', value: 'posted' },
        { label: 'Amortising', value: 'amortising' },
        { label: 'Fully Amortised', value: 'fully_amortised' },
        { label: 'Clawed Back', value: 'clawed_back' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('sales-commissions')],
  },
  timestamps: true,
}

export default SalesCommissions
