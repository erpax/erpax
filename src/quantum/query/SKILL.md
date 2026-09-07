---
name: query
description: "Use when caching or deduping queries by identity — a normalized query string hashes to a content-uuid, so the same query shares one identity and a change invalidates by content-address."
atomPath: "quantum/query"
coordinate: "quantum/query · 4/weave · 3f706ba3"
contentUuid: "11c93a38-dd65-5c23-aed6-97fa7c549095"
diamondUuid: "83d2eecd-261c-8313-a814-cfeb12fc1de5"
uuid: "3f706ba3-18b2-8937-99d3-01bc178c42d3"
horo: 4
typography:
  partition: quantum
  bondDegree: 20
standards:
  - "RFC 9562 §5.8 content-uuid (the query cache key)"
bindings: []
signatures:
  computationUuid: "4553c5d2-bf72-89cd-a1e8-c7a7853ae2b6"
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
      stageUuid: "ff6d18fc-7b0b-869e-9c49-e75455f763b6"
    - stage: seal
      stageUuid: "885faca4-5922-838b-865e-6e78c21e45ea"
    - stage: uuid
      stageUuid: "374c48af-fe3d-8bb3-862f-4c398a4324df"
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
    computationUuid: "4553c5d2-bf72-89cd-a1e8-c7a7853ae2b6"
    contentUuid: "11c93a38-dd65-5c23-aed6-97fa7c549095"
version: 2
---
# quantum/query — a query as a content-uuid

The quantum facet of [[query]]: a normalized query string hashes to a content-[[uuid]], so the same query (whitespace/case folded) shares **one identity** — a cache key / [[merge]] — and any change yields a new uuid (cache invalidation by content-address). The generic counterpart of [[quantum]]/sql. Merges into [[query]].

Matter-twin: `src/quantum/query/index.ts` (`queryUuid` · `sameQuery`). Composes [[query]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: two queries share one identity iff their normalized text (trimmed and lower-cased) is equal — normalization defines the equivalence, so a lookup hits the same cache key under any whitespace or case variation, and any meaningful change yields a new uuid that invalidates by content-address.**

@standard RFC 9562 §5.8 content-uuid (the query cache key)

<sub>content-uuid `11c93a38-dd65-5c23-aed6-97fa7c549095` · account `quantum/query` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
