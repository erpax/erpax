/**
 * Tenant compliance resolver — derives a `TenantCompliance` posture for any
 * tenant from its country setting using the canonical
 * `src/services/country-context.ts` entry point.
 *
 * The flow:
 *
 *   tenant.country
 *     → resolveCountryContext({ country })
 *         (merges COUNTRY_PROFILES + COUNTRY_SPECIFICS + COUNTRY_APIS)
 *     → derive `TenantCompliance` (accountingStandard / currency /
 *        statutoryChartReference / eInvoicingMandate / officialApiKinds)
 *     → match against INDUSTRY_TEMPLATES.compliance for a templated default,
 *        or fall back to a derived compliance posture
 *
 * Per the saved country-context architecture memory: this is the **only**
 * way to read country-aware compliance facts. Never reach into
 * `COUNTRY_PROFILES` / `COUNTRY_SPECIFICS` / `COUNTRY_APIS` directly from
 * a seed or test — go through this module.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key
 * @standard ISO-4217:2015 currency-codes reporting-currency
 * @audit ISO-19011:2018 audit-trail country-decision-evidence
 * @compliance EU 2014/55 b2g-e-invoicing-mandate-resolution
 * @see src/services/country-context.ts
 * @see ./types.ts
 * @see ./templates.ts
 */

import { resolveCountryContext } from '@/services/country-context';
import type { CountryContext } from '@/services/country-context';
import type { AccountingStandard, TenantCompliance } from './types';
import { INDUSTRY_TEMPLATES } from './templates';
import type { IndustryTemplate, IndustryTemplateId } from './templates';

/** Tenant shape relevant to compliance — narrow the real Payload Tenant type to the fields we actually read. */
export interface TenantComplianceInput {
  /** ISO-3166-1 alpha-2 country code (from `tenant.config.identity.country`). */
  readonly country?: string | null;
  /** Reporting currency override (from `tenant.config.currency.reportingCurrency`). */
  readonly reportingCurrency?: string | null;
  /** Accounting framework override (from `tenant.config.accounting.standard`). */
  readonly accountingStandard?: AccountingStandard | null;
}

/**
 * Resolve a tenant's compliance posture from its country setting.
 *
 * Two-step resolution:
 *
 *   1. If a curated `IndustryTemplate.compliance` entry matches the country,
 *      return it (templates are the canonical source for the countries we
 *      pre-wire).
 *   2. Otherwise, derive compliance dynamically from `resolveCountryContext`
 *      (currency from profile, fiscal year from specifics, e-invoicing
 *      mandate from `helpers.requiresEInvoicing`, official APIs from
 *      `apis[].kind`).
 *
 * Tenant-level overrides (`reportingCurrency`, `accountingStandard`) win
 * over both — Payload admins can override the country default per tenant.
 */
export function resolveTenantCompliance(input: TenantComplianceInput): TenantCompliance {
  const ctx: CountryContext = resolveCountryContext({ country: input.country ?? undefined });

  // Step 1 — curated template match keyed off country.
  const curated = Object.values(INDUSTRY_TEMPLATES).find(
    (t: IndustryTemplate) => t.compliance.country === ctx.country,
  );
  if (curated) {
    return applyOverrides(curated.compliance, input);
  }

  // Step 2 — dynamic derivation from country-context.
  const derived: TenantCompliance = {
    country: ctx.country,
    accountingStandard: (ctx.profile.accountingStandard as AccountingStandard | undefined) ?? 'IFRS',
    reportingCurrency: ctx.profile.reportingCurrency ?? 'EUR',
    statutoryChartReference: ctx.specifics?.statutoryChartReference ?? null,
    eInvoicingMandate: ctx.helpers.requiresEInvoicing(),
    officialApiKinds: Array.from(new Set(ctx.apis.map((api) => api.kind))),
  };
  return applyOverrides(derived, input);
}

/** Tenant overrides win over the country default. */
function applyOverrides(
  base: TenantCompliance,
  input: TenantComplianceInput,
): TenantCompliance {
  return {
    ...base,
    ...(input.reportingCurrency ? { reportingCurrency: input.reportingCurrency } : {}),
    ...(input.accountingStandard ? { accountingStandard: input.accountingStandard } : {}),
  };
}

/**
 * Pick the industry template whose compliance posture matches a country.
 * Returns `null` when no curated template covers the country — callers
 * should fall back to `IFRS_MINIMUM_TEMPLATE` for the chart-of-accounts
 * scaffold and `resolveTenantCompliance` for the live compliance facts.
 */
export function findTemplateByCountry(country: string): IndustryTemplate | null {
  const match = Object.values(INDUSTRY_TEMPLATES).find(
    (t) => t.compliance.country === country,
  );
  return match ?? null;
}

/** Index of curated templates keyed by their compliance country. */
export function getCuratedComplianceCountries(): ReadonlyArray<string> {
  return Object.values(INDUSTRY_TEMPLATES).map((t) => t.compliance.country);
}

/** All templates that pre-wire an e-invoicing mandate (B2G / B2B). */
export function getEInvoicingMandatedTemplates(): ReadonlyArray<IndustryTemplate> {
  return Object.values(INDUSTRY_TEMPLATES).filter((t) => t.compliance.eInvoicingMandate);
}

/** Re-export the template-id type so callers can stay in this module. */
export type { IndustryTemplate, IndustryTemplateId };
