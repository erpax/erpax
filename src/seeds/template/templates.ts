/**
 * Industry templates — curated per-(country × industry) opening books.
 *
 * Each template's `tenant` + `compliance` are *derived* from the live
 * country-context (`resolveCountryContext`) at module load. Edit a country
 * registry (`regional-defaults` / `country-specifics` / `country-apis`) and
 * every template here picks up the change automatically — see the `seed`
 * skill (`.claude/skills/seed/SKILL.md`).
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-1 §54 minimum-line-items
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail seed-evidence
 * @see ./compliance.ts
 * @see ./bg-nss.ts
 */

import { buildTemplate } from '@/seeds/template/build'
import { BG_NSS_TEMPLATE } from '@/seeds/template/bg-nss'
import type { IndustryTemplate, SeedAccount, SeedTransaction } from '@/seeds/template/types'

/** Minimal IFRS chart covering all five IAS-1 §54 element types. */
const IFRS_BASE_CHART: ReadonlyArray<SeedAccount> = [
  { accountNumber: '1000', accountName: 'Cash and cash equivalents', accountType: 'asset' },
  { accountNumber: '1100', accountName: 'Trade and other receivables', accountType: 'asset' },
  { accountNumber: '1500', accountName: 'Property, plant and equipment', accountType: 'asset' },
  { accountNumber: '2000', accountName: 'Trade and other payables', accountType: 'liability' },
  { accountNumber: '2100', accountName: 'Current tax liabilities', accountType: 'liability' },
  { accountNumber: '3000', accountName: 'Share capital', accountType: 'equity' },
  { accountNumber: '3100', accountName: 'Retained earnings', accountType: 'equity' },
  { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
  { accountNumber: '5000', accountName: 'Cost of sales', accountType: 'expense' },
  { accountNumber: '6000', accountName: 'Operating expenses', accountType: 'expense' },
]

/** Opening transactions that reference only `IFRS_BASE_CHART` account names. */
const IFRS_BASE_TRANSACTIONS: ReadonlyArray<SeedTransaction> = [
  {
    reference: 'INV-0001',
    debitAccountName: 'Trade and other receivables',
    creditAccountName: 'Revenue',
    description: 'Issue a sales invoice',
  },
  {
    reference: 'RCP-0001',
    debitAccountName: 'Cash and cash equivalents',
    creditAccountName: 'Trade and other receivables',
    description: 'Collect a customer receipt',
  },
]

export const IFRS_MINIMUM_TEMPLATE: IndustryTemplate = buildTemplate({
  id: 'ifrs-minimum',
  label: 'IFRS — minimal',
  description: 'The smallest IFRS-aligned chart of accounts a tenant can open books on.',
  country: 'BG',
  standards: ['IFRS IAS-1 §54 minimum-line-items', 'IFRS-15 revenue-from-contracts'],
  chartOfAccounts: IFRS_BASE_CHART,
  sampleTransactions: IFRS_BASE_TRANSACTIONS,
})

export const IFRS_RETAIL_TEMPLATE: IndustryTemplate = buildTemplate({
  id: 'ifrs-retail',
  label: 'IFRS — retail',
  description: 'Retail/merchandising chart with merchandise inventory and goods revenue.',
  country: 'DE',
  standards: ['IFRS IAS-1 §54 minimum-line-items', 'IFRS IAS-2 inventories', 'EN-16931:2017 e-invoicing'],
  chartOfAccounts: [
    ...IFRS_BASE_CHART,
    { accountNumber: '1300', accountName: 'Merchandise inventory', accountType: 'asset' },
    { accountNumber: '4100', accountName: 'Sales of goods', accountType: 'revenue' },
  ],
  sampleTransactions: [
    ...IFRS_BASE_TRANSACTIONS,
    {
      reference: 'SALE-0001',
      debitAccountName: 'Trade and other receivables',
      creditAccountName: 'Sales of goods',
      description: 'Sell merchandise on account',
    },
  ],
})

export const IFRS_SAAS_TEMPLATE: IndustryTemplate = buildTemplate({
  id: 'ifrs-saas',
  label: 'IFRS — SaaS',
  description: 'Software-as-a-service chart with deferred and subscription revenue.',
  country: 'US',
  standards: ['IFRS IAS-1 §54 minimum-line-items', 'IFRS-15 revenue-from-contracts', 'US-GAAP ASC-606'],
  chartOfAccounts: [
    ...IFRS_BASE_CHART,
    { accountNumber: '2200', accountName: 'Deferred revenue', accountType: 'liability' },
    { accountNumber: '4200', accountName: 'Subscription revenue', accountType: 'revenue' },
  ],
  sampleTransactions: [
    {
      reference: 'SUB-0001',
      debitAccountName: 'Cash and cash equivalents',
      creditAccountName: 'Deferred revenue',
      description: 'Collect an annual subscription in advance',
    },
    {
      reference: 'REC-0001',
      debitAccountName: 'Deferred revenue',
      creditAccountName: 'Subscription revenue',
      description: 'Recognise a month of subscription revenue',
    },
  ],
})

export const IFRS_SERVICE_TEMPLATE: IndustryTemplate = buildTemplate({
  id: 'ifrs-service',
  label: 'IFRS — professional services',
  description: 'Professional-services chart with accrued income and service-fee revenue.',
  country: 'GB',
  standards: ['IFRS IAS-1 §54 minimum-line-items', 'IFRS-15 revenue-from-contracts'],
  chartOfAccounts: [
    ...IFRS_BASE_CHART,
    { accountNumber: '1200', accountName: 'Accrued income', accountType: 'asset' },
    { accountNumber: '4300', accountName: 'Service fee revenue', accountType: 'revenue' },
  ],
  sampleTransactions: [
    {
      reference: 'WIP-0001',
      debitAccountName: 'Accrued income',
      creditAccountName: 'Service fee revenue',
      description: 'Accrue unbilled service revenue',
    },
    {
      reference: 'BILL-0001',
      debitAccountName: 'Trade and other receivables',
      creditAccountName: 'Accrued income',
      description: 'Bill the accrued service work',
    },
  ],
})

export const IFRS_MANUFACTURING_TEMPLATE: IndustryTemplate = buildTemplate({
  id: 'ifrs-manufacturing',
  label: 'IFRS — manufacturing',
  description: 'Manufacturing chart with the three inventory stages and direct labour.',
  country: 'US',
  standards: ['IFRS IAS-1 §54 minimum-line-items', 'IFRS IAS-2 inventories'],
  chartOfAccounts: [
    ...IFRS_BASE_CHART,
    { accountNumber: '1310', accountName: 'Raw materials', accountType: 'asset' },
    { accountNumber: '1320', accountName: 'Work in progress', accountType: 'asset' },
    { accountNumber: '1330', accountName: 'Finished goods', accountType: 'asset' },
    { accountNumber: '5100', accountName: 'Direct labour', accountType: 'expense' },
  ],
  sampleTransactions: [
    {
      reference: 'WO-0001',
      debitAccountName: 'Work in progress',
      creditAccountName: 'Raw materials',
      description: 'Issue raw materials to a work order',
    },
    {
      reference: 'FG-0001',
      debitAccountName: 'Finished goods',
      creditAccountName: 'Work in progress',
      description: 'Complete a work order into finished goods',
    },
  ],
})

/**
 * Registry of every curated industry template, keyed by `id`. The Bulgarian
 * National statutory chart (`bg-nss`) is registered alongside the IFRS family.
 */
export const INDUSTRY_TEMPLATES: Readonly<Record<string, IndustryTemplate>> = {
  [IFRS_MINIMUM_TEMPLATE.id]: IFRS_MINIMUM_TEMPLATE,
  [IFRS_RETAIL_TEMPLATE.id]: IFRS_RETAIL_TEMPLATE,
  [IFRS_SAAS_TEMPLATE.id]: IFRS_SAAS_TEMPLATE,
  [IFRS_SERVICE_TEMPLATE.id]: IFRS_SERVICE_TEMPLATE,
  [IFRS_MANUFACTURING_TEMPLATE.id]: IFRS_MANUFACTURING_TEMPLATE,
  [BG_NSS_TEMPLATE.id]: BG_NSS_TEMPLATE,
}

/** Look up a template by its `id` slug. */
export function getIndustryTemplate(id: string): IndustryTemplate | undefined {
  return INDUSTRY_TEMPLATES[id]
}

/**
 * First template anchored to `country` (ISO-3166-1 alpha-2), or `null`.
 * Multiple templates may share a country (e.g. SaaS + Manufacturing → US);
 * registry insertion order decides the winner.
 */
export function findTemplateByCountry(country: string): IndustryTemplate | null {
  const code = country.toUpperCase()
  return Object.values(INDUSTRY_TEMPLATES).find((t) => t.compliance.country === code) ?? null
}

/** Every distinct country a curated template anchors to. */
export function getCuratedComplianceCountries(): string[] {
  return [...new Set(Object.values(INDUSTRY_TEMPLATES).map((t) => t.compliance.country))]
}

/** Templates whose country mandates e-invoicing. */
export function getEInvoicingMandatedTemplates(): IndustryTemplate[] {
  return Object.values(INDUSTRY_TEMPLATES).filter((t) => t.compliance.eInvoicingMandate)
}
