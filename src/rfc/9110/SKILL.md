---
name: "9110"
description: Use when implementing or referencing RFC 9110 — HTTP Semantics.
atomPath: "rfc/9110"
coordinate: "rfc/9110 · 8/crest · e624ac72"
contentUuid: "aa3b127a-31a5-58cd-8e95-600fe5ca7c53"
diamondUuid: "05bd5812-63f4-842f-8e9b-cc47e2196e79"
uuid: "e624ac72-fcfb-89d3-a422-a43737930879"
horo: 8
typography:
  partition: rfc
  bondDegree: 0
standards:
  - "9110 §13 caching"
bindings: []
signatures:
  computationUuid: "d68d9eb2-1101-8ea5-974c-07b5a853828b"
  stages:
    - stage: path
      stageUuid: "652587c3-909b-8d50-97c1-e295c255f0d9"
    - stage: trinity
      stageUuid: "baeed394-197f-892e-9714-17513394a96a"
    - stage: boundary
      stageUuid: "5cadca3f-5594-8c78-8370-10038188bc30"
    - stage: links
      stageUuid: "4d9381ce-6a90-8ff1-997d-698d078ef7e9"
    - stage: horo
      stageUuid: "f99a4383-5e70-864e-ad4a-3505232ecbb7"
    - stage: seal
      stageUuid: "71e82787-6e2f-8ec3-ae46-a24621d7aabf"
    - stage: uuid
      stageUuid: "97c196f7-d5b3-8da3-98cb-33feb077b980"
version: 2
---
# RFC 9110 — HTTP Semantics

**Edition:** RFC 9110 (Jun 2022) — supersedes RFC 7230–7235.
**Publisher:** <https://www.rfc-editor.org/info/rfc9110>

## What's here

- `cache.ts` — Payload-CMS-aware cache wrappers built on Next.js
  `unstable_cache`. Implements **§13 caching** semantics (cache key, tag-based
  invalidation, locale-keyed cache buckets).

## Companion citations

- **RFC 9111** — HTTP caching (companion document; expands on §13).
- **RFC 7234** — HTTP/1.1 caching (obsoleted, but still referenced where the
  Payload server upstream uses HTTP/1.1 conventions).
- **W3C HTTP-Cache** — `stale-while-revalidate` directive.
- **BCP 47** — locale-keyed cache buckets per ISO 8601 / Unicode CLDR locale.

## Used by

- `src/utilities/{getDocument, getGlobals, getRedirects}.ts` — typed
  cache-fetcher wrappers.
- Anywhere `next/cache` `unstable_cache` is used through a Payload `findByID`
  / `findGlobal` / `find` query.

## Out of scope

- HTTP request/response construction itself — that's `next/server` /
  `Response`. This folder is *only* the cache layer.
- ETag / `Last-Modified` validators — Next.js handles those automatically
  for static / revalidated routes; not implemented here.
