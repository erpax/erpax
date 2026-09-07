---
name: "9110"
description: Use when implementing or referencing RFC 9110 — HTTP Semantics.
atomPath: "rfc/9110"
coordinate: "rfc/9110 · 7/descent · 00adb147"
contentUuid: "52597924-ac33-5a83-a834-c8c642ec5e60"
diamondUuid: "14a5bf9f-c32d-82d2-8a9d-3210773e17e0"
uuid: "00adb147-2176-82a2-8339-ae40e99d96dc"
horo: 7
typography:
  partition: rfc
  bondDegree: 6
standards:
  - "9110 §13 caching"
bindings: []
signatures:
  computationUuid: "7599b799-3a3e-8480-9d37-a33124edddef"
  stages:
    - stage: path
      stageUuid: "652587c3-909b-8d50-97c1-e295c255f0d9"
    - stage: trinity
      stageUuid: "baeed394-197f-892e-9714-17513394a96a"
    - stage: boundary
      stageUuid: "5cadca3f-5594-8c78-8370-10038188bc30"
    - stage: links
      stageUuid: "d5bb3a2f-a566-8f71-9ff0-e94904f6a518"
    - stage: horo
      stageUuid: "6363b4b4-40b4-882d-aab6-ea5981157bd3"
    - stage: seal
      stageUuid: "71e82787-6e2f-8ec3-ae46-a24621d7aabf"
    - stage: uuid
      stageUuid: "076fedc4-3cf1-8737-9bd6-b76f5f46978c"
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

Composes: [[standards]].
