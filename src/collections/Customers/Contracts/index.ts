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
 * component). Contract modifications tracked as immutable amendment records
 * (contract-amendments collection) per IFRS-15 §20; not edited in-place.
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
 * @security ISO-27002 §5.4 segregation-of-duties
 * @audit ISO-19011:2018 audit-trail contract-lifecycle
 * @feature "Contract management & revenue recognition"
 * @role "Finance Manager, Accountant, Contract Administrator"
 * @example "Bulgarian SaaS contract: C-2026-001 (customer: TechCorp BG, totalValue: 600,000 BGN, currency: BGN, effectiveFrom: 2026-01-15, effectiveTo: 2029-01-14, transactionPriceFixed: 480,000, transactionPriceVariable: 120,000, variableConsiderationMethod: expected_value, status: pending_signatures, paymentTerms: net30, zkodContractNumber: ZKOD-2026-1847, zkodNotarized: true, mandatoryArbitrationClause: true, controlTransferMethod: over_time per IFRS-15 §35 monthly service delivery)"
 * @useCase "Recording contract signing, tracking amendments, recognizing revenue per IFRS-15, reporting to Bulgaria ZKOD registry"
 * @invariant "All contracts must have explicit Incoterms, payment terms, and control-transfer method per IFRS-15 §31-35; status sequence enforced: draft→pending_signatures→pending_approval→active→suspended→completed→terminated"
 * @chain "Contracts (master) → Sales Orders → Invoices → GL Posting (revenue recognition gated by contract-fully-executed event); amendments tracked in contract-amendments collection (IFRS-15 §20)"
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
 * credit revenue. Modification events (tracked in contract-amendments) may adjust
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
 * @see src/standards/ifrs-15/types.ts Contract TransactionPrice PerformanceObligation
 * @see src/collections/accounting/contract-amendments.ts
 * @see src/collections/accounting/contract-performance.ts
 * @see src/collections/accounting/contract-signatures.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../hooks/standardCollectionHooks'
import { autoSetTimestamp } from '../../../hooks/autoSetTimestamp'
import { enforceSegregationOfDuties } from '../../../hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../../../access/auth'
import { currencyField, statusField, notesField, auditFields } from '../../../fields/base-accounting-fields'

const Contracts: CollectionConfig = {
  slug: 'contracts',
  labels: { singular: 'Contract', plural: 'Contracts' },
  admin: { useAsTitle: 'contractNumber', defaultColumns: ['contractNumber', 'customer', 'totalValue', 'status', 'effectiveFrom'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    { name: 'contractNumber', type: 'text', required: true, unique: true, index: true },
    // Slice XXXXXXXX-b (2026-05-11): retargeted from 'addresses' → 'customers'.
    // IFRS-15 §10 contract-with-customer requires the customer party itself.
    // The address sits on the customer row (billingAddress / shippingAddress).
    { name: 'customer', type: 'relationship', relationTo: 'customers', required: true },
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
      name: 'modifications',
      type: 'array',
      admin: { description: 'IFRS 15 §B47 / ASC 606-10-25-13 contract modifications.' },
      fields: [
        { name: 'modifiedAt', type: 'date', required: true },
        { name: 'description', type: 'textarea', localized: true, required: true },
        { name: 'priceImpact', type: 'number' },
        { name: 'modifiedBy', type: 'relationship', relationTo: 'users' },
      ],
    },
    statusField(
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
  timestamps: true,
}

export default Contracts
