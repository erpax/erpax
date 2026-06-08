---
name: "9110"
description: Use when implementing or referencing RFC 9110 — HTTP Semantics.
atomPath: rfc/9110
coordinate: rfc/9110 · 4/weave · 4764bdee
contentUuid: "162d0e0a-f2d7-549c-86fb-ef23ce433165"
diamondUuid: "00c89991-1cb0-816d-95e3-4a3215f205c4"
uuid: "4764bdee-619e-887a-b3b0-34a25a5db68d"
horo: 4
bonds:
  in: []
  out:
    - "3986"
typography:
  partition: rfc
  bondDegree: 0
  neighbors: []
standards:
  - "9110 §13 caching"
  - "ILO-C111"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "d039ab91-d5ad-8240-b1d1-b4ee6418eded"
  stages:
    - stage: path
      stageUuid: "652587c3-909b-8d50-97c1-e295c255f0d9"
    - stage: trinity
      stageUuid: "46f78fad-deee-882d-a5ef-c288241df5e4"
    - stage: boundary
      stageUuid: "5cadca3f-5594-8c78-8370-10038188bc30"
    - stage: links
      stageUuid: "4d9381ce-6a90-8ff1-997d-698d078ef7e9"
    - stage: horo
      stageUuid: "0438edf5-39fe-8602-b442-0abf82c651a3"
    - stage: seal
      stageUuid: "468773ed-fc62-85f1-9b8b-6bc84cbe272f"
    - stage: uuid
      stageUuid: "156c8538-453c-864e-aaa2-0478dcd0c873"
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
