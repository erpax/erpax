/**
 * Country Context — single canonical merge of every country-aware datum.
 *
 * **The core principle.** Anywhere in the codebase that needs to branch
 * on country (tenant default, customer / vendor party, bank account,
 * invoice ship-to, tax-jurisdiction record, e-invoicing dispatch
 * decision, payroll filing, sanctions screening) MUST resolve through
 * this service rather than reading {@link COUNTRY_PROFILES} /
 * {@link COUNTRY_SPECIFICS} / {@link COUNTRY_APIS} directly.
 *
 * The merge produces a `CountryContext` bundle with:
 *   - `profile`   — currency / locale / accountingStandard
 *   - `specifics` — fiscal year, tax-id formats, bank-account format,
 *                   e-invoicing mandate, default VAT rate, statutory CoA
 *   - `apis`      — every official API catalogued for the country
 *                   (business registry, tax authority, e-invoicing,
 *                   sanctions, open-banking, address validation)
 *   - `helpers`   — bound functions (`validateTaxId`, `validateIban`,
 *                   `requiresEInvoicing`, `getFiscalPeriod`)
 *
 * **Resolution sources** (first non-null wins):
 *   1. Explicit `country` argument.
 *   2. Bank account IBAN (via {@link extractIbanCountry}).
 *   3. Address record `country` field (relationship lookup).
 *   4. Tenant `country` from tenant.config.
 *   5. House default ({@link DEFAULT_COUNTRY}).
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key
 * @audit ISO-19011:2018 audit-trail country-decision-evidence
 * @compliance EU 2014/55 b2g-e-invoicing-mandate-resolution
 * @see ../config/regional-defaults.ts
 * @see ../config/country-specifics.ts
 * @see ../config/country-apis.ts
 * @see ./country-api-clients.ts
 */

import type { CountryProfile } from '@/config/regional-defaults'
import {
  COUNTRY_PROFILES,
  DEFAULT_COUNTRY,
  getTenantDefaults,
} from '@/config/regional-defaults'
import type { CountrySpecifics } from '@/config/country-specifics'
import {
  COUNTRY_SPECIFICS,
  classifyTaxId,
  getFiscalYearStartMonth,
  getCurrencyDecimals,
} from '@/config/country-specifics'
import type { CountryApi } from '@/config/country-apis'
import { COUNTRY_APIS, BANK_APIS, hasEInvoicingPortal } from '@/config/country-apis'
import type { TradingApi } from '@/trading/api'
import { getTradingApis } from '@/trading/api'
import { extractIbanCountry, isValidIban } from '@/iban'

export interface CountryContext {
  /** Resolved ISO 3166-1 alpha-2 country code. */
  readonly country: string
  /** True when the resolved country sits in {@link COUNTRY_PROFILES}. */
  readonly known: boolean
  /** Per-country profile (currency / locale / accountingStandard). */
  readonly profile: CountryProfile
  /** Per-country specifics (fiscal year, tax-id formats, mandate). `null` when uncurated. */
  readonly specifics: CountrySpecifics | null
  /** Every official API catalogued for the country. */
  readonly apis: ReadonlyArray<CountryApi>
  /**
   * Every commercial trading API in scope for the country (payment gateways,
   * marketplaces, carriers, Peppol/EDI, banking aggregators, FX) — the
   * commercial sibling of `apis`. GLOBAL + (for EU members) EU-wide providers
   * are unioned in. See `src/trading/api/`.
   */
  readonly tradingApis: ReadonlyArray<TradingApi>
  /** Bound helpers — branch on country without reaching into the registries. */
  readonly helpers: {
    validateTaxId: (value: string) => string | null
    validateIban: (value: string) => boolean
    requiresEInvoicing: () => boolean
    fiscalYearStartMonth: () => number
    currencyDecimals: (code?: string) => number
    apisOfKind: (kind: CountryApi['kind']) => ReadonlyArray<CountryApi>
    tradingApisOfCategory: (category: TradingApi['category']) => ReadonlyArray<TradingApi>
  }
  /** Diagnostic — how was the country chosen? */
  readonly source: 'explicit' | 'iban' | 'address' | 'tenant' | 'default'
}

export interface ResolveCountryInput {
  country?: string | null
  iban?: string | null
  /** Address-relationship doc; only the `country` field is read. */
  address?: { country?: string | null } | null
  /** Tenant-relationship doc; only `country` from `tenant.config` is read. */
  tenant?: { country?: string | null; config?: { country?: string | null } | null } | null
}

/**
 * Resolve a {@link CountryContext} bundle from any country signal. Always
 * returns a non-null context — falls back to {@link DEFAULT_COUNTRY} if
 * nothing was supplied.
 */
export function resolveCountryContext(input: ResolveCountryInput = {}): CountryContext {
  const { country, source } = pickCountry(input)
  return buildContext(country, source)
}

function pickCountry(input: ResolveCountryInput): { country: string; source: CountryContext['source'] } {
  const explicit = upper(input.country)
  if (explicit) return { country: explicit, source: 'explicit' }

  const fromIban = upper(extractIbanCountry(input.iban ?? null))
  if (fromIban) return { country: fromIban, source: 'iban' }

  const fromAddress = upper(input.address?.country)
  if (fromAddress) return { country: fromAddress, source: 'address' }

  const fromTenant = upper(input.tenant?.config?.country ?? input.tenant?.country)
  if (fromTenant) return { country: fromTenant, source: 'tenant' }

  return { country: DEFAULT_COUNTRY, source: 'default' }
}

function upper(s: string | null | undefined): string | null {
  if (typeof s !== 'string' || s.length < 2) return null
  const u = s.toUpperCase()
  return /^[A-Z]{2}$/.test(u) ? u : null
}

function buildContext(country: string, source: CountryContext['source']): CountryContext {
  const known = country in COUNTRY_PROFILES
  const profile: CountryProfile =
    (COUNTRY_PROFILES as Record<string, CountryProfile>)[country] ??
    {
      currency: getTenantDefaults(country).currency,
      locale: getTenantDefaults(country).locale,
      accountingStandard: getTenantDefaults(country).accountingStandard,
    }
  const specifics = COUNTRY_SPECIFICS[country] ?? null
  const apis = [
    ...(COUNTRY_APIS[country] ?? []),
    ...(BANK_APIS[country] ?? []),
    ...(BANK_APIS.GLOBAL ?? []),
  ] as ReadonlyArray<CountryApi>
  const tradingApis = getTradingApis(country)

  return {
    country,
    known,
    profile,
    specifics,
    apis,
    tradingApis,
    source,
    helpers: {
      validateTaxId: (value: string) => classifyTaxId(country, value),
      validateIban: (value: string) => isValidIban(value),
      requiresEInvoicing: () => {
        if (!specifics) return false
        const scope = specifics.eInvoicingMandate.scope
        return scope === 'b2b' || scope === 'both' || (scope === 'b2g' && hasEInvoicingPortal(country))
      },
      fiscalYearStartMonth: () => getFiscalYearStartMonth(country),
      currencyDecimals: (code?: string) => getCurrencyDecimals(code ?? profile.currency),
      apisOfKind: (kind) => apis.filter((a) => a.kind === kind),
      tradingApisOfCategory: (category) => tradingApis.filter((a) => a.category === category),
    },
  }
}
