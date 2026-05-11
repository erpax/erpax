/**
 * Commitments & Contingencies — IAS-37 §27-92 + IFRS-15 §B50 mandatory
 * disclosure of off-balance-sheet items.
 *
 * Slice BBBB (2026-05-10): every audited financial statement must
 * disclose contractual commitments (capex orders, purchase obligations,
 * operating-lease commitments under ASC 842 transition rules) and
 * contingent liabilities / assets (lawsuits, guarantees, performance
 * bonds, environmental). This collection is the structured home for
 * those notes-disclosure items — distinct from `provisions` which are
 * recognised on-balance-sheet.
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-37 §10 contingent-liability-definition
 * @accounting IFRS IAS-37 §27-30 recognition-prohibition
 * @accounting IFRS IAS-37 §86-92 disclosure-requirements
 * @accounting IFRS IAS-1 §112(c) other-disclosures
 * @accounting IFRS IFRS-15 §B50 onerous-contract-disclosure
 * @accounting US-GAAP ASC-440 commitments
 * @accounting US-GAAP ASC-450-20-50 loss-contingency-disclosure
 * @audit ISO-19011:2018 audit-trail off-balance-sheet
 * @compliance SOX §404 internal-controls disclosure-completeness
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Provisions.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField, legalEntityField } from '../fields/base-accounting-fields'

const CommitmentsAndContingencies: CollectionConfig = {
  slug: 'commitments-and-contingencies',
  labels: { singular: 'Commitment / Contingency', plural: 'Commitments & Contingencies' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'kind', 'category', 'maximumExposure', 'expectedOutflow', 'likelihood', 'status'],
    description:
      'IAS-37 §86-92 + IFRS-15 §B50 off-balance-sheet disclosure register. Commitments (capex, purchase, lease) + contingent liabilities (lawsuits, guarantees) + contingent assets (insurance recoveries).',
  },
  access: accountingCollectionAccess({ feature: 'period_end_closing' }),
  fields: [
    multiTenancyField(),
    referenceField(),
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Commitment (firm contractual obligation)', value: 'commitment' },
        { label: 'Contingent Liability (possible obligation)', value: 'contingent_liability' },
        { label: 'Contingent Asset (possible inflow)', value: 'contingent_asset' },
        { label: 'Guarantee (financial / performance)', value: 'guarantee' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Capital Commitment (capex, IAS-16 §74(c))', value: 'capex' },
        { label: 'Purchase Obligation (IFRS-15 §B50)', value: 'purchase' },
        { label: 'Operating-Lease Commitment (legacy ASC 842)', value: 'op_lease' },
        { label: 'Litigation / Legal Claim', value: 'litigation' },
        { label: 'Performance Bond', value: 'performance_bond' },
        { label: 'Bank Guarantee / Letter of Credit', value: 'bank_guarantee' },
        { label: 'Pension / Post-Employment (IAS-19)', value: 'pension' },
        { label: 'Environmental', value: 'environmental' },
        { label: 'Tax Dispute', value: 'tax_dispute' },
        { label: 'Insurance Recovery (contingent asset)', value: 'insurance_recovery' },
        { label: 'Other', value: 'other' },
      ],
    },
    legalEntityField(),
    { name: 'counterparty', type: 'text',
      admin: { description: 'Name of supplier / claimant / beneficiary.' } },
    { name: 'inceptionDate', type: 'date', required: true },
    { name: 'expectedResolutionDate', type: 'date' },
    {
      name: 'likelihood',
      type: 'select',
      defaultValue: 'possible',
      options: [
        { label: 'Remote (< 5%) — IAS-37 §28 no disclosure required', value: 'remote' },
        { label: 'Possible (≥ 5%, < 50%) — disclose only', value: 'possible' },
        { label: 'Probable (≥ 50%) — recognise as provision', value: 'probable' },
        { label: 'Virtually Certain (≥ 95%) — recognise as asset / liability', value: 'virtually_certain' },
      ],
      admin: { description: 'IAS-37 §23 likelihood scale. Probable triggers reclassification to `provisions`.' },
    },
    currencyField(),
    { name: 'maximumExposure', type: 'number', required: true,
      admin: { description: 'Maximum possible cash outflow if the contingency materialises (IAS-37 §86(a) disclosure).' } },
    { name: 'expectedOutflow', type: 'number',
      admin: { description: 'Probability-weighted expected outflow (cents).' } },
    { name: 'reimbursementExpected', type: 'number', defaultValue: 0,
      admin: { description: 'IAS-37 §86(b) reimbursement disclosure.' } },
    { name: 'isOnerousContractRelated', type: 'checkbox', defaultValue: false,
      admin: { description: 'IFRS-15 §B50 onerous-contract disclosure flag.' } },
    { name: 'recognisedAsProvision', type: 'relationship', relationTo: 'provisions',
      admin: { readOnly: true, description: 'Set when likelihood reaches probable and a provision is booked.' } },
    {
      name: 'noteText',
      type: 'textarea',
      admin: { description: 'IAS-37 §86 disclosure narrative — copy-pasteable into financial-statement notes.' },
    },
    statusField(
      [
        { label: 'Active (disclosed)', value: 'active' },
        { label: 'Settled (resolved)', value: 'settled' },
        { label: 'Released (no longer applicable)', value: 'released' },
        { label: 'Reclassified to Provision', value: 'reclassified' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('commitments-and-contingencies')],
  },
  timestamps: true,
}

export default CommitmentsAndContingencies
