/**
 * Insurance Contracts — IFRS 17 GMM / PAA / VFA register.
 *
 * Slice BBBBB-prep (2026-05-11): each row is one insurance contract group
 * measured under IFRS 17 §32-§52 (General Measurement Model — GMM),
 * §53-§59 (Premium Allocation Approach — PAA, simplified for short-
 * coverage), or §B100-§B118 (Variable Fee Approach — VFA, for direct
 * participation contracts). Captures the §32 building blocks: future
 * cash-flow estimate, risk adjustment, contractual service margin (CSM),
 * discount rate. Reinsurance held is linked via `reinsuranceContract`.
 *
 * @standard IFRS IFRS-17 §3 scope
 * @standard IFRS IFRS-17 §32 general-measurement-model-building-blocks
 * @standard IFRS IFRS-17 §38 contractual-service-margin
 * @standard IFRS IFRS-17 §53 premium-allocation-approach-simplified
 * @standard IFRS IFRS-17 §B100 variable-fee-approach
 * @standard IFRS IFRS-17 §93 disclosure-requirements
 * @standard IFRS IFRS-13 fair-value-input-hierarchy
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-insurance-contracts
 * @compliance Solvency II / IAIS ICS — actuarial reserving link
 * @compliance SOX §404 internal-controls TOM-INS-01
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '@/base/accounting/field'

const InsuranceContracts: CollectionConfig = {
  slug: 'insurance-contracts',
  labels: { singular: 'Insurance Contract', plural: 'Insurance Contracts' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'measurementModel', 'lineOfBusiness', 'inceptionDate', 'csm', 'status'],
    description:
      'IFRS 17 — insurance contract groups under GMM / PAA / VFA. Captures CSM + risk adjustment + future cash-flow estimate.',
  },
  access: accountingCollectionAccess({ feature: 'insurance_contracts' }),
  fields: [
    referenceField({ description: 'Sequential reference (e.g. INS-2026-001).' }),
    {
      name: 'measurementModel',
      type: 'select',
      required: true,
      options: [
        { label: 'GMM — General Measurement Model (default)', value: 'gmm' },
        { label: 'PAA — Premium Allocation Approach (≤1yr coverage)', value: 'paa' },
        { label: 'VFA — Variable Fee Approach (direct participation)', value: 'vfa' },
      ],
    },
    {
      name: 'lineOfBusiness',
      type: 'select',
      required: true,
      options: [
        { label: 'Life (term)', value: 'life_term' },
        { label: 'Life (whole life)', value: 'life_whole' },
        { label: 'Annuity', value: 'annuity' },
        { label: 'Health', value: 'health' },
        { label: 'Property & Casualty', value: 'p_and_c' },
        { label: 'Auto', value: 'auto' },
        { label: 'Marine / Aviation', value: 'marine_aviation' },
        { label: 'Reinsurance assumed', value: 'reinsurance_assumed' },
        { label: 'Reinsurance ceded', value: 'reinsurance_ceded' },
      ],
    },
    { name: 'portfolioId', type: 'text', required: true,
      admin: { description: 'IFRS 17 §14 — portfolio = subject to similar risks AND managed together.' } },
    { name: 'cohortYear', type: 'number', required: true,
      admin: { description: 'IFRS 17 §22 — annual cohort grouping (no contracts ≥1yr apart in same group).' } },
    {
      name: 'profitabilityGroup',
      type: 'select',
      required: true,
      options: [
        { label: 'Profitable', value: 'profitable' },
        { label: 'No Significant Possibility of Loss', value: 'no_loss_possibility' },
        { label: 'Onerous (loss-recognition required)', value: 'onerous' },
      ],
      admin: { description: 'IFRS 17 §16 three groups per cohort.' },
    },
    { name: 'inceptionDate', type: 'date', required: true, index: true },
    { name: 'coverageEndDate', type: 'date' },
    { name: 'futureCashflowsEstimate', type: 'number', required: true,
      admin: { description: 'IFRS 17 §33 — probability-weighted estimate of fulfilment cash flows (cents).' } },
    { name: 'discountRate', type: 'number', required: true, min: 0, max: 100,
      admin: { description: 'IFRS 17 §36 — current rate reflecting time value + financial risk (% p.a.).', step: 0.001 } },
    { name: 'riskAdjustment', type: 'number', defaultValue: 0,
      admin: { description: 'IFRS 17 §37 — non-financial risk premium (cents).' } },
    { name: 'csm', type: 'number', defaultValue: 0,
      admin: { description: 'Contractual Service Margin — IFRS 17 §38 unearned profit (cents). Recognised as revenue over coverage units.' } },
    { name: 'lossComponent', type: 'number', defaultValue: 0,
      admin: { description: 'IFRS 17 §47 — loss recognised immediately for onerous groups.' } },
    currencyField(),
    { name: 'reinsuranceContract', type: 'relationship', relationTo: 'insurance-contracts',
      admin: { description: 'For reinsurance-held: link to the underlying gross contract.' } },
    { name: 'fairValueMeasurement', type: 'relationship', relationTo: 'fair-value-measurements' },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
    statusField(
      [
        { label: 'Recognised', value: 'recognised' },
        { label: 'In Coverage', value: 'in_coverage' },
        { label: 'Run-off (claims only)', value: 'runoff' },
        { label: 'Derecognised', value: 'derecognised' },
      ],
      'recognised',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('insurance-contracts'),
  timestamps: true,
}

export default InsuranceContracts
