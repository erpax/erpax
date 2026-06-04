/**
 * Transfer Pricing Files — OECD BEPS Action 13 Master File + Local File
 * + Country-by-Country Report (CbCR) structured register.
 *
 * Slice CCCC (2026-05-10): the prior model embedded transfer-pricing
 * documentation as a free-text `transferPricingDoc` field on
 * `intercompany-transactions`. OECD BEPS Action 13 mandates structured
 * records with separate Master File (group-level) + Local File
 * (entity-level) + CbCR (group-level) formats — and various national
 * thresholds for filing. This collection is the structured home.
 *
 * Pairs with `intercompany-transactions` (the underlying transactions
 * the file documents) and `legal-entities` (the entities in scope).
 *
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-4217:2015 currency-codes
 * @compliance OECD BEPS Action 13 transfer-pricing-documentation
 * @compliance OECD TPG 2022 transfer-pricing-guidelines
 * @compliance EU DAC-4 country-by-country-reporting
 * @compliance EU 2016/881 administrative-cooperation-tax
 * @compliance OECD Pillar Two GloBE (15% global minimum tax)
 * @audit ISO-19011:2018 audit-trail tp-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./IntercompanyTransactions.ts
 * @see ./LegalEntities.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { currencyField, statusField, notesField, auditFields, referenceField, countryCodeField, taxonomySelect } from '@/base/accounting/field'
import { OECD_TP_METHOD_OPTIONS, BEPS_TP_FILE_TYPE_OPTIONS } from '@/oecd/tpg'

const TransferPricingFiles: CollectionConfig = {
  slug: 'transfer-pricing-files',
  labels: { singular: 'Transfer Pricing File', plural: 'Transfer Pricing Files' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'fileType', 'reportingYear', 'jurisdictionCode', 'filingStatus', 'status'],
    description:
      'OECD BEPS Action 13 structured TP documentation register. Master File / Local File / CbCR per fiscal year per jurisdiction.',
  },
  access: accountingCollectionAccess({ feature: 'transfer_pricing' }),
  fields: [
    referenceField(),
    { name: 'reportingYear', type: 'number', required: true, index: true },
    taxonomySelect('fileType', BEPS_TP_FILE_TYPE_OPTIONS, { required: true }),
    countryCodeField({ name: 'jurisdictionCode', required: true, description: 'ISO 3166-1 alpha-2 — filing jurisdiction (e.g. BG / DE / RO / NL).' }),
    { name: 'localFileEntity', type: 'relationship', relationTo: 'legal-entities',
      admin: { description: 'Entity whose Local File this is (only set when fileType = local_file).' } },
    { name: 'consolidatedHeadEntity', type: 'relationship', relationTo: 'legal-entities',
      admin: { description: 'Ultimate parent / surrogate parent for Master File + CbCR.' } },
    {
      name: 'masterFileSections',
      type: 'group',
      admin: { description: 'OECD TPG Annex I to Chapter V — Master File sections.' },
      fields: [
        { name: 'orgStructure', type: 'textarea', label: 'Organisational structure (chart, geographic location)' },
        { name: 'businessDescription', type: 'textarea', label: 'Description of MNE business' },
        { name: 'intangibles', type: 'textarea', label: 'Intangibles (overall strategy, key intangibles, transfers)' },
        { name: 'intercompanyFinancialActivities', type: 'textarea', label: 'Intercompany financial activities' },
        { name: 'financialAndTaxPositions', type: 'textarea', label: 'Financial and tax positions' },
      ],
    },
    {
      name: 'localFileSections',
      type: 'group',
      admin: { description: 'OECD TPG Annex II to Chapter V — Local File sections.' },
      fields: [
        { name: 'localEntityDescription', type: 'textarea' },
        { name: 'controlledTransactions', type: 'textarea',
          label: 'Controlled transactions (per category, FAR analysis, comparables)' },
        { name: 'financialInformation', type: 'textarea' },
      ],
    },
    {
      name: 'cbcrAggregates',
      type: 'array',
      admin: { description: 'OECD CbCR Table 1 — per-jurisdiction aggregates. One row per jurisdiction.' },
      labels: { singular: 'CbCR Row', plural: 'CbCR Rows' },
      dbName: 'cbcr_row',
      fields: [
        countryCodeField({ name: 'jurisdictionCode', required: true }),
        { name: 'unrelatedRevenue', type: 'number', defaultValue: 0 },
        { name: 'relatedRevenue', type: 'number', defaultValue: 0 },
        { name: 'totalRevenue', type: 'number', defaultValue: 0 },
        { name: 'profitBeforeTax', type: 'number', defaultValue: 0 },
        { name: 'incomeTaxPaidCash', type: 'number', defaultValue: 0 },
        { name: 'incomeTaxAccrued', type: 'number', defaultValue: 0 },
        { name: 'statedCapital', type: 'number', defaultValue: 0 },
        { name: 'accumulatedEarnings', type: 'number', defaultValue: 0 },
        { name: 'numberOfEmployees', type: 'number', defaultValue: 0 },
        { name: 'tangibleAssets', type: 'number', defaultValue: 0 },
      ],
    },
    taxonomySelect('tpMethod', OECD_TP_METHOD_OPTIONS, { description: 'OECD TPG Chapter II — selected method.' }),
    currencyField({ name: 'reportingCurrency', defaultValue: 'EUR' }),
    { name: 'consolidatedRevenue', type: 'number',
      admin: { description: 'Group consolidated revenue — drives CbCR threshold (€750M / national equivalents).' } },
    {
      name: 'cbcrFilingThresholdMet',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'CbCR filing required when consolidated revenue ≥ €750M (or local equivalent).' },
    },
    {
      name: 'pillarTwoApplicable',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'OECD Pillar Two GloBE 15% minimum tax applicability — when consolidated revenue ≥ €750M for ≥ 2 of last 4 years.' },
    },
    { name: 'preparationDate', type: 'date' },
    { name: 'filingDeadline', type: 'date',
      admin: { description: 'Statutory filing deadline (varies by jurisdiction).' } },
    { name: 'filingDate', type: 'date' },
    {
      name: 'filingStatus',
      type: 'select',
      defaultValue: 'in_preparation',
      options: [
        { label: 'In Preparation', value: 'in_preparation' },
        { label: 'Filed (timely)', value: 'filed_timely' },
        { label: 'Filed (late)', value: 'filed_late' },
        { label: 'Not Required', value: 'not_required' },
        { label: 'Under Tax Authority Review', value: 'under_review' },
        { label: 'Audit Concluded — No Adjustment', value: 'no_adjustment' },
        { label: 'Audit Concluded — Adjustment', value: 'adjustment' },
      ],
    },
    { name: 'evidenceAttestation', type: 'relationship', relationTo: 'evidence-attestations' },
    { name: 'apaReference', type: 'text',
      admin: { description: 'Advance Pricing Agreement reference (when applicable).' } },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Approved', value: 'approved' },
        { label: 'Filed', value: 'filed' },
        { label: 'Closed (audit cycle complete)', value: 'closed' },
        { label: 'Restated', value: 'restated' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('transfer-pricing-files'),
  timestamps: true,
}

export default TransferPricingFiles
