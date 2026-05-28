/**
 * Intercompany Transactions — paired transactions between two tenants
 * (group entities) that must net to zero on consolidation.
 *
 * Slice TTT (2026-05-10): added per Slice NNN gap discovery. Distinct
 * from `journal-entries` (which records GL postings) and
 * `consolidation-eliminations` (which records the elimination JE);
 * this collection is the **paired source-document register** that
 * proves the intercompany relationship — every `from-tenant` row
 * must have a mirroring `to-tenant` row with debit/credit reversed.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time transaction-date
 * @accounting IFRS IFRS-10 §B86 consolidated-financial-statements
 * @accounting IFRS IAS-24 related-party-disclosures
 * @accounting US-GAAP ASC-810-10 consolidation
 * @accounting US-GAAP ASC-850 related-party-disclosures
 * @audit ISO-19011:2018 audit-trail intercompany-evidence
 * @compliance SOX §404 internal-controls intercompany-control TOM-IC-01
 * @compliance OECD BEPS Action 13 transfer-pricing-documentation
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./ConsolidationEliminations.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { tenantAdminWriteAccess } from '../access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'

const IntercompanyTransactions: CollectionConfig = {
  slug: 'intercompany-transactions',
  labels: { singular: 'Intercompany Transaction', plural: 'Intercompany Transactions' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'fromTenant', 'toTenant', 'transactionDate', 'debitAmount', 'creditAmount', 'status'],
    description:
      'Paired source documents between two group tenants. Each row pairs with a mirror row on the counterparty tenant — must net to zero on consolidation per IFRS 10 §B86 / ASC 810.',
  },
  access: tenantAdminWriteAccess(), // Slice VVV: gated by feature 'consolidation' (see featureGuard wiring TBA)
  fields: [
    referenceField({ description: 'Pair reference — both legs of the intercompany pair carry the same reference for join.' }),
    { name: 'fromTenant', type: 'relationship', relationTo: 'tenants', required: true, index: true,
      admin: { description: 'Tenant booking the debit leg (from-side of the intercompany pair).' } },
    { name: 'toTenant', type: 'relationship', relationTo: 'tenants', required: true, index: true,
      admin: { description: 'Tenant booking the credit leg (to-side of the intercompany pair).' } },
    // Slice UUUU — within-tenant intercompany support. When the group is
    // single-tenant with multiple legal-entities (Slice ZZZ pattern),
    // both fromTenant + toTenant equal this tenant and the entities are
    // distinguished via these legal-entity FKs. Multi-tenant SaaS deploys
    // leave them null.
    { name: 'fromLegalEntity', type: 'relationship', relationTo: 'legal-entities', index: true,
      admin: { description: 'IFRS-10 §B86 reporting entity for the debit leg (single-tenant multi-entity hierarchy).' } },
    { name: 'toLegalEntity', type: 'relationship', relationTo: 'legal-entities', index: true,
      admin: { description: 'IFRS-10 §B86 reporting entity for the credit leg (single-tenant multi-entity hierarchy).' } },
    { name: 'transactionDate', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — transaction effective date.' } },
    { name: 'pairKind', type: 'select', defaultValue: 'transfer', options: [
      { label: 'Cash Transfer', value: 'transfer' },
      { label: 'Service Charge (transfer-pricing)', value: 'service_charge' },
      { label: 'Goods Transfer (inventory)', value: 'goods_transfer' },
      { label: 'Loan Advance / Repayment', value: 'loan' },
      { label: 'Capital Contribution / Distribution', value: 'capital' },
      { label: 'Cost Allocation', value: 'cost_allocation' },
      { label: 'Other', value: 'other' },
    ] },
    currencyField(),
    { name: 'debitAmount', type: 'number', required: true,
      admin: { description: 'Debit leg amount, in cents (booked on fromTenant).' } },
    { name: 'creditAmount', type: 'number', required: true,
      admin: { description: 'Credit leg amount, in cents (booked on toTenant). Must equal debitAmount on the same currency.' } },
    { name: 'fromJournalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { description: 'JE booked on fromTenant — links source-document to GL.' } },
    { name: 'toJournalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { description: 'JE booked on toTenant — links source-document to GL.' } },
    { name: 'transferPricingDoc', type: 'text',
      admin: { description: 'BEPS Action 13 — local file / master file reference for transfer-pricing-bearing pairs.' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Counterparty Acknowledgement', value: 'pending_ack' },
        { label: 'Posted', value: 'posted' },
        { label: 'Eliminated on Consolidation', value: 'eliminated' },
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
    afterChange: [auditTrailAfterChange('intercompany-transactions')],
  },
  timestamps: true,
}

export default IntercompanyTransactions
