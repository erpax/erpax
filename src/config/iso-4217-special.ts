/**
 * ISO 4217 special currency codes — XXX is one of a family.
 *
 * Slice LLLLLLLLL-cut4 (2026-05-11). Per user 'blank currency needs
 * deeper research and implementation'. XXX (No currency) is the most
 * prominent member of an ISO 4217 sub-family of "X-codes" — alphabetic
 * codes starting with X reserved for non-national / non-currency /
 * commodity / supranational units. They share the property our blank
 * currency exhibits: they fill the currency slot in a transaction but
 * are not real banknote-issued national currencies. The platform
 * recognises them as a category so handlers can route them correctly.
 *
 * Per ISO 4217:2015 §6.5 the X-codes are reserved for special use:
 *
 *   XXX  999  No currency                         — our blank/identity
 *   XTS  963  Test code (for testing transactions) — non-production rows
 *   XAU  959  Gold (one troy ounce)                — commodity wallets
 *   XAG  961  Silver (one troy ounce)              — commodity wallets
 *   XPT  962  Platinum (one troy ounce)            — commodity wallets
 *   XPD  964  Palladium (one troy ounce)           — commodity wallets
 *   XDR  960  IMF Special Drawing Rights           — supranational reserve
 *   XBA  955  European Composite Unit (EURCO)      — bond market
 *   XBB  956  European Monetary Unit (E.M.U.-6)    — bond market
 *   XBC  957  European Unit of Account 9 (E.U.A.-9) — bond market
 *   XBD  958  European Unit of Account 17 (E.U.A.-17) — bond market
 *   XSU  994  SUCRE (ALBA regional unit)           — regional supranational
 *   XUA  965  ADB Unit of Account                  — supranational
 *
 * De facto crypto codes (not yet ISO 4217 but widely accepted):
 *
 *   BTC  N/A  Bitcoin                              — crypto wallets
 *   ETH  N/A  Ethereum                             — crypto wallets
 *   USDT N/A  Tether (USD stablecoin)              — crypto wallets
 *   USDC N/A  USD Coin (USD stablecoin)            — crypto wallets
 *
 * The kind enum groups them by behaviour so callers can route by
 * category — a precious-metal trade follows different rules than a
 * test transaction, but both are "special" in being non-national.
 *
 * Why this matters in practice:
 *
 *   - **Audit + filing**: regulators (Basel COREP, EU FINREP) accept
 *     X-codes; tax authorities treat them differently from real
 *     currencies. The kind tag lets reporting agents branch.
 *   - **Rate provider routing**: precious metals need a different rate
 *     source than fiat (LBMA / COMEX vs ECB / Fed). The kind lets
 *     the rate provider dispatch.
 *   - **Wallet UX**: a precious-metal wallet UI surfaces troy-ounce
 *     decimal handling; a test wallet shows a yellow "DO NOT USE IN
 *     PRODUCTION" banner; XXX shows the em-dash placeholder.
 *   - **Federation**: a peer holding a row in XAU + sharing it across
 *     tenants requires same-kind verification — you can't reconcile
 *     a precious-metal row against an XXX row even if amounts match.
 *
 * @standard ISO 4217:2015 §6.5 X-codes
 * @standard ISO 4217 Annex A.1 list of currency codes
 * @standard ISO 20022 pacs.008.001 §Ccy (accepts every X-code)
 * @standard LBMA Gold Bullion Price spec (XAU rate source)
 * @standard SDR Valuation Basket (XDR rate composition — currently
 *           USD 41.73%, EUR 30.93%, CNY 12.28%, JPY 7.59%, GBP 7.47%)
 * @standard IFRS 9 §3.2 reclassification (X-coded balances reclassify
 *           into real currencies on resolution events)
 * @audit Conservation Law 53 self-referential-closure (X-codes are
 *        the structural identity elements for non-monetary slots)
 * @feature currency_special_codes
 * @see ./regional-defaults.ts SUPPORTED_CURRENCIES (XXX appended Cut 1)
 * @see ./iso-4217-numeric.ts numeric-code mapping (Cut 4)
 * @see ../services/currency-fallback/index.ts (resolveCurrency, realtimeRate)
 */

/**
 * Behavioural category for non-national currency codes. Determines
 * how rate providers, audit handlers, and wallet UI route the code.
 */
export type SpecialCurrencyKind =
  | 'blank'           // XXX — identity element; no-currency transactions
  | 'test'            // XTS — for testing only, not production
  | 'precious-metal'  // XAU XAG XPT XPD — troy-ounce commodity
  | 'supranational'   // XDR XSU XUA — multilateral reserve / accounting units
  | 'bond-unit'       // XBA XBB XBC XBD — European composite/bond units
  | 'crypto'          // BTC ETH USDT USDC — de facto, not yet ISO 4217
  | 'national'        // any non-X code (default; not in this map)

export interface SpecialCurrencyDef {
  readonly code: string
  readonly kind: SpecialCurrencyKind
  readonly numericCode?: number    // ISO 4217 numeric (where defined)
  readonly displayName: string     // English label; localise via translations collection
  readonly decimals: number        // commodities use 4-6 for troy ounce; crypto ~8-18
  readonly rateProviderHint?: string  // narrative hint for the rate-provider router
}

/**
 * Closed registry of special codes ERPax knows about. Adding a new
 * code is a structural change — bump the relevant invariant and add
 * test coverage. Not exhaustive but covers the codes accountants /
 * auditors / federation peers encounter in practice.
 */
export const SPECIAL_CURRENCY_REGISTRY: ReadonlyMap<string, SpecialCurrencyDef> = new Map([
  // ── Identity ─────────────────────────────────────────────────────
  ['XXX', { code: 'XXX', kind: 'blank', numericCode: 999, displayName: 'No currency', decimals: 0 }],
  // ── Test ─────────────────────────────────────────────────────────
  ['XTS', { code: 'XTS', kind: 'test',  numericCode: 963, displayName: 'Test currency', decimals: 2 }],
  // ── Precious metals (troy ounce) ─────────────────────────────────
  // LBMA fixings are quoted in USD per troy ounce with 2 decimals;
  // internal handling uses 4 to accommodate fractional ounce holdings.
  ['XAU', { code: 'XAU', kind: 'precious-metal', numericCode: 959, displayName: 'Gold (troy oz)',      decimals: 4, rateProviderHint: 'lbma:gold-am-fix' }],
  ['XAG', { code: 'XAG', kind: 'precious-metal', numericCode: 961, displayName: 'Silver (troy oz)',    decimals: 4, rateProviderHint: 'lbma:silver-fix' }],
  ['XPT', { code: 'XPT', kind: 'precious-metal', numericCode: 962, displayName: 'Platinum (troy oz)',  decimals: 4, rateProviderHint: 'lbma:platinum-fix' }],
  ['XPD', { code: 'XPD', kind: 'precious-metal', numericCode: 964, displayName: 'Palladium (troy oz)', decimals: 4, rateProviderHint: 'lbma:palladium-fix' }],
  // ── Supranational ────────────────────────────────────────────────
  ['XDR', { code: 'XDR', kind: 'supranational', numericCode: 960, displayName: 'IMF Special Drawing Rights', decimals: 6, rateProviderHint: 'imf:sdr-basket' }],
  ['XSU', { code: 'XSU', kind: 'supranational', numericCode: 994, displayName: 'SUCRE (ALBA)',               decimals: 2 }],
  ['XUA', { code: 'XUA', kind: 'supranational', numericCode: 965, displayName: 'ADB Unit of Account',        decimals: 6 }],
  // ── Bond market (European composite units) ───────────────────────
  ['XBA', { code: 'XBA', kind: 'bond-unit', numericCode: 955, displayName: 'European Composite Unit (EURCO)',           decimals: 6 }],
  ['XBB', { code: 'XBB', kind: 'bond-unit', numericCode: 956, displayName: 'European Monetary Unit (E.M.U.-6)',          decimals: 6 }],
  ['XBC', { code: 'XBC', kind: 'bond-unit', numericCode: 957, displayName: 'European Unit of Account 9 (E.U.A.-9)',      decimals: 6 }],
  ['XBD', { code: 'XBD', kind: 'bond-unit', numericCode: 958, displayName: 'European Unit of Account 17 (E.U.A.-17)',    decimals: 6 }],
  // ── Crypto (de facto, not yet ISO 4217) ──────────────────────────
  // Decimals match the on-chain native unit precision — important for
  // tamper-evident wallet balances (Slice TTTTTTTT audit chain).
  ['BTC',  { code: 'BTC',  kind: 'crypto', displayName: 'Bitcoin',           decimals: 8,  rateProviderHint: 'coingecko:btc' }],
  ['ETH',  { code: 'ETH',  kind: 'crypto', displayName: 'Ethereum',          decimals: 18, rateProviderHint: 'coingecko:eth' }],
  ['USDT', { code: 'USDT', kind: 'crypto', displayName: 'Tether (USD)',      decimals: 6,  rateProviderHint: 'coingecko:usdt' }],
  ['USDC', { code: 'USDC', kind: 'crypto', displayName: 'USD Coin',          decimals: 6,  rateProviderHint: 'coingecko:usdc' }],
])

/**
 * Returns the kind of a currency code. National currencies (EUR, USD,
 * JPY, BGN, NOK, …) return `'national'` — they're the default.
 */
export function getSpecialCurrencyKind(code: string): SpecialCurrencyKind {
  const def = SPECIAL_CURRENCY_REGISTRY.get(code)
  return def?.kind ?? 'national'
}

/** True iff the code is one of the special X-codes / crypto codes. */
export function isSpecialCurrency(code: string): boolean {
  return SPECIAL_CURRENCY_REGISTRY.has(code)
}

/**
 * Return the full `SpecialCurrencyDef` if registered; null otherwise.
 * Callers branching on `kind` should pull the whole def for the
 * `rateProviderHint`, `decimals`, `displayName` fields too.
 */
export function getSpecialCurrencyDef(code: string): SpecialCurrencyDef | null {
  return SPECIAL_CURRENCY_REGISTRY.get(code) ?? null
}
