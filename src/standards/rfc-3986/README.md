# RFC 3986 — Uniform Resource Identifier

**Edition:** RFC 3986 (Jan 2005) — generic syntax.
**Publisher:** <https://www.rfc-editor.org/info/rfc3986>

## What's here

- `url-utils.ts` — `normalizeUrl`, `buildOrigin`, `safeParseUrl`,
  `getUrlOrigin`, `ensureProtocol`, `joinUrl`, `resolvePublicSiteUrl`.
  Pure URI primitives: parsing, origin extraction, path joining, scheme
  normalization. No I/O, no Next.js, no Payload — safe to use anywhere.
- `get-url.ts` — server / browser origin resolution
  (`getServerSideURL`, `getClientSideURL`, `getOriginFromHeaders`,
  `resolvePublicSiteUrl`). Layers Next.js / Workers request context on
  top of `url-utils`.
- `generate-preview-path.ts` — `generatePreviewPath({ collection, slug,
  locale, req })`. Builds the signed admin live-preview URL.

## Companion citations

- **W3C URL Living Standard** — modern browser URL behaviour; aligns with
  RFC 3986 generic syntax for the parts we use.
- **ECMA-262** — the global `URL` class our parsers delegate to.
- **RFC 9110 §7.2** — `Host` and `:authority` semantics on the request
  side, used by `get-url.ts` when reading headers.
- **RFC 7239** — `Forwarded` / `X-Forwarded-*` headers, used to recover
  the public-facing origin behind reverse proxies.

## Used by

Every `redirect()` / `<Link href>` construction, OG metadata, sitemap
URL building, ecommerce client `serverURL`, admin live-preview signing.

## Out of scope

- IRI / RFC 3987 internationalized URIs — handled by the `URL` class.
- URI templates (RFC 6570) — not used in this codebase.
- Per-tenant URL signing — see `getPreviewSecret` (uses
  `@/standards/nist-sp-800-108` HKDF) and the Stripe webhook signature
  verification (`@/ecommerce/stripe/tenantStripeWebhook.ts`).
