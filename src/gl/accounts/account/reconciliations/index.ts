/**
 * Account Reconciliations — period-end sign-off evidence pack.
 *
 * The persisted form of `bankReconciliationService.generateReconciliationReport(...)`.
 * Per the finance:reconciliation skill + ISO-19011 audit-evidence rules, every
 * reconciliation MUST capture preparer, reviewer, the bank-side and GL-side
 * adjustments, and the closure check (difference must be 0). This collection
 * is that evidence layer for SOX §404 controls testing.
 *
 * Also generalises beyond bank — same shape works for AR/AP control-vs-
 * subledger reconciliations and intercompany rec sign-offs (the `kind`
 * discriminator).
 *
 * Status lifecycle:
 *   draft           preparer is still working
 *   pending_review  preparer has submitted; awaits reviewer
 *   approved        reviewer has signed off; difference = 0
 *   rejected        reviewer flagged; preparer must remediate
 *   reopened        post-close adjustment requires re-sign-off
 *
 * @standard ISO-8601-1:2019 date-time as-of-date approved-at
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-7 statement-of-cash-flows bank-reconciliation
 * @audit ISO-19011:2018 audit-trail period-end-evidence
 * @audit ISO-19011:2018 audit-evidence preparer-reviewer-segregation
 * @compliance SOX §404 internal-controls reconciliation-sign-off
 * @security ISO-27002 §5.4 segregation-of-duties preparer-vs-reviewer
 * @see src/services/bank-reconciliation.service.ts
 * @see docs/STANDARDS.md §4.1
 */

import type { CollectionConfig } from 'payload';
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth';
import { autoPopulateTenant } from '@/auto/populate/tenant';
import { autoPopulateCreatedBy } from '@/auto/populate/created/by';
import { autoSetTimestamp } from '@/auto/set/timestamp';
import { auditTrailAfterChange } from '@/audit/trail/after/change';
import {
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '@/base/accounting/field';
import { validateNotLocked } from '@/utility/period-lock';

const AccountReconciliations: CollectionConfig = {
  slug: 'account-reconciliations',
  labels: {
    singular: 'Account Reconciliation',
    plural: 'Account Reconciliations',
  },
  admin: {
    useAsTitle: 'reconciliationId',
    defaultColumns: [
      'reconciliationId',
      'kind',
      'asOfDate',
      'difference',
      'status',
      'approvedBy',
    ],
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'reconciliationId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Human-readable id, e.g. REC-2026-04-OPS-1' },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'bank',
      options: [
        { label: 'Bank', value: 'bank' },
        { label: 'GL → Subledger (AR / AP / FA / Inv / Prepaid)', value: 'gl_to_subledger' },
        { label: 'Intercompany', value: 'intercompany' },
      ],
      admin: {
        description:
          'Reconciliation type — drives which adjustments are valid. Bank uses the IAS-7 layout; GL→subledger compares control-account balance to subledger detail; intercompany compares paired entity balances.',
      },
    },
    {
      name: 'glAccount',
      type: 'relationship',
      relationTo: 'gl-accounts',
      required: true,
      index: true,
      admin: { description: 'The control account being reconciled.' },
    },
    {
      name: 'bankAccount',
      type: 'relationship',
      relationTo: 'bank-accounts',
      admin: {
        description:
          'For kind = bank, the IBAN/BIC master being reconciled. Null for GL-to-subledger and intercompany.',
        condition: (data) => data?.kind === 'bank',
      },
    },
    {
      name: 'asOfDate',
      type: 'date',
      required: true,
      index: true,
      admin: { description: 'Reconciliation point in time (period-end).' },
    },
    { name: 'periodStart', type: 'date' },
    { name: 'periodEnd', type: 'date' },
    currencyField(),

    // ── Two-column balances (canonical IAS-7 / GL-vs-subledger format) ──
    {
      name: 'balancePerExternal',
      type: 'number',
      required: true,
      admin: {
        description:
          'Bank statement closing balance / subledger total / counterparty balance. The "external" side.',
      },
    },
    {
      name: 'balancePerGL',
      type: 'number',
      required: true,
      admin: { description: 'GL control-account balance as of asOfDate.' },
    },

    // ── Adjustments rolled up — full detail lives on related lines ──
    {
      name: 'externalAdjustments',
      type: 'array',
      labels: { singular: 'External adjustment', plural: 'External adjustments' },
      admin: {
        description:
          'Bank-side / counterparty-side reconciling items: deposits in transit, outstanding checks, bank errors. Each item carries an aging bucket for the SOX evidence pack.',
      },
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Deposit in transit', value: 'deposit_in_transit' },
            { label: 'Outstanding check', value: 'outstanding_check' },
            { label: 'Bank error', value: 'bank_error' },
            { label: 'Subledger timing', value: 'subledger_timing' },
            { label: 'Intercompany timing', value: 'intercompany_timing' },
            { label: 'Other', value: 'other' },
          ],
        },
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'amount', type: 'number', required: true },
        { name: 'originatedAt', type: 'date', required: true },
        {
          name: 'agingBucket',
          type: 'select',
          options: [
            { label: '0-30 (current)', value: 'current' },
            { label: '31-60 (aging)', value: 'aging' },
            { label: '61-90 (overdue)', value: 'overdue' },
            { label: '90+ (stale)', value: 'stale' },
          ],
        },
        { name: 'bankTransaction', type: 'relationship', relationTo: 'bank-transactions' },
        { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries' },
      ],
    },
    {
      name: 'glAdjustments',
      type: 'array',
      labels: { singular: 'GL adjustment', plural: 'GL adjustments' },
      admin: {
        description:
          'GL-side reconciling items needing adjusting JEs: unrecorded interest, unrecorded bank fees, classification errors, missing entries.',
      },
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Unrecorded interest', value: 'unrecorded_interest' },
            { label: 'Unrecorded fee', value: 'unrecorded_fee' },
            { label: 'Classification error', value: 'classification_error' },
            { label: 'Missing entry', value: 'missing_entry' },
            { label: 'GL error', value: 'gl_error' },
            { label: 'Other', value: 'other' },
          ],
        },
        { name: 'description', type: 'text', localized: true, required: true },
        { name: 'amount', type: 'number', required: true },
        { name: 'originatedAt', type: 'date', required: true },
        {
          name: 'agingBucket',
          type: 'select',
          options: [
            { label: '0-30 (current)', value: 'current' },
            { label: '31-60 (aging)', value: 'aging' },
            { label: '61-90 (overdue)', value: 'overdue' },
            { label: '90+ (stale)', value: 'stale' },
          ],
        },
        { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries' },
      ],
    },

    // ── Adjusted balances + closure check ──
    {
      name: 'adjustedExternalBalance',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'balancePerExternal + Σ external adjustments (signed).',
      },
    },
    {
      name: 'adjustedGLBalance',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'balancePerGL + Σ GL adjustments (signed).',
      },
    },
    {
      name: 'difference',
      type: 'number',
      admin: {
        readOnly: true,
        description:
          'adjustedExternalBalance − adjustedGLBalance. Must be 0 (within rounding tolerance) to approve.',
      },
    },

    // ── Sign-off chain (preparer ≠ reviewer per ISO-27002 §5.4) ──
    {
      name: 'preparedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true },
    },
    { name: 'preparedAt', type: 'date', admin: { readOnly: true } },
    {
      name: 'reviewedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true },
    },
    { name: 'reviewedAt', type: 'date', admin: { readOnly: true } },
    // approvedBy / approvedAt come from auditFields({ readOnly: true }) below.
    { name: 'rejectionReason', type: 'textarea', localized: true },

    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending review', value: 'pending_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Reopened', value: 'reopened' },
      ],
      'draft',
    ),

    // Source-of-truth references — lets the auditor click through.
    {
      name: 'sourceStatement',
      type: 'relationship',
      relationTo: 'bank-statements',
      admin: {
        description:
          'Originating bank statement for kind = bank. Null otherwise.',
        condition: (data) => data?.kind === 'bank',
      },
    },

    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      validateNotLocked,
      autoPopulateCreatedBy,
      autoSetTimestamp(
        'preparedAt',
        (d) => (d as { status?: string }).status === 'pending_review',
      ),
      autoSetTimestamp(
        'reviewedAt',
        (d) =>
          (d as { status?: string }).status === 'approved' ||
          (d as { status?: string }).status === 'rejected',
      ),
      autoSetTimestamp(
        'approvedAt',
        (d) => (d as { status?: string }).status === 'approved',
      ),
    ],
    afterChange: [auditTrailAfterChange('account-reconciliations')],
  },
  timestamps: true,
};

export default AccountReconciliations;
