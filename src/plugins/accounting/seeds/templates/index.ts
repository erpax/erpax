/**
 * Industry-template barrel — single import surface for seeds and tests.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-fixture
 * @audit ISO-19011:2018 audit-trail seed-evidence
 * @see ./templates.ts
 * @see ./types.ts
 */

export type {
  IndustryTemplate,
  IndustryTemplateId,
  TenantTemplateDefaults,
  ChartOfAccountsEntry,
  SampleTransaction,
  GlAccountType,
  AccountingStandard,
} from './types';

export {
  INDUSTRY_TEMPLATES,
  IFRS_MINIMUM_TEMPLATE,
  IFRS_SAAS_TEMPLATE,
  IFRS_RETAIL_TEMPLATE,
  IFRS_SERVICE_TEMPLATE,
  IFRS_MANUFACTURING_TEMPLATE,
  BG_NSS_TEMPLATE,
  getIndustryTemplate,
} from './templates';

export type { TenantCompliance } from './types';
export {
  resolveTenantCompliance,
  findTemplateByCountry,
  getCuratedComplianceCountries,
  getEInvoicingMandatedTemplates,
} from './compliance';
export type { TenantComplianceInput } from './compliance';
