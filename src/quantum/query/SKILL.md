---
name: query
description: "Use when caching or deduping queries by identity — a normalized query string hashes to a content-uuid, so the same query shares one identity and a change invalidates by content-address."
atomPath: "quantum/query"
coordinate: "quantum/query · 2/share · 6f929a63"
contentUuid: "9972d4de-a810-5e45-aa50-ad59b57c1255"
diamondUuid: "95b88997-0e71-85f9-a463-33a7db556d36"
uuid: "6f929a63-da9f-82d3-99d1-995a6f961ecd"
horo: 2
typography:
  partition: quantum
  bondDegree: 20
standards:
  - "RFC 9562 §5.8 content-uuid (the query cache key)"
bindings: []
signatures:
  computationUuid: "c78552c6-ee65-80ed-b0fa-cc8a63ba60cb"
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
      stageUuid: "f7baaf58-895a-84e2-b9c6-c9023154ebcd"
    - stage: seal
      stageUuid: "885faca4-5922-838b-865e-6e78c21e45ea"
    - stage: uuid
      stageUuid: "1cbce402-c0ed-8e27-9644-845dff6a7e0c"
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
    computationUuid: "c78552c6-ee65-80ed-b0fa-cc8a63ba60cb"
    contentUuid: "9972d4de-a810-5e45-aa50-ad59b57c1255"
version: 2
---
# quantum/query — a query as a content-uuid

The quantum facet of [[query]]: a normalized query string hashes to a content-[[uuid]], so the same query (whitespace/case folded) shares **one identity** — a cache key / [[merge]] — and any change yields a new uuid (cache invalidation by content-address). The generic counterpart of [[quantum]]/sql. Merges into [[query]].

Matter-twin: `src/quantum/query/index.ts` (`queryUuid` · `sameQuery`). Composes [[query]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: two queries share one identity iff their normalized text (trimmed and lower-cased) is equal — normalization defines the equivalence, so a lookup hits the same cache key under any whitespace or case variation, and any meaningful change yields a new uuid that invalidates by content-address.**

@standard RFC 9562 §5.8 content-uuid (the query cache key)

<sub>content-uuid `9972d4de-a810-5e45-aa50-ad59b57c1255` · account `quantum/query` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
