---
name: query
description: "Use when caching or deduping queries by identity — a normalized query string hashes to a content-uuid, so the same query shares one identity and a change invalidates by content-address."
atomPath: "quantum/query"
coordinate: "quantum/query · 8/crest · d8a1238f"
contentUuid: "adbe23fe-cf61-5f2f-ac36-9bc4a82632d8"
diamondUuid: "8cef3c2e-5f8e-86b0-9449-ebedc11f49f5"
uuid: "d8a1238f-df2d-85da-9400-3494715f5c17"
horo: 8
typography:
  partition: quantum
  bondDegree: 20
standards:
  - "RFC 9562 §5.8 content-uuid (the query cache key)"
bindings: []
signatures:
  computationUuid: "c9327052-1aa6-837f-90b6-9fd5f27833b4"
  stages:
    - stage: path
      stageUuid: "0c84584d-2b45-867f-aa29-37ccff0fbacd"
    - stage: trinity
      stageUuid: "3a5561d8-58d5-85fd-bd88-699ff51f672f"
    - stage: boundary
      stageUuid: "cba93266-daa1-8bd4-9f39-5c5867b6b34f"
    - stage: links
      stageUuid: "092d754e-7f25-8c4a-b5bd-6871334429c2"
    - stage: horo
      stageUuid: "187c3278-5fff-870d-8b9e-f7ddd9ba19c2"
    - stage: seal
      stageUuid: "885faca4-5922-838b-865e-6e78c21e45ea"
    - stage: uuid
      stageUuid: "743c4943-7f73-80ec-8277-96416ca8baca"
quantum:
  superposition:
    - engine
    - law
    - quantum
    - query
    - sql
    - thing
    - superposition
  collapse:
    - "RFC 9562 §5.8 content-uuid (the query cache key)"
    - "Use when caching or deduping queries by identity — a normalized query string hashes to a content-uuid, so the same query shares one identity and a change invalidates by content-address."
    - "matter-twin:src/quantum/query/index.ts"
    - "two queries share one identity iff their normalized text (trimmed and lower-cased) is equal — normalization defines the equivalence, so a lookup hits the same cache key under any whitespace or case variation, and any meaningful change yields a new uuid that invalidates by content-address."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "c9327052-1aa6-837f-90b6-9fd5f27833b4"
    contentUuid: "adbe23fe-cf61-5f2f-ac36-9bc4a82632d8"
version: 2
---
# quantum/query — a query as a content-uuid

The quantum facet of [[query]]: a normalized query string hashes to a content-[[uuid]], so the same query (whitespace/case folded) shares **one identity** — a cache key / [[merge]] — and any change yields a new uuid (cache invalidation by content-address). The generic counterpart of [[quantum]]/sql. Merges into [[query]].

Matter-twin: `src/quantum/query/index.ts` (`queryUuid` · `sameQuery`). Composes [[query]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: two queries share one identity iff their normalized text (trimmed and lower-cased) is equal — normalization defines the equivalence, so a lookup hits the same cache key under any whitespace or case variation, and any meaningful change yields a new uuid that invalidates by content-address.**

@standard RFC 9562 §5.8 content-uuid (the query cache key)

<sub>content-uuid `adbe23fe-cf61-5f2f-ac36-9bc4a82632d8` · account `quantum/query` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
