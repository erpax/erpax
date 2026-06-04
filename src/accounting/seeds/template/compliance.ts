/**
 * Compliance resolution — derive a {@link CompliancePosture} for any country
 * from the live country-context. The single source of country truth; nothing
 * is re-typed here.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-4217:2015 currency-codes
 * @standard EN-16931:2017 e-invoicing
 * @compliance EU 2014/55 b2g-e-invoicing-mandate-resolution
 * @audit ISO-19011:2018 audit-trail country-decision-evidence
 * @see ../../../country-context.ts
 */

import type { CountryApi, CountryApiKind } from '@/config/country-apis'
import { resolveCountryContext } from '@/country/context'
import type { CompliancePosture } from '@/accounting/seeds/template/types'

/** Distinct official-API kinds for a country, in catalogue order. */
function uniqueKinds(apis: ReadonlyArray<CountryApi>): CountryApiKind[] {
  return [...new Set(apis.map((a) => a.kind))]
}

const ISO_4217 = /^[A-Z]{3}$/

function normalizeCurrency(value: string | null | undefined): string | null {
  if (typeof value !== 'string') return null
  const upper = value.toUpperCase()
  return ISO_4217.test(upper) ? upper : null
}

export interface ResolveComplianceInput {
  country?: string | null
  /** Per-tenant reporting-currency override (ISO-4217); defaults to country currency. */
  reportingCurrency?: string | null
}

/**
 * Resolve the compliance posture for a tenant in `country`. Honours a
 * per-tenant `reportingCurrency` override, and falls back to dynamic
 * country-context for uncurated countries (statutory chart `null`, mandate
 * `false`, only the globally-catalogued API kinds).
 */
export function resolveTenantCompliance(input: ResolveComplianceInput = {}): CompliancePosture {
  const ctx = resolveCountryContext({ country: input.country })
  return {
    country: ctx.country,
    reportingCurrency: normalizeCurrency(input.reportingCurrency) ?? ctx.profile.currency,
    statutoryChartReference: ctx.specifics?.statutoryChartOfAccounts ?? null,
    eInvoicingMandate: ctx.helpers.requiresEInvoicing(),
    officialApiKinds: uniqueKinds(ctx.apis),
  }
}
