/**
 * Contracts — IFRS-15 §10 master contract-with-customer record.
 *
 * **Purpose & Scope:**
 * Canonical master record for all revenue contracts. Groups one or more
 * PerformanceObligations (IFRS-15 §22), each with distinct control-transfer
 * timing and revenue-recognition event. Subscriptions are one *kind* of contract;
 * this collection is the universal IFRS-15 §10 source of truth for revenue recognition.
 *
 * **Architecture & Key Design Decisions:**
 * The canonical type lives in `@/standards/ifrs-15` (Contract). This
 * collection's field set is the Payload projection:
 * `canonical.id → doc.id`, `canonical.customerId → doc.customer`,
 * `canonical.effectiveDate → doc.effectiveFrom`, `canonical.endDate → doc.effectiveTo`,
 * `canonical.currency → doc.currency`, `canonical.status → doc.status`,
 * `canonical.combinedWithContractIds → doc.combinedWithContracts`.
 * Transaction price decomposed per IFRS-15 §47 (fixed + variable + financing
 * component). Amendments (IFRS-15 §20) are `modifications` rows and signatures are `signatures` rows on
 * the contract itself; milestones are rows on its performance obligations.
 *
 * **Standards & Compliance:**
 * @standard IFRS IFRS-15 §10 contract-with-customer
 * @standard IFRS IFRS-15 §17 contract-combination
 * @standard IFRS IFRS-15 §22 performance-obligations
 * @standard IFRS IFRS-15 §47 transaction-price decomposition
 * @standard IFRS IFRS-15 §50-59 variable-consideration
 * @standard IFRS IFRS-15 §60-65 financing-component
 * @standard IFRS IAS-1 presentation-of-financial-statements
 * @standard US-GAAP ASC-606-10-25 contract-existence
 * @standard US-GAAP ASC-606-10-25-9 contract-combination
 * @standard US-GAAP ASC-606-10-25-13 contract-modifications
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time effective-from effective-to
 * @compliance SOX §404 internal-controls contract-approval
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @security ISO-27002 §5.3 segregation-of-duties
 * @audit ISO-19011:2018 audit-trail contract-lifecycle
 * @feature "Contract management & revenue recognition"
 * @role "Finance Manager, Accountant, Contract Administrator"
 * @example "Bulgarian SaaS contract: C-2026-001 (customer: TechCorp BG, totalValue: 600,000 BGN, currency: BGN, effectiveFrom: 2026-01-15, effectiveTo: 2029-01-14, transactionPriceFixed: 480,000, transactionPriceVariable: 120,000, variableConsiderationMethod: expected_value, status: pending_signatures, paymentTerms: net30, zkodContractNumber: ZKOD-2026-1847, zkodNotarized: true, mandatoryArbitrationClause: true, controlTransferMethod: over_time per IFRS-15 §35 monthly service delivery)"
 * @useCase "Recording contract signing, tracking amendments, recognizing revenue per IFRS-15, reporting to Bulgaria ZKOD registry"
 * @invariant "All contracts must have explicit Incoterms, payment terms, and control-transfer method per IFRS-15 §31-35; status sequence enforced: draft→pending_signatures→pending_approval→active→suspended→completed→terminated"
 * @chain "Contracts (master) → Sales Orders → Invoices → GL Posting (revenue recognition gated by contract-fully-executed event); amendments are this contract's modifications rows (IFRS-15 §20)"
 *
 * **Multi-Tenancy & Isolation:**
 * Every contract is tenant-isolated via `multiTenancyField()`. The `customer`
 * relationship includes implicit tenant filter (cross-tenant contracts blocked
 * by access predicate). Visibility restricted to accountant and admin roles;
 * auditor may read.
 *
 * **Key Fields & Relationships:**
 * - `contractNumber` (text, unique): Display ID (e.g., "C-2026-001")
 * - `customer` (relationship, required): Customer party (IFRS-15 §10)
 * - `title` (text, localized): Contract name / description
 * - `effectiveFrom` (date, required): Contract start date
 * - `effectiveTo` (date): Contract end date
 * - `totalValue` (number): Aggregate transaction price in cents per IFRS-15 §47
 * - `currency` (select): ISO 4217 code
 * - `transactionPriceFixed` (number): Fixed consideration per IFRS-15 §47
 * - `transactionPriceVariable` (number): Estimated variable consideration per §50-59
 * - `variableConsiderationMethod` (select): Expected value or most likely amount (§53)
 * - `financingComponent` (number): Significant financing component per §60-65
 * - `combinedWithContracts` (relationship): Other contracts in combined group (§17)
 * - `performanceObligations` (join): Related performance obligations (§22)
 * - `paymentTerms` (select): Net 0 / 15 / 30 / 60 / 90 / custom
 * - `status` (select): Draft / Pending Signatures / Pending Approval / Active / Suspended / Completed / Terminated
 * - `activatedAt` (date, readonly): When contract became active
 * - `terminatedAt` (date, readonly): When contract was terminated
 * - `subscription` (relationship): Linked SaaS subscription (if applicable)
 *
 * **Hooks & Validation:**
 * `beforeValidate`: Auto-populate `tenant`.
 * `beforeChange`:
 *   - Enforce that `effectiveFrom <= effectiveTo` (where effectiveTo is set).
 *   - totalValue = transactionPriceFixed + transactionPriceVariable + financingComponent.
 *   - If `variableConsideration > 0`, validate `variableConsiderationMethod` is set.
 *   - Currency consistency across all related records.
 *   - Segregation of duties: only admin/accountant may create/edit; creator ≠ approver.
 * `afterChange`: Set `activatedAt` when status → active; set `terminatedAt` when → terminated.
 *
 * **Revenue & GL Integration:**
 * IFRS-15 §31-35: revenue recognized when control transfers, per timing
 * determined by `performanceObligations[].controlTransferMethod` (point-in-time
 * §38 or over-time §35). GL posting rules: upon revenue event, debit AR/bank,
 * credit revenue. Modification events (the modifications rows) may adjust
 * revenue via separate gl-postings. Subscription integration: every SaaS contract
 * may link to one subscription (1:1 optional relationship).
 *
 * **Bulgaria-Specific Rules:**
 * ZKOD contract registry number (`zkodContractNumber`) captures Bulgaria ZKOD
 * registration reference. Contracts > 10k BGN require notarization (`zkodNotarized`).
 * Mandatory arbitration clause per Bulgaria Law on Labor Code Art. 331 must be
 * marked (`mandatoryArbitrationClause`) if contract involves employment terms.
 * Tax reporting: contract status changes are reported on VAT/tax returns.
 *
 * @see src/ifrs/15/types/index.ts Contract TransactionPrice PerformanceObligation
 * @see src/collections/performance-obligations (milestones)
 */

import type { CollectionConfig, Field } from 'payload'
import { validations } from 'payload/shared'
import { standardCollectionHooks } from '@/utilities/standard/collection/hook'
import { autoSetTimestamp } from '@/hooks/collections/shared/autoSetTimestamp'
import { stampWhen } from '@/hooks/collections/shared/stampWhen'
import { enforceSegregationOfDuties } from '@/hooks/collections/shared/enforceSegregationOfDuties'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/access/collections/shared/multiTenantRead'
import { currencyField } from '@/fields/text/currencyField'
import { statusField } from '@/fields/select/statusField'
import { notesField } from '@/fields/textarea/notesField'
import { auditFields } from '@/fields/relationship/auditFields'

// ── The contract's own record of amendments and signatures ──────────────────────────────────────
// These were two satellite collections (contract-amendments, contract-signatures) pointing at a
// contract. An amendment is a modification of this contract (IFRS-15 §20) and a signature is a step
// of its execution, so both live on the contract as rows: one document, one tenant, one audit trail,
// one version history. The invariants their headers described, and no hook enforced, are rules here.

type Check = (value: unknown, args: never) => string | true | Promise<string | true>

/** The field's own validation, then a rule: a bare `validate` would drop Payload's required and option checks. */
const andThen =
  (base: unknown, rule: (value: unknown, args: { data?: unknown; siblingData?: unknown }) => string | true) =>
  async (value: unknown, args: never): Promise<string | true> => {
    const first = await (base as Check)(value, args)
    return first === true ? rule(value, args as { data?: unknown; siblingData?: unknown }) : first
  }

const time = (value: unknown): number => (value ? new Date(value as string).getTime() : Number.NaN)

/** IFRS-15 §20: an amendment takes effect on or after the contract does. */
export const amendmentDateError = (modifiedAt: unknown, effectiveFrom: unknown): string | true =>
  !modifiedAt || !effectiveFrom || time(modifiedAt) >= time(effectiveFrom) ? true : 'An amendment cannot take effect before the contract (effectiveFrom).'

/** IFRS-15 §20: an amendment accounted for as a separate obligation changes the consideration. */
export const separateObligationError = (priceImpact: unknown, classification: unknown): string | true =>
  classification !== 'separate_obligation' || Number(priceImpact ?? 0) !== 0 ? true : 'A separate performance obligation changes the price: priceImpact cannot be 0.'

interface SignatureRow {
  sequence?: number | null
  status?: string | null
  signedAt?: string | null
  rejectedAt?: string | null
}

/** Signatures are collected in order, 1…N, with no step skipped or repeated. */
export const signatureSequenceError = (rows: unknown): string | true => {
  const sequences = (Array.isArray(rows) ? (rows as SignatureRow[]) : []).map((row) => Number(row?.sequence)).sort((a, b) => a - b)
  return sequences.every((n, i) => n === i + 1) ? true : 'Signature steps run 1…N with no gap or repeat.'
}

/** IFRS-15 §10: a contract is enforceable, and so active, once every signature is collected. */
export const activationError = (status: unknown, signatures: unknown): string | true =>
  status !== 'active' || (Array.isArray(signatures) ? (signatures as SignatureRow[]) : []).every((row) => row?.status === 'signed')
    ? true
    : 'A contract becomes active once every signature is collected.'

/** Written only by the e-signature integration, never by a caller. */
const integrationOnly = { create: () => false, update: () => false }

const SIGNATORY_ROLES = [
  { label: 'Customer / Client', value: 'customer' },
  { label: 'Vendor / Supplier', value: 'vendor' },
  { label: 'Company Authorized Representative', value: 'company_rep' },
  { label: 'Legal Review', value: 'legal_review' },
  { label: 'Finance Review', value: 'finance_review' },
  { label: 'Director / CFO Signature', value: 'director_signature' },
]

const SIGNATURE_STATUSES = [
  { label: 'Draft', value: 'draft' },
  { label: 'Awaiting Signature', value: 'awaiting_signature' },
  { label: 'Signed', value: 'signed' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Expired', value: 'expired' },
]

const SIGNATURE_PROVIDERS = [
  { label: 'DocuSign', value: 'docusign' },
  { label: 'Adobe Sign', value: 'adobe_sign' },
  { label: 'HelloSign', value: 'hellosign' },
  { label: 'Manual / Wet Signature', value: 'manual' },
  { label: 'Bulgaria EID', value: 'bulgaria_eid' },
  { label: 'Other', value: 'other' },
]

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

const Contracts: CollectionConfig = {
  slug: 'contracts',
  labels: { singular: 'Contract', plural: 'Contracts' },
  admin: { useAsTitle: 'contractNumber', defaultColumns: ['contractNumber', 'customer', 'totalValue', 'status', 'effectiveFrom'] },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    { name: 'contractNumber', type: 'text', required: true, unique: true, index: true },
    // Slice XXXXXXXX-b (2026-05-11): retargeted from 'addresses' → 'customers'.
    // IFRS-15 §10 contract-with-customer requires the customer party itself.
    // The address sits on the customer row (billingAddress / shippingAddress).
    { name: 'customer', type: 'relationship', relationTo: 'parties', required: true },
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'effectiveFrom', type: 'date', required: true },
    { name: 'effectiveTo', type: 'date' },
    {
      name: 'totalValue',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Aggregate transaction price (cents). = transactionPriceFixed + transactionPriceVariable + financingComponent − considerationPayableToCustomer. Maps to canonical TransactionPrice.total.',
      },
    },
    currencyField(),
    // ── IFRS 15 §47 transaction-price decomposition (canonical fields) ──
    {
      name: 'transactionPriceFixed',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Fixed consideration component (cents). IFRS 15 §47. Maps to canonical TransactionPrice.fixed.',
      },
    },
    {
      name: 'transactionPriceVariable',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Estimated variable consideration after constraint (cents). IFRS 15 §50-§59. Maps to canonical VariableConsideration.estimate − constraint.',
      },
    },
    {
      name: 'variableConsiderationMethod',
      type: 'select',
      options: [
        { label: 'Expected value', value: 'expected_value' },
        { label: 'Most likely amount', value: 'most_likely_amount' },
      ],
      admin: {
        description:
          'IFRS 15 §53 — estimation method when variable consideration is non-zero.',
      },
    },
    {
      name: 'financingComponent',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Significant financing component (cents). IFRS 15 §60-§65. Positive when entity is financier; negative when customer is financed.',
      },
    },
    {
      name: 'combinedWithContracts',
      type: 'relationship',
      relationTo: 'contracts',
      hasMany: true,
      admin: {
        description:
          'IFRS 15 §17 — other contracts this one is accounted for as part of (combined-contract group). Maps to canonical Contract.combinedWithContractIds.',
      },
    },
    {
      name: 'paymentTerms',
      type: 'select',
      options: [
        { label: 'Net 0 (immediate)', value: 'net0' },
        { label: 'Net 15', value: 'net15' },
        { label: 'Net 30', value: 'net30' },
        { label: 'Net 60', value: 'net60' },
        { label: 'Net 90', value: 'net90' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'performanceObligations',
      type: 'join',
      collection: 'performance-obligations',
      on: 'contract',
      admin: { description: 'IFRS 15 §22 distinct performance obligations.' },
    },
    {
      // The amendments (formerly the contract-amendments collection): each row is one modification.
      name: 'modifications',
      type: 'array',
      admin: { description: 'IFRS 15 §20 / §B47 / ASC 606-10-25-13 contract modifications (amendments).' },
      fields: [
        {
          name: 'modifiedAt',
          type: 'date',
          required: true,
          admin: { description: 'When the amendment takes effect (not before effectiveFrom).' },
          validate: andThen(validations.date, (value, { data }) => amendmentDateError(value, (data as { effectiveFrom?: unknown })?.effectiveFrom)) as never,
        },
        { name: 'description', type: 'textarea', localized: true, required: true, admin: { description: 'What the amendment does (e.g. "Price increase to 6k BGN/month").' } },
        { name: 'reason', type: 'select', options: MODIFICATION_REASONS },
        {
          name: 'classification',
          type: 'select',
          options: IMPACT_CLASSIFICATIONS,
          admin: { description: 'IFRS-15 §20: a separate obligation, or integrated into this contract.' },
        },
        {
          name: 'priceImpact',
          type: 'number',
          admin: { description: 'Signed change in consideration (cents), in the contract currency.' },
          validate: andThen(validations.number, (value, { siblingData }) =>
            separateObligationError(value, (siblingData as { classification?: unknown })?.classification),
          ) as never,
        },
        { name: 'originalTerms', type: 'textarea', admin: { description: 'The terms before the amendment.' } },
        { name: 'newTerms', type: 'textarea', admin: { description: 'The terms after it.' } },
        {
          type: 'row',
          fields: [
            { name: 'plannedCompletionDate', type: 'date', admin: { description: 'Completion as planned before the amendment.' } },
            { name: 'revisedCompletionDate', type: 'date', admin: { description: 'Completion as revised by it.' } },
          ],
        },
        { name: 'approvalStatus', type: 'select', options: APPROVAL_STATUSES, defaultValue: 'draft' },
        { name: 'approvedBy', type: 'relationship', relationTo: 'users' },
        { name: 'modifiedBy', type: 'relationship', relationTo: 'users' },
        {
          type: 'row',
          fields: [
            { name: 'notarized', type: 'checkbox', defaultValue: false, admin: { description: 'Bulgaria ZKOD: notarized (amendments over 10k BGN).' } },
            { name: 'notaryReference', type: 'text', admin: { description: 'Notarization certificate number.' } },
            { name: 'mandatoryArbitration', type: 'checkbox', defaultValue: false, admin: { description: 'Labor Code Art. 331 clause present.' } },
          ],
        },
      ],
    },
    {
      // The execution record (formerly the contract-signatures collection): one row per signing step.
      name: 'signatures',
      type: 'array',
      admin: { description: 'Signing steps, in order. The contract becomes active once every step is signed (IFRS-15 §10).' },
      validate: andThen(validations.array, (value) => signatureSequenceError(value)) as never,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'sequence', type: 'number', required: true, min: 1, admin: { description: 'Step 1…N.' } },
            { name: 'role', type: 'select', required: true, options: SIGNATORY_ROLES },
            { name: 'status', type: 'select', required: true, defaultValue: 'draft', options: SIGNATURE_STATUSES },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'email', type: 'email' },
            { name: 'title', type: 'text' },
          ],
        },
        { name: 'provider', type: 'select', options: SIGNATURE_PROVIDERS },
        { name: 'signedAt', type: 'date', admin: { readOnly: true, description: 'Set by the server when the step is signed.' }, hooks: { beforeChange: [stampWhen('signed')] } },
        // evidence the e-signature integration writes; a caller cannot claim it
        { name: 'verificationUrl', type: 'text', access: integrationOnly, admin: { readOnly: true } },
        { name: 'certificateVerified', type: 'checkbox', access: integrationOnly, admin: { readOnly: true } },
        { name: 'documentLink', type: 'text', access: integrationOnly, admin: { readOnly: true } },
        { name: 'eidVerified', type: 'checkbox', access: integrationOnly, admin: { readOnly: true, description: 'Bulgaria eID verified.' } },
        {
          type: 'row',
          fields: [
            { name: 'notarized', type: 'checkbox', defaultValue: false, admin: { description: 'Bulgaria ZKOD: notarized.' } },
            { name: 'notaryReference', type: 'text' },
            { name: 'arbitrationAttested', type: 'checkbox', defaultValue: false, admin: { description: 'Labor Code Art. 331 attested.' } },
          ],
        },
        { name: 'rejectionReason', type: 'textarea', admin: { condition: (_data, sibling) => sibling?.status === 'rejected' } },
        { name: 'rejectedAt', type: 'date', admin: { readOnly: true }, hooks: { beforeChange: [stampWhen('rejected')] } },
        { name: 'comments', type: 'textarea' },
      ],
    },
    {
      ...statusField(
        [
          { label: 'Draft', value: 'draft' },
          { label: 'Pending Approval', value: 'pending_approval' },
          { label: 'Pending Signatures', value: 'pending_signatures' },
          { label: 'Active', value: 'active' },
          { label: 'Suspended', value: 'suspended' },
          { label: 'Completed', value: 'completed' },
          { label: 'Terminated', value: 'terminated' },
        ],
        'draft',
      ),
      validate: andThen(validations.select, (value, { data }) => activationError(value, (data as { signatures?: unknown })?.signatures)) as never,
    } as Field,
    { name: 'activatedAt', type: 'date', admin: { readOnly: true } },
    { name: 'terminatedAt', type: 'date', admin: { readOnly: true } },
    { name: 'subscription', type: 'relationship', relationTo: 'subscriptions', admin: { description: 'Linked subscription (if SaaS).' } },
    {
      type: 'group',
      name: 'zkod',
      label: 'Bulgaria ZKOD Compliance',
      fields: [
        {
          name: 'zkodContractNumber',
          type: 'text',
          index: true,
          admin: {
            description: 'Bulgaria ZKOD contract registry number (unique per ZKOD)',
          },
        },
        {
          name: 'zkodNotarized',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Contract notarized per Bulgaria registry (required for contracts > 10k BGN)',
          },
        },
        {
          name: 'mandatoryArbitrationClause',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description:
              'Bulgaria Labor Code Art. 331: mandatory arbitration clause present (required for employment-related contracts)',
          },
        },
      ],
    },
    ...auditFields(),
    notesField(),
  ],
  hooks: standardCollectionHooks('contracts', { beforeChange: [enforceSegregationOfDuties(), autoSetTimestamp('activatedAt', (d) => (d as { status?: string }).status === 'active'), autoSetTimestamp('terminatedAt', (d) => (d as { status?: string }).status === 'terminated')] }),
}

export default Contracts

/** @index-cross.foldback child=customers/contracts parent=customers — this cross folds back into its parent. */
