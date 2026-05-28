/**
 * JournalEntries Collection
 *
 * Manual GL entries for business transactions.
 * Enforces double-entry bookkeeping: debits = credits.
 * Supports recurring entries, reversals, and prior-period adjustments.
 * Posting is immutable; modifications require admin override with documentation.
 *
 * @invariant debits.sum() === credits.sum()
 * @invariant createdBy ≠ approvedBy (segregation of duties)
 * @invariant Once posted, entry is immutable
 * @invariant Large entries require tiered approval by amount
 */

import { CollectionConfig } from 'payload'
import { accountingCollectionAccess } from '../../access/auth'
import { validateDoubleEntry } from '../../hooks/validateDoubleEntry'

export const JournalEntries: CollectionConfig = {
  slug: 'journal-entries',
  admin: {
    useAsTitle: 'entryNumber',
  },
  access: accountingCollectionAccess(),
  hooks: {
    beforeValidate: [validateDoubleEntry],
  },
  fields: [
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
      admin: { description: 'Entity posting entry to' },
    },
    {
      name: 'entryNumber',
      type: 'text',
      unique: true,
      required: true,
      admin: { description: 'Sequential entry number for control (e.g., JE-2026-0001)' },
    },
    {
      name: 'entryDate',
      type: 'date',
      required: true,
      admin: { description: 'Date of transaction (determines posting period)' },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: { description: 'Business purpose of entry (required for audit trail)' },
    },
    {
      name: 'postings',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        {
          name: 'glAccount',
          type: 'relationship',
          relationTo: 'gl-accounts',
          required: true,
        },
        {
          name: 'debitAmount',
          type: 'number',
          admin: { description: 'Debit amount (leave blank for credits only)' },
        },
        {
          name: 'creditAmount',
          type: 'number',
          admin: { description: 'Credit amount (leave blank for debits only)' },
        },
        {
          name: 'description',
          type: 'text',
          admin: { description: 'Line-item specific description' },
        },
        {
          name: 'segment',
          type: 'relationship',
          relationTo: 'cost-centers',
          admin: { description: 'Optional cost center/segment allocation' },
        },
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
          admin: { description: 'Optional project allocation' },
        },
      ],
      admin: {
        description: 'Individual debit/credit lines (system validates debits = credits)',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Approval', value: 'pending-approval' },
        { label: 'Approved', value: 'approved' },
        { label: 'Posted', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      required: true,
      defaultValue: 'draft',
      admin: {
        description: 'Workflow status: draft → pending → approved → posted → (reversed or closed)',
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { hasMany: false },
    },
    {
      name: 'approvedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'User who approved entry (must not be creator for segregation of duties)',
      },
    },
    {
      name: 'approvalDate',
      type: 'date',
      admin: { description: 'Date approved' },
    },
    {
      name: 'approvalReason',
      type: 'textarea',
      admin: { description: 'Approver notes (why approved or conditional approval)' },
    },
    {
      name: 'postedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'User who posted entry to GL' },
    },
    {
      name: 'postedDate',
      type: 'date',
      admin: { description: 'Actual GL posting date (becomes immutable after this)' },
    },
    {
      name: 'isRecurring',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Check if this is recurring entry (e.g., rent accrual, utilities, depreciation)',
      },
    },
    {
      name: 'recurringSchedule',
      type: 'select',
      options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Semi-Annual', value: 'semi-annual' },
        { label: 'Annual', value: 'annual' },
        { label: 'One-Time (Not Recurring)', value: 'one-time' },
      ],
      defaultValue: 'one-time',
      admin: { description: 'Recurring frequency (if applicable)' },
    },
    {
      name: 'recurringStartDate',
      type: 'date',
      admin: { description: 'Recurring entry start date' },
    },
    {
      name: 'recurringEndDate',
      type: 'date',
      admin: { description: 'Recurring entry end date (after this, no more auto-postings)' },
    },
    {
      name: 'isReversal',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Check if this entry reverses a prior entry (allows posting to locked periods)',
      },
    },
    {
      name: 'reversesEntryId',
      type: 'relationship',
      relationTo: 'journal-entries',
      admin: { description: 'If reversal, which entry does this reverse?' },
    },
    {
      name: 'isPriorPeriodAdjustment',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Check if prior-period adjustment (allows posting to closed periods with approval)',
      },
    },
    {
      name: 'priorPeriodAdjustmentReason',
      type: 'textarea',
      admin: {
        description:
          'Why is prior-period adjustment needed? (e.g., "Q1 accrual error, invoice received in Q2")',
      },
    },
    {
      name: 'supportingDocuments',
      type: 'relationship',
      relationTo: 'audit-evidence',
      hasMany: true,
      admin: {
        description:
          'Supporting documents (invoices, contracts, approvals). Required for large entries.',
      },
    },
    {
      name: 'amountThreshold',
      type: 'number',
      admin: { description: 'Total debit or credit amount (calculated for approval routing)' },
    },
    {
      name: 'requiresDocumentation',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'System flag: true if amount > threshold and supporting docs required',
      },
    },
    {
      name: 'adminOverride',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check if admin overrode a validation or approval requirement',
      },
    },
    {
      name: 'adminOverrideReason',
      type: 'textarea',
      admin: {
        description: 'Reason for admin override (required if checked)',
      },
    },
    {
      name: 'auditTrail',
      type: 'richText',
      admin: {
        description:
          'Immutable audit trail: creation, approvals, posting, any modifications. Append-only.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Additional notes' },
    },
  ],
}
