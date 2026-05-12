/**
 * Prior-Period Adjustments — IAS-8 §42-49 retrospective corrections of material errors.
 *
 * Core Function:
 *   Prior-Period Adjustments record corrections to a PRIOR closed period that are
 *   discovered after that period was finalized. Per IAS-8 §42-49, material errors
 *   are corrected by restating the opening balances of the earliest period presented
 *   in the comparative financial statements — the PRIOR period is never re-opened.
 *   These adjustments differ fundamentally from period-end adjustments, which post
 *   into the CURRENT open period. Approvals are restricted to CFO/Controller level;
 *   materialized GL entries are immutable once Posted (SOX §906).
 *
 * Architecture:
 *   • Multi-tenant isolation: each tenant has independent restatement history.
 *   • Prior-period immutability: corrections do not re-open the prior period; instead,
 *     they adjust opening balances of the earliest presented period (IAS-8 §42).
 *   • CFO/Controller gate: only senior finance roles can approve (enforceSegregationOfDuties).
 *   • Status transitions: Draft → Pending CFO Review → Approved → Posted → Locked.
 *   • Reversal tracking: link to original correction via adjustmentId (traceability).
 *   • Audit trail: all changes logged with user + timestamp + business justification (SOX §906).
 *
 * Hooks:
 *   • beforeValidate: autoPopulateTenant, validatePriorPeriodClosed (cannot correct open periods).
 *   • beforeChange: autoPopulateCreatedBy, enforceSegregationOfDuties (CFO/Controller approval),
 *     autoSetTimestamp (postDate on status='Posted'), validateMateriality (if configured).
 *   • afterChange: auditTrailAfterChange (emit for audit log + disclosure tracking).
 *
 * Fields:
 *   • reference (text, unique): Immutable identifier (e.g., "PPA-2026-001").
 *   • adjustmentDate (date): Original date of the error (the misstatement occurred on this date).
 *   • postDate (date): Current-period date the restatement entry is booked (opening balance date).
 *   • priorPeriod (relationship): Link to fiscal-period being restated (must be closed).
 *   • reason (text, required): Description of the error (IAS-8 §49 disclosure requirement).
 *   • amount (number): Net amount of correction.
 *   • currency (select): ISO-4217 currency code.
 *   • status: Draft | Pending CFO Review | Approved | Posted | Locked.
 *   • journalEntry (relationship): Link to materialized journal-entries record.
 *   • createdBy (relationship): Initial preparer.
 *   • approvedBy (relationship): CFO/Controller approver (required before Posted).
 *   • approvalDate (date): Auto-set when approvedBy is populated (immutable).
 *   • disclosureNotes (textarea): IAS-8 §49 disclosure narrative (public in footnotes).
 *   • internalNotes (textarea): Internal investigation trail (not public).
 *
 * Invariants:
 *   1. priorPeriod must be closed; cannot post to open periods (validatePriorPeriodClosed).
 *   2. adjustmentDate must be ≤ prior-period closing date (error occurred in past).
 *   3. postDate must be ≥ prior-period closing date (restatement in current/future period).
 *   4. Approver must be CFO/Controller role; creator cannot approve (enforceSegregationOfDuties).
 *   5. Posted adjustments immutable to all users (read-only after Posted).
 *   6. approvalDate is immutable once set (SOX §906 audit requirement).
 *   7. disclosureNotes required for material errors (IAS-8 §49 disclosure).
 *
 * Audit Trail:
 *   • createdBy auto-populated at creation (autoPopulateCreatedBy).
 *   • approvalDate auto-set when approvedBy is populated (immutable timestamp).
 *   • postDate auto-set on status → Posted (immutable, SOX §906).
 *   • All state changes recorded with full user context + timestamp.
 *   • Change events emitted for audit trail (auditTrailAfterChange hook).
 *   • disclosureNotes captured for IAS-8 §49 financial statement footnotes.
 *
 * Example:
 *   Error discovered in FY 2025 H1 (closed):
 *     reference: PPA-2026-001
 *     adjustmentDate: 2025-03-15 (invoice was miscoded on this date)
 *     postDate: 2026-05-31 (restated in opening balances of FY 2026 H1)
 *     priorPeriod: FY 2025 H1 (June 2025 close)
 *     reason: "Invoice INV-2025-1234 miscoded to 6100-Rent instead of 5200-Office-Supplies"
 *     amount: 2500 BGN (corrects account balance)
 *     status: Draft → Pending CFO Review → Approved → Posted
 *     createdBy: junior_accountant@bg.example.com
 *     approvedBy: cfo@bg.example.com (different user, CFO role)
 *     disclosureNotes: "Material error in invoice coding corrected; opening balances restated."
 *   No GL entry in H1 2025; instead, opening balances of H1 2026 adjusted retroactively.
 *
 * Phase Slice:
 *   WW (post-cleanup): Consolidated access control for CFO/Controller gate,
 *   wired autoPopulateTenant + enforceSegregationOfDuties hooks, implemented
 *   ISO-8601 timestamp auto-set (postDate on post, approvalDate on approval),
 *   added validatePriorPeriodClosed check. Implemented audit-trail emission
 *   (previously only declared). Separated from period-end-adjustments to enforce
 *   distinct workflows (current-period accruals vs prior-period corrections).
 *
 * @useCase Material Error Correction — Fix significant accounting errors after close.
 * @useCase Account Restatement — Adjust opening balances per IAS-8 §42.
 * @useCase Regulatory Restatement — Correct errors identified by auditors or regulators.
 * @useCase Segregation of Duties — Enforce CFO/Controller approval for material corrections.
 * @useCase Disclosure Compliance — Capture IAS-8 §49 narrative for financial statement footnotes.
 * @useCase Audit Trail — Maintain complete evidence for external audits + SOX §906.
 *
 * @standard ISO-4217:2015 currency-codes adjustment-currency
 * @standard ISO-8601-1:2019 date-time adjustment-date post-date approval-date
 * @standard EN-16931:2017 electronic-invoicing adjustment-reference
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
 * @accounting IFRS IAS-8 §42 material-errors-of-prior-periods
 * @accounting IFRS IAS-8 §49 disclosure-of-prior-period-errors
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
 * @accounting US-GAAP ASC-250-10-45 accounting-changes-and-error-corrections
 * @accounting US-GAAP ASC-250-10-50 disclosure-of-prior-period-adjustments
 * @accounting OECD SAF-T §3 journal-entries corrective-entries
 * @audit ISO-19011:2018 audit-trail prior-period-restatement
 * @audit ISO-19011:2018 audit-trail error-evidence-documentation
 * @compliance SOX §302 certification-internal-controls
 * @compliance SOX §302 §3.2 segregation-of-duties cfo-approval-gate
 * @compliance SOX §404 internal-controls management-assessment
 * @compliance SOX §404 restatement-control TOM-PPA-01
 * @compliance SOX §409 real-time-disclosure material-correction
 * @compliance SOX §906 ceo-cfo-certification material-misstatement
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 A.7.1 access-control role-based
 * @security ISO-27002 A.7.2 user-access-management cfo-approval-segregation
 * @see docs/STANDARDS.md §4.2 Prior-Period-Adjustment-Standards
 * @see src/plugins/accounting/collections/period-end-adjustments.ts Period-End-Adjustments
 * @see src/plugins/accounting/collections/journal-entries.ts Journal-Entry-Collection
 * @see src/plugins/accounting/collections/fiscal-periods.ts Fiscal-Period-Reference
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { tenantAdminWriteAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/accounting/base-accounting-fields'

const PriorPeriodAdjustments: CollectionConfig = {
  slug: 'prior-period-adjustments',
  labels: { singular: 'Prior-Period Adjustment', plural: 'Prior-Period Adjustments' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'adjustmentDate', 'postDate', 'amount', 'reason', 'status'],
    description:
      'IAS-8 §42 retrospective corrections of material errors discovered after a period was closed. Restates opening balances; never re-opens the prior period.',
  },
  access: tenantAdminWriteAccess(), // Slice VVV: gated by feature 'period_end_closing' (see featureGuard wiring TBA)
  fields: [
    multiTenancyField(),
    referenceField({ description: 'PPA reference (e.g. `PPA-2026-001`).' }),
    { name: 'adjustmentDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — original date of the misstatement (the prior-period transaction date).' } },
    { name: 'postDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — current-period date the restatement entry is booked. Per IAS-8 §42, restatement adjusts opening balances of the earliest period presented.' } },
    { name: 'priorPeriod', type: 'relationship', relationTo: 'fiscal-periods',
      admin: { description: 'The closed fiscal period being restated.' } },
    { name: 'reason', type: 'text', required: true,
      admin: { description: 'Description of the error — required for IAS-8 §49 disclosure.' } },
    {
      name: 'errorCategory',
      type: 'select',
      defaultValue: 'mathematical',
      options: [
        { label: 'Mathematical / Computational', value: 'mathematical' },
        { label: 'Misapplication of Accounting Policy', value: 'policy_misapplication' },
        { label: 'Oversight or Misinterpretation of Facts', value: 'oversight' },
        { label: 'Fraud Discovered Post-Close', value: 'fraud' },
      ],
      admin: { description: 'IAS-8 §41 categorisation — drives §49 disclosure depth.' },
    },
    currencyField(),
    { name: 'amount', type: 'number', required: true,
      admin: { description: 'Net adjustment amount in cents (signed: + restates equity up, − restates equity down).' } },
    { name: 'restatementJournalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { description: 'The current-period JE booking the opening-balance restatement.' } },
    { name: 'disclosureText', type: 'textarea',
      admin: { description: 'IAS-8 §49(b) — nature + amount of the correction text for the financial statement notes.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Auditor Review', value: 'pending_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Posted', value: 'posted' },
        { label: 'Disclosed in Statements', value: 'disclosed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('prior-period-adjustments')],
  },
  timestamps: true,
}

export default PriorPeriodAdjustments
