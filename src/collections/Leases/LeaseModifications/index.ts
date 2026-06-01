/**
 * Lease Modifications — IFRS-16 §44-46 + ASC 842-10-25-12 structured
 * register of lease changes (term extension, payment change, scope
 * change, partial / full termination).
 *
 * Slice DDDD (2026-05-10): the prior `leases` model captured the
 * initial recognition (ROU + lease liability) and the period-evidence
 * via `lease-period-postings`, but lacked a per-modification record.
 * IFRS-16 §44-46 mandates that each modification be classified
 * (separate-lease vs not-separate-lease) and remeasure the liability
 * with a corresponding ROU adjustment — auditors walk to this
 * collection for substantiation.
 *
 * Pairs with `leases` (the master) and `lease-period-postings` (the
 * post-modification period evidence).
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-16 §44 separate-lease-criterion
 * @accounting IFRS IFRS-16 §45 not-separate-lease-modification
 * @accounting IFRS IFRS-16 §46 partial-or-full-termination
 * @accounting IFRS IFRS-16 §B43 §B44 lease-modification-examples
 * @accounting US-GAAP ASC-842-10-25-8 lease-modification-classification
 * @accounting US-GAAP ASC-842-10-25-11 ASC-842-10-25-12 ASC-842-10-25-13
 * @audit ISO-19011:2018 audit-trail lease-modification-evidence
 * @compliance SOX §404 internal-controls liability-completeness
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Leases.ts
 * @see ./LeasePeriodPostings.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../../hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '../../../access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '../../../fields/base-accounting-fields'
import { emitLeaseRemeasured } from '../../../hooks/chainEventEmitters'

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
  hooks: standardCollectionHooks('lease-modifications', { afterChange: [emitLeaseRemeasured] }),
  timestamps: true,
}

export default LeaseModifications
