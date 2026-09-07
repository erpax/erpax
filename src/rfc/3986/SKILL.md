---
name: "3986"
description: Use when implementing or referencing RFC 3986 — Uniform Resource Identifier.
atomPath: "rfc/3986"
coordinate: "rfc/3986 · 4/weave · 8b08d597"
contentUuid: "c3ca6635-e775-5dbb-ba6d-94989c685313"
diamondUuid: "3aea7977-e8c4-83cd-bef7-5264a1396739"
uuid: "8b08d597-ba92-899d-9bfe-fddf03173642"
horo: 4
typography:
  partition: rfc
  bondDegree: 6
standards:
  - "3986 uniform-resource-identifier"
  - "ECMA-262"
bindings: []
signatures:
  computationUuid: "db0a4e8e-4396-88b7-817e-9ca78d3487b8"
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
      stageUuid: "990a8d93-2021-88e9-bfe1-a99496c4fe6f"
    - stage: seal
      stageUuid: "907ce2c2-df89-889c-a453-ed77d0e5d9ff"
    - stage: uuid
      stageUuid: "93abdde0-4e7d-8990-bbef-e8fa7a18cede"
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
