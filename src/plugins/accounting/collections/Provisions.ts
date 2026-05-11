/**
 * Provisions — IAS-37 §14 + ASC 450 mandatory liability disclosure.
 *
 * Slice BBBB (2026-05-10): IAS-37 mandates a structured register of
 * present obligations whose timing or amount is uncertain (warranty,
 * restructuring, onerous contracts, environmental, litigation,
 * decommissioning). Without this collection, the balance-sheet
 * provisions line cannot be substantiated; auditors flag this as a
 * §404 deficiency on every audit cycle.
 *
 * Pairs with `commitments-and-contingencies` (off-balance-sheet) and
 * `audit-findings` (the upstream signal that may trigger a provision).
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-37 §14 recognition-of-provisions
 * @accounting IFRS IAS-37 §36 §37 §39 measurement-best-estimate
 * @accounting IFRS IAS-37 §66 §67 onerous-contracts
 * @accounting IFRS IAS-37 §70 §83 disclosure-requirements
 * @accounting US-GAAP ASC-450-20-25 loss-contingencies
 * @accounting US-GAAP ASC-410 asset-retirement-obligations
 * @audit ISO-19011:2018 audit-trail provision-evidence
 * @compliance SOX §404 internal-controls liability-completeness
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./CommitmentsAndContingencies.ts
 * @see ./AuditFindings.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField, legalEntityField } from '../fields/base-accounting-fields'

const Provisions: CollectionConfig = {
  slug: 'provisions',
  labels: { singular: 'Provision', plural: 'Provisions' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'provisionType', 'recognitionDate', 'bestEstimate', 'discountedAmount', 'status'],
    description:
      'IAS-37 §14 register of recognised provisions (warranty / restructuring / onerous / environmental / litigation / decommissioning). Each row is a recognised liability whose timing / amount is uncertain.',
  },
  access: accountingCollectionAccess({ feature: 'period_end_closing' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Tenant-unique provision reference (e.g. PROV-2026-001).' }),
    { name: 'description', type: 'textarea', required: true,
      admin: { description: 'Nature of the obligation (IAS-37 §85(a) disclosure).' } },
    {
      name: 'provisionType',
      type: 'select',
      required: true,
      options: [
        { label: 'Warranty (IAS-37 App.C ex.1)', value: 'warranty' },
        { label: 'Restructuring (IAS-37 §70-83)', value: 'restructuring' },
        { label: 'Onerous Contract (IAS-37 §66)', value: 'onerous_contract' },
        { label: 'Environmental Remediation', value: 'environmental' },
        { label: 'Decommissioning / ARO (IAS-37 §14 + IAS-16 §16(c))', value: 'decommissioning' },
        { label: 'Litigation / Legal Claim', value: 'litigation' },
        { label: 'Refund / Returns (IFRS-15 §B21)', value: 'refund' },
        { label: 'Restoration', value: 'restoration' },
        { label: 'Other', value: 'other' },
      ],
    },
    legalEntityField({ description: 'Reporting entity that recognises this provision.' }),
    { name: 'recognitionDate', type: 'date', required: true,
      admin: { description: 'Date the obligation was first recognised on the balance sheet.' } },
    { name: 'period', type: 'relationship', relationTo: 'fiscal-periods', required: true },
    currencyField(),
    { name: 'bestEstimate', type: 'number', required: true,
      admin: { description: 'IAS-37 §36 best-estimate of expenditure required to settle (cents).' } },
    { name: 'undiscountedAmount', type: 'number',
      admin: { description: 'Sum of undiscounted future cash outflows (when timing extends beyond a year).' } },
    { name: 'discountRate', type: 'number',
      admin: { description: 'Pre-tax discount rate per IAS-37 §47 (decimal, e.g. 0.045 = 4.5%).' } },
    { name: 'discountedAmount', type: 'number',
      admin: { description: 'Present value (cents) — what hits the balance sheet.' } },
    { name: 'expectedSettlementDate', type: 'date',
      admin: { description: 'Best estimate of when the obligation will be settled (drives current vs non-current split).' } },
    {
      name: 'expectedSettlementWindow',
      type: 'select',
      defaultValue: 'within_12m',
      options: [
        { label: 'Within 12 months (current)', value: 'within_12m' },
        { label: 'Beyond 12 months (non-current)', value: 'beyond_12m' },
        { label: 'Indeterminate', value: 'indeterminate' },
      ],
    },
    {
      name: 'reimbursementExpected',
      type: 'group',
      admin: { description: 'IAS-37 §53-58 — expected reimbursement (e.g. insurance recovery) recognised as a separate asset only when virtually certain.' },
      fields: [
        { name: 'amount', type: 'number', defaultValue: 0 },
        { name: 'isVirtuallyCertain', type: 'checkbox', defaultValue: false },
        { name: 'reimbursingParty', type: 'text' },
      ],
    },
    {
      name: 'movementHistory',
      type: 'array',
      labels: { singular: 'Movement', plural: 'Movements' },
      dbName: 'prov_mvmt',
      fields: [
        { name: 'period', type: 'relationship', relationTo: 'fiscal-periods', required: true },
        {
          name: 'movementType',
          type: 'select',
          required: true,
          options: [
            { label: 'Additional Provision (charge to P&L)', value: 'additional' },
            { label: 'Use (cash settlement)', value: 'used' },
            { label: 'Reversal (no longer required)', value: 'reversed' },
            { label: 'Unwind of Discount (interest expense)', value: 'unwind_discount' },
            { label: 'FX Revaluation (IAS-21)', value: 'fx_revaluation' },
          ],
        },
        { name: 'amount', type: 'number', required: true },
        { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries' },
        { name: 'movementDate', type: 'date', required: true },
        { name: 'memo', type: 'text' },
      ],
    },
    {
      name: 'uncertaintySource',
      type: 'select',
      options: [
        { label: 'Single Best Estimate', value: 'single_estimate' },
        { label: 'Range of Outcomes (IAS-37 §39 midpoint)', value: 'range_midpoint' },
        { label: 'Expected Value (probability-weighted)', value: 'expected_value' },
        { label: 'Most Likely Outcome', value: 'most_likely' },
      ],
      admin: { description: 'Method used to derive bestEstimate (IAS-37 §36-39 disclosure).' },
    },
    { name: 'sourceFinding', type: 'relationship', relationTo: 'audit-findings',
      admin: { description: 'Audit finding that triggered the recognition (when applicable).' } },
    { name: 'requiresLegalReview', type: 'checkbox', defaultValue: false },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Recognised (on balance sheet)', value: 'recognised' },
        { label: 'Used (settled)', value: 'used' },
        { label: 'Reversed (no longer required)', value: 'reversed' },
        { label: 'Reclassified to Liability', value: 'reclassified' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('provisions')],
  },
  timestamps: true,
}

export default Provisions
