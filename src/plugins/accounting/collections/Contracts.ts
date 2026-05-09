/**
 * Contracts — IFRS 15 / ASC 606 master contract record.
 *
 * The canonical type lives in `@/standards/ifrs-15` (Contract). This
 * collection's field set is the Payload projection of that type:
 *
 *   canonical.id              → doc.id (Payload-managed)
 *   canonical.customerId      → doc.customer (relationship)
 *   canonical.effectiveDate   → doc.effectiveFrom
 *   canonical.endDate         → doc.effectiveTo
 *   canonical.currency        → doc.currency
 *   canonical.status          → doc.status
 *   canonical.combinedWithContractIds → doc.combinedWithContracts
 *
 * A contract groups one or more PerformanceObligations, each with its
 * own recognition timing. Subscriptions are one *kind* of contract; this
 * collection is the universal IFRS 15 §10 source of truth.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time effective-from effective-to
 * @accounting IFRS IFRS-15 §10 contract-with-customer
 * @accounting IFRS IFRS-15 §17 contract-combination
 * @accounting IFRS IFRS-15 §47 transaction-price
 * @accounting US-GAAP ASC-606-10-25 contract-existence
 * @accounting US-GAAP ASC-606-10-25-13 contract-modifications
 * @accounting US-GAAP ASC-606-10-25-9 contract-combination
 * @audit ISO-19011:2018 audit-trail contract-lifecycle
 * @compliance SOX §404 internal-controls contract-approval
 * @security ISO-27002 §5.4 segregation-of-duties
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @see src/standards/ifrs-15/types.ts Contract / TransactionPrice
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateHost } from '@/hooks/autoPopulateHost'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'

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
    multiTenancyField(),
    { name: 'contractNumber', type: 'text', required: true, unique: true, index: true },
    { name: 'customer', type: 'relationship', relationTo: 'addresses', required: true },
    { name: 'title', type: 'text', required: true },
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
        { name: 'description', type: 'textarea', required: true },
        { name: 'priceImpact', type: 'number' },
        { name: 'modifiedBy', type: 'relationship', relationTo: 'users' },
      ],
    },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Approval', value: 'pending_approval' },
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
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateHost],
    beforeChange: [
      autoPopulateCreatedBy,
      enforceSegregationOfDuties(),
      autoSetTimestamp('activatedAt', (d) => (d as { status?: string }).status === 'active'),
      autoSetTimestamp('terminatedAt', (d) => (d as { status?: string }).status === 'terminated'),
    ],
    afterChange: [auditTrailAfterChange('contracts')],
  },
  timestamps: true,
}

export default Contracts
