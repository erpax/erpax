/**
 * Canonical industry templates — IFRS minimum + three sector verticals.
 *
 * Each template bundles (tenant defaults, chart of accounts, optional sample
 * transactions) under a stable id. Seeds at every level resolve the template
 * by id (`getIndustryTemplate('ifrs-saas')`) and stitch in the runtime tenant
 * id; nothing in the seed body re-types the same chart-of-accounts literal.
 *
 * Template inventory:
 *   - `ifrs-minimum` — bare-bones IAS-1 §54 chart (5 accounts, all five element types)
 *   - `ifrs-saas`    — subscription business (deferred revenue, ARR-style accounts)
 *   - `ifrs-retail`  — inventory + COGS (IAS-2)
 *   - `ifrs-service` — service / professional firm (WIP, time clearing, IFRS-15)
 *
 * @standard ISO/IEC-29119:2022 software-testing test-fixture
 * @accounting IFRS IAS-1 §54 minimum-line-items
 * @accounting IFRS IAS-2 inventories
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail seed-evidence
 * @see ./types.ts
 * @see docs/STANDARDS.md §4.2
 */

import type { IndustryTemplate } from './types';
import { BG_COUNTRY_BUNDLE } from '@/standards/iso-3166-1/countries';

/**
 * Bare-bones IFRS-aligned chart of accounts — one account per IAS-1 §54
 * element type. The historical "minimal accounting seeds" fixture; every
 * other template is a superset.
 *
 * Tenant defaults + compliance posture are *derived* from the canonical
 * `BG_COUNTRY_BUNDLE` (`src/standards/iso-3166-1/countries/bg.ts`) so the
 * default country's facts (statutory chart `'BG-NSS'`, fiscal year, official
 * API kinds, e-invoicing mandate) flow from the source registries rather
 * than being re-typed here.
 */
const BG = BG_COUNTRY_BUNDLE;

export const IFRS_MINIMUM_TEMPLATE: IndustryTemplate = {
  id: 'ifrs-minimum',
  label: 'IFRS Minimum',
  description: 'Bare-bones IAS-1 §54 chart of accounts. One account per element type.',
  standards: BG.standards,
  tenant: {
    code: 'TEST_TENANT',
    name: 'Test Tenant',
    accountingStandard: BG.profile.accountingStandard,
    fiscalYearStartMonth: BG.specifics?.fiscalYearStartMonth ?? 1,
    reportingCurrency: BG.profile.reportingCurrency,
    country: BG.code,
  },
  compliance: {
    country: BG.code,
    accountingStandard: BG.profile.accountingStandard,
    reportingCurrency: BG.profile.reportingCurrency,
    statutoryChartReference: BG.specifics?.statutoryChartOfAccounts ?? null,
    eInvoicingMandate: (BG.specifics?.eInvoicingMandate.scope ?? 'none') !== 'none',
    officialApiKinds: Array.from(new Set(BG.apis.map((api) => api.kind))),
  },
  chartOfAccounts: [
    { accountNumber: '1000', accountName: 'Cash',             accountType: 'asset' },
    { accountNumber: '2000', accountName: 'Accounts Payable', accountType: 'liability' },
    { accountNumber: '3000', accountName: 'Equity',           accountType: 'equity' },
    { accountNumber: '4000', accountName: 'Revenue',          accountType: 'revenue' },
    { accountNumber: '5000', accountName: 'Expenses',         accountType: 'expense' },
  ],
};

/**
 * SaaS / subscription template — IFRS-15 deferred-revenue pattern + the
 * standard SaaS metrics-bearing accounts (subscription revenue, R&D,
 * customer-acquisition cost / sales-and-marketing, AR / deferred revenue).
 */
export const IFRS_SAAS_TEMPLATE: IndustryTemplate = {
  id: 'ifrs-saas',
  label: 'IFRS SaaS',
  description: 'Subscription business — IFRS-15 deferred revenue + R&D + S&M chart.',
  standards: ['IFRS IAS-1 §54', 'IFRS IFRS-15 §B28-B33 deferred-revenue', 'ISO-4217:2015 USD'],
  tenant: {
    code: 'TEST_SAAS',
    name: 'Acme SaaS Inc.',
    accountingStandard: 'IFRS',
    fiscalYearStartMonth: 1,
    reportingCurrency: 'USD',
    country: 'US',
  },
  compliance: {
    country: 'US',
    accountingStandard: 'IFRS',
    reportingCurrency: 'USD',
    statutoryChartReference: null,
    eInvoicingMandate: false,
    // Underscore-form matches `CountryApi['kind']` in src/config/country-apis.ts
    // (the registry's canonical naming) — was previously hyphen-form drift.
    officialApiKinds: ['business_registry', 'tax_authority', 'sanctions'],
  },
  chartOfAccounts: [
    { accountNumber: '1000', accountName: 'Cash and cash equivalents', accountType: 'asset' },
    { accountNumber: '1100', accountName: 'Accounts receivable',       accountType: 'asset' },
    { accountNumber: '1200', accountName: 'Prepaid expenses',          accountType: 'asset' },
    { accountNumber: '2000', accountName: 'Accounts payable',          accountType: 'liability' },
    { accountNumber: '2100', accountName: 'Deferred revenue',          accountType: 'liability' },
    { accountNumber: '3000', accountName: 'Equity',                    accountType: 'equity' },
    { accountNumber: '4000', accountName: 'Subscription revenue',      accountType: 'revenue' },
    { accountNumber: '4100', accountName: 'Professional services revenue', accountType: 'revenue' },
    { accountNumber: '5000', accountName: 'Cost of revenue (hosting)', accountType: 'expense' },
    { accountNumber: '5100', accountName: 'Research & development',    accountType: 'expense' },
    { accountNumber: '5200', accountName: 'Sales & marketing',         accountType: 'expense' },
    { accountNumber: '5300', accountName: 'General & administrative',  accountType: 'expense' },
  ],
  sampleTransactions: [
    {
      reference: 'JE-INVOICE-ANN',
      description: 'Annual subscription invoice — defer revenue',
      debitAccountName: 'Accounts receivable',
      creditAccountName: 'Deferred revenue',
      amount: 12_000_00,
    },
    {
      reference: 'JE-RECOG-MO',
      description: 'Monthly revenue recognition (1/12 of annual)',
      debitAccountName: 'Deferred revenue',
      creditAccountName: 'Subscription revenue',
      amount: 1_000_00,
    },
  ],
};

/**
 * Retail template — IAS-2 inventory + COGS, plus the cash-cycle accounts
 * (sales revenue / sales tax payable / cost of goods sold / inventory).
 */
export const IFRS_RETAIL_TEMPLATE: IndustryTemplate = {
  id: 'ifrs-retail',
  label: 'IFRS Retail',
  description: 'Retail business — IAS-2 inventory + COGS + sales tax chart.',
  standards: ['IFRS IAS-1 §54', 'IFRS IAS-2 inventories', 'ISO-4217:2015 EUR'],
  tenant: {
    code: 'TEST_RETAIL',
    name: 'Acme Retail GmbH',
    accountingStandard: 'IFRS',
    fiscalYearStartMonth: 1,
    reportingCurrency: 'EUR',
    country: 'DE',
  },
  compliance: {
    country: 'DE',
    // German PCG variant — SKR-04 is the modern reference for IFRS-aligned
    // German entities.
    accountingStandard: 'IFRS',
    reportingCurrency: 'EUR',
    statutoryChartReference: 'SKR-04',
    // Germany mandates B2G e-invoicing per EU 2014/55 + ZUGFeRD/XRechnung.
    eInvoicingMandate: true,
    officialApiKinds: ['business_registry', 'tax_authority', 'e_invoicing', 'vat_validation'],
  },
  chartOfAccounts: [
    { accountNumber: '1000', accountName: 'Cash and cash equivalents', accountType: 'asset' },
    { accountNumber: '1100', accountName: 'Accounts receivable',       accountType: 'asset' },
    { accountNumber: '1200', accountName: 'Inventory',                 accountType: 'asset' },
    { accountNumber: '2000', accountName: 'Accounts payable',          accountType: 'liability' },
    { accountNumber: '2100', accountName: 'Sales tax payable',         accountType: 'liability' },
    { accountNumber: '3000', accountName: 'Equity',                    accountType: 'equity' },
    { accountNumber: '4000', accountName: 'Sales revenue',             accountType: 'revenue' },
    { accountNumber: '5000', accountName: 'Cost of goods sold',        accountType: 'expense' },
    { accountNumber: '5100', accountName: 'Operating expenses',        accountType: 'expense' },
  ],
  sampleTransactions: [
    {
      reference: 'JE-COGS-SALE',
      description: 'Sale of inventory — recognise COGS (IAS-2 §34)',
      debitAccountName: 'Cost of goods sold',
      creditAccountName: 'Inventory',
      amount: 450_00,
    },
  ],
};

/**
 * Professional-services template — time-and-materials chart with WIP and
 * a time-clearing account (services delivered, billed later).
 */
export const IFRS_SERVICE_TEMPLATE: IndustryTemplate = {
  id: 'ifrs-service',
  label: 'IFRS Professional Services',
  description: 'Time-and-materials professional firm — WIP + IFRS-15 progress billing.',
  standards: ['IFRS IAS-1 §54', 'IFRS IFRS-15 §35 input-method-progress', 'ISO-4217:2015 EUR'],
  tenant: {
    code: 'TEST_SERVICE',
    name: 'Acme Consulting Ltd.',
    accountingStandard: 'IFRS',
    fiscalYearStartMonth: 4, // UK fiscal year for variety
    reportingCurrency: 'GBP',
    country: 'GB',
  },
  compliance: {
    country: 'GB',
    accountingStandard: 'IFRS',
    reportingCurrency: 'GBP',
    statutoryChartReference: null,
    // UK MTD (Making Tax Digital) is the relevant filing/API mandate; not
    // strictly an "e-invoicing" mandate, so flagged false here.
    eInvoicingMandate: false,
    officialApiKinds: ['business_registry', 'tax_authority', 'address_validation'],
  },
  chartOfAccounts: [
    { accountNumber: '1000', accountName: 'Cash and cash equivalents', accountType: 'asset' },
    { accountNumber: '1100', accountName: 'Accounts receivable',       accountType: 'asset' },
    { accountNumber: '1200', accountName: 'Work in progress',          accountType: 'asset' },
    { accountNumber: '1300', accountName: 'Time clearing',             accountType: 'asset' },
    { accountNumber: '2000', accountName: 'Accounts payable',          accountType: 'liability' },
    { accountNumber: '3000', accountName: 'Equity',                    accountType: 'equity' },
    { accountNumber: '4000', accountName: 'Service revenue',           accountType: 'revenue' },
    { accountNumber: '5000', accountName: 'Salaries & wages',          accountType: 'expense' },
    { accountNumber: '5100', accountName: 'Operating expenses',        accountType: 'expense' },
  ],
  sampleTransactions: [
    {
      reference: 'JE-WIP-LOG',
      description: 'Time logged — accrue to WIP at standard rate',
      debitAccountName: 'Work in progress',
      creditAccountName: 'Time clearing',
      amount: 200_00,
    },
  ],
};

/**
 * BG-NSS statutory chart — Bulgarian National Standards System chart of
 * accounts for non-financial enterprises. Used by entities that report
 * under the BG national accounting standards (Закон за счетоводството)
 * rather than full IFRS — common for SMEs below the IFRS-mandate
 * thresholds.
 *
 * BG-NSS is structured by *class* (10s capital, 20s long-term assets,
 * 30s inventory, 40s receivables/payables, 50s financial, 60s operating
 * expenses by nature, 70s revenues, 80s off-balance, 90s cost-accounting
 * optional). One account per class is the minimum that satisfies the
 * statutory presentation; a real deployment will extend each class with
 * the sub-accounts mandated by the tenant's specific filings.
 *
 * @standard BG-NSS Сметкоплан non-financial-enterprises
 * @accounting Закон за счетоводството чл.5
 */
export const BG_NSS_TEMPLATE: IndustryTemplate = {
  id: 'bg-nss',
  label: 'BG-NSS Statutory',
  description: 'Bulgarian National Standards System chart — class-structured statutory presentation.',
  standards: [...BG.standards, 'BG-NSS Сметкоплан', 'Закон за счетоводството чл.5'],
  tenant: {
    code: 'TEST_BG_NSS',
    name: 'Тестово дружество ООД',
    accountingStandard: 'BG-NSS',
    fiscalYearStartMonth: BG.specifics?.fiscalYearStartMonth ?? 1,
    reportingCurrency: BG.profile.reportingCurrency,
    country: BG.code,
  },
  compliance: {
    country: BG.code,
    accountingStandard: 'BG-NSS',
    reportingCurrency: BG.profile.reportingCurrency,
    statutoryChartReference: 'BG-NSS',
    eInvoicingMandate: (BG.specifics?.eInvoicingMandate.scope ?? 'none') !== 'none',
    officialApiKinds: Array.from(new Set(BG.apis.map((api) => api.kind))),
  },
  chartOfAccounts: [
    { accountNumber: '101', accountName: 'Основен капитал',                accountType: 'equity' },
    { accountNumber: '201', accountName: 'Земи и сгради',                 accountType: 'asset' },
    { accountNumber: '301', accountName: 'Материали',                     accountType: 'asset' },
    { accountNumber: '302', accountName: 'Стоки',                         accountType: 'asset' },
    { accountNumber: '401', accountName: 'Доставчици',                    accountType: 'liability' },
    { accountNumber: '411', accountName: 'Клиенти',                       accountType: 'asset' },
    { accountNumber: '453', accountName: 'Разчети по ДДС',                accountType: 'liability' },
    { accountNumber: '501', accountName: 'Каса в лева',                   accountType: 'asset' },
    { accountNumber: '503', accountName: 'Разплащателна сметка в лева',   accountType: 'asset' },
    { accountNumber: '601', accountName: 'Разходи за материали',          accountType: 'expense' },
    { accountNumber: '602', accountName: 'Разходи за външни услуги',      accountType: 'expense' },
    { accountNumber: '604', accountName: 'Разходи за заплати',            accountType: 'expense' },
    { accountNumber: '701', accountName: 'Приходи от продажби на продукция', accountType: 'revenue' },
    { accountNumber: '702', accountName: 'Приходи от продажби на стоки',  accountType: 'revenue' },
  ],
};

/**
 * Manufacturing template — IAS-2 inventory split into raw materials, WIP,
 * and finished goods, plus manufacturing overhead. The chart distinguishes
 * direct materials/labour from absorbed overhead so absorption-cost vs
 * variable-cost analyses both work off the same accounts.
 */
export const IFRS_MANUFACTURING_TEMPLATE: IndustryTemplate = {
  id: 'ifrs-manufacturing',
  label: 'IFRS Manufacturing',
  description: 'Discrete manufacturing — IAS-2 RM/WIP/FG split + absorption-costing chart.',
  standards: ['IFRS IAS-1 §54', 'IFRS IAS-2 §10 inventories-cost-formula', 'ISO-4217:2015 USD'],
  tenant: {
    code: 'TEST_MFG',
    name: 'Acme Manufacturing Co.',
    accountingStandard: 'IFRS',
    fiscalYearStartMonth: 1,
    reportingCurrency: 'USD',
    country: 'US',
  },
  compliance: {
    country: 'US',
    accountingStandard: 'IFRS',
    reportingCurrency: 'USD',
    statutoryChartReference: null,
    eInvoicingMandate: false,
    officialApiKinds: ['business_registry', 'tax_authority'],
  },
  chartOfAccounts: [
    { accountNumber: '1000', accountName: 'Cash and cash equivalents',     accountType: 'asset' },
    { accountNumber: '1100', accountName: 'Accounts receivable',           accountType: 'asset' },
    { accountNumber: '1200', accountName: 'Raw materials inventory',       accountType: 'asset' },
    { accountNumber: '1210', accountName: 'Work in progress',              accountType: 'asset' },
    { accountNumber: '1220', accountName: 'Finished goods inventory',      accountType: 'asset' },
    { accountNumber: '1300', accountName: 'Property, plant & equipment',   accountType: 'asset' },
    { accountNumber: '2000', accountName: 'Accounts payable',              accountType: 'liability' },
    { accountNumber: '3000', accountName: 'Equity',                        accountType: 'equity' },
    { accountNumber: '4000', accountName: 'Sales revenue',                 accountType: 'revenue' },
    { accountNumber: '5000', accountName: 'Cost of goods sold',            accountType: 'expense' },
    { accountNumber: '5100', accountName: 'Direct labour',                 accountType: 'expense' },
    { accountNumber: '5200', accountName: 'Manufacturing overhead',        accountType: 'expense' },
    { accountNumber: '5300', accountName: 'Depreciation expense',          accountType: 'expense' },
    { accountNumber: '5400', accountName: 'Selling, general & admin',      accountType: 'expense' },
  ],
  sampleTransactions: [
    {
      reference: 'JE-WIP-RM-IN',
      description: 'Issue raw materials to production (IAS-2 §10)',
      debitAccountName: 'Work in progress',
      creditAccountName: 'Raw materials inventory',
      amount: 8_000_00,
    },
    {
      reference: 'JE-FG-COMPLETE',
      description: 'Transfer completed batch from WIP to finished goods',
      debitAccountName: 'Finished goods inventory',
      creditAccountName: 'Work in progress',
      amount: 12_500_00,
    },
    {
      reference: 'JE-COGS-SHIP',
      description: 'Ship finished goods — recognise COGS',
      debitAccountName: 'Cost of goods sold',
      creditAccountName: 'Finished goods inventory',
      amount: 9_750_00,
    },
  ],
};

/**
 * Registry of every template by id — single source of truth for callers
 * and the e2e admin walk-through (which iterates this map to capture one
 * screenshot per template's chart-of-accounts state).
 *
 * Two axes:
 *   - **Industry vertical** — `minimum` (default chart skeleton),
 *     `saas`, `retail`, `service`, `manufacturing`
 *   - **Country / compliance** — captured by `template.compliance.country`
 *     (BG, US, DE, GB)
 *
 * The matrix isn't exhaustively populated; callers needing a vertical-in-a-
 * country combo not listed here can compose a runtime template by reading
 * the country's bundle (`getCountryBundle`) for compliance + the vertical's
 * `chartOfAccounts` from the matching industry template.
 */
export const INDUSTRY_TEMPLATES = {
  'ifrs-minimum': IFRS_MINIMUM_TEMPLATE,
  'ifrs-saas': IFRS_SAAS_TEMPLATE,
  'ifrs-retail': IFRS_RETAIL_TEMPLATE,
  'ifrs-service': IFRS_SERVICE_TEMPLATE,
  'ifrs-manufacturing': IFRS_MANUFACTURING_TEMPLATE,
  'bg-nss': BG_NSS_TEMPLATE,
} as const;

export type IndustryTemplateId = keyof typeof INDUSTRY_TEMPLATES;

/**
 * Look up a template by id; throws on unknown id so a typo at the call
 * site fails fast instead of silently seeding the wrong shape.
 */
export const getIndustryTemplate = (id: IndustryTemplateId): IndustryTemplate => {
  const template = INDUSTRY_TEMPLATES[id];
  if (!template) {
    const known = Object.keys(INDUSTRY_TEMPLATES).join(', ');
    throw new Error(`Unknown industry template '${id}'. Known: ${known}`);
  }
  return template;
};
