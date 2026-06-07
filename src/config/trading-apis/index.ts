/**
 * Commercial trading-API registry — the COMMERCIAL sibling of the official
 * per-country authority registry (`src/config/country-apis/index.ts`).
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
 * @see src/config/country-apis/index.ts        (the official-authority twin)
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

export const TRADING_APIS: ReadonlyArray<TradingApi> = [
  // ─── Payment gateways / PSPs / direct-debit / payout ──────────────────────
  {
    category: 'payment_gateway', provider: 'myPOS', name: 'myPOS Online Payments (IPC)',
    region: 'BG', endpoint: 'https://www.mypos.com', sandboxEndpoint: 'https://demo.developers.mypos.eu',
    auth: 'hmac', format: 'mixed',
    documentation: 'https://developers.mypos.com/en/doc/online_payments/v1_4/20-api-reference',
    description: 'BG-origin acquirer/POS; online IPCPurchase/PreAuth via RSA-SHA256-signed POST.',
    clientImplemented: false,
    notes: 'BG-critical. Per-store RSA key pair (SID + KeyIndex). Production IPC gateway host ships in the merchant config pack — unverified until live onboarding.',
  },
  {
    category: 'payment_gateway', provider: 'BORICA', name: 'BORICA e-Commerce Gateway (APGW / 3-D Secure)',
    region: 'BG', endpoint: 'https://3dsgate.borica.bg', sandboxEndpoint: 'https://3dsgate-dev.borica.bg',
    auth: 'hmac', format: 'mixed',
    documentation: 'https://www.borica.bg/en/products-and-services/helpdesk-za-razrabotchitsi',
    description: 'BG bank-owned card acquiring gateway (Visa/Mastercard/Amex/JCB) with 3-D Secure.',
    clientImplemented: false,
    notes: 'BG-critical: owned by 19 BG banks, default card rail for most BG merchant accounts. MAC/RSA-signed form POST. Production host inferred from the dev pair — verify on onboarding.',
  },
  {
    category: 'payment_gateway', provider: 'ePay.bg', name: 'ePay.bg WEB API',
    region: 'BG', endpoint: 'https://www.epay.bg', sandboxEndpoint: 'https://demo.epay.bg/xdev/api',
    auth: 'hmac', format: 'json',
    documentation: 'https://kb.epay.bg/en/',
    description: 'Dominant BG online wallet/card gateway; JSON REST with APPID/DEVICEID/TOKEN + checksum.',
    clientImplemented: false,
    notes: 'BG-critical incumbent e-wallet; pairs with easyPay for cash. HMAC-style CHECKSUM per request. Confirm prod base path before shipping.',
  },
  {
    category: 'payment_gateway', provider: 'easyPay', name: 'easyPay (ePay.bg cash network)',
    region: 'BG', endpoint: 'https://www.easypay.bg',
    auth: 'hmac', format: 'json',
    documentation: 'https://kb.epay.bg/en/web/easypay/',
    description: 'BG cash-in/voucher network; cash collection for online orders via the ePay.bg API.',
    clientImplemented: false,
    notes: 'BG-critical for cash-paying customers ("плати в брой на easyPay"). Rides the ePay.bg WEB API (composes with that entry).',
  },
  {
    category: 'payment_gateway', provider: 'iCard', name: 'iCard / iPay Payment Gateway (IPG)',
    region: 'BG', endpoint: 'https://www.icards.eu',
    auth: 'hmac', format: 'mixed',
    documentation: 'https://github.com/iCardDirect/IPG-Documentation',
    description: 'BG-licensed EMI; card acquiring + iPay wallet via the iCardDirect iPayment Gateway.',
    clientImplemented: false,
    notes: 'BG-critical: iCard AD is a BG e-money institution (parent of myPOS). Signed form-POST. Production IPG host provisional. Its PSD2 API (docs.openbank.icard.com) is a separate banking entry.',
  },
  {
    category: 'payment_gateway', provider: 'Paysera', name: 'Paysera Checkout API',
    region: 'EU', endpoint: 'https://checkout-eu-a.paysera.com/checkout/rest/v1',
    auth: 'hmac', format: 'json',
    documentation: 'https://developers.paysera.com/en/checkout/basic',
    description: 'EU EMI checkout aggregating cards + local bank methods; common low-cost rail for BG SMEs.',
    clientImplemented: false,
    notes: 'project_id + sign_password (HMAC ss1 + RSA ss2). Operates in BG.',
  },
  {
    category: 'payment_gateway', provider: 'Stripe', name: 'Stripe Payments & Connect API',
    region: 'GLOBAL', endpoint: 'https://api.stripe.com',
    auth: 'api_key', format: 'json',
    documentation: 'https://docs.stripe.com/api',
    description: 'Global card/wallet acquirer + Connect; tokenized card capture (minimal PCI scope).',
    clientImplemented: false,
    notes: 'ALREADY WIRED via @payloadcms/plugin-ecommerce stripeAdapter (src/ecommerce/) with per-tenant secrets — this row is catalogue metadata only; do NOT build a parallel client. Single base; mode follows key prefix.',
  },
  {
    category: 'payment_gateway', provider: 'Adyen', name: 'Adyen Checkout API',
    region: 'GLOBAL', endpoint: 'https://{PREFIX}-checkout-live.adyenpayments.com/checkout', sandboxEndpoint: 'https://checkout-test.adyen.com',
    auth: 'api_key', format: 'json',
    documentation: 'https://docs.adyen.com/api-explorer/Checkout/latest/overview',
    description: 'Global enterprise acquirer/PSP; unified Checkout API (X-API-Key).',
    clientImplemented: false,
    notes: 'Live host carries a per-merchant {PREFIX} — resolve from tenant config, never hardcode. Test host is fixed.',
  },
  {
    category: 'payment_gateway', provider: 'PayPal', name: 'PayPal REST (Orders/Payments) API',
    region: 'GLOBAL', endpoint: 'https://api-m.paypal.com', sandboxEndpoint: 'https://api-m.sandbox.paypal.com',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer.paypal.com/api/rest/',
    description: 'Global wallet + card processing; OAuth2 client-credentials bearer tokens.',
    clientImplemented: false,
  },
  {
    category: 'payment_gateway', provider: 'Braintree', name: 'Braintree GraphQL API',
    region: 'GLOBAL', endpoint: 'https://payments.braintree-api.com/graphql', sandboxEndpoint: 'https://payments.sandbox.braintree-api.com/graphql',
    auth: 'basic', format: 'json',
    documentation: 'https://developer.paypal.com/braintree/graphql/guides/making_api_calls/',
    description: 'PayPal-owned card acquirer/gateway; GraphQL over Base64 public:private key.',
    clientImplemented: false,
    notes: 'Authorization: Basic base64(public_key:private_key); requires a Braintree-Version header.',
  },
  {
    category: 'payment_gateway', provider: 'Mollie', name: 'Mollie Payments API',
    region: 'EU', endpoint: 'https://api.mollie.com',
    auth: 'api_key', format: 'json',
    documentation: 'https://docs.mollie.com/reference/overview',
    description: 'EU PSP aggregating cards + European local methods (iDEAL, Bancontact, SEPA).',
    clientImplemented: false,
    notes: 'Single base; test/live selected by key prefix.',
  },
  {
    category: 'payment_gateway', provider: 'Checkout.com', name: 'Checkout.com Payments API',
    region: 'GLOBAL', endpoint: 'https://api.checkout.com', sandboxEndpoint: 'https://api.sandbox.checkout.com',
    auth: 'oauth2', format: 'json',
    documentation: 'https://www.checkout.com/docs/developer-resources/api',
    description: 'Global enterprise acquirer; OAuth2 client-credentials or Bearer secret key.',
    clientImplemented: false,
    notes: 'Token issuance may use a per-client {prefix} subdomain; payments served on the plain hosts.',
  },
  {
    category: 'payment_gateway', provider: 'Worldpay', name: 'Worldpay Access (Card Payments) API',
    region: 'GLOBAL', endpoint: 'https://access.worldpay.com', sandboxEndpoint: 'https://try.access.worldpay.com',
    auth: 'basic', format: 'json',
    documentation: 'https://developer.worldpay.com/products/access',
    description: 'Global acquirer; Access REST APIs over HTTP Basic with versioned media types.',
    clientImplemented: false,
    notes: 'Pin a version via WP-Api-Version / Accept media types. Separate Try vs Live credentials.',
  },
  {
    category: 'direct_debit', provider: 'GoCardless', name: 'GoCardless Bank Debit API',
    region: 'GLOBAL', endpoint: 'https://api.gocardless.com', sandboxEndpoint: 'https://api-sandbox.gocardless.com',
    auth: 'api_key', format: 'json',
    documentation: 'https://developer.gocardless.com/api-reference/',
    description: 'Recurring bank debit (SEPA Core/B2B, BACS, ACH) via mandates + payments.',
    clientImplemented: false,
    notes: 'Bearer token + a GoCardless-Version header. SEPA DD makes it EU/BG-relevant for subscription billing.',
  },
  {
    category: 'payout_provider', provider: 'Wise', name: 'Wise Platform API',
    region: 'GLOBAL', endpoint: 'https://api.transferwise.com', sandboxEndpoint: 'https://api.sandbox.transferwise.tech',
    auth: 'oauth2', format: 'json',
    documentation: 'https://docs.wise.com/api-reference',
    description: 'Cross-border payouts / multi-currency: quote → recipient → transfer → fund.',
    clientImplemented: false,
    notes: 'Money-out, not acquiring. SCA-sensitive moves need an extra X-Signature (RSA) header.',
  },
  {
    category: 'payment_gateway', provider: 'Revolut', name: 'Revolut Merchant API',
    region: 'EU', endpoint: 'https://merchant.revolut.com', sandboxEndpoint: 'https://sandbox-merchant.revolut.com',
    auth: 'api_key', format: 'json',
    documentation: 'https://developer.revolut.com/docs/merchant/merchant-api',
    description: 'Revolut acquiring: server-side Orders via Secret key + Revolut Pay checkout.',
    clientImplemented: false,
    notes: 'The Merchant (acquiring) API — distinct from the Revolut Business banking API (b2b.revolut.com, OAuth2 + client-assertion JWT).',
  },

  // ─── E-commerce platforms ─────────────────────────────────────────────────
  {
    category: 'ecommerce_platform', provider: 'Shopify', name: 'Shopify Admin API (GraphQL)',
    region: 'GLOBAL', endpoint: 'https://{shop}.myshopify.com/admin/api/2026-04/graphql.json',
    auth: 'oauth2', format: 'json',
    documentation: 'https://shopify.dev/docs/api/admin-graphql',
    description: 'Storefront orders, products, inventory, fulfilment, customers. GraphQL-first.',
    clientImplemented: false,
    notes: 'Per-shop subdomain template; date-versioned (pin a version). Token via X-Shopify-Access-Token.',
  },
  {
    category: 'ecommerce_platform', provider: 'WooCommerce', name: 'WooCommerce REST API (v3)',
    region: 'GLOBAL', endpoint: 'https://{store}/wp-json/wc/v3',
    auth: 'basic', format: 'json',
    documentation: 'https://woocommerce.github.io/woocommerce-rest-api-docs/',
    description: 'Orders, products, customers, coupons, reports for self-hosted WooCommerce stores.',
    clientImplemented: false,
    notes: 'Self-hosted: base URL is the tenant WordPress install. Consumer key/secret over HTTP Basic.',
  },
  {
    category: 'ecommerce_platform', provider: 'Adobe Commerce / Magento', name: 'Adobe Commerce REST API (V1)',
    region: 'GLOBAL', endpoint: 'https://{host}/rest/V1',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer.adobe.com/commerce/webapi/rest/',
    description: 'Catalog, orders, customers, inventory (MSI), carts for Adobe Commerce / Magento OS.',
    clientImplemented: false,
    notes: 'Self/cloud-hosted base. Integration tokens (PaaS) or Adobe IMS OAuth2 (cloud) — confirm per deployment.',
  },
  {
    category: 'ecommerce_platform', provider: 'BigCommerce', name: 'BigCommerce REST Management API (v3)',
    region: 'GLOBAL', endpoint: 'https://api.bigcommerce.com/stores/{store_hash}/v3',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer.bigcommerce.com/docs/start/authentication',
    description: 'Catalog, orders, carts, customers, inventory for BigCommerce-hosted stores.',
    clientImplemented: false,
    notes: 'Store hash in path. X-Auth-Token long-lived OAuth token (no refresh under standard creds).',
  },
  {
    category: 'ecommerce_platform', provider: 'PrestaShop', name: 'PrestaShop Webservice API',
    region: 'EU', endpoint: 'https://{store}/api',
    auth: 'basic', format: 'xml',
    documentation: 'https://devdocs.prestashop-project.org/9/webservice/',
    description: 'CRUD over store resources (products, orders, customers, stock) for self-hosted PrestaShop.',
    clientImplemented: false,
    notes: 'EU-popular self-hosted. 32-char key as HTTP Basic username. JSON via ?io_format=JSON.',
  },
  {
    category: 'ecommerce_platform', provider: 'OpenCart', name: 'OpenCart API (core)',
    region: 'GLOBAL', endpoint: 'https://{store}/index.php?route=api',
    auth: 'api_key', format: 'json',
    documentation: 'https://docs.opencart.com/en-gb/system/users/api/',
    description: 'Core OpenCart API: session-token cart/order operations. Narrow surface vs full management.',
    clientImplemented: false,
    notes: 'Core API is cart/order-centric; full catalog REST admin needs a third-party extension.',
  },

  // ─── Marketplaces — Balkans-critical first ────────────────────────────────
  {
    category: 'marketplace', provider: 'eMAG', name: 'eMAG Marketplace API (api-3)',
    region: 'BG', endpoint: 'https://marketplace-api.emag.bg/api-3',
    auth: 'basic', format: 'json',
    documentation: 'https://marketplace.emag.ro/documentation/api/external',
    description: 'Dominant RO/BG marketplace: offers, orders, AWB/courier, invoices, VAT. THE Balkans channel.',
    clientImplemented: false,
    notes: 'Per-country host (.emag.bg/.ro/.hu/.pl) on /api-3. HTTP Basic (username + password + Base64 hash). Highest BG priority.',
  },
  {
    category: 'marketplace', provider: 'Allegro', name: 'Allegro REST API',
    region: 'PL', endpoint: 'https://api.allegro.pl', sandboxEndpoint: 'https://api.allegro.pl.allegrosandbox.pl',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer.allegro.pl/documentation',
    description: 'Largest Polish marketplace: offers, orders, shipments, billing, disputes. OpenAPI 3.0.',
    clientImplemented: false,
    notes: 'OAuth2 only (no API keys). Access tokens are JWTs (12h). Fully separate sandbox tenant.',
  },
  {
    category: 'marketplace', provider: 'OLX Group', name: 'OLX Partner API',
    region: 'EU', endpoint: 'https://api.olxgroup.com',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer.olxgroup.com/',
    description: 'Classifieds inventory sync across OLX marketplaces (incl. BG, RO, PL, UA) + verticals.',
    clientImplemented: false,
    notes: 'Balkans-relevant (BG/RO). Partner-gated; listing-centric, not full order/fulfilment.',
  },
  {
    category: 'marketplace', provider: 'Amazon', name: 'Selling Partner API (SP-API) — EU',
    region: 'EU', endpoint: 'https://sellingpartnerapi-eu.amazon.com', sandboxEndpoint: 'https://sandbox.sellingpartnerapi-eu.amazon.com',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer-docs.amazon.com/sp-api',
    description: 'Orders, FBA/MFN, listings, catalog, feeds, reports, finances across EU marketplaces.',
    clientImplemented: false,
    notes: 'Login-with-Amazon OAuth2 (token at api.amazon.com/auth/o2/token); region-pinned base; PII ops need RDT tokens. Heavy onboarding.',
  },
  {
    category: 'marketplace', provider: 'eBay', name: 'eBay Sell APIs (REST)',
    region: 'GLOBAL', endpoint: 'https://api.ebay.com', sandboxEndpoint: 'https://api.sandbox.ebay.com',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer.ebay.com/api-docs/static/ebay-rest-landing.html',
    description: 'Sell suite: Inventory, Fulfilment (orders), Account, Marketing, Finances.',
    clientImplemented: false,
    notes: 'OAuth2 app + user tokens. Marketplace via X-EBAY-C-MARKETPLACE-ID header.',
  },
  {
    category: 'marketplace', provider: 'Etsy', name: 'Etsy Open API v3',
    region: 'GLOBAL', endpoint: 'https://api.etsy.com/v3',
    auth: 'oauth2_pkce', format: 'json',
    documentation: 'https://developer.etsy.com/documentation/',
    description: 'Handmade/vintage marketplace: listings, inventory, receipts (orders), shipping, payments.',
    clientImplemented: false,
    notes: 'OAuth2 authorization-code + PKCE; every request also needs an x-api-key header. No sandbox.',
  },
  {
    category: 'marketplace', provider: 'Google', name: 'Google Merchant API',
    region: 'GLOBAL', endpoint: 'https://merchantapi.googleapis.com',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developers.google.com/merchant/api',
    description: 'Merchant Center product feeds, inventory, promotions, reports for Google Shopping surfaces.',
    clientImplemented: false,
    notes: 'GA — supersedes the deprecated Content API for Shopping v2.1. OAuth2 scope .../auth/content.',
  },
  {
    category: 'marketplace', provider: 'Meta', name: 'Meta Commerce Platform (Graph API)',
    region: 'GLOBAL', endpoint: 'https://graph.facebook.com/v23.0',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developers.facebook.com/docs/commerce-platform/',
    description: 'Facebook & Instagram Shops: product catalog (Batch API), commerce_orders, inventory.',
    clientImplemented: false,
    notes: 'Graph version in path (pin + upgrade plan). Access-tier gated; commerce_orders only for on-platform checkout.',
  },
  {
    category: 'marketplace', provider: 'Walmart', name: 'Walmart Marketplace API (US)',
    region: 'US', endpoint: 'https://marketplace.walmartapis.com/v3',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer.walmart.com/us-marketplace/docs/introduction-to-marketplace-apis',
    description: 'US marketplace: items, orders, inventory, prices, returns, shipping.',
    clientImplemented: false,
    notes: 'OAuth2 client-credentials; WM_SVC.NAME / WM_QOS.CORRELATION_ID headers. US seller-gated.',
  },
  {
    category: 'marketplace', provider: 'Wish', name: 'Wish Marketplace API v3',
    region: 'GLOBAL', endpoint: 'https://merchant.wish.com/api/v3', sandboxEndpoint: 'https://sandbox.merchant.wish.com/api/v3',
    auth: 'oauth2', format: 'json',
    documentation: 'https://merchant.wish.com/documentation/api/v3/reference',
    description: 'Global discount marketplace: products, variations, orders, fulfilment, returns.',
    clientImplemented: false,
    notes: 'OAuth2; clean prod↔sandbox host swap. Lower Balkans relevance than eMAG/Allegro.',
  },

  // ─── Shipping carriers — Bulgaria-native first ────────────────────────────
  {
    category: 'shipping_carrier', provider: 'Econt Express', name: 'Econt Express API (e-Econt / Shipments)',
    region: 'BG', endpoint: 'https://ee.econt.com/services', sandboxEndpoint: 'https://demo.econt.com/ee/services',
    auth: 'basic', format: 'json',
    documentation: 'https://ee.econt.com/services/',
    description: 'Dominant BG courier: nomenclatures, shipment/label creation, courier request, COD (наложен платеж).',
    clientImplemented: false,
    notes: 'BG-critical. Per-service JSON POST; HTTP Basic (username+password). OpenAPI + Postman published.',
  },
  {
    category: 'shipping_carrier', provider: 'Speedy', name: 'Speedy REST/JSON Web API',
    region: 'BG', endpoint: 'https://api.speedy.bg/v1',
    auth: 'basic', format: 'json',
    documentation: 'https://api.speedy.bg/web-api.html',
    description: 'Dominant BG courier: shipment, price calc, label/waybill (PDF+ZPL), pickup, tracking, COD.',
    clientImplemented: false,
    notes: 'BG-critical (DPDgroup). userName+password per request.',
  },
  {
    category: 'shipping_carrier', provider: 'Speedy', name: 'Speedy EPS SOAP Web Service (legacy)',
    region: 'BG', endpoint: 'https://services.speedy.bg/eps/v1/',
    auth: 'basic', format: 'soap',
    documentation: 'https://services.speedy.bg/eps/docs/',
    description: 'Legacy SOAP EPS web service — predecessor of the REST/JSON API.',
    clientImplemented: false,
    notes: 'Legacy. Prefer the REST v1 contract for new integrations.',
  },
  {
    category: 'shipping_carrier', provider: 'Български пощи (Bulgarian Posts)', name: 'Bulgarian Posts tracking',
    region: 'BG', endpoint: 'https://www.bgpost.bg',
    auth: 'none', format: 'mixed',
    documentation: 'https://www.bgpost.bg/en',
    description: 'BG national postal operator; UPU S10 tracking numbers; Postpay COD product.',
    clientImplemented: false,
    notes: 'No verifiable official public developer API found — catalogue-only; UPU S10 tracking is the realistic fallback.',
  },
  {
    category: 'shipping_carrier', provider: 'Sameday', name: 'Sameday Courier eAWB API',
    region: 'EU', endpoint: 'https://api.sameday.ro/api', sandboxEndpoint: 'https://sameday-api.demo.zitec.com/api',
    auth: 'api_key', format: 'json',
    documentation: 'https://sameday-api.demo.zitec.com/documentation/client',
    description: 'Regional courier (RO + BG): pickup points, services, eAWB, label, tracking, COD (ramburs).',
    clientImplemented: false,
    notes: 'Username+password → bearer token. Open-source PHP SDK. Confirm BG prod host per tenant.',
  },
  {
    category: 'shipping_carrier', provider: 'DHL', name: 'MyDHL API (DHL Express)',
    region: 'GLOBAL', endpoint: 'https://express.api.dhl.com/mydhlapi', sandboxEndpoint: 'https://express.api.dhl.com/mydhlapi/test',
    auth: 'basic', format: 'json',
    documentation: 'https://developer.dhl.com/api-reference/mydhl-api-dhl-express',
    description: 'DHL Express rating, transit times, shipment + pickup booking, label, tracking.',
    clientImplemented: false,
    notes: 'HTTP Basic. Test env capped 500 calls/day.',
  },
  {
    category: 'shipping_carrier', provider: 'DHL', name: 'DHL Shipment Tracking — Unified',
    region: 'GLOBAL', endpoint: 'https://api-eu.dhl.com/track/shipments',
    auth: 'api_key', format: 'json',
    documentation: 'https://developer.dhl.com/api-reference/shipment-tracking',
    description: 'Cross-divisional unified tracking by tracking number (push webhook variant available).',
    clientImplemented: false,
    notes: 'DHL-API-Key header. Read-only tracking — pairs with carrier-specific label APIs.',
  },
  {
    category: 'shipping_carrier', provider: 'DHL', name: 'DHL Parcel DE Shipping',
    region: 'DE', endpoint: 'https://api-eu.dhl.com/parcel/de/shipping/v2', sandboxEndpoint: 'https://api-sandbox.dhl.com/parcel/de/shipping/v2',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer.dhl.com/api-reference/parcel-de-shipping-post-parcel-germany',
    description: 'Domestic-DE parcel label creation, manifests, returns for DHL Paket business customers.',
    clientImplemented: false,
  },
  {
    category: 'shipping_carrier', provider: 'DPD', name: 'DPD Shipper Web Services',
    region: 'EU', endpoint: 'https://wsshipper.dpd.nl',
    auth: 'soap_wsse', format: 'soap',
    documentation: 'https://integrations.dpd.nl/dpd-shipper/dpd-shipper-webservices/api-developer-guidelines/',
    description: 'DPD parcel label, shipment + pickup, tracking, COD via login-token SOAP calls.',
    clientImplemented: false,
    notes: 'SOAP/legacy; endpoints are country-specific (NL shown). A newer REST "MyDPD" exists in some markets.',
  },
  {
    category: 'shipping_carrier', provider: 'GLS', name: 'GLS ShipIT REST API',
    region: 'EU', endpoint: 'https://api.gls-group.eu/public/v1',
    auth: 'basic', format: 'json',
    documentation: 'https://shipit.gls-group.eu/',
    description: 'GLS parcel creation, label (PDF/ZPL), tracking, pickup; COD in eligible countries.',
    clientImplemented: false,
    notes: 'HTTP Basic. National units vary — verify base/path per the GLS unit serving the tenant.',
  },
  {
    category: 'shipping_carrier', provider: 'PostNL', name: 'PostNL Send & Track',
    region: 'NL', endpoint: 'https://api.postnl.nl', sandboxEndpoint: 'https://api-sandbox.postnl.nl',
    auth: 'api_key', format: 'json',
    documentation: 'https://docs.api.postnl.nl/',
    description: 'PostNL shipping/labelling, barcode, confirming, returns and track & trace.',
    clientImplemented: false,
    notes: 'apikey header. Older SOAP webservices still exist; REST is current.',
  },
  {
    category: 'shipping_carrier', provider: 'InPost', name: 'InPost Shipping API (ShipX)',
    region: 'EU', endpoint: 'https://api-shipx-pl.easypack24.net/v1', sandboxEndpoint: 'https://sandbox-api-shipx-pl.easypack24.net/v1',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developers.inpost-group.com/shipping',
    description: 'InPost parcel-locker (Paczkomat) + courier shipments, label download, COD.',
    clientImplemented: false,
    notes: 'OAuth 2.1 bearer; country-scoped hosts. Strong locker-network fit for PL/regional e-commerce.',
  },
  {
    category: 'shipping_carrier', provider: 'UPS', name: 'UPS REST API (Shipping / Rating / Tracking)',
    region: 'GLOBAL', endpoint: 'https://onlinetools.ups.com/api', sandboxEndpoint: 'https://wwwcie.ups.com/api',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer.ups.com/',
    description: 'UPS rating, address validation, shipment/label creation, tracking, pickup.',
    clientImplemented: false,
    notes: 'OAuth2 client-credentials — legacy access-key auth removed 2024.',
  },
  {
    category: 'shipping_carrier', provider: 'FedEx', name: 'FedEx APIs (Ship / Track)',
    region: 'GLOBAL', endpoint: 'https://apis.fedex.com', sandboxEndpoint: 'https://apis-sandbox.fedex.com',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer.fedex.com/api/en-us/home.html',
    description: 'FedEx Ship (label), Rate, and Track (batch + visibility webhooks).',
    clientImplemented: false,
    notes: 'OAuth2 client-credentials → bearer.',
  },
  {
    category: 'shipping_carrier', provider: 'TNT (FedEx)', name: 'TNT Express ExpressConnect Web Services',
    region: 'EU', endpoint: 'https://express.tnt.com/expressconnect',
    auth: 'basic', format: 'xml',
    documentation: 'https://express.tnt.com/expresswebservices-website/app/landing.html',
    description: 'TNT ExpressConnect: shipping, pricing and tracking over XML web services.',
    clientImplemented: false,
    notes: 'Legacy XML; TNT absorbed into FedEx — prefer FedEx APIs for new EU integrations.',
  },

  // ─── Shipping aggregators ─────────────────────────────────────────────────
  {
    category: 'shipping_aggregator', provider: 'EasyPost', name: 'EasyPost Shipping API',
    region: 'GLOBAL', endpoint: 'https://api.easypost.com/v2',
    auth: 'basic', format: 'json',
    documentation: 'https://docs.easypost.com/',
    description: 'Multi-carrier aggregator: rate shopping, label buy, tracking, address verification, customs.',
    clientImplemented: false,
    notes: 'API key as Basic username. US-centric carrier coverage; thin on BG-native couriers.',
  },
  {
    category: 'shipping_aggregator', provider: 'Shippo', name: 'Shippo Shipping API',
    region: 'GLOBAL', endpoint: 'https://api.goshippo.com',
    auth: 'api_key', format: 'json',
    documentation: 'https://docs.goshippo.com/',
    description: 'Multi-carrier aggregator: rates, labels, tracking, returns across UPS/FedEx/USPS/DHL.',
    clientImplemented: false,
    notes: 'Custom header `Authorization: ShippoToken <key>`.',
  },
  {
    category: 'shipping_aggregator', provider: 'Sendcloud', name: 'Sendcloud API v2',
    region: 'EU', endpoint: 'https://panel.sendcloud.sc/api/v2',
    auth: 'basic', format: 'json',
    documentation: 'https://www.sendcloud.dev/docs/',
    description: 'EU-focused multi-carrier aggregator (DPD, GLS, PostNL, InPost, DHL, UPS +).',
    clientImplemented: false,
    notes: 'Public key = username, secret key = password. Best EU-native carrier breadth.',
  },
  {
    category: 'shipping_aggregator', provider: 'ShipStation', name: 'ShipStation API',
    region: 'GLOBAL', endpoint: 'https://ssapi.shipstation.com',
    auth: 'basic', format: 'json',
    documentation: 'https://docs.shipstation.com/',
    description: 'Order + multi-carrier shipping aggregator: orders, rate shopping, label, fulfilment, tracking.',
    clientImplemented: false,
    notes: 'API Key = username, API Secret = password. Rate-limited (40 req/min).',
  },

  // ─── Peppol access points + EDI networks ──────────────────────────────────
  {
    category: 'peppol_access_point', provider: 'Storecove', name: 'Storecove E-invoicing / Peppol Access Point API',
    region: 'GLOBAL', endpoint: 'https://api.storecove.com/api/v2',
    auth: 'api_key', format: 'json',
    documentation: 'https://www.storecove.com/docs/',
    description: 'Send/receive Peppol + email e-invoices via clean REST/JSON; registration, discovery, webhooks.',
    clientImplemented: false,
    notes: 'Cleanest self-serve REST AP; published OpenAPI. Sandbox is an account-level mode. Strong default BG/EU Peppol AP.',
  },
  {
    category: 'peppol_access_point', provider: 'Qvalia', name: 'Qvalia Peppol / Invoicing API',
    region: 'EU', endpoint: 'https://api.qvalia.io',
    auth: 'api_key', format: 'xml',
    documentation: 'https://api.qvalia.io/qvalia-developer-tools/api',
    description: 'White-label Peppol AP: send/receive BIS Billing invoices, credit notes, invoice-response.',
    clientImplemented: false,
    notes: 'REST envelope, strict UBL/BIS Billing 3.0 payloads. Documented sandbox.',
  },
  {
    category: 'peppol_access_point', provider: 'Unimaze', name: 'Unimaze Messaging API (Peppol Access Point)',
    region: 'EU', endpoint: 'https://apidocs.unimaze.com',
    auth: 'basic', format: 'mixed',
    documentation: 'https://apidocs.unimaze.com',
    description: 'Send/receive Peppol business documents with automatic format conversion to recipient formats.',
    clientImplemented: false,
    notes: 'HTTP Basic. Production base/version path not public — resolve on onboarding.',
  },
  {
    category: 'peppol_access_point', provider: 'Tickstar (Pagero)', name: 'Galaxy Gateway SMP Manager API v2',
    region: 'EU', endpoint: 'https://www.galaxygw.com/support/smp-manager-api-2/',
    auth: 'api_key', format: 'xml',
    documentation: 'https://www.tickstar.com/article/smp-manager-api-v-2/',
    description: 'Programmatic SMP receiver management on Tickstar/Galaxy Gateway Peppol infrastructure.',
    clientImplemented: false,
    notes: 'SMP-management (receiver registration), not self-serve send/receive. Per-tenant base. Underpins Pagero.',
  },
  {
    category: 'edi_network', provider: 'SPS Commerce', name: 'SPS Commerce Fulfillment / Transaction API',
    region: 'GLOBAL', endpoint: 'https://api.spscommerce.com',
    auth: 'oauth2', format: 'json',
    documentation: 'https://docs.api.spscommerce.com/',
    description: 'Retail supply-chain network: POs, ASNs, invoices, shipping-label + packing-slip APIs.',
    clientImplemented: false,
    notes: 'Free self-serve Dev Center; OAuth2 + JSON REST. Strongest clean API among the EDI VANs.',
  },
  {
    category: 'edi_network', provider: 'Tradeshift', name: 'Tradeshift REST API',
    region: 'GLOBAL', endpoint: 'https://api.tradeshift.com/tradeshift/rest/external',
    auth: 'oauth2', format: 'xml',
    documentation: 'https://developers.tradeshift.com/docs/api',
    description: 'B2B network + AP automation: create/send invoices and business documents (native UBL).',
    clientImplemented: false,
    notes: 'REST API, core payloads UBL XML. App registration / OAuth per tenant.',
  },
  {
    category: 'edi_network', provider: 'Cleo', name: 'Cleo Integration Cloud (CIC) API',
    region: 'GLOBAL', endpoint: 'https://support.cleo.com/hc/en-us/articles/360045587533-Documentation',
    auth: 'api_key', format: 'mixed',
    documentation: 'https://www.cleo.com/blog/sending-data-to-cleo-integration-cloud',
    description: 'EDI/API integration platform (VAN + iPaaS): REST ingress routed over AS2/SFTP/OFTP.',
    clientImplemented: false,
    notes: 'Contract-provisioned tenant instance; no public self-serve REST base. Catalogue-only.',
  },
  {
    category: 'edi_network', provider: 'EDICOM', name: 'EDICOM Global Platform (EDI / e-invoicing API)',
    region: 'GLOBAL', endpoint: 'https://edicomgroup.com/edi-software',
    auth: 'api_key', format: 'mixed',
    documentation: 'https://www.edicomgroup.com/solutions/einvoicing/EDICOM-Platform-Architecture.html',
    description: 'Global multi-standard EDI + e-invoicing SaaS with per-country compliance rules.',
    clientImplemented: false,
    notes: 'No public developer portal; API/WSDL tenant-specific + onboarding-gated. Catalogue-only.',
  },
  {
    category: 'edi_network', provider: 'OpenText (GXS / Trading Grid)', name: 'OpenText Trading Grid / Business Network',
    region: 'GLOBAL', endpoint: 'https://developer.opentext.com/resources/documentation/Trading%20Grid',
    auth: 'oauth2', format: 'mixed',
    documentation: 'https://developer.opentext.com/resources/documentation/Trading%20Grid',
    description: 'Large managed-services VAN: any-to-any B2B document exchange with application connectors.',
    clientImplemented: false,
    notes: 'Enterprise managed-services VAN; base URLs/credentials contract-provisioned. Catalogue-only.',
  },
  {
    category: 'edi_network', provider: 'Comarch', name: 'Comarch EDI Platform',
    region: 'EU', endpoint: 'https://www.comarchedi.com/',
    auth: 'api_key', format: 'mixed',
    documentation: 'https://www.comarch.com/trade-and-services/data-management/edi/',
    description: 'Cloud EDI/B2B platform across 60+ countries: orders, invoices, despatch advices.',
    clientImplemented: false,
    notes: 'Strong CEE/Poland footprint (BG-region relevant). No public self-serve REST docs. Catalogue-only.',
  },

  // ─── Product-data networks + document validation ──────────────────────────
  {
    category: 'product_data', provider: 'GS1', name: 'Verified by GS1 (GS1 Registry Platform)',
    region: 'GLOBAL', endpoint: 'https://www.gs1.org/services/verified-by-gs1',
    auth: 'api_key', format: 'json',
    documentation: 'https://www.gs1.org/services/verified-by-gs1/getting-started',
    description: 'Authoritative GTIN/GLN/SSCC verification against the global GS1 Registry.',
    clientImplemented: false,
    notes: 'No single global endpoint — queryable API provisioned per Member Organisation (GS1 US/UK). Resolve per region.',
  },
  {
    category: 'product_data', provider: 'GS1', name: 'GS1 GDSN (Global Data Synchronisation Network)',
    region: 'GLOBAL', endpoint: 'https://www.gs1.org/services/gdsn',
    auth: 'mtls', format: 'xml',
    documentation: 'https://www.gs1.org/services/gdsn/how-gdsn-works',
    description: 'Federated master-data sync via certified data pools + the GS1 Global Registry.',
    clientImplemented: false,
    notes: 'NOT a callable API — integrate with one certified data pool (1WorldSync/Atrify/Syndigo) via GS1 XML over AS2/AS4.',
  },
  {
    category: 'product_data', provider: 'Open Food Facts', name: 'Open Food Facts Product API v2',
    region: 'GLOBAL', endpoint: 'https://world.openfoodfacts.org/api/v2', sandboxEndpoint: 'https://world.openfoodfacts.net/api/v2',
    auth: 'none', format: 'json',
    documentation: 'https://openfoodfacts.github.io/openfoodfacts-server/api/',
    description: 'Open product database by barcode (EAN/GTIN): name, brand, ingredients, nutrition, Nutri-Score.',
    clientImplemented: false,
    notes: 'Cleanest open REST product lookup. Must send a descriptive User-Agent. Reads need no key.',
  },
  {
    category: 'product_data', provider: 'Icecat', name: 'Open Icecat Product API',
    region: 'GLOBAL', endpoint: 'https://live.icecat.biz/api',
    auth: 'api_key', format: 'mixed',
    documentation: 'https://iceclog.com/manual-for-icecat-json-product-requests/',
    description: 'Rich product content by GTIN/MPN+brand: specs, images, multilingual marketing copy.',
    clientImplemented: false,
    notes: 'Strong for IT/CE/electronics. Open Icecat tier free with registration; Full Icecat licensed.',
  },
  {
    category: 'doc_validation', provider: 'Peppol Practical (Helger)', name: 'Peppol / EN 16931 Document Validation Web Service',
    region: 'EU', endpoint: 'https://peppol.helger.com/wsdvs',
    auth: 'none', format: 'soap',
    documentation: 'https://peppol.helger.com/public/menuitem-validation-ws2',
    description: 'Validate UBL/CII documents against Peppol BIS 3.0, EN 16931 and country schematron.',
    clientImplemented: false,
    notes: 'Canonical free validator; SOAP (WSDL). Best-effort uptime — confirm an arrangement before prod reliance.',
  },

  // ─── Open-banking aggregators (commercial sibling of raw PSD2) ─────────────
  {
    category: 'banking_aggregator', provider: 'GoCardless', name: 'GoCardless Bank Account Data (ex-Nordigen)',
    region: 'EU', endpoint: 'https://bankaccountdata.gocardless.com/api/v2',
    auth: 'oauth2', format: 'json',
    documentation: 'https://developer.gocardless.com/bank-account-data/overview',
    description: 'One API → ~2,500 EU/UK bank PSD2 AIS feeds (accounts/balances/90-day transactions) for reconciliation.',
    clientImplemented: false,
    notes: 'Free tier. Covers BG banks (DSK, UniCredit Bulbank, Postbank) via Nordigen connectors. secret_id+secret_key → bearer token.',
  },
  {
    category: 'banking_aggregator', provider: 'Plaid', name: 'Plaid API',
    region: 'GLOBAL', endpoint: 'https://production.plaid.com', sandboxEndpoint: 'https://sandbox.plaid.com',
    auth: 'api_key', format: 'json',
    documentation: 'https://plaid.com/docs/api/',
    description: 'Bank-data + payments aggregator (Transactions, Auth, Balance). Dominant US/CA.',
    clientImplemented: false,
    notes: 'client_id + secret in body. Weak BG/EU coverage vs GoCardless/Tink/Salt Edge.',
  },
  {
    category: 'banking_aggregator', provider: 'TrueLayer', name: 'TrueLayer Data & Payments API',
    region: 'EU', endpoint: 'https://api.truelayer.com', sandboxEndpoint: 'https://api.truelayer-sandbox.com',
    auth: 'oauth2', format: 'json',
    documentation: 'https://docs.truelayer.com/',
    description: 'UK/EU open-banking: Data API (accounts/transactions) + Payments API (PIS).',
    clientImplemented: false,
    notes: 'Strong UK + Western-EU; BG coverage thin. Auth host auth.truelayer.com.',
  },
  {
    category: 'banking_aggregator', provider: 'Tink', name: 'Tink (Visa) Account Aggregation',
    region: 'EU', endpoint: 'https://api.tink.com/api/v1',
    auth: 'oauth2', format: 'json',
    documentation: 'https://docs.tink.com/api',
    description: 'EU bank-data aggregator (~3,400 banks) via the Tink Link consent flow.',
    clientImplemented: false,
    notes: 'OAuth2 client credentials + Tink Link end-user auth. Broad BG coverage.',
  },
  {
    category: 'banking_aggregator', provider: 'Salt Edge', name: 'Salt Edge Open Banking Gateway (v6 AIS)',
    region: 'EU', endpoint: 'https://www.saltedge.com/api/v6',
    auth: 'api_key', format: 'json',
    documentation: 'https://docs.saltedge.com/v6/',
    description: 'EU/global account-information aggregator with explicit Bulgaria coverage.',
    clientImplemented: false,
    notes: 'App-id / Secret headers; some flows need a signed (RSA) request. Publishes a BG coverage list.',
  },
  {
    category: 'banking_aggregator', provider: 'Yapily', name: 'Yapily Open Banking API',
    region: 'EU', endpoint: 'https://api.yapily.com',
    auth: 'basic', format: 'json',
    documentation: 'https://docs.yapily.com/api/reference/',
    description: 'EU/UK open-banking infrastructure (~1,900 institutions): accounts/transactions + payments.',
    clientImplemented: false,
    notes: 'HTTP Basic with Application-ID + Application-Secret. No front-end SDK.',
  },

  // ─── FX / market-data feeds (beyond the central-bank fixings in country-apis) ─
  {
    category: 'fx_rates', provider: 'Frankfurter', name: 'Frankfurter FX API',
    region: 'EU', endpoint: 'https://api.frankfurter.dev/v1',
    auth: 'none', format: 'json',
    documentation: 'https://frankfurter.dev/',
    description: 'Free, key-less ECB-derived daily reference rates (latest/historical/time-series + CSV).',
    clientImplemented: false,
    notes: 'The clean queryable REST sibling of the raw ECB_RATES XML — best free feed for IAS-21 lookups.',
  },
  {
    category: 'fx_rates', provider: 'ExchangeRate-API', name: 'ExchangeRate-API (open access)',
    region: 'GLOBAL', endpoint: 'https://open.er-api.com/v6/latest',
    auth: 'none', format: 'json',
    documentation: 'https://www.exchangerate-api.com/docs/free',
    description: 'Free key-less open endpoint returning latest rates for a base currency; daily refresh.',
    clientImplemented: false,
    notes: 'The key-less product is open.er-api.com; the keyed v6.exchangerate-api.com is a separate paid tier.',
  },
  {
    category: 'fx_rates', provider: 'exchangerate.host', name: 'exchangerate.host',
    region: 'GLOBAL', endpoint: 'https://api.exchangerate.host',
    auth: 'api_key', format: 'json',
    documentation: 'https://exchangerate.host/documentation',
    description: 'FX live/historical/convert (fiat + crypto). Now an apilayer product requiring an access_key.',
    clientImplemented: false,
    notes: 'Re-platformed under apilayer — the free no-auth era is gone.',
  },
  {
    category: 'fx_rates', provider: 'Open Exchange Rates', name: 'Open Exchange Rates',
    region: 'GLOBAL', endpoint: 'https://openexchangerates.org/api',
    auth: 'api_key', format: 'json',
    documentation: 'https://docs.openexchangerates.org/',
    description: 'Hourly USD-based FX (latest/historical) across many currencies.',
    clientImplemented: false,
    notes: 'app_id query param. Free plan: USD base, hourly.',
  },
  {
    category: 'fx_rates', provider: 'Fixer', name: 'Fixer (apilayer)',
    region: 'EU', endpoint: 'https://data.fixer.io/api',
    auth: 'api_key', format: 'json',
    documentation: 'https://fixer.io/documentation',
    description: 'EUR-anchored FX (latest/historical/convert/timeseries), ECB-sourced base.',
    clientImplemented: false,
    notes: 'access_key query param. Free tier: EUR base only.',
  },
  {
    category: 'fx_rates', provider: 'Twelve Data', name: 'Twelve Data (FX endpoints)',
    region: 'GLOBAL', endpoint: 'https://api.twelvedata.com',
    auth: 'api_key', format: 'json',
    documentation: 'https://twelvedata.com/docs',
    description: 'Real-time + historical FX/equity/crypto market data (/price, /exchange_rate, /time_series).',
    clientImplemented: false,
    notes: 'Market rates ≠ official IAS-21 fixing — indicative valuation only.',
  },
  {
    category: 'fx_rates', provider: 'Polygon.io', name: 'Polygon.io (Forex)',
    region: 'GLOBAL', endpoint: 'https://api.polygon.io',
    auth: 'api_key', format: 'json',
    documentation: 'https://polygon.io/docs/forex',
    description: 'Forex market data — real-time / aggregates / conversion.',
    clientImplemented: false,
    notes: 'Market rates, not official fixings.',
  },
  {
    category: 'fx_rates', provider: 'CoinGecko', name: 'CoinGecko API v3',
    region: 'GLOBAL', endpoint: 'https://api.coingecko.com/api/v3',
    auth: 'none', format: 'json',
    documentation: 'https://docs.coingecko.com/',
    description: 'Free crypto reference prices (/simple/price) across fiat quote currencies.',
    clientImplemented: false,
    notes: 'Demo tier public/no-key. Crypto valuation only — keep minor.',
  },
  {
    category: 'fx_rates', provider: 'Coinbase', name: 'Coinbase Spot Price (v2)',
    region: 'GLOBAL', endpoint: 'https://api.coinbase.com/v2',
    auth: 'none', format: 'json',
    documentation: 'https://docs.cdp.coinbase.com/coinbase-business/track-apis/prices',
    description: 'Public spot price endpoint GET /v2/prices/{pair}/spot (e.g. BTC-EUR) — no auth.',
    clientImplemented: false,
    notes: 'Indicative spot only.',
  },
]

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
