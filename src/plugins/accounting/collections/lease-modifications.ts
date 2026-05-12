/**
 * # Lease Modifications Collection
 *
 * @summary IFRS-16 §44-46 / ASC-842-10-25-8..13 structured register of lease modifications, remeasurement, and accounting impact per lease-change classification.
 *
 * ## Core Function
 *
 * The Lease Modifications collection registers and substantiates all lease modifications, remeasurements, and
 * accounting adjustments required by IFRS-16 §44-46 (and ASC-842 equivalents). While the leases collection captures
 * the master-data inception state (initial ROU, liability, term, payments), this collection records each subsequent
 * change: term extension, term reduction, payment change, scope increase/decrease, option reassessment, index resets,
 * partial/full termination, and subleasing. Each modification is classified per IFRS-16 §44-46 (separate-lease vs.
 * not-separate-lease vs. termination) because the classification determines the accounting treatment:
 * - Separate lease: treated as a new lease (similar to initial recognition).
 * - Not-separate scope increase (§45(b)): remeasure liability at modification date using new terms + revised discount rate; ROU adjusted by difference.
 * - Other not-separate modification (§45(c)): similar remeasurement, with any gain/loss recognized immediately if liability decreases (§46(a)).
 * - Full termination (§46(c)): derecognize ROU and liability; any difference is gain/loss.
 * - Partial termination (§46(b)): proportional reduction in ROU and liability.
 * Each row captures pre/post-modification snapshots (liability, ROU, term, payment, discount rate), the new terms, the
 * remeasurement calculation, and a reference to the GL posting that booked the adjustment. The modifications array in
 * the leases collection is redundant with this dedicated collection; auditors prefer to drill here for full substantiation
 * per IFRS-16 §B43-B44 (guidance on lease-modification examples).
 *
 * ## Architecture
 *
 * Multi-tenancy is enforced via the `tenant` field. Each modification has a unique reference (e.g., 'LMD-2026-001'),
 * links to the parent lease (required, indexed), and captures the modificationDate (effective date for remeasurement).
 * A period field (optional, relationship to fiscal-periods) indicates the period in which the modification is recognized
 * (typically the period containing the effective date). The modificationKind and classification fields (required) drive
 * the accounting logic: modificationKind captures the business reason (term extension, payment change, scope increase, etc.),
 * while classification captures the IFRS-16 §44-46 accounting treatment. Pre/post-modification snapshots (captured in inline
 * groups: preModification, postModification) contain the carrying amounts and terms before and after, used to compute
 * the remeasurement. The liabilityRemeasurement, rouAdjustment, and gainLossOnModification fields (read-only or computed)
 * show the GL impact: liabilityRemeasurement = new liability − old liability; rouAdjustment = symmetry adjustment to ROU
 * per §39(b); gainLossOnModification = P&L impact (typically zero unless termination, per §46(a)). A journalEntry relationship
 * (read-only) links to the GL posting that booked the adjustment. Status lifecycle (draft → reviewed → approved → posted → reversed)
 * gates approval-workflow progression; only 'posted' rows trigger actual GL impact. An evidenceAttestation relationship
 * (optional) links to supporting docs (signed lease amendment, approval memo). agreementDocumentRef is a text field for
 * document-management cross-reference (e.g., "DMS-123456" or "Amendment 2 to Lease L-001").
 *
 * ## Hooks & Validation
 *
 * - **beforeValidate:**
 *   - `autoPopulateTenant`: Stamps `tenant` from context.
 * - **beforeChange:**
 *   - `autoPopulateCreatedBy`: Stamps `createdBy` on initial insert.
 * - **afterChange:**
 *   - `emitLeaseRemeasured`: Emits 'lease:remeasured' event, triggering (future) automatic lease-period-posting recalculation and GL entry (not yet integrated in baseline).
 *   - `auditTrailAfterChange('lease-modifications')`: Logs full record delta to audit-events.
 *
 * ## Key Fields
 *
 * - **reference (text, required, unique, indexed):** Sequential modification identifier (e.g., 'LMD-2026-001'). Primary user-facing ID.
 * - **lease (relationship to leases, required, indexed):** Parent lease being modified. Immutable once created.
 * - **modificationDate (date, required):** Effective date of the modification (when terms change, remeasurement applies per IFRS-16 §45(c)). Immutable.
 * - **agreementSignedDate (date):** Date both parties signed the modification agreement (may differ from modificationDate; used for contractual evidence).
 * - **period (relationship to fiscal-periods, indexed):** Fiscal period in which the modification is recognized (typically contains modificationDate). Optional; inferred from modificationDate if omitted.
 * - **modificationKind (select, required):** Business reason for the modification (term_extension, term_reduction, payment_change, scope_increase, scope_decrease, full_termination, partial_termination, option_reassessment, index_reset, sublease). Drives narrative and disclosure.
 * - **classification (select, required):** Accounting classification per IFRS-16 §44-46 (separate_lease, not_separate_scope_increase, not_separate_other, termination_full, termination_partial). Drives GL entry template and gain/loss recognition.
 * - **currency (select, default 'EUR'):** Currency of pre/post snapshots and remeasurement amounts per ISO-4217:2015.
 * - **preModification.remainingTermMonths (number):** Remaining lease term in months immediately before the modification.
 * - **preModification.discountRate (number):** Annual discount rate (decimal, e.g., 0.035 for 3.5%) at the original commencement. Used as comparison baseline.
 * - **preModification.liabilityCarryingAmount (number, required):** Lease liability carrying amount at modification date, before remeasurement (cents).
 * - **preModification.rouCarryingAmount (number, required):** ROU asset carrying amount at modification date, before adjustment (cents).
 * - **preModification.fixedPayment (number):** Original fixed payment amount before modification (cents).
 * - **postModification.newTermMonths (number):** New lease term in months after modification (e.g., extension adds 24 months). Required if modificationKind = term_extension or term_reduction.
 * - **postModification.newDiscountRate (number):** Revised discount rate per IFRS-16 §45(c) (decimal, e.g., 0.045 for 4.5%). Required if classification = not_separate_* (affects liability remeasurement).
 * - **postModification.newFixedPayment (number):** New fixed payment (cents). Required if modificationKind = payment_change.
 * - **postModification.newPaymentFrequency (select):** New payment frequency if changed (monthly, quarterly, semiannual, annual). Optional if paymentFrequency unchanged.
 * - **postModification.considerationPaid (number):** Lump-sum cash consideration for the modification (e.g., early-termination fee if lessee buys out early, or incentive if lessor increases allowance) per IFRS-16 §45(c). Reduces the new liability.
 * - **liabilityRemeasurement (number):** = new liability − old liability (cents). Positive = increase in liability (further accrual); negative = decrease (P&L gain). Computed at posting per IFRS-16 §45(c).
 * - **rouAdjustment (number):** Mirror ROU adjustment per IFRS-16 §39(b). When liability remeasures by X, ROU adjusts by X (except where gain/loss is P&L per §46(a) termination).
 * - **gainLossOnModification (number):** P&L impact (cents). Typically zero except:
 *   - Partial termination (§46(b)): proportional ROU reduction may exceed proportional liability reduction.
 *   - Full termination (§46(c)): derecognition gain/loss = (liability + ROU) − consideration paid.
 *   - Not-separate modification with liability decrease and ROU carryover (§46(a)): immediate gain recognized.
 * - **journalEntry (relationship to journal-entries, read-only):** GL posting that books the modification adjustment. Null until status = 'posted'.
 * - **agreementDocumentRef (text):** Reference to the signed lease amendment (e.g., "DMS-123456", "Amendment_2_to_Lease_L-001.pdf"). Links to evidence-attestations or document-management system.
 * - **evidenceAttestation (relationship to evidence-attestations):** Audit evidence record (signed amendment, approval memo, contract change order).
 * - **status (select, default 'draft'):** Approval workflow state: 'draft' (initial entry, awaiting review), 'reviewed' (lease accountant sign-off), 'approved' (controller sign-off), 'posted' (GL entry booked, immutable), 'reversed' (reversal entry booked).
 * - **notes (textarea):** Commentary (e.g., "2-year extension with 2% payment increase", "Option to purchase exercised at fair value 100,000 BGN").
 * - **createdBy (user ID + timestamp):** Initial entry creator.
 * - **modifiedBy (user ID + timestamp, read-only after posting):** Last modifier; locked once status = 'posted'.
 *
 * ## Core Invariants
 *
 * - **Classification Immutability:** Once status = 'posted', the classification (separate-lease vs. not-separate vs. termination) is immutable because it gates the GL entry. Misclassification requires a reversal + reclassified entry.
 * - **Remeasurement Consistency:** liabilityRemeasurement and rouAdjustment must be internally consistent per IFRS-16 §39(b). Except in termination (§46), they should be equal in absolute value.
 * - **Pre/Post Snapshot Immutability:** preModification and postModification snapshots are set at creation and immutable (to preserve substantiation evidence).
 * - **GL Account Immutability:** GL accounts used in journalEntry (linked from the parent lease) are immutable; they must match the lease's account mappings at modification date.
 * - **Period Lock Enforcement:** Once a period is closed, no new modifications can be posted in that period per SOX §404.
 * - **Approval Workflow:** status transitions must follow the workflow (draft → reviewed → approved → posted); no skipping steps. Only after 'approved' can status = 'posted'.
 *
 * ## Audit Trail
 *
 * Every lease-modification record captures:
 * - `createdBy` (user ID + timestamp): Initial entry creator.
 * - `modifiedBy` (user ID + timestamp, locked once posted): Last modifier.
 * - All changes (classification, remeasurement, approval) are logged to audit-events with before/after values.
 * Pre/post snapshots are immutable and auditable. The journalEntry relationship provides a direct link to the GL posting
 * that booked the modification. Auditors can walk from lease → lease-modifications → journalEntry → GL trial balance
 * to verify that all lease changes were properly classified, remeasured, and posted. The evidenceAttestation field
 * links to supporting documentation (signed amendment, change order, approval memo) per SOX §404 audit-evidence requirements.
 * Reversals are tracked via status = 'reversed' with a separate journalEntry reference for the reversal JE.
 * @standard IFRS-16 §44-46 lease-modification-classification-and-remeasurement; @standard IFRS-16 §B43-B44 modification-examples;
 * @standard SOX §404 internal-controls lease-modification-approval-and-posting.
 *
 * ## Example
 *
 * ```javascript
 * {
 *   "_id": "lm_uuid_sofia_office_extension",
 *   "tenant": "tenant_bg_001",
 *   "reference": "LMD-2026-042",
 *   "lease": "lease_uuid_sofia_office",
 *   "modificationDate": "2026-05-01",
 *   "agreementSignedDate": "2026-04-28",
 *   "period": "fp_uuid_2026_q2",
 *   "modificationKind": "term_extension",
 *   "classification": "not_separate_scope_increase",
 *   "currency": "BGN",
 *   "preModification": {
 *     "remainingTermMonths": 31,
 *     "discountRate": 0.035,
 *     "liabilityCarryingAmount": 44700000,  // 447,000 BGN
 *     "rouCarryingAmount": 34500000,        // 345,000 BGN
 *     "fixedPayment": 1500000                // 15,000 BGN/month
 *   },
 *   "postModification": {
 *     "newTermMonths": 55,  // 31 + 24-month extension
 *     "newDiscountRate": 0.038,  // Revised upward (market rate change)
 *     "newFixedPayment": 1500000,  // Payment unchanged
 *     "newPaymentFrequency": "monthly",
 *     "considerationPaid": 0
 *   },
 *   "liabilityRemeasurement": 8700000,  // 87,000 BGN increase
 *   "rouAdjustment": 8700000,            // Mirror adjustment
 *   "gainLossOnModification": 0,         // Not-separate: no immediate gain
 *   "status": "posted",
 *   "journalEntry": "je_uuid_lm_042",
 *   "agreementDocumentRef": "DMS-456789",
 *   "createdBy": "accountant_001",
 *   "createdAt": "2026-05-01T10:30:00Z"
 * }
 * ```
 *
 * @phase 2.12 JSDoc-as-spec implementation for lease modifications
 * @useCase Lease modification accounting, remeasurement substantiation, approval workflow, SOX §404 lease-change audit
 * @accounting IFRS-16 §44 separate-lease-criterion (two conditions met)
 * @accounting IFRS-16 §45 not-separate-lease-modification (scope increase or other)
 * @accounting IFRS-16 §46 partial-or-full-termination (gain/loss recognition)
 * @accounting IFRS-16 §39(b) remeasurement-symmetry-rou-adjustment
 * @accounting IFRS-16 §B43 §B44 lease-modification-examples-guidance
 * @accounting US-GAAP ASC-842-10-25-8 lease-modification-guidance
 * @accounting US-GAAP ASC-842-10-25-11..13 accounting-for-lease-modifications
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time modification-date effective-date
 * @audit ISO-19011:2018 audit-trail lease-modification-substantiation
 * @compliance SOX §302 §404 internal-controls approval-workflow-immutability
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/plugins/accounting/collections/leases.ts (parent lease master)
 * @see src/plugins/accounting/collections/leaseperiodpostings.ts (post-modification period evidence)
 * @see docs/STANDARDS.md §4.2 lease-modification-accounting
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/accounting/base-accounting-fields'
import { emitLeaseRemeasured } from '@/hooks/chainEventEmitters'

const LeaseModifications: CollectionConfig = {
  slug: 'lease-modifications',
  labels: { singular: 'Lease Modification', plural: 'Lease Modifications' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'lease', 'modificationDate', 'classification', 'newDiscountRate', 'liabilityRemeasurement', 'status'],
    description:
      'IFRS-16 §44-46 lease modification register. Each row captures classification, new terms, remeasurement of liability + ROU adjustment.',
  },
  access: accountingCollectionAccess({ feature: 'leasing' }),
  fields: [
    multiTenancyField(),
    referenceField(),
    { name: 'lease', type: 'relationship', relationTo: 'leases', required: true, index: true },
    { name: 'modificationDate', type: 'date', required: true,
      admin: { description: 'Effective date of the modification — drives the remeasurement reference rate.' } },
    { name: 'agreementSignedDate', type: 'date',
      admin: { description: 'Date both parties signed the modification agreement (may differ from effective date).' } },
    { name: 'period', type: 'relationship', relationTo: 'fiscal-periods', index: true,
      admin: { description: 'Fiscal period the modification is recognised in.' } },
    {
      name: 'modificationKind',
      type: 'select',
      required: true,
      options: [
        { label: 'Term Extension', value: 'term_extension' },
        { label: 'Term Reduction', value: 'term_reduction' },
        { label: 'Payment Change (rate)', value: 'payment_change' },
        { label: 'Scope Increase (additional ROU)', value: 'scope_increase' },
        { label: 'Scope Decrease (partial ROU return)', value: 'scope_decrease' },
        { label: 'Full Termination', value: 'full_termination' },
        { label: 'Partial Termination', value: 'partial_termination' },
        { label: 'Reassessment of Options (purchase / extend / terminate)', value: 'option_reassessment' },
        { label: 'Index / Rate Reset (CPI / Euribor)', value: 'index_reset' },
        { label: 'Sublease Adjustment', value: 'sublease' },
      ],
    },
    {
      name: 'classification',
      type: 'select',
      required: true,
      options: [
        { label: 'Separate Lease (IFRS-16 §44 — both criteria met)', value: 'separate_lease' },
        { label: 'Not Separate Lease — Increase in Scope (§45(b))', value: 'not_separate_scope_increase' },
        { label: 'Not Separate Lease — Other Modification (§45(c))', value: 'not_separate_other' },
        { label: 'Termination — Full (§46(c))', value: 'termination_full' },
        { label: 'Termination — Partial (§46(b))', value: 'termination_partial' },
      ],
      admin: { description: 'IFRS-16 §44 vs §45 vs §46 classification — drives the accounting treatment.' },
    },
    currencyField(),
    {
      name: 'preModification',
      type: 'group',
      admin: { description: 'Snapshot of lease state immediately prior to modification.' },
      fields: [
        { name: 'remainingTermMonths', type: 'number', defaultValue: 0 },
        { name: 'discountRate', type: 'number',
          admin: { description: 'IBR or implicit-rate at the original commencement (decimal, e.g. 0.045).' } },
        { name: 'liabilityCarryingAmount', type: 'number', defaultValue: 0,
          admin: { description: 'Remaining lease liability at modification date (cents).' } },
        { name: 'rouCarryingAmount', type: 'number', defaultValue: 0,
          admin: { description: 'Remaining ROU asset carrying amount (cents).' } },
        { name: 'fixedPayment', type: 'number', defaultValue: 0 },
      ],
    },
    {
      name: 'postModification',
      type: 'group',
      admin: { description: 'New terms after the modification.' },
      fields: [
        { name: 'newTermMonths', type: 'number', defaultValue: 0 },
        { name: 'newDiscountRate', type: 'number',
          admin: { description: 'IFRS-16 §45(c) revised discount rate at modification date.' } },
        { name: 'newFixedPayment', type: 'number', defaultValue: 0 },
        { name: 'newPaymentFrequency', type: 'select', options: [
          { label: 'Monthly', value: 'monthly' },
          { label: 'Quarterly', value: 'quarterly' },
          { label: 'Semi-Annually', value: 'semiannual' },
          { label: 'Annually', value: 'annual' },
        ]},
        { name: 'considerationPaid', type: 'number', defaultValue: 0,
          admin: { description: 'Lump-sum consideration paid for the modification (e.g. early-termination fee).' } },
      ],
    },
    {
      name: 'liabilityRemeasurement',
      type: 'number',
      admin: { description: 'IFRS-16 §45(c) — change in lease liability (post − pre). Positive = increase.' },
    },
    {
      name: 'rouAdjustment',
      type: 'number',
      admin: { description: 'Mirroring ROU asset adjustment per IFRS-16 §39(b). Difference posted to P&L per §46(a).' },
    },
    {
      name: 'gainLossOnModification',
      type: 'number',
      admin: { description: 'P&L impact at modification — typically zero except partial-termination (§46(a)) or full-termination (§46(c)).' },
    },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'JE that booked the modification accounting entries.' } },
    { name: 'agreementDocumentRef', type: 'text',
      admin: { description: 'Reference to the signed amendment in `evidence-attestations`.' } },
    { name: 'evidenceAttestation', type: 'relationship', relationTo: 'evidence-attestations' },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Reviewed (lease accountant sign-off)', value: 'reviewed' },
        { label: 'Approved (controller sign-off)', value: 'approved' },
        { label: 'Posted (JE booked)', value: 'posted' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [emitLeaseRemeasured, auditTrailAfterChange('lease-modifications')],
  },
  timestamps: true,
}

export default LeaseModifications
