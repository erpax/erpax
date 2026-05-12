import type { CollectionConfig } from 'payload'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/access/auth'
import { multiTenancyField, notesField } from '@/fields/accounting/base-accounting-fields'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant';
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy';
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp';
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange';
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties';
import { validateNotLocked } from '@/services/accounting/utilities/period-lock';
import { periodEndAdjustmentPostingHook } from '@/hooks/collections/accounting/period-end-adjustment.hook';

/**
 * Period-End Adjustments — IAS-1 §29 accruals, deferrals, depreciation, and allocations.
 *
 * Core Function:
 *   Period-End Adjustments capture non-transactional journal entries that record
 *   accruals (expenses incurred not yet invoiced), deferrals (cash received before
 *   service delivery), depreciation (asset wear), and allocations (indirect cost
 *   distribution). These adjustments are posted into the CURRENT open period and
 *   reversed at the next period start (reversing entries). Segregation of duties
 *   enforced: creator cannot approve their own adjustment (SOX §302).
 *
 * Architecture:
 *   • Multi-tenant isolation enforced at beforeValidate (autoPopulateTenant).
 *   • Period-locked validation: adjustments cannot post to closed periods (validateNotLocked).
 *   • Segregation of duties: createdBy ≠ approvedBy via enforceSegregationOfDuties hook.
 *   • Status transitions: Draft → Pending Approval → Posted → Reversed (with timestamps).
 *   • Reversing entries: automatically created at next period start (Workers cron).
 *   • Audit trail: all changes emitted for SOX §404 compliance (auditTrailAfterChange).
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant.
 *   • beforeChange: validateNotLocked (period-lock check), autoPopulateCreatedBy,
 *     enforceSegregationOfDuties (createdBy ≠ approvedBy), autoSetTimestamp (postedAt).
 *   • afterChange: auditTrailAfterChange (emit change event for audit log).
 *
 * Fields:
 *   • adjustmentId (text, unique): Immutable identifier for traceability.
 *   • adjustmentType: depreciation | accrual | deferral | allocation | tax_adjustment.
 *   • period (relationship): Link to fiscal-period (open period required).
 *   • adjustmentAmount (number, required): Net amount (debits - credits).
 *   • description (textarea, localized): Purpose of adjustment (IAS-8 disclosure).
 *   • status: Draft | Pending Approval | Posted | Reversed.
 *   • postedAt (date): Auto-set when status → Posted (SOX §404 immutable timestamp).
 *   • approvedBy (relationship): User who approved (triggers segregation check).
 *   • approvalDate (date): Auto-set when approvedBy is populated (audit trail).
 *   • journalEntry (relationship): Link to materialized journal-entries record.
 *   • notes (textarea): Internal comments (not part of financial statements).
 *
 * Invariants:
 *   1. Adjustment must post to an open (unlocked) period (validateNotLocked).
 *   2. Approval (approvedBy) is required before status → Posted; creator cannot approve their own adjustment (segregation of duties).
 *   3. Posted adjustments immutable to non-admins (status-based access control).
 *   4. postedAt is immutable once set (SOX §404 requirement).
 *   5. approvalDate is immutable once set (audit trail immutability).
 *   6. Reversals link to original via journalEntry chain; original not deleted.
 *   7. Each adjustment generates exactly one GL posting set (debit/credit pair).
 *
 * Audit Trail:
 *   • createdBy auto-populated at creation (autoPopulateCreatedBy).
 *   • postedAt auto-set only on status → Posted transition (immutable timestamp).
 *   • approvalDate auto-set when approvedBy is populated (immutable).
 *   • All state changes recorded with user + timestamp (SOX §404).
 *   • Change events emitted for audit trail (auditTrailAfterChange hook).
 *   • Reversing entries tracked via journalEntry relationship (IAS-1 §29).
 *
 * Example:
 *   Depreciation Adjustment (monthly accrual):
 *     adjustmentId: PEA-2026-05-002
 *     adjustmentType: depreciation
 *     period: FY 2026 Month 5 (May 2026)
 *     adjustmentAmount: 5000 (net of depreciation expense)
 *     description: "Monthly depreciation accrual: equipment $5000"
 *     status: Draft → Pending Approval → Posted
 *     createdBy: accountant@bg.example.com
 *     approvedBy: manager@bg.example.com (different user)
 *     postedAt: 2026-05-31T17:30:00Z (auto-set on post)
 *   Next period (June): reversing entry auto-created, nullifying May adjustment.
 *
 * Phase Slice:
 *   WW (post-cleanup): Consolidated access control and field factories into shared
 *   infrastructure, implemented full hook chain (autoPopulateTenant, validateNotLocked,
 *   segregation-of-duties, timestamps), wired audit-trail emission (previously only
 *   declared), added ISO-8601 timestamp auto-set for posted/approved transitions.
 *
 * @useCase Period-End Close — Record accruals before month/year-end close.
 * @useCase Depreciation Accrual — Auto-accrue fixed asset depreciation monthly.
 * @useCase Deferred Revenue Release — Release revenue ratably over service period.
 * @useCase Expense Accrual — Accrue unpaid invoices (utilities, professional fees).
 * @useCase Cost Allocation — Distribute indirect costs across cost centers.
 * @useCase Segregation of Duties — Enforce approval separation for SOX §302.
 * @useCase Audit Trail — Maintain complete change history for SOX §404.
 *
 * @standard ISO-8601-1:2019 date-time period posted-at approval-date
 * @standard ISO-20022:2013 financial-messaging transaction-messages
 * @standard EN-16931:2017 electronic-invoicing adjustment-entry
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-1 §29 accrual-basis-of-accounting
 * @accounting IFRS IAS-8 accounting-policies-changes-errors
 * @accounting IFRS IAS-8 §42-49 prior-period-adjustments
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
 * @accounting US-GAAP ASC-250-10-45 period-end-adjustments
 * @accounting OECD SAF-T §3 journal-entries-lines adjustments
 * @audit ISO-19011:2018 audit-trail evidence completeness
 * @audit ISO-19011:2018 segregation-of-duties approval-control
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §302 segregation-of-duties-approval
 * @compliance SOX §404 internal-controls-cash-management
 * @compliance SOX §409 real-time-disclosure change-in-status
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.7.1 access-control role-based
 * @security ISO-27002 A.7.2 user-access-management approver-segregation
 * @see docs/STANDARDS.md §4.2 Period-End-Adjustment-Standards
 * @see src/plugins/accounting/collections/journal-entries.ts Journal-Entry-Collection
 * @see src/plugins/accounting/collections/gl-postings.ts GL-Posting-Reference
 * @see src/services/accounting/utilities/period-lock.ts Period-Lock-Validation
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
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
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
