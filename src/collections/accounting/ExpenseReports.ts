/**
 * Expense Reports — employee expense claims with approval + reimbursement.
 *
 * Slice GGGG (2026-05-10): per IAS-19 employee benefits + national tax
 * codes (per-diem rules, mileage rates), each expense claim must be
 * structured with line-level receipts + GL coding for the reimbursement
 * AP entry. SOX §404 — claimant ≠ approver.
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-19 employee-benefits
 * @accounting IFRS IAS-21 §28 fx-on-reimbursement
 * @compliance GDPR Art.5 PII receipt-images
 * @compliance SOX §404 internal-controls four-eyes
 * @audit ISO-19011:2018 audit-trail expense-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Employees.ts
 * @see ./PaymentRuns.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'

const ExpenseReports: CollectionConfig = {
  slug: 'expense-reports',
  labels: { singular: 'Expense Report', plural: 'Expense Reports' },
  admin: {
    useAsTitle: 'reportNumber',
    defaultColumns: ['reportNumber', 'employee', 'submissionDate', 'totalAmount', 'reimbursementCurrency', 'status'],
    description:
      'Employee expense claim with line-level receipts. Approver ≠ claimant (SOX §404). On approval, AP creates the reimbursement payment.',
  },
  access: accountingCollectionAccess(),
  fields: [
    multiTenancyField(),
    { name: 'reportNumber', type: 'text', required: true, unique: true, index: true },
    { name: 'employee', type: 'relationship', relationTo: 'employees', required: true, index: true },
    { name: 'submissionDate', type: 'date', required: true },
    { name: 'periodStartDate', type: 'date' },
    { name: 'periodEndDate', type: 'date' },
    { name: 'project', type: 'relationship', relationTo: 'projects',
      admin: { description: 'When expenses are billable to a customer project.' } },
    { name: 'costCenter', type: 'relationship', relationTo: 'cost-centers' },
    { name: 'businessPurpose', type: 'textarea', required: true,
      admin: { description: 'Why the trip / spend was needed (substantiation evidence).' } },
    {
      name: 'lines',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Expense Line', plural: 'Expense Lines' },
      dbName: 'er_lines',
      fields: [
        { name: 'expenseDate', type: 'date', required: true },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Airfare', value: 'airfare' },
            { label: 'Hotel / Lodging', value: 'hotel' },
            { label: 'Meals', value: 'meals' },
            { label: 'Per Diem', value: 'per_diem' },
            { label: 'Ground Transportation', value: 'ground_transport' },
            { label: 'Mileage (personal vehicle)', value: 'mileage' },
            { label: 'Conference / Training', value: 'conference' },
            { label: 'Office Supplies', value: 'office_supplies' },
            { label: 'Software / Subscriptions', value: 'software' },
            { label: 'Client Entertainment', value: 'entertainment' },
            { label: 'Phone / Internet', value: 'telecom' },
            { label: 'Other', value: 'other' },
          ],
        },
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'merchant', type: 'text' },
        currencyField({ name: 'currency', defaultValue: 'EUR' }),
        { name: 'amount', type: 'number', required: true,
          admin: { description: 'Amount in expense currency (cents).' } },
        { name: 'fxRate', type: 'number',
          admin: { description: 'Conversion to reimbursement currency (snapshot).' } },
        { name: 'reimbursementAmount', type: 'number',
          admin: { description: 'amount × fxRate (cents) in reimbursementCurrency.' } },
        { name: 'glAccount', type: 'relationship', relationTo: 'gl-accounts' },
        { name: 'taxCode', type: 'relationship', relationTo: 'tax-codes' },
        { name: 'isBillableToCustomer', type: 'checkbox', defaultValue: false },
        { name: 'mileageDistance', type: 'number',
          admin: { description: 'Distance in km (when category = mileage).' } },
        { name: 'mileageRate', type: 'number',
          admin: { description: 'Per-km reimbursement rate (cents).' } },
        { name: 'receiptAttached', type: 'checkbox', defaultValue: false },
        { name: 'receiptMedia', type: 'relationship', relationTo: 'media' },
        { name: 'isPolicyCompliant', type: 'checkbox', defaultValue: true },
        { name: 'policyExceptionReason', type: 'text' },
      ],
    },
    currencyField({ name: 'reimbursementCurrency', defaultValue: 'EUR' }),
    { name: 'totalAmount', type: 'number', required: true,
      admin: { description: 'Σ lines.reimbursementAmount (cents).' } },
    { name: 'totalReimbursable', type: 'number',
      admin: { description: 'Total ≤ totalAmount when some lines are non-compliant / out-of-policy.' } },
    { name: 'totalNonReimbursable', type: 'number', defaultValue: 0 },
    {
      name: 'approvalChain',
      type: 'array',
      labels: { singular: 'Approval Step', plural: 'Approval Steps' },
      dbName: 'er_approval',
      fields: [
        { name: 'step', type: 'number', required: true },
        { name: 'approver', type: 'relationship', relationTo: 'users', required: true },
        { name: 'role', type: 'text' },
        { name: 'decision', type: 'select', defaultValue: 'pending', options: [
          { label: 'Pending', value: 'pending' },
          { label: 'Approved', value: 'approved' },
          { label: 'Rejected', value: 'rejected' },
          { label: 'Returned for Clarification', value: 'returned' },
        ]},
        { name: 'decidedAt', type: 'date' },
        { name: 'comment', type: 'text', localized: true },
      ],
    },
    { name: 'reimbursementMethod', type: 'select', defaultValue: 'payroll', options: [
      { label: 'Payroll (next payroll run)', value: 'payroll' },
      { label: 'AP Payment (separate wire)', value: 'ap_payment' },
      { label: 'Corporate Card Auto-Settle (no reimbursement)', value: 'corporate_card' },
      { label: 'Cash Advance Settle', value: 'cash_advance' },
    ]},
    { name: 'reimbursementDate', type: 'date' },
    { name: 'reimbursedViaPayrollRun', type: 'relationship', relationTo: 'payroll-runs' },
    { name: 'reimbursedViaPayment', type: 'relationship', relationTo: 'payments' },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Submitted (awaiting approval)', value: 'submitted' },
        { label: 'In Approval Chain', value: 'in_approval' },
        { label: 'Approved (ready for reimbursement)', value: 'approved' },
        { label: 'Reimbursed', value: 'reimbursed' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Returned for Clarification', value: 'returned' },
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
    afterChange: [auditTrailAfterChange('expense-reports')],
  },
  timestamps: true,
}

export default ExpenseReports
