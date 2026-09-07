---
name: "9110"
description: Use when implementing or referencing RFC 9110 — HTTP Semantics.
atomPath: "rfc/9110"
coordinate: "rfc/9110 · 2/share · 0da428a5"
contentUuid: "1d5ec8d5-c49e-5d9a-9e69-7f276498b06f"
diamondUuid: "b0a6d8e4-ca3e-82aa-a660-b296dc48e37e"
uuid: "0da428a5-4f76-866f-8c2a-464f1d44f5b8"
horo: 2
typography:
  partition: rfc
  bondDegree: 6
standards:
  - "9110 §13 caching"
bindings: []
signatures:
  computationUuid: "d95dc193-108c-8ba7-b178-6261eb867a5a"
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
      stageUuid: "cabf47af-7f53-82dc-b281-00ce93a9b82d"
    - stage: seal
      stageUuid: "71e82787-6e2f-8ec3-ae46-a24621d7aabf"
    - stage: uuid
      stageUuid: "4fd5142c-6a2f-8aee-a39b-7c27faf89a95"
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
