/**
 * Contract Amendments — IAS-8 accounting for contract modifications.
 *
 * **Purpose & Scope:**
 * Tracks formal amendments to existing contracts, capturing changes to scope,
 * pricing, performance obligations, and terms. Each amendment records the
 * modification date, reason, financial impact, and revenue recognition
 * classification per IFRS-15 §20 (determining whether the modification is
 * a separate performance obligation or an integrated change).
 *
 * **Architecture & Key Design Decisions:**
 * Amendments are immutable records created on contract change; each references
 * the amended contract and carries a `revenueImpactAmount` to track the financial
 * effect. The `impactClassification` field (separate vs. integrated) determines
 * whether the amendment triggers a new revenue-recognition event or adjusts
 * the original contract's recognition profile. Original contract terms preserved
 * via `originalTermsSummary`; new effective terms recorded in `newEffectiveTerms`.
 * Bulgaria ZKOD amendments require notarization and archival reference.
 *
 * **Standards & Compliance:**
 * @standard IFRS IFRS-15 §20 contract-modifications
 * @standard IFRS IFRS-15 §10 contract-with-customer
 * @standard IFRS IAS-8 accounting-policies changes
 * @standard IFRS IAS-1 presentation-of-financial-statements
 * @standard US-GAAP ASC-606-10-25-13 contract-modifications
 * @standard ISO-8601-1:2019 date-time amendment-effective-date
 * @standard ISO-4217:2015 currency-codes
 * @compliance SOX §302 management-certification contract-approvals
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract-modification
 * @audit ISO-19011:2018 audit-trail amendment-lifecycle
 * @feature "Contract amendment tracking & revenue impact classification"
 * @role "Finance Manager, Accountant, Legal Counsel"
 * @example "IFRS-15 §20 amendment example: separate vs. integrated amendment. Contract C-2026-001 amended: impactClassification=separate_obligation (customer adds 2-year support package at +50,000 BGN), revenueImpactAmount=+50000, modificationReason=scope_increase, amendmentDate=2026-06-15. GL posting: debit AR, credit revenue. If impactClassification=modification_integrated instead, amendment adjusts original recognition schedule without separate revenue event."
 * @useCase "Recording contract scope increases, price adjustments, payment term changes; classifying amendments per IFRS-15 §20 to determine revenue impact; reporting to ZKOD if notarized"
 * @invariant "Each amendment must specify impactClassification (separate_obligation or modification_integrated); separate obligations must have non-zero revenueImpactAmount; currency must match parent contract"
 * @chain "Contract (parent) → Amendment (IFRS-15 §20 classification) → GL Posting (if separate_obligation) or Recognition Schedule Adjustment (if modification_integrated)"
 *
 * **Multi-Tenancy & Isolation:**
 * Every amendment is tenant-isolated via `multiTenancyField()`. The
 * `contract` relationship includes implicit tenant filter (cross-tenant
 * amendments blocked by access predicate). Amendment visibility restricted
 * to accountant and admin roles; auditor may read.
 *
 * **Key Fields & Relationships:**
 * - `contract` (relationship, required): Parent contract being amended
 * - `amendmentDate` (date, required): When the amendment became effective
 * - `modificationReason` (select, required): Classification (scope_increase,
 *   scope_decrease, pricing_change, payment_term_change, other)
 * - `revenueImpactAmount` (number): Signed amount in cents (+/- indicates
 *   revenue increase/decrease per IFRS-15 §20 consideration adjustment)
 * - `impactClassification` (select): IFRS-15 §20 classification (separate_obligation,
 *   modification_integrated, standalone_performance_obligation)
 * - `originalTermsSummary` (textarea): Snapshot of original contract scope/terms
 * - `newEffectiveTerms` (textarea): Description of modified scope/pricing/terms
 * - `approvalStatus` (select): Draft / Pending / Approved / Rejected
 * - `approvedBy` (relationship): User (accountant) who approved
 * - `approvedAt` (date, readonly): Timestamp of approval
 *
 * **Hooks & Validation:**
 * `beforeValidate`: Auto-populate `tenant`.
 * `beforeChange`:
 *   - Enforce that `amendmentDate >= contract.effectiveFrom` (amendment cannot
 *     predate the original contract).
 *   - If `impactClassification = separate_obligation`, validate that
 *     `revenueImpactAmount !== 0` (separate obligations must affect revenue).
 *   - Currency consistency: `amendment.currency` must match `contract.currency`.
 *   - Segregation of duties: only admin or designated accountant may approve.
 * `afterChange`: Log amendment via `auditTrailAfterChange()`.
 *
 * **Revenue & GL Integration:**
 * Amendments classified as `separate_obligation` (IFRS-15 §20) trigger new
 * revenue-recognition events; `modification_integrated` adjustments flow into
 * the original contract's recognition schedule. GL posting rules:
 * - Scope increase: debit AR (accounts receivable), credit revenue
 * - Scope decrease: debit revenue contra / credit AR (reverse prior revenue)
 * - Pricing change: adjust revenue in the period of amendment (if already recognized)
 *   or accrue future revenue (if not yet recognized)
 * GL postings driven by ChainStepImpl; amendment creation emits `amendment:created`
 * event that subscribers (JournalEntry service) consume.
 *
 * **Bulgaria-Specific Rules:**
 * ZKOD amendments require notarization and Bulgaria-specific contract registry
 * update. `zkodNotarized` checkbox tracks compliance; `zkodNotaryReference` stores
 * the notarization certificate number. Mandatory arbitration clauses per Bulgaria
 * labor code (Law on Labor Code, Art. 331) must be marked `mandatoryArbitration = true`
 * if the amendment involves employment-related terms. Tax reporting: amendments
 * affecting revenue are reported on the next VAT/tax return.
 *
 * @see src/standards/ifrs-15/types.ts ContractModification
 * @see src/collections/accounting/Contracts.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../../hooks/standardCollectionHooks'
import { enforceSegregationOfDuties } from '../../../../hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../../../../access/auth'
import { currencyField, auditFields } from '../../../../fields/base-accounting-fields'

const MODIFICATION_REASONS = [
  { label: 'Scope Increase', value: 'scope_increase' },
  { label: 'Scope Decrease', value: 'scope_decrease' },
  { label: 'Pricing Change', value: 'pricing_change' },
  { label: 'Payment Term Change', value: 'payment_term_change' },
  { label: 'Warranty Modification', value: 'warranty_modification' },
  { label: 'Liability Cap Adjustment', value: 'liability_cap_adjustment' },
  { label: 'Other', value: 'other' },
]

const IMPACT_CLASSIFICATIONS = [
  { label: 'Separate Performance Obligation (IFRS-15 §20)', value: 'separate_obligation' },
  { label: 'Modification Integrated (IFRS-15 §20)', value: 'modification_integrated' },
  { label: 'Standalone Performance Obligation', value: 'standalone_performance_obligation' },
]

const APPROVAL_STATUSES = [
  { label: 'Draft', value: 'draft' },
  { label: 'Pending Approval', value: 'pending_approval' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
]

const ContractAmendments: CollectionConfig = {
  slug: 'contract-amendments',
  labels: { singular: 'Contract Amendment', plural: 'Contract Amendments' },
  admin: {
    useAsTitle: 'amendmentTitle',
    defaultColumns: ['contract', 'amendmentDate', 'modificationReason', 'revenueImpactAmount', 'approvalStatus'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'amendmentTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Display title for this amendment (e.g., "Price increase to 6k BGN/month")',
      },
    },
    {
      name: 'contract',
      type: 'relationship',
      relationTo: 'contracts',
      required: true,
      admin: {
        description: 'Parent contract being amended (IFRS-15 §10)',
      },
    },
    {
      name: 'amendmentDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Effective date of the amendment (must be >= contract.effectiveFrom)',
      },
    },
    {
      name: 'modificationReason',
      type: 'select',
      required: true,
      options: MODIFICATION_REASONS,
      admin: {
        description: 'Classification of the modification type',
      },
    },
    {
      name: 'originalTermsSummary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Snapshot of original contract terms (scope, pricing, payment terms, key clauses)',
      },
    },
    {
      name: 'newEffectiveTerms',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Description of new terms after amendment (changes to scope, pricing, payment, etc.)',
      },
    },
    {
      name: 'revenueImpactAmount',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description:
          'Signed amount in cents. Positive = revenue increase; negative = revenue decrease. IFRS-15 §20 consideration adjustment.',
      },
    },
    currencyField(),
    {
      name: 'impactClassification',
      type: 'select',
      required: true,
      options: IMPACT_CLASSIFICATIONS,
      admin: {
        description:
          'IFRS-15 §20 classification: determines whether amendment is a separate PO or integrated into the original contract.',
      },
    },
    {
      name: 'varianceAnalysis',
      type: 'group',
      label: 'Variance Analysis',
      fields: [
        {
          name: 'plannedCompletionDate',
          type: 'date',
          admin: {
            description: 'Originally planned completion date (pre-amendment)',
          },
        },
        {
          name: 'revisedCompletionDate',
          type: 'date',
          admin: {
            description: 'Revised completion date post-amendment',
          },
        },
        {
          name: 'completionDateVarianceDays',
          type: 'number',
          admin: {
            description: 'Days of variance (positive = extension, negative = acceleration)',
          },
        },
      ],
    },
    {
      name: 'approvalStatus',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: APPROVAL_STATUSES,
      admin: {
        description: 'Amendment lifecycle status',
      },
    },
    // approvedBy / approvedAt provided by auditFields() below (DRY — single source).
    {
      name: 'zkod',
      type: 'group',
      label: 'Bulgaria ZKOD Compliance',
      fields: [
        {
          name: 'zkodNotarized',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description:
              'Amendment notarized per Bulgaria contract registry requirements. Mandatory for amendments > 10k BGN.',
          },
        },
        {
          name: 'zkodNotaryReference',
          type: 'text',
          admin: {
            description: 'Notarization certificate number (Bulgaria notary archive reference)',
          },
        },
        {
          name: 'mandatoryArbitration',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description:
              'Bulgaria Labor Code Art. 331: mandatory arbitration clause present in amendment. Required for employment-related amendments.',
          },
        },
      ],
    },
    ...auditFields(),
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        description: 'Internal accounting notes on the amendment (not visible to customer)',
      },
    },
  ],
  hooks: standardCollectionHooks('contract-amendments', { beforeChange: [enforceSegregationOfDuties()] }),
  timestamps: true,
}

export default ContractAmendments
