/**
 * Contract Performance — IFRS-15 §31-35 control transfer & revenue recognition timing.
 *
 * **Purpose & Scope:**
 * Tracks performance milestone completion and control transfer events that trigger
 * revenue recognition. Each row records a distinct milestone (e.g., "setup complete",
 * "monthly service delivered", "support period active"), the acceptance criteria,
 * completion status, and the moment control transfers to the customer per IFRS-15 §31.
 * The collection determines whether revenue is recognized over-time (IFRS-15 §35)
 * or point-in-time (IFRS-15 §38).
 *
 * **Architecture & Key Design Decisions:**
 * Performance milestones are derived from the contract's performance obligations
 * (IFRS-15 §22). Each milestone tracks planned vs. actual completion dates with
 * variance analysis; revenue-recognition timing is computed from the control-transfer
 * determination (point-in-time or over-time). An `acceptanceCriteria` text field
 * documents the objective evidence of control transfer; `controlTransferredAt`
 * (readonly) records when the milestone was marked complete. The `associatedInvoice`
 * relationship links to the invoice created upon revenue recognition.
 *
 * **Standards & Compliance:**
 * @standard IFRS IFRS-15 §31-35 control-transfer point-in-time-recognition
 * @standard IFRS IFRS-15 §35 over-time-recognition
 * @standard IFRS IFRS-15 §22 performance-obligations
 * @standard IFRS IAS-1 presentation-of-financial-statements
 * @standard US-GAAP ASC-606-10-25-25 performance-obligations
 * @standard US-GAAP ASC-606-10-25-27 transfer-of-control
 * @standard ISO-8601-1:2019 date-time completion-dates
 * @standard ISO-4217:2015 currency-codes
 * @compliance SOX §404 internal-controls revenue-completeness TOM-AR-04
 * @audit ISO-19011:2018 audit-trail performance-evidence
 * @feature "Performance milestone tracking & control transfer determination"
 * @role "Project Manager, Finance Manager, Accountant"
 * @example "IFRS-15 §31-35 control transfer scenarios: (1) Point-in-time (§38): SaaS contract milestone 'System setup complete' controlTransferMethod=point_in_time, acceptanceCriteria='Customer sign-off on UAT', completionStatus=complete, controlTransferredAt=2026-04-01, revenueRecognizedAmount=150000 (full amount), revenueRecognizedAt=2026-04-01. (2) Over-time (§35): 12-month support contract with milestoneSequence=1-12 (monthly), controlTransferMethod=over_time, revenueRecognizedAmount=10000/month based on completion %"
 * @useCase "Tracking SaaS setup milestones, monthly service delivery, customer acceptance events, determining point-in-time vs. over-time revenue recognition"
 * @invariant "controlTransferMethod must match parent contract's control-transfer profile; completionStatus=complete requires controlTransferredAt and revenueRecognizedAmount to be set; IFRS-15 §31-35 gates GL posting to control transfer event"
 * @chain "Contract → Performance Obligations → Performance Milestones (this collection) → Control Transfer Event → Revenue Recognition → GL Posting (debit AR/bank, credit revenue) → Invoice (if associated)"
 *
 * **Multi-Tenancy & Isolation:**
 * Tenant-isolated via `multiTenancyField()`. Implicit tenant filter through the
 * `contract` relationship (cross-tenant performance events blocked). Visibility
 * restricted to accountant and admin; auditor read-only access.
 *
 * **Key Fields & Relationships:**
 * - `contract` (relationship, required): Parent contract (implicit sales order)
 * - `performanceObligationIndex` (number): Position in contract's obligation list
 * - `milestoneTitle` (text, required): Display name (e.g., "SaaS setup milestone")
 * - `milestoneSequence` (number): Ordinal position in fulfillment sequence
 * - `acceptanceCriteria` (textarea, required): Objective evidence of control transfer
 *   per IFRS-15 §31 (e.g., "customer acceptance signature", "service go-live date")
 * - `controlTransferMethod` (select): Point-in-time or over-time determination
 * - `plannedCompletionDate` (date): Original milestone due date
 * - `actualCompletionDate` (date): When milestone was marked complete
 * - `completionDateVarianceDays` (number, readonly): Positive = late, negative = early
 * - `completionStatus` (select): Not Started / In Progress / Complete / On Hold / Failed
 * - `controlTransferredAt` (date, readonly): Timestamp when control passed to customer
 * - `associatedInvoice` (relationship): Invoice created upon revenue recognition
 * - `revenueRecognizedAmount` (number): Amount recognized in cents (per IFRS-15)
 * - `revenueRecognizedAt` (date, readonly): Revenue recognition event timestamp
 *
 * **Hooks & Validation:**
 * `beforeValidate`: Auto-populate `tenant`.
 * `beforeChange`:
 *   - Enforce `actualCompletionDate >= plannedCompletionDate` (completion cannot
 *     predate the planned date without manager approval).
 *   - If `completionStatus = complete` and no `actualCompletionDate`, set to today.
 *   - `controlTransferMethod` must match the contract's control-transfer profile.
 *   - Currency consistency: `performanceRevenue.currency` matches parent contract.
 *   - Segregation of duties: only accountant/admin may mark complete; auditor read-only.
 *   - If transition to complete: auto-populate `controlTransferredAt` with current timestamp.
 * `afterChange`: Emit `performance:complete` event; subscribers (JournalEntry, Invoice)
 * consume to post revenue and create invoice entry.
 *
 * **Revenue & GL Integration:**
 * Point-in-time revenue (IFRS-15 §38): recognized fully on `controlTransferredAt`.
 * Over-time revenue (IFRS-15 §35): recognized monthly/per-period based on completion %.
 * GL posting per IFRS-15 §31: upon control transfer, debit AR/bank, credit revenue.
 * Associated sales order and invoice relationships enable end-to-end traceability.
 * `associatedInvoice` may be null until revenue is formally recognized.
 *
 * **Bulgaria-Specific Rules:**
 * Bulgarian law requires dated acceptance protocols for control transfer (ZKOD registry).
 * `zkodAcceptanceProtocolDate` and `zkodAcceptanceProtocolNumber` capture the formal
 * notarized acceptance. Labor-law performance clauses involving employees must include
 * mandatory arbitration reference per Art. 331.
 *
 * @see src/standards/ifrs-15/types.ts PerformanceObligation ControlTransfer
 * @see src/collections/accounting/Contracts.ts
 * @see src/collections/accounting/Invoices.ts
 * @see src/collections/accounting/SalesOrders.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/access/auth'
import { currencyField, auditFields } from '@/fields/base-accounting-fields'

const CONTROL_TRANSFER_METHODS = [
  { label: 'Point-in-Time Control Transfer (IFRS-15 §38)', value: 'point_in_time' },
  { label: 'Over-Time Control Transfer (IFRS-15 §35)', value: 'over_time' },
]

const COMPLETION_STATUSES = [
  { label: 'Not Started', value: 'not_started' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Complete', value: 'complete' },
  { label: 'On Hold', value: 'on_hold' },
  { label: 'Failed', value: 'failed' },
]

const ContractPerformance: CollectionConfig = {
  slug: 'contract-performance',
  labels: { singular: 'Contract Performance Milestone', plural: 'Contract Performance Milestones' },
  admin: {
    useAsTitle: 'milestoneTitle',
    defaultColumns: ['contract', 'milestoneSequence', 'plannedCompletionDate', 'actualCompletionDate', 'completionStatus'],
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'contract',
      type: 'relationship',
      relationTo: 'contracts',
      required: true,
      admin: {
        description: 'Parent contract (IFRS-15 §10)',
      },
    },
    {
      name: 'performanceObligationIndex',
      type: 'number',
      admin: {
        description: 'Index into contract.performanceObligations array (IFRS-15 §22)',
      },
    },
    {
      name: 'milestoneTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name (e.g., "SaaS setup", "monthly service delivery", "training completion")',
      },
    },
    {
      name: 'milestoneSequence',
      type: 'number',
      required: true,
      admin: {
        description: 'Ordinal position in contract fulfillment sequence',
      },
    },
    {
      name: 'acceptanceCriteria',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Objective evidence of control transfer per IFRS-15 §31 (e.g., "customer signed acceptance", "service live in production", "all deliverables shipped")',
      },
    },
    {
      name: 'controlTransferMethod',
      type: 'select',
      required: true,
      options: CONTROL_TRANSFER_METHODS,
      admin: {
        description: 'IFRS-15 §31-35: point-in-time (§38) or over-time (§35) revenue recognition',
      },
    },
    {
      name: 'plannedCompletionDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Originally scheduled completion date',
      },
    },
    {
      name: 'actualCompletionDate',
      type: 'date',
      admin: {
        description: 'Actual date milestone was completed (must be >= plannedCompletionDate)',
      },
    },
    {
      name: 'completionDateVarianceDays',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Days variance (positive = late, negative = early, auto-calculated)',
      },
    },
    {
      name: 'completionStatus',
      type: 'select',
      required: true,
      defaultValue: 'not_started',
      options: COMPLETION_STATUSES,
      admin: {
        description: 'Fulfillment lifecycle status',
      },
    },
    {
      name: 'controlTransferredAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Timestamp when control transferred to customer (IFRS-15 §31 event)',
      },
    },
    {
      name: 'associatedInvoice',
      type: 'relationship',
      relationTo: 'invoices',
      admin: {
        description: 'Invoice created upon revenue recognition (null until revenue recognized)',
      },
    },
    {
      name: 'revenueRecognizedAmount',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Amount of revenue recognized in cents (IFRS-15 recognition)',
      },
    },
    currencyField(),
    {
      name: 'revenueRecognizedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Timestamp when revenue was formally recognized (per IFRS-15 §31/35)',
      },
    },
    {
      name: 'associatedSalesOrder',
      type: 'relationship',
      relationTo: 'sales-orders',
      admin: {
        description: 'Associated sales order (pre-contract commitment phase)',
      },
    },
    {
      name: 'zkod',
      type: 'group',
      label: 'Bulgaria ZKOD Compliance',
      fields: [
        {
          name: 'zkodAcceptanceProtocolDate',
          type: 'date',
          admin: {
            description: 'Date of formal acceptance protocol (Bulgaria contract registry)',
          },
        },
        {
          name: 'zkodAcceptanceProtocolNumber',
          type: 'text',
          admin: {
            description: 'Notarized acceptance protocol number (Bulgaria ZKOD reference)',
          },
        },
        {
          name: 'mandatoryArbitration',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description:
              'Mandatory arbitration clause per Bulgaria Labor Code Art. 331 (for performance milestones involving employees)',
          },
        },
      ],
    },
    ...auditFields(),
    {
      name: 'performanceNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes on milestone completion, issues, variance explanations',
      },
    },
  ],
  hooks: standardCollectionHooks('contract-performance', { beforeChange: [enforceSegregationOfDuties()] }),
  timestamps: true,
}

export default ContractPerformance
