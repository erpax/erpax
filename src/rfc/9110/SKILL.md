---
name: "9110"
description: Use when implementing or referencing RFC 9110 — HTTP Semantics.
atomPath: "rfc/9110"
coordinate: "rfc/9110 · 1/base · 282a22e3"
contentUuid: "c7b1856a-7dcd-5d7d-802e-b8c7e5691cf8"
diamondUuid: "f1121bcd-7e9e-852c-be1c-ab4ddcd0d16c"
uuid: "282a22e3-f989-8de0-b528-c42b0e437ad9"
horo: 1
typography:
  partition: rfc
  bondDegree: 6
standards:
  - "9110 §13 caching"
bindings: []
signatures:
  computationUuid: "250bef6f-2bd9-8f60-b9b3-7a6c0ac5bc52"
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
      stageUuid: "148d5d56-5e4e-8d75-8330-d55587fb2708"
    - stage: seal
      stageUuid: "71e82787-6e2f-8ec3-ae46-a24621d7aabf"
    - stage: uuid
      stageUuid: "591fd36b-8083-8955-a587-60cf215b3399"
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
