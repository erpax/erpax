/**
 * Commercial trading-API registry — the COMMERCIAL sibling of the official
 * per-country authority registry (`src/country/api/index.ts`). Lives at
 * `src/trading/api/` — the one-word diamond path for the commercial catalogue
 * (relocated from the hyphenated `config/trading-apis` violation).
 *
 * **What this is:** a structured catalogue of the third-party commercial
 * services a trading company plugs into — payment gateways, direct-debit &
 * payout rails, e-commerce platforms, online marketplaces, shipping carriers
 * & multi-carrier aggregators, Peppol access points, EDI/B2B networks,
 * product-data networks, open-banking aggregators, and FX / market-data feeds.
 * Where `country-apis` catalogues the *authorities* (tax, registry, VIES,
 * central-bank FX, raw per-bank PSD2), this catalogues the *counterparties &
 * intermediaries* a tenant actually transacts through.
 *
 * Each entry carries only PUBLIC metadata: provider, product name, geographic
 * region scope, base/sandbox endpoint, the auth *model* (not a key), wire
 * format, documentation URL, a one-line description, and whether a working
 * client ships for it. Consumed by:
 *   - the country merge service (`src/country/context/index.ts`) which unions
 *     `getTradingApis(region)` into every country-aware decision;
 *   - the MCP gateway tool `erpax.trading.list` (agents discover what a region
 *     supports);
 *   - the admin UI / docs (surface "this region has N payment gateways" hints).
 *
 * **What this is NOT:** credentials. API keys, OAuth client secrets, mTLS
 * certificates, per-merchant base-URL prefixes and equivalent secrets live in
 * the per-tenant config sandbox (`tenant.integrationSettings.tradingApis[provider]`,
 * resolved by `resolveTradingApiCredential` in `src/tenant/remote/secret/`) and
 * NEVER in this file. This is the same invariant the `country-apis` registry
 * states for the authority side.
 *
 * **Composition note (Stripe):** Stripe is already a working *payment-execution*
 * path via the official `@payloadcms/plugin-ecommerce` stripeAdapter
 * (`src/ecommerce/`), with per-tenant secrets. Its `payment_gateway` entry here
 * is CATALOGUE metadata only — the registry never re-implements charge/capture
 * /refund/webhook plumbing for it.
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2 region-scope
 * @standard ISO-4217:2015 currency-codes fx-feeds
 * @standard ISO-20022 financial-messages cross-references
 * @standard RFC-9110 http-semantics REST-client
 * @compliance PSD2 EU-2015/2366 open-banking-aggregators (Berlin Group NextGenPSD2)
 * @compliance EN-16931 + Peppol-BIS-3 e-invoicing access-points
 * @reference GS1 GTIN/GLN product-data networks
 * @see src/country/api/index.ts        (the official-authority twin)
 * @see src/country/context/index.ts            (the consumer merge seam)
 * @see src/tenant/remote/secret/index.ts       (resolveTradingApiCredential — the credentials sandbox)
 */

/** The commercial trading-API taxonomy — the generic data-type of each integration. */
export type TradingApiCategory =
  | 'payment_gateway' // card / wallet acquirer or PSP that authorizes & captures customer payments
  | 'direct_debit' // pull-based recurring bank-debit rails (SEPA DD / BACS / ACH) driven by mandates
  | 'payout_provider' // money-out / mass-payout & multi-currency disbursement (the inverse of acquiring)
  | 'ecommerce_platform' // seller-operated storefront exposing order/product/inventory/customer APIs
  | 'marketplace' // third-party sales channel a seller lists on (push listings, pull orders)
  | 'shipping_carrier' // a single courier/postal operator's own API (rate, label, pickup, track, COD)
  | 'shipping_aggregator' // multi-carrier abstraction — one contract over many carriers (rate-shop, label, track)
  | 'peppol_access_point' // commercial Peppol Service Provider (SMP registration + AS4 send/receive as a service)
  | 'edi_network' // EDI VAN / B2B trading network (X12 / EDIFACT / UBL) with a REST/JSON facade
  | 'product_data' // GTIN/GLN verification or catalogue-content sync (GS1 GDSN, Verified by GS1, Icecat)
  | 'doc_validation' // trade-document standards validator/converter (UBL/CII vs EN 16931 / BIS schematron)
  | 'banking_aggregator' // one API fronting many banks' PSD2 feeds via consent (accounts/balances/transactions)
  | 'fx_rates' // commercial / third-party foreign-exchange or market-data price feed

/**
 * Auth *model* — how a client authenticates, not the secret itself. A superset
 * of the commercial patterns; reconcilable with `CountryApiAuth` (the authority
 * side adds `pec`; this side adds `basic` & `hmac`, both common to gateways).
 */
export type TradingApiAuth =
  | 'none' // open public endpoint (free FX feeds, Open Food Facts reads)
  | 'api_key' // single key / static bearer token in a header or query
  | 'basic' // HTTP Basic — a credential pair (username:password, or key:secret as user:pass)
  | 'hmac' // signed request — HMAC or RSA signature over body/params (myPOS, BORICA, Paysera)
  | 'oauth2' // standard OAuth 2.0 (authorization-code or client-credentials)
  | 'oauth2_pkce' // OAuth 2.0 with PKCE (public clients)
  | 'mtls' // mutual TLS (EDI/Peppol data-pool transport, some banks)
  | 'jwt_signed' // signed JWT bearer (client-assertion)
  | 'soap_wsse' // SOAP with WS-Security headers (legacy carrier/EDI web services)

export interface TradingApi {
  readonly category: TradingApiCategory
  /** The brand / operator — "Stripe", "Econt", "Amazon SP-API". */
  readonly provider: string
  /** The product/API name. */
  readonly name: string
  /** Geographic scope: ISO-3166-1 alpha-2, or a macro 'EU' / 'GLOBAL'. */
  readonly region: string
  /** Production base URL (may carry a per-tenant `{prefix}` / `{shop}` template — resolved from tenant config). */
  readonly endpoint: string
  readonly sandboxEndpoint?: string
  readonly auth: TradingApiAuth
  readonly format: 'json' | 'xml' | 'soap' | 'csv' | 'edi' | 'mixed'
  readonly documentation: string
  /** Brief one-line summary of what the API does. */
  readonly description: string
  /**
   * Whether a working client module ships for this provider under
   * `src/trading/api/client/`. CATALOGUE-FIRST: this registry currently ships
   * NO trading-API clients, so every entry is `false` today — exactly as
   * `country-apis` catalogues many authorities it has no client for (HMRC,
   * ELSTER, SDI). The `notes` flag which providers have a clean documented
   * contract worth implementing FIRST (Econt/Speedy JSON, Frankfurter FX,
   * Storecove Peppol, the OAuth2 marketplaces). Stripe's PAYMENT path already
   * works via the official plugin-ecommerce (see header) — but that is a
   * separate subsystem, not a trading-apis client, so it too reads `false` here.
   * Flip an entry to `true` only when its client module actually lands.
   */
  readonly clientImplemented: boolean
  /** Uncertainty, BG-relevance, per-tenant base-URL caveats, composition notes. */
  readonly notes?: string
}

/**
 * EU/EEA member states — `getTradingApis` unions `region: 'EU'` providers in
 * for any member (mirrors how `country-apis` spreads VIES/Peppol into each EU
 * country). The 27 EU members; extend with EEA (NO/IS/LI) if an entry needs it.
 */
export const EU_MEMBER_STATES: ReadonlySet<string> = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
  'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
])

// ─── The registry — one flat array; region + category are fields, not keys ────
//
// Provider-keyed (not country-partitioned like the authority registry), so a
// flat array filtered by `getTradingApis` reads cleaner than a Record. 'GLOBAL'
// providers apply everywhere; 'EU' providers apply to every EU member state.

import { MONEY_TRADING_APIS } from './money'
import { GOODS_TRADING_APIS } from './goods'

/**
 * The registry — one flat array; region + category are fields, not keys. The
 * entries live in the money ⊕ goods child leaves ([[rules]]/concentration); this
 * concatenates them and the query functions below filter by region/category.
 */
export const TRADING_APIS: ReadonlyArray<TradingApi> = [...MONEY_TRADING_APIS, ...GOODS_TRADING_APIS]

// ─── Lookup helpers (mirroring getCountryApis / getCountryApisByKind) ─────────

/**
 * Returns the trading APIs in scope for a region. Always unions in `GLOBAL`
 * providers; for an EU member state (or 'EU' itself) also unions in `EU`-scoped
 * providers. With no region, returns the `GLOBAL` set (the universally-available
 * providers).
 */
export function getTradingApis(region?: string | null): ReadonlyArray<TradingApi> {
  if (!region) return TRADING_APIS.filter((a) => a.region === 'GLOBAL')
  const r = region.toUpperCase()
  const includeEu = r === 'EU' || EU_MEMBER_STATES.has(r)
  return TRADING_APIS.filter(
    (a) => a.region === r || a.region === 'GLOBAL' || (includeEu && a.region === 'EU'),
  )
}

/** Returns only the trading APIs of a given category in scope for a region. */
export function getTradingApisByCategory(
  region: string,
  category: TradingApiCategory,
): ReadonlyArray<TradingApi> {
  return getTradingApis(region).filter((a) => a.category === category)
}

/** Admin-UI hint: does the region have at least one payment gateway? */
export function hasPaymentGateway(region: string): boolean {
  return getTradingApisByCategory(region, 'payment_gateway').length > 0
}

/** Every trading API, unfiltered — for catalogue enumeration (MCP / docs). */
export function listAllTradingApis(): ReadonlyArray<TradingApi> {
  return TRADING_APIS
}
