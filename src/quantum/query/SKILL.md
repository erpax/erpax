---
name: query
description: "Use when caching or deduping queries by identity — a normalized query string hashes to a content-uuid, so the same query shares one identity and a change invalidates by content-address."
atomPath: "quantum/query"
coordinate: "quantum/query · 8/crest · 7de9ee32"
contentUuid: "86b88b29-a37e-5b28-85ee-1d85be4d1f48"
diamondUuid: "79efd81f-37e2-828c-8dca-200da27e8bbe"
uuid: "7de9ee32-6890-8876-ba8d-a0a0c0df27b8"
horo: 8
typography:
  partition: quantum
  bondDegree: 20
standards:
  - "RFC 9562 §5.8 content-uuid (the query cache key)"
bindings: []
signatures:
  computationUuid: "163ff0ae-bedc-8128-b9ce-c91ae66022a2"
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
      stageUuid: "b7cf2773-ea34-8848-a11e-cb411e41aa75"
    - stage: seal
      stageUuid: "885faca4-5922-838b-865e-6e78c21e45ea"
    - stage: uuid
      stageUuid: "f7a75013-c1fe-8071-896c-6a4d25662c56"
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
    computationUuid: "163ff0ae-bedc-8128-b9ce-c91ae66022a2"
    contentUuid: "86b88b29-a37e-5b28-85ee-1d85be4d1f48"
version: 2
---
# quantum/query — a query as a content-uuid

The quantum facet of [[query]]: a normalized query string hashes to a content-[[uuid]], so the same query (whitespace/case folded) shares **one identity** — a cache key / [[merge]] — and any change yields a new uuid (cache invalidation by content-address). The generic counterpart of [[quantum]]/sql. Merges into [[query]].

Matter-twin: `src/quantum/query/index.ts` (`queryUuid` · `sameQuery`). Composes [[query]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: two queries share one identity iff their normalized text (trimmed and lower-cased) is equal — normalization defines the equivalence, so a lookup hits the same cache key under any whitespace or case variation, and any meaningful change yields a new uuid that invalidates by content-address.**

@standard RFC 9562 §5.8 content-uuid (the query cache key)

<sub>content-uuid `86b88b29-a37e-5b28-85ee-1d85be4d1f48` · account `quantum/query` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
