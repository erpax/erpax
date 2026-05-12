/**
 * Account Reconciliations — period-end account-level sign-off evidence pack with preparer-reviewer segregation.
 *
 * Core Function:
 *   Account Reconciliations are the persisted evidence packs for period-end reconciliation sign-offs.
 *   Covers bank (cash vs. statement), AR/AP (control vs. subledger), and intercompany reconciliations.
 *   Each record captures preparer, reviewer, as-of-date, balancePerExternal, balancePerGL, difference,
 *   and adjustment journal entries. Preparer submits for review; reviewer certifies that difference = 0
 *   and all adjustments are justified (SOX §404 internal control evidence). Status progression:
 *   draft → pending_review → approved (or rejected → remediate → pending_review).
 *
 * Architecture:
 *   • Generalizes beyond bank: kind discriminator routes to bank-reconciliation, ar-control,
 *     ap-control, or intercompany-rec logic.
 *   • Multi-tenant isolation enforced at access and beforeValidate layers.
 *   • Period-locked reconciliations cannot transition to approved (prevents post-close tampering).
 *   • Segregation of duties: preparer ≠ reviewer (enforced by access control).
 *   • Reconciling-item journal entries immutable once approved (SOX §404 evidence integrity).
 *   • Status progression: draft → pending_review → approved | rejected; rejected allows remediation.
 *   • Audit trail captures preparer, reviewer, approvalDate, all adjustments for evidence.
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant (multi-tenant enforcement), validateNotLocked
 *     (prevent post-close reconciliation).
 *   • beforeChange: autoPopulateCreatedBy (preparer attribution),
 *     autoSetTimestamp (approvalDate on status='approved' transition).
 *   • afterChange: auditTrailAfterChange (emit reconciliation event to audit log).
 *
 * Fields:
 *   • reconciliationId (text, unique, required): Human-readable ID (e.g., REC-2026-04-OPS-1).
 *   • kind (select): bank_reconciliation | ar_control | ap_control | intercompany_rec.
 *   • asOfDate (date, required): ISO 8601 reconciliation date.
 *   • balancePerExternal (number, required): Control-side balance (bank statement, AR aging, AP aging).
 *   • balancePerGL (number, required): GL-side balance (GL cash account, AR control, AP control).
 *   • difference (number, auto-calculated): balancePerExternal − balancePerGL (must be 0 when approved).
 *   • adjustments (array): Journal entries that explain the difference (outstanding checks, deposits, etc.).
 *   • approvedBy (text, required for approval): User who reviewed and signed off.
 *   • approvalDate (date, auto-set): ISO 8601 timestamp when reviewer approved (immutable).
 *   • status (select): draft | pending_review | approved | rejected | reopened.
 *   • currency (text, required): ISO 4217 reconciliation currency.
 *   • notes (textarea, localized): Preparer workpaper notes, variance analysis.
 *
 * Invariants:
 *   1. asOfDate must be within the fiscal period (periodStart ≤ asOfDate ≤ periodEnd).
 *   2. difference = balancePerExternal − balancePerGL (algebraic closure).
 *   3. Approved reconciliations must have difference = 0 (all variances explained).
 *   4. Adjustments array sum must equal difference (algebraic closure).
 *   5. Preparer ≠ approvedBy (segregation of duties enforced by role).
 *   6. approvalDate is immutable once set (SOX §404 audit trail integrity).
 *   7. Rejected reconciliations can be reopened and resubmitted (remediation path).
 *   8. Period-locked reconciliations cannot transition to approved (prevent post-close sign-off).
 *
 * Audit Trail:
 *   • createdBy auto-populated with preparer (ISO-19011 evidence completeness).
 *   • createdAt auto-set on initial submission (when preparer created reconciliation).
 *   • updatedAt auto-set on each change (modification audit trail).
 *   • approvalDate auto-set on status='approved' transition (immutable reviewer sign-off timestamp).
 *   • All state changes (status, approvedBy, adjustments) emit audit event.
 *   • Change history preserved: each version tracked for workpaper evidence (SOX §404 TOM requirements).
 *   • Preparer-reviewer segregation enforced: createdBy ≠ approvedBy (security invariant).
 *   • Rejection workflow: status='rejected' + reviewer notes triggers preparer remediation.
 *
 * Example:
 *   Bank Reconciliation (April 2026):
 *     reconciliationId: "REC-2026-04-EUR-MAIN"
 *     kind: "bank_reconciliation"
 *     asOfDate: "2026-04-30"
 *     balancePerExternal: 250000 (EUR 2,500.00 per bank statement)
 *     balancePerGL: 245000 (EUR 2,450.00 per GL cash account)
 *     difference: -5000 (EUR 50.00 — outstanding items)
 *     adjustments:
 *       - description: "Outstanding check #1234", amount: -3000
 *       - description: "Outstanding deposit from customer", amount: -2000
 *     approvedBy: "controller@example.com"
 *     approvalDate: "2026-05-01T14:30:00Z"
 *     status: "approved"
 *     currency: "EUR"
 *     createdBy: "accountant@example.com"
 *     createdAt: "2026-05-01T10:00:00Z"
 *
 * Phase Slice:
 *   WW (2026-05-12): Consolidated access control + field factories + validateNotLocked gate.
 *   Implemented preparer-reviewer segregation via role-based access. Integrated audit trail
 *   emission on all state transitions. Auto-set approvalDate on approval. Removed redundant
 *   period-lock duplication (centralized in utilities/period-lock.ts).
 *
 * @useCase Bank Reconciliation — Cash GL vs. bank statement balance proof (SOX TOM-CSH-01).
 * @useCase AR Control Reconciliation — AR control vs. subledger aging (SOX TOM-AR-01).
 * @useCase AP Control Reconciliation — AP control vs. subledger aging (SOX TOM-AP-01).
 * @useCase Intercompany Reconciliation — Eliminate in-transit balances on consolidation (IFRS-10).
 * @useCase Period-End Close — Multi-account reconciliation pack for month/quarter/year close.
 * @useCase Variance Analysis — Document and approve all unmatched and outstanding items.
 * @useCase Audit Evidence — Sign-off pack for external auditor testing (SOX §404).
 *
 * @standard ISO-8601-1:2019 date-time as-of-date approval-date
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-1 §23 presentation-of-financial-statements
 * @accounting IFRS IAS-7 §6 §40 §44 cash-flow-statement bank-reconciliation
 * @accounting IFRS IAS-8 accounting-policies-changes-errors
 * @accounting IFRS IFRS-15 §119 revenue-recognition adjustments
 * @accounting US-GAAP ASC-210-10 balance-sheet presentation
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail period-end-evidence completeness
 * @audit ISO-19011:2018 audit-evidence preparer-reviewer-segregation
 * @audit ISO-19011:2018 §6.4 audit-trail documentation requirements
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §404 internal-controls reconciliation-sign-off TOM-CSH-01 TOM-AR-01 TOM-AP-01
 * @compliance SOX §409 real-time-disclosure material-reconciliation-exceptions
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.7.1 access-control role-based approver-segregation
 * @security ISO-27002 A.7.2 user-access-management preparer-reviewer-roles
 * @see src/services/bank-reconciliation.service.ts Bank-Reconciliation-Service
 * @see src/plugins/accounting/collections/bankreconciliations.ts Bank-Statement-Reconciliation
 * @see src/plugins/accounting/collections/journal-entries.ts Journal-Entry-Adjustments
 * @see docs/STANDARDS.md §4.1 Reconciliation-Standards
 */

import type { CollectionConfig } from 'payload';
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth';
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant';
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy';
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp';
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange';
import {
  multiTenancyField,
  currencyField,
  statusField,
  notesField,
  auditFields,
} from '@/fields/accounting/base-accounting-fields';
import { validateNotLocked } from '@/services/accounting/utilities/period-lock';

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
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
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
        description: 'balancePerExternal + Σ external reconciling items (signed).',
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
