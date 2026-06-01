/**
 * Canonical config-cascade resolver — DRY entry point for every business
 * operation that needs the active tenant/user's regional configuration.
 *
 * **One function, one cascade, one bundle.** Consumers (statement
 * generators, address validators, invoice templates, GL handlers,
 * tax engine, e-invoicing channels, locale formatters, audit-trail
 * loggers) all call {@link resolveRequestConfig} and read the
 * {@link ResolvedConfig} bundle. No call site walks the cascade itself.
 *
 * **International-first cascade** (most-specific wins per field):
 *   1. Document field on the request (handled by callers — pass the
 *      explicit value if you have it; otherwise the resolver fills in)
 *   2. `user.config.<section>.<field>` — explicit per-user override
 *      (presentation-only: locale, dateFormat, displayCurrency, features)
 *   3. `tenant.config.<section>.<field>` — explicit per-tenant override
 *      (legal/compliance + presentation)
 *   4. `tenant.config.identity.country` → `COUNTRY_PROFILES` derived
 *   5. Deployment defaults (`getRegionalDefaults` from env / `DEFAULT_*`)
 *
 * **Why both tenant.config AND user.config?** `tenant.config` is a
 * Payload-shaped sandbox config scoped to the legal entity (drives
 * compliance: accounting standard, reporting currency, country).
 * `user.config` is the same shape narrowed to what meaningfully varies
 * per user (UI language, display currency, date-format preference).
 * A user CANNOT change their tenant's reporting currency or accounting
 * framework — those are legal commitments — but they CAN see balances
 * in their own preferred currency via FX conversion.
 *
 * **Any country, any currency.** ISO 3166-1 alpha-2 country codes are
 * accepted verbatim even when not in the curated `COUNTRY_PROFILES`;
 * ISO 4217 §5 alphabetic currency codes are accepted verbatim even
 * when not in the curated `SUPPORTED_CURRENCIES`. The curated lists
 * exist to drive admin-UI quick-selects and ship explicit document
 * adapters; everything else still works.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2 cascade-source
 * @standard ISO-4217:2015 currency-codes alphabetic cascade-source
 * @standard BCP-47 language-tag locale-cascade
 * @standard ECMA-402 internationalization-api
 * @accounting IFRS IAS-1 presentation-of-financial-statements per-tenant-framework
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation per-tenant-config
 * @compliance GDPR Art.12 transparent-information user-language-of-choice
 * @audit ISO-19011:2018 audit-trail config-cascade-resolution
 * @see src/config/regional-defaults.ts
 * @see src/collections/Tenants/index.ts (config group)
 * @see src/collections/Users/index.ts (config group)
 */

import type { PayloadRequest } from 'payload'
import {
  getRegionalDefaults,
  getTenantDefaults,
  isIso4217Currency,
  type Currency,
  type RegionalDefaults,
} from '@/config/regional-defaults'
import { resolveCountryContext, type CountryContext } from '@/services/country-context'

// ─── 1. Per-tenant / per-user config shapes ────────────────────────────────

/** Mirrors `Tenant.config` from `src/collections/Tenants/index.ts`. */
export interface TenantConfig {
  identity?: {
    country?: string | null
    legalName?: string | null
    taxRegistration?: string | null
  } | null
  localization?: {
    defaultLocale?: string | null
    fallbackLocale?: string | null
  } | null
  currency?: {
    reportingCurrency?: string | null
  } | null
  accounting?: {
    standard?: RegionalDefaults['accountingStandard'] | null
    fiscalYearStartMonth?: number | null
  } | null
  features?: Record<string, unknown> | null
}

/** Mirrors `User.config` from `src/collections/Users/index.ts`. */
export interface UserConfig {
  localization?: {
    defaultLocale?: string | null
    displayCurrency?: string | null
    dateFormat?: 'iso' | 'eu' | 'us' | 'locale' | null
  } | null
  features?: Record<string, unknown> | null
}

// ─── 2. Resolved bundle returned to consumers ──────────────────────────────

/**
 * Resolved configuration bundle for the active request — every business
 * operation reads from this rather than re-walking the cascade.
 */
export interface ResolvedConfig {
  /** ISO 3166-1 alpha-2 country code (legal jurisdiction). */
  country: string
  /** Tenant's registered legal name (if set). */
  legalName?: string
  /** VAT / GST / EIN / GSTIN / etc. (if set). */
  taxRegistration?: string
  /** BCP 47 locale used for admin UI + most document text. */
  locale: string
  /** BCP 47 fallback locale when a translation is missing. */
  fallbackLocale: string
  /** Personal date-format preference. `'locale'` defers to the BCP 47 locale. */
  dateFormat: 'iso' | 'eu' | 'us' | 'locale'
  /** Functional / reporting currency (drives the GL's currency of record). */
  reportingCurrency: Currency
  /** Currency the user prefers to *see* — defaults to reportingCurrency. */
  displayCurrency: Currency
  /** Accounting framework — drives statement structure + adapter selection. */
  accountingStandard: RegionalDefaults['accountingStandard']
  /** Calendar month (1-12) the fiscal year begins. */
  fiscalYearStartMonth: number
  /** Merged feature flags (user > tenant). */
  features: Record<string, unknown>
  /** Per-field provenance for debugging / audit. */
  sources: ConfigSources
  /**
   * Merged country bundle — profile + specifics + official APIs + bound
   * helpers. Resolved from the cascade-derived `country` so consumers get
   * the per-country regulatory surface (tax-id formats, e-invoicing
   * mandate, business-registry endpoints, sanctions feeds) without
   * touching the registries directly.
   */
  countryContext: CountryContext
}

/** Provenance of each resolved field — useful for audit logs and debugging. */
export interface ConfigSources {
  country: ConfigSource
  locale: ConfigSource
  fallbackLocale: ConfigSource
  dateFormat: ConfigSource
  reportingCurrency: ConfigSource
  displayCurrency: ConfigSource
  accountingStandard: ConfigSource
  fiscalYearStartMonth: ConfigSource
}

export type ConfigSource = 'user' | 'tenant' | 'country' | 'default'

// ─── 3. Cascade primitives ─────────────────────────────────────────────────

/**
 * Pick the first defined value from the cascade and report which level
 * supplied it. Validated by the optional predicate; failed values are
 * skipped and the cascade continues.
 */
function pickWithSource<T>(
  candidates: ReadonlyArray<readonly [ConfigSource, T | null | undefined, ((v: T) => boolean)?]>,
  fallback: T,
  fallbackSource: ConfigSource = 'default',
): { value: T; source: ConfigSource } {
  for (const [source, value, predicate] of candidates) {
    if (value === undefined || value === null) continue
    if (predicate && !predicate(value)) continue
    return { value, source }
  }
  return { value: fallback, source: fallbackSource }
}

const validLocale = (s: string): boolean => /^[a-z]{2,3}(-[A-Z]{2,4})?$/.test(s)
const validCountry = (s: string): boolean => /^[A-Z]{2}$/.test(s)
const validCurrency = (s: string): boolean => isIso4217Currency(s)

// ─── 4. The canonical resolver ─────────────────────────────────────────────

interface TenantDocLike {
  /** Legacy top-level field, superseded by `config.identity.country`. */
  country?: string | null
  config?: TenantConfig | null
}

interface UserDocLike {
  config?: UserConfig | null
  tenants?: Array<{ tenant?: number | string | TenantDocLike }> | null
}

/**
 * Resolve the per-request config bundle by walking the cascade.
 *
 * Performs at most one `payload.findByID(tenants, {depth:0})` when the
 * tenant relationship isn't already populated. The result memoises
 * nothing across calls — callers that need a snapshot per request
 * should attach the bundle to the request object themselves.
 */
export async function resolveRequestConfig(
  req: Pick<PayloadRequest, 'user' | 'payload'>,
): Promise<ResolvedConfig> {
  const user = (req.user ?? null) as UserDocLike | null
  const userCfg: UserConfig | null = user?.config ?? null

  // ── Resolve tenant doc (and its config) ────────────────────────────────
  let tenantDoc: TenantDocLike | null = null
  const firstTenantRef = user?.tenants?.[0]?.tenant
  if (firstTenantRef !== undefined && firstTenantRef !== null) {
    if (typeof firstTenantRef === 'object') {
      tenantDoc = firstTenantRef
    } else {
      try {
        tenantDoc = (await req.payload.findByID({
          collection: 'tenants',
          id: firstTenantRef as string | number,
          depth: 0,
        })) as TenantDocLike | null
      } catch {
        tenantDoc = null
      }
    }
  }
  const tenantCfg: TenantConfig | null = tenantDoc?.config ?? null

  // ── Country: tenant.config.identity.country | tenant.country | default ─
  const tenantCountry =
    tenantCfg?.identity?.country ?? tenantDoc?.country ?? null

  // ── Country-derived baseline (currency / locale / accountingStandard) ──
  const countryDerived = getTenantDefaults(tenantCountry ?? undefined)
  const deploymentDefaults = getRegionalDefaults()

  // ── Per-field cascade resolution ───────────────────────────────────────
  const country = pickWithSource<string>(
    [
      ['tenant', tenantCfg?.identity?.country, validCountry],
      ['country', tenantCountry, validCountry],
    ],
    deploymentDefaults.country,
  )

  const locale = pickWithSource<string>(
    [
      ['user', userCfg?.localization?.defaultLocale, validLocale],
      ['tenant', tenantCfg?.localization?.defaultLocale, validLocale],
      ['country', countryDerived.locale, validLocale],
    ],
    deploymentDefaults.locale,
  )

  const fallbackLocale = pickWithSource<string>(
    [
      ['tenant', tenantCfg?.localization?.fallbackLocale, validLocale],
      ['country', countryDerived.locale, validLocale],
    ],
    deploymentDefaults.locale,
  )

  const dateFormat = pickWithSource<'iso' | 'eu' | 'us' | 'locale'>(
    [['user', userCfg?.localization?.dateFormat]],
    'locale',
  )

  const reportingCurrency = pickWithSource<Currency>(
    [
      ['tenant', tenantCfg?.currency?.reportingCurrency as Currency | null | undefined, validCurrency],
      ['country', countryDerived.currency, validCurrency],
    ],
    deploymentDefaults.currency,
  )

  const displayCurrency = pickWithSource<Currency>(
    [['user', userCfg?.localization?.displayCurrency as Currency | null | undefined, validCurrency]],
    reportingCurrency.value,
    reportingCurrency.source,
  )

  const accountingStandard = pickWithSource<RegionalDefaults['accountingStandard']>(
    [
      ['tenant', tenantCfg?.accounting?.standard],
      ['country', countryDerived.accountingStandard],
    ],
    deploymentDefaults.accountingStandard,
  )

  const fiscalYearStartMonth = pickWithSource<number>(
    [['tenant', tenantCfg?.accounting?.fiscalYearStartMonth, (n: number) => n >= 1 && n <= 12]],
    1,
  )

  // ── Merged features (tenant baseline, user override on top) ────────────
  const features: Record<string, unknown> = {
    ...(tenantCfg?.features ?? {}),
    ...(userCfg?.features ?? {}),
  }

  // Single canonical merge of country profile + specifics + official APIs.
  // Consumers should branch off this rather than re-reading registries.
  const countryContext = resolveCountryContext({ country: country.value })

  return {
    country: country.value,
    legalName: tenantCfg?.identity?.legalName ?? undefined,
    taxRegistration: tenantCfg?.identity?.taxRegistration ?? undefined,
    locale: locale.value,
    fallbackLocale: fallbackLocale.value,
    dateFormat: dateFormat.value,
    reportingCurrency: reportingCurrency.value,
    displayCurrency: displayCurrency.value,
    accountingStandard: accountingStandard.value,
    fiscalYearStartMonth: fiscalYearStartMonth.value,
    features,
    sources: {
      country: country.source,
      locale: locale.source,
      fallbackLocale: fallbackLocale.source,
      dateFormat: dateFormat.source,
      reportingCurrency: reportingCurrency.source,
      displayCurrency: displayCurrency.source,
      accountingStandard: accountingStandard.source,
      fiscalYearStartMonth: fiscalYearStartMonth.source,
    },
    countryContext,
  }
}

// ─── 5. Backward-compatible accessors (existing call sites) ────────────────

/**
 * Resolve the active tenant's regional defaults bundle from the request.
 * @deprecated Prefer {@link resolveRequestConfig} — this returns a thin
 * subset of the full {@link ResolvedConfig} bundle for backward compat.
 */
export async function getTenantDefaultsFromReq(
  req: Pick<PayloadRequest, 'user' | 'payload'>,
): Promise<RegionalDefaults> {
  const cfg = await resolveRequestConfig(req)
  return {
    currency: cfg.reportingCurrency,
    country: cfg.country,
    locale: cfg.locale,
    accountingStandard: cfg.accountingStandard,
  }
}

/**
 * Just the country for the active tenant. Falls back to the deployment
 * default when no tenant context exists.
 */
export async function getTenantCountryFromReq(
  req: Pick<PayloadRequest, 'user' | 'payload'>,
): Promise<string> {
  const cfg = await resolveRequestConfig(req)
  return cfg.country
}

/**
 * Just the merged {@link CountryContext} bundle (profile + specifics +
 * official APIs + bound helpers). Convenience for call sites that only
 * need the country surface, not the full {@link ResolvedConfig}.
 */
export async function getCountryContextFromReq(
  req: Pick<PayloadRequest, 'user' | 'payload'>,
): Promise<CountryContext> {
  const cfg = await resolveRequestConfig(req)
  return cfg.countryContext
}
