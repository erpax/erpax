---
name: "3986"
description: Use when implementing or referencing RFC 3986 — Uniform Resource Identifier.
atomPath: rfc/3986
coordinate: rfc/3986 · 2/share · 29570e0f
contentUuid: "3ccdd015-5b7d-5c11-ba6b-f5dfdc90a714"
diamondUuid: "382ee8ca-dc46-8b31-b6bd-7f55eaed9dd2"
uuid: "29570e0f-d87c-8f4d-9ed0-387771ce4238"
horo: 2
bonds:
  in: []
  out:
    - "6585"
typography:
  partition: rfc
  bondDegree: 0
  neighbors: []
standards:
  - "3986 uniform-resource-identifier"
  - "ECMA-262"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "8f5b60dd-bd69-824b-b780-6b2155c1afd6"
  stages:
    - stage: path
      stageUuid: "93e4846c-b5f7-8c7e-a040-2b26e244eb9f"
    - stage: trinity
      stageUuid: "f24acf7a-33d7-88d7-966b-ab57810119b4"
    - stage: boundary
      stageUuid: "e8645464-b351-8c1c-a313-356497bef4b6"
    - stage: links
      stageUuid: "5c22a1eb-9209-881e-acc0-8eea066d93e6"
    - stage: horo
      stageUuid: "1169307d-3ac0-827f-9908-6350ea624241"
    - stage: seal
      stageUuid: "907ce2c2-df89-889c-a453-ed77d0e5d9ff"
    - stage: uuid
      stageUuid: "3a3d46a5-a2ef-8ba6-b0c4-1d1d6aada043"
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
