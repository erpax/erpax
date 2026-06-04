/**
 * Currency fallback — blank currency as the identity element.
 *
 * Slice LLLLLLLLL-cut1 (2026-05-11). Per user 'blank currency_code
 * still makes all work by defining the blank currency and use it as
 * a fallback'.
 *
 * The pattern: every category in ERPax that admits a "missing" value
 * defines its missing case as a first-class typed entity. For
 * currency, ISO 4217 has already done this work — code `XXX`
 * (numeric 999) is officially designated "No currency / Transactions
 * where no currency is involved". We adopt it as the identity element
 * of the currency category. Anywhere a row, hook, formatter, or
 * journal-line touches a currency field, `resolveCurrency(code)`
 * normalises `null` / `undefined` / `''` / whitespace / unknown
 * strings to `XXX`. The platform never crashes on missing currency.
 *
 * Consequences:
 *
 *   - Imports without a currency column don't reject — they land in
 *     XXX and the user fills it in later (or never).
 *   - Foreign-key joins to a currencies catalog don't dangle — XXX
 *     is a valid row.
 *   - Money math degenerates cleanly — XXX has 0 decimals, integer
 *     amounts only, so rounding/multiplication paths return scalars.
 *   - Display formatters render the bare number (no symbol) when
 *     currency is XXX — locale-appropriate "n/a" / "—" labels for
 *     the currency-name slot come from the translations collection.
 *   - Cross-currency comparisons treat XXX as "compatible with
 *     anything" — useful for invariants that previously failed when
 *     a row's currency was provisional.
 *
 * Composes with:
 *   - Slice JJJJJJJJJ Law 53 (self-referential closure) — XXX is the
 *     internal-fallback identity for the currency role.
 *   - The `payment-provider` role treats XXX as a valid currency for
 *     in-platform settlement when the external processor's currency
 *     hint is missing.
 *   - Slice AAAAAAAAA translations collection — `currency:XXX:label`
 *     and `currency:XXX:symbol` are seeded so the UI surfaces the
 *     blank currency with locale-correct text.
 *
 * Why ISO 4217 XXX (not a custom sentinel):
 *
 *   - It's a standards-defined value. EN 16931 §BG-7 currency-code
 *     accepts XXX. ISO 20022 pacs.008 currency element accepts XXX.
 *     Federation peers + external processors will already understand it.
 *   - Bookkeeping rules tolerate it — IFRS doesn't mandate a currency
 *     on every row (provisional, in-flight, or non-monetary entries
 *     are legitimate).
 *   - No new namespace to maintain — one code, one label, one
 *     translation key, one row in the currencies catalog (when we
 *     create one).
 *
 * @standard ISO 4217 §6.5 "No currency" — code XXX, numeric 999
 * @standard EN 16931 §BG-7 currency-code element (XXX accepted)
 * @standard ISO 20022 pacs.008.001.10 §Ccy attribute (XXX accepted)
 * @standard IFRS 1 §IG7 non-monetary items presentation
 * @audit Conservation Law 53 self-referential-closure (currency identity element)
 * @feature currency_fallback
 * @see /src/config/regional-defaults.ts SUPPORTED_CURRENCIES (XXX appended)
 * @see /src/config/country-specifics.ts CURRENCY_DECIMALS (XXX: 0)
 * @see /src/plugins/accounting/fields/base-accounting-fields.ts currencyField
 */

import { SUPPORTED_CURRENCIES } from '@/config/regional-defaults'
import type { Currency } from '@/config/regional-defaults'
import { CURRENCY_DECIMALS } from '@/config/country-specifics'
import { requireSafetyMode } from '@/safety/mode'

/** The canonical "blank currency" — ISO 4217 §6.5 No currency. */
export const BLANK_CURRENCY = 'XXX' as const

/** Type-narrow helper for the blank currency case. */
export type BlankCurrency = typeof BLANK_CURRENCY

/**
 * Resolve any input value to a non-null currency code. Returns the
 * input verbatim when it's a non-empty trimmed string; otherwise
 * returns the blank currency (`XXX`).
 *
 * Accepted "blank" inputs:
 *   - undefined
 *   - null
 *   - empty string ''
 *   - whitespace-only string '   '
 *   - the explicit string 'XXX' (idempotent)
 *
 * Note that the function does NOT validate against `SUPPORTED_CURRENCIES`
 * — unknown ISO 4217 codes (NOK, ZAR, AED…) flow through unchanged per
 * the `Currency = (typeof SUPPORTED_CURRENCIES)[number] | (string & {})`
 * design (Slice JJJJ taxonomy consolidation). Validation, when wanted,
 * is a separate step.
 */
export function resolveCurrency(code?: string | null): Currency {
  if (code === undefined || code === null) return BLANK_CURRENCY
  const trimmed = code.trim()
  if (trimmed.length === 0) return BLANK_CURRENCY
  return trimmed as Currency
}

/** True iff the resolved code is the blank currency (`XXX`). */
export function isBlankCurrency(code?: string | null): boolean {
  return resolveCurrency(code) === BLANK_CURRENCY
}

/**
 * Decimal places for a currency, with the blank currency returning 0.
 * Re-exports the `CURRENCY_DECIMALS` lookup with a guaranteed-defined
 * answer for every input (default 2 for unknown ISO codes; 0 for XXX
 * via the registered entry).
 */
export function currencyDecimals(code?: string | null): number {
  const c = resolveCurrency(code)
  return CURRENCY_DECIMALS[c] ?? 2
}

/**
 * Decide whether two currencies are compatible for arithmetic. The
 * blank currency is treated as compatible with every code — useful
 * for invariants and validators that previously rejected pairs with
 * a provisional side.
 *
 *   compatible('EUR', 'EUR')  → true
 *   compatible('EUR', 'XXX')  → true   (blank is universal)
 *   compatible('XXX', 'JPY')  → true
 *   compatible('EUR', 'JPY')  → false  (real cross-currency)
 *   compatible('EUR', null)   → true   (null normalises to XXX)
 */
export function currenciesCompatible(a?: string | null, b?: string | null): boolean {
  const ra = resolveCurrency(a)
  const rb = resolveCurrency(b)
  if (ra === BLANK_CURRENCY || rb === BLANK_CURRENCY) return true
  return ra === rb
}

/**
 * Return the canonical display label for a currency. Static fallback
 * is the code itself ('EUR' → 'EUR', 'XXX' → '—'); the
 * `translations` collection (Slice AAAAAAAAA) supplies the localised
 * variant at request time via `scope='currency'`, `key='${code}'`.
 *
 * This helper exists so currency rendering across server + admin UI
 * + PDFs goes through one place. UI surfaces should NEVER inline
 * `currency.code` directly in a label slot.
 */
export function currencyDisplayLabel(code?: string | null): string {
  const c = resolveCurrency(code)
  if (c === BLANK_CURRENCY) return '—'
  return c
}

/**
 * Format a money amount with the resolved currency's decimal places.
 * Uses the host runtime's `Intl.NumberFormat` for locale awareness;
 * blank currency formats as a plain integer with no symbol.
 *
 *   formatMoney(1234.5,  'EUR',         'en-GB')  → '€1,234.50'
 *   formatMoney(1234.5,  null,          'en-GB')  → '1,235'
 *   formatMoney(1234,    'JPY',         'ja-JP')  → '¥1,234'
 *   formatMoney(1234.5,  'XXX',         'bg-BG')  → '1 235'
 */
export function formatMoney(
  amount: number,
  code?: string | null,
  locale: string = 'en-US',
): string {
  const c = resolveCurrency(code)
  const decimals = currencyDecimals(c)
  if (c === BLANK_CURRENCY) {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)
  }
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: c,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)
  } catch {
    // Unknown ISO code at the Intl layer — fall back to the decimal
    // formatter with the code as a prefix. Never throw.
    return `${c} ${new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)}`
  }
}

/**
 * The full set of currencies we ship, including XXX. Re-exported for
 * convenience so admin UIs that need to render "every currency
 * including the blank one" can pull a single import.
 */
export const SUPPORTED_CURRENCIES_INCLUDING_BLANK: ReadonlyArray<string> = SUPPORTED_CURRENCIES

// ─── Slice LLLLLLLLL-cut2 (2026-05-11) ─────────────────────────────
// Per user 'blank currency exchange rates are computed realtime'. The
// blank currency is not just "no currency" — it's a placeholder whose
// rate is resolved at the moment of conversion, not from a static
// table. When a conversion involves XXX on either side, the rate
// degenerates to the identity (1.0) by default, but the rate provider
// can supply a contextual rate (e.g. inferred from the tenant's
// default currency, recent sibling rows in the same chain, an
// AI-suggested rate). The function NEVER throws — missing providers
// degrade to 1.0 silently because the blank currency is universal.

/**
 * Resolver for a real-time FX rate. The platform default is the
 * `IdentityRateProvider` (every conversion is 1:1). Tenants that need
 * real rates wire a provider that hits the `exchange-rates` collection
 * (newest within a freshness window), or Cloudflare AI / Workers AI
 * for a synthesised rate when no observed quote is available.
 *
 * The provider receives `from` + `to` already resolved (XXX-normalised
 * via `resolveCurrency`) and an `asOf` timestamp. It returns a
 * `RateQuote` carrying the rate + provenance + a content-uuid the
 * caller can use for audit / replay (Slice KKKKKKKKK query
 * fingerprint composes here).
 */
export interface RateQuote {
  readonly fromCurrency: string
  readonly toCurrency: string
  readonly rate: number
  /** ISO 8601 timestamp the rate was sourced. */
  readonly asOf: string
  /** Source of the rate — `'identity' | 'observed' | 'inferred' | 'external'`. */
  readonly source: 'identity' | 'observed' | 'inferred' | 'external'
  /** Optional provenance content-uuid (e.g. the exchange-rates row uuid). */
  readonly provenanceUuid?: string
}

export interface RealtimeRateContext {
  readonly tenantId: string
  /** ISO 8601 — optional pin to a historic moment; defaults to now. */
  readonly asOf?: string
}

export interface RealtimeRateProvider {
  quote(from: string, to: string, ctx: RealtimeRateContext): Promise<RateQuote>
}

/**
 * Default provider — returns the identity rate (1.0) for every pair.
 * This is what ships in core; production wires a real provider (the
 * exchange-rates collection + AI inference fallback per Slice JJJJJJJJJ
 * self-closure for the `ai-inference` role).
 *
 * Per the user's framing, the identity provider is correct behaviour
 * for the blank currency: XXX is universal, so XXX→anything = 1.0.
 * For two distinct real currencies the identity is wrong, but the
 * platform never crashes — it surfaces a `source: 'identity'` quote
 * the caller can decide to reject.
 */
export const IdentityRateProvider: RealtimeRateProvider = {
  async quote(from, to, ctx) {
    const f = resolveCurrency(from)
    const t = resolveCurrency(to)
    return {
      fromCurrency: f,
      toCurrency: t,
      rate: 1,
      asOf: ctx.asOf ?? new Date().toISOString(),
      source: 'identity',
    }
  },
}

let _defaultRateProvider: RealtimeRateProvider = IdentityRateProvider

export function getDefaultRateProvider(): RealtimeRateProvider {
  return _defaultRateProvider
}

export function setDefaultRateProvider(p: RealtimeRateProvider): void {
  // Slice RRRRRRRRR-cut1 — guarded escape hatch. Production wires the
  // exchange-rates collection provider at boot; runtime swaps are
  // test-only (Conservation Law 58). The guard runs at CALL time
  // (reads ERPAX_SAFETY_MODE / NODE_ENV via getSafetyMode), so a
  // static top-level import is equivalent to the previous lazy
  // `require()` — and the alias resolves under vitest's tsconfigPaths
  // plugin only for `import`, not for CJS `require()`.
  requireSafetyMode(['test', 'dev'], 'setDefaultRateProvider')
  _defaultRateProvider = p
}

/**
 * Get a real-time exchange rate. Routes through the configured
 * provider when both sides are real currencies; short-circuits to
 * identity (`rate: 1`, `source: 'identity'`) when EITHER side is XXX
 * — that's the directive of this slice.
 *
 *   realtimeRate('EUR', 'EUR', ctx) → 1.0  identity (same)
 *   realtimeRate('EUR', 'XXX', ctx) → 1.0  identity (blank universal)
 *   realtimeRate('XXX', 'JPY', ctx) → 1.0  identity (blank universal)
 *   realtimeRate('EUR', 'JPY', ctx) → provider's quote
 */
export async function realtimeRate(
  fromCode: string | null | undefined,
  toCode: string | null | undefined,
  ctx: RealtimeRateContext,
): Promise<RateQuote> {
  const from = resolveCurrency(fromCode)
  const to = resolveCurrency(toCode)
  const asOf = ctx.asOf ?? new Date().toISOString()
  // Slice LLLLLLLLL-cut4 — every quote carries a provenanceUuid
  // derived via the currency-uuid bridge so replay + federation +
  // cache layers compose for free. Same (from, to, asOf, tenant) →
  // same uuid → cache hit / consensus check / audit dedup.
  const { computeRateQuoteUuid } = await import('@/currency/fallback/currency-uuid')
  const provenanceUuid = computeRateQuoteUuid({
    fromCurrency: from, toCurrency: to, asOf, tenantId: ctx.tenantId,
  })

  if (from === to) {
    return {
      fromCurrency: from, toCurrency: to,
      rate: 1, asOf, source: 'identity', provenanceUuid,
    }
  }
  if (from === BLANK_CURRENCY || to === BLANK_CURRENCY) {
    return {
      fromCurrency: from, toCurrency: to,
      rate: 1, asOf, source: 'identity', provenanceUuid,
    }
  }
  try {
    const quote = await _defaultRateProvider.quote(from, to, { ...ctx, asOf })
    // Provider may or may not have set its own provenanceUuid; if
    // not, attach the bridge-computed one so the caller always has
    // a stable identity for the quote.
    return quote.provenanceUuid ? quote : { ...quote, provenanceUuid }
  } catch {
    // Provider down — degrade to identity rather than throw. The
    // self-closure (Law 53) pattern at the value level: if the
    // external rate source is unreachable, ERPax answers itself
    // with the identity element.
    return {
      fromCurrency: from, toCurrency: to,
      rate: 1, asOf, source: 'identity', provenanceUuid,
    }
  }
}

/**
 * Slice LLLLLLLLL-cut4 (2026-05-11) — currency primitives are uuid
 * primitives. Re-export the bridge so consumers get one import path.
 */
export {
  type Currency, type CurrencyUuid, type RateQuoteUuid, type ExchangeUuid,
  computeCurrencyUuid, computeRateQuoteUuid, computeExchangeUuid,
} from '@/currency/fallback/currency-uuid'

/**
 * Convert an amount from one currency to another using the real-time
 * rate. Decimal places of the *target* currency drive the rounding.
 *
 *   await convertMoney(100, 'EUR', 'JPY', ctx)
 *     // → { amount: 17000, currency: 'JPY', quote: { rate: 170, source: 'observed', … } }
 *
 *   await convertMoney(100, null, 'EUR', ctx)
 *     // → { amount: 100, currency: 'EUR', quote: { rate: 1, source: 'identity', … } }
 *     //   (blank currency, identity rate, target decimals applied)
 */
export async function convertMoney(
  amount: number,
  fromCode: string | null | undefined,
  toCode: string | null | undefined,
  ctx: RealtimeRateContext,
): Promise<{ amount: number; currency: string; quote: RateQuote }> {
  const quote = await realtimeRate(fromCode, toCode, ctx)
  const decimals = currencyDecimals(quote.toCurrency)
  const raw = amount * quote.rate
  // Half-even rounding to N decimals.
  const factor = 10 ** decimals
  const rounded = Math.round(raw * factor) / factor
  return { amount: rounded, currency: quote.toCurrency, quote }
}

// ─── Slice LLLLLLLLL-cut4 (2026-05-11) ─────────────────────────────
// Multi-currency portfolio aggregation. Tenant-level "total balance"
// is the sum of every wallet's balance translated to a presentation
// currency. XXX wallets contribute at the identity rate so they
// always count (the blank currency is universal). Real cross-currency
// pairs route through the configured rate provider per Cut 2.
//
// This is the portfolio-aggregation view; per-transaction conversion
// is `convertMoney` above.

export interface WalletPosition {
  readonly id: string
  readonly currency: string
  /** Major-unit balance (e.g. 1234.56). For minor-unit input divide first. */
  readonly balance: number
}

export interface AggregationResult {
  readonly presentationCurrency: string
  readonly totalBalance: number
  readonly perWallet: ReadonlyArray<{
    readonly walletId: string
    readonly originalCurrency: string
    readonly originalBalance: number
    readonly convertedBalance: number
    readonly quote: RateQuote
  }>
  /**
   * True if any conversion fell back to `source: 'identity'` because a
   * real quote was unobtainable — XXX (blank) on either side or the
   * provider failed. Same-currency identity (EUR→EUR) is a trivial
   * no-op and does NOT set this flag.
   */
  readonly hasIdentityFallback: boolean
  /** ISO 8601 — moment of aggregation. */
  readonly asOf: string
}

/**
 * Sum a collection of wallet balances into one presentation currency.
 *
 * Behaviour:
 *   - Each wallet's balance is converted to `presentationCurrency`
 *     via `realtimeRate` (XXX-source / XXX-target uses identity).
 *   - The presentation currency itself can be XXX (a non-profit
 *     reporting in unitless terms produces a meaningful total).
 *   - When the rate provider degrades to identity (provider down or
 *     XXX involved), the aggregation still completes; the
 *     `hasIdentityFallback` flag signals that the total includes
 *     identity-rated lines so the UI can mark the figure as such.
 *
 *   ```ts
 *   const result = await aggregateBalancesAcrossCurrencies(
 *     [
 *       { id: 'w1', currency: 'EUR', balance: 1000 },
 *       { id: 'w2', currency: 'XXX', balance:  500 },   // ← blank
 *       { id: 'w3', currency: 'JPY', balance: 50000 },
 *     ],
 *     'EUR',
 *     { tenantId },
 *   )
 *   // result.totalBalance: 1000 + 500 + (50000 × rate(JPY,EUR))
 *   // result.hasIdentityFallback: true (the XXX leg)
 *   ```
 *
 * @standard IFRS 7 §22 fair-value hierarchy (each quote's source maps to a level)
 * @standard IAS 21 §38 presentation-currency translation
 */
export async function aggregateBalancesAcrossCurrencies(
  wallets: ReadonlyArray<WalletPosition>,
  presentationCurrency: string,
  ctx: RealtimeRateContext,
): Promise<AggregationResult> {
  const asOf = ctx.asOf ?? new Date().toISOString()
  const presentation = resolveCurrency(presentationCurrency)
  let total = 0
  let hasIdentityFallback = false
  const perWallet: Array<{
    walletId: string
    originalCurrency: string
    originalBalance: number
    convertedBalance: number
    quote: RateQuote
  }> = []
  for (const w of wallets) {
    const converted = await convertMoney(w.balance, w.currency, presentation, { ...ctx, asOf })
    // "Fallback" means the rate degraded to identity because a real
    // quote was unobtainable — XXX (blank) on either side, or the
    // provider failed. Same-currency conversions (EUR→EUR) are also
    // `source: 'identity'` per realtimeRate, but they're trivial
    // no-ops, not fallbacks; exclude them so the flag tracks data-
    // quality signal, not currency-identity coincidence.
    if (
      converted.quote.source === 'identity' &&
      resolveCurrency(w.currency) !== presentation
    ) {
      hasIdentityFallback = true
    }
    total += converted.amount
    perWallet.push({
      walletId: w.id,
      originalCurrency: resolveCurrency(w.currency),
      originalBalance: w.balance,
      convertedBalance: converted.amount,
      quote: converted.quote,
    })
  }
  // Re-round the sum to the presentation currency's decimal places.
  const decimals = currencyDecimals(presentation)
  const factor = 10 ** decimals
  return {
    presentationCurrency: presentation,
    totalBalance: Math.round(total * factor) / factor,
    perWallet,
    hasIdentityFallback,
    asOf,
  }
}
