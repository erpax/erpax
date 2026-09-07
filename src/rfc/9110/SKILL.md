---
name: "9110"
description: Use when implementing or referencing RFC 9110 — HTTP Semantics.
atomPath: "rfc/9110"
coordinate: "rfc/9110 · 8/crest · e1886407"
contentUuid: "ff959672-bf70-55e9-889e-972d4b7f5ea4"
diamondUuid: "ef7f9c3d-7303-8846-867a-54a7f1362640"
uuid: "e1886407-5fce-864a-85f3-cacc4a4e8e1a"
horo: 8
typography:
  partition: rfc
  bondDegree: 6
standards:
  - "9110 §13 caching"
bindings: []
signatures:
  computationUuid: "f171b985-f17a-8ebc-9f1d-7daa0f09be8c"
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
      stageUuid: "2c6e86a8-5f8d-8e8f-8adc-3b52a4509aa0"
    - stage: seal
      stageUuid: "71e82787-6e2f-8ec3-ae46-a24621d7aabf"
    - stage: uuid
      stageUuid: "58941b27-3b28-85a7-ba5b-7c7199f13af3"
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
