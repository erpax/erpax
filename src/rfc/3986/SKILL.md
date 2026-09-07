---
name: "3986"
description: Use when implementing or referencing RFC 3986 — Uniform Resource Identifier.
atomPath: "rfc/3986"
coordinate: "rfc/3986 · 8/crest · 25e10a06"
contentUuid: "bdf2fae0-809b-5daa-a36e-9cbd9d4b3335"
diamondUuid: "6a7b280a-2813-8857-a716-97d013f05876"
uuid: "25e10a06-479a-84ed-aa00-127271b7780f"
horo: 8
typography:
  partition: rfc
  bondDegree: 6
standards:
  - "3986 uniform-resource-identifier"
  - "ECMA-262"
bindings: []
signatures:
  computationUuid: "51ee770c-c578-8029-8e17-5e8c96b85fab"
  stages:
    - stage: path
      stageUuid: "93e4846c-b5f7-8c7e-a040-2b26e244eb9f"
    - stage: trinity
      stageUuid: "f24acf7a-33d7-88d7-966b-ab57810119b4"
    - stage: boundary
      stageUuid: "e8645464-b351-8c1c-a313-356497bef4b6"
    - stage: links
      stageUuid: "fa0808c4-1524-8973-969f-788a28b0461f"
    - stage: horo
      stageUuid: "b6021234-00f9-8b14-af26-d8678ea4acf6"
    - stage: seal
      stageUuid: "907ce2c2-df89-889c-a453-ed77d0e5d9ff"
    - stage: uuid
      stageUuid: "e95b3dbc-36b7-85ab-a716-ff8c75dd28fb"
version: 2
---
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

Composes: [[standards]] · [[path]].
