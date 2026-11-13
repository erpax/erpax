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
 * A commitment or contingency used to be its own collection, pointing forward at the provision it
 * became once the outflow turned probable. IAS-37 is one standard for both because they are one
 * obligation at two stages: DISCLOSED in the notes while it is only possible, RECOGNISED on the
 * balance sheet once it is probable. So the register is one collection, and the disclosed stage
 * is the earlier status of the same row. `audit-findings` remain the upstream signal.
 *
 * @invariant a disclosed row needs no period, estimate or type; a recognised row needs all three
 * @invariant recognition is owed exactly when a disclosed contingent liability turns probable
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-37 §10 contingent-liability-definition
 * @accounting IFRS IAS-37 §14 recognition-of-provisions
 * @accounting IFRS IAS-37 §27-30 recognition-prohibition
 * @accounting IFRS IAS-37 §86-92 disclosure-requirements
 * @accounting IFRS IFRS-15 §B50 onerous-contract-disclosure
 * @accounting US-GAAP ASC-440 commitments
 * @accounting US-GAAP ASC-450-20-50 loss-contingency-disclosure
 * @accounting IFRS IAS-37 §36 §37 §39 measurement-best-estimate
 * @accounting IFRS IAS-37 §66 §67 onerous-contracts
 * @accounting IFRS IAS-37 §70 §83 disclosure-requirements
 * @accounting US-GAAP ASC-450-20-25 loss-contingencies
 * @accounting US-GAAP ASC-410 asset-retirement-obligations
 * @audit ISO-19011:2018 audit-trail provision-evidence
 * @compliance SOX §404 internal-controls liability-completeness
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./AuditFindings.ts
 */

import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { currencyField, statusField, notesField, auditFields, referenceField, legalEntityField } from '@/base/accounting/field'
import { preset, type Preset } from '@/preset'

/** Off balance sheet: disclosed in the notes, settled without ever being recognised, or released. */
export const disclosedStages = (): string[] => ['disclosed', 'settled', 'released']

/** On balance sheet: a provision being drafted, recognised, used, reversed or reclassified. */
export const recognisedStages = (): string[] => ['draft', 'recognised', 'used', 'reversed', 'reclassified']

/** The saved lists that stand where the two collections stood. */
export function provisionPresets(): Preset[] {
  return [
    preset('Commitments & contingencies', 'provisions', { status: { in: disclosedStages() } }, ['reference', 'kind', 'category', 'maximumExposure', 'expectedOutflow', 'likelihood', 'status']),
    preset('Provisions', 'provisions', { status: { in: recognisedStages() } }, ['reference', 'provisionType', 'recognitionDate', 'bestEstimate', 'discountedAmount', 'status']),
  ]
}

/**
 * IAS-37 §14: a disclosed contingent liability whose outflow has become probable must be
 * recognised. A commitment, a guarantee or a contingent asset is not recognised by likelihood.
 */
export function recognitionOwed(row: { kind?: string | null; likelihood?: string | null; status?: string | null }): boolean {
  return row.status === 'disclosed' && row.kind === 'contingent_liability' && (row.likelihood === 'probable' || row.likelihood === 'virtually_certain')
}

/** A field a recognised row must carry and a disclosed row may leave empty. */
const onceRecognised = (label: string) => (value: unknown, { siblingData }: { siblingData?: { status?: string | null } }) =>
  disclosedStages().includes(siblingData?.status ?? 'draft') || (value !== undefined && value !== null && value !== '') || `${label} is required once the obligation is recognised.`

/** Date the row the first time it is recognised; a disclosed row has no recognition date. */
export function withRecognitionDate<T extends { status?: string | null; recognitionDate?: string | null }>(row: T, now: string): T {
  return row.status === 'recognised' && !row.recognitionDate ? { ...row, recognitionDate: now } : row
}

const dateRecognition: CollectionBeforeChangeHook = ({ data }) => withRecognitionDate(data, new Date().toISOString())

const Provisions: CollectionConfig = {
  slug: 'provisions',
  labels: { singular: 'Provision', plural: 'Provisions' },
  enableQueryPresets: true,
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'provisionType', 'recognitionDate', 'bestEstimate', 'discountedAmount', 'status'],
    description:
      'IAS-37 §14 register of recognised provisions (warranty / restructuring / onerous / environmental / litigation / decommissioning). Each row is a recognised liability whose timing / amount is uncertain.',
  },
  access: accountingCollectionAccess({ feature: 'period_end_closing' }),
  fields: [
    referenceField({ description: 'Tenant-unique provision reference (e.g. PROV-2026-001).' }),
    { name: 'description', type: 'textarea', required: true,
      admin: { description: 'Nature of the obligation (IAS-37 §85(a) disclosure).' } },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'provision',
      options: [
        { label: 'Provision (recognised obligation)', value: 'provision' },
        { label: 'Commitment (firm contractual obligation)', value: 'commitment' },
        { label: 'Contingent Liability (possible obligation)', value: 'contingent_liability' },
        { label: 'Contingent Asset (possible inflow)', value: 'contingent_asset' },
        { label: 'Guarantee (financial / performance)', value: 'guarantee' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      admin: { description: 'What the commitment or contingency arises from (IAS-37 §86 class).' },
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
    { name: 'counterparty', type: 'text',
      admin: { description: 'Name of supplier / claimant / beneficiary.' } },
    { name: 'inceptionDate', type: 'date',
      admin: { description: 'When the commitment was entered into or the contingency arose.' } },
    { name: 'expectedResolutionDate', type: 'date' },
    {
      name: 'likelihood',
      type: 'select',
      options: [
        { label: 'Remote (< 5%) — IAS-37 §28 no disclosure required', value: 'remote' },
        { label: 'Possible (≥ 5%, < 50%) — disclose only', value: 'possible' },
        { label: 'Probable (≥ 50%) — recognise as provision', value: 'probable' },
        { label: 'Virtually Certain (≥ 95%) — recognise as asset / liability', value: 'virtually_certain' },
      ],
      admin: { description: 'IAS-37 §23 likelihood scale. A contingent liability that turns probable is owed recognition.' },
    },
    { name: 'maximumExposure', type: 'number',
      admin: { description: 'Maximum possible cash outflow if the contingency materialises (IAS-37 §86(a) disclosure).' } },
    { name: 'expectedOutflow', type: 'number',
      admin: { description: 'Probability-weighted expected outflow (cents).' } },
    { name: 'isOnerousContractRelated', type: 'checkbox', defaultValue: false,
      admin: { description: 'IFRS-15 §B50 onerous-contract disclosure flag.' } },
    { name: 'noteText', type: 'textarea',
      admin: { description: 'IAS-37 §86 disclosure narrative — copy-pasteable into financial-statement notes.' } },
    {
      name: 'provisionType',
      type: 'select',
      validate: onceRecognised('Provision type'),
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
    { name: 'recognitionDate', type: 'date',
      admin: { description: 'Date the obligation was first recognised on the balance sheet — set when it is recognised.' } },
    { name: 'period', type: 'relationship', relationTo: 'fiscal-periods', validate: onceRecognised('Period') },
    currencyField(),
    { name: 'bestEstimate', type: 'number', validate: onceRecognised('Best estimate'),
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
        { label: 'Disclosed (off balance sheet)', value: 'disclosed' },
        { label: 'Settled (resolved, never recognised)', value: 'settled' },
        { label: 'Released (no longer applicable)', value: 'released' },
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
  hooks: ((base) => ({ ...base, beforeChange: [...(base.beforeChange ?? []), dateRecognition] }))(standardCollectionHooks('provisions')),
  timestamps: true,
}

export default Provisions

/** @index-cross.foldback child=fiscal/periods/provisions parent=fiscal/periods — this cross folds back into its parent. */
