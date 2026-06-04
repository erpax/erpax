/**
 * Industry-template seeds — per-(country × industry) opening chart-of-accounts
 * + compliance posture. Everything is derived from the live country-context;
 * nothing re-types a country fact. See `.claude/skills/seed/SKILL.md`.
 *
 * @see ./templates.ts
 * @see ./bg-nss.ts
 * @see ./compliance.ts
 */

export type {
  AccountElementType,
  CompliancePosture,
  IndustryTemplate,
  SeedAccount,
  SeedTransaction,
  TenantSeed,
} from '@/seeds/template/types'
export { resolveTenantCompliance, type ResolveComplianceInput } from '@/seeds/template/compliance'
export { BG_NSS_TEMPLATE } from '@/seeds/template/bg-nss'
export {
  IFRS_MINIMUM_TEMPLATE,
  IFRS_RETAIL_TEMPLATE,
  IFRS_SAAS_TEMPLATE,
  IFRS_SERVICE_TEMPLATE,
  IFRS_MANUFACTURING_TEMPLATE,
  INDUSTRY_TEMPLATES,
  getIndustryTemplate,
  findTemplateByCountry,
  getCuratedComplianceCountries,
  getEInvoicingMandatedTemplates,
} from '@/seeds/template/templates'
