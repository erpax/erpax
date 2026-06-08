---
name: query
description: "Use when caching or deduping queries by identity — a normalized query string hashes to a content-uuid, so the same query shares one identity and a change invalidates by content-address."
atomPath: quantum/query
coordinate: quantum/query · 5/round · c65bb32c
contentUuid: "977e967f-e1f2-5139-9b0b-2e17c4e138f3"
diamondUuid: "f42d1202-d4d7-8db7-8ce0-2178de8c04f7"
uuid: "c65bb32c-c274-8804-8641-8b5a1d916f58"
horo: 5
bonds:
  in:
    - engine
    - law
    - quantum
    - query
    - sql
    - thing
  out:
    - engine
    - law
    - query
    - sql
    - thing
typography:
  partition: quantum
  bondDegree: 20
  neighbors: []
standards:
  - "RFC 9562 §5.8 content-uuid (the query cache key)"
bindings: []
neighbors:
  wikilink:
    - law
    - merge
    - quantum
    - query
    - uuid
  matrix:
    - engine
    - law
    - query
    - sql
    - thing
  backlinks:
    - engine
    - law
    - query
    - sql
    - thing
signatures:
  computationUuid: "8b931858-3026-8d03-968d-f8940a413df3"
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
      stageUuid: "e8fed717-fd00-8b4d-9a7a-65338e782ed1"
    - stage: seal
      stageUuid: "885faca4-5922-838b-865e-6e78c21e45ea"
    - stage: uuid
      stageUuid: "c1d4681f-b3b5-8a1a-8c20-2d8dfb092a9d"
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
    computationUuid: "8b931858-3026-8d03-968d-f8940a413df3"
    contentUuid: "977e967f-e1f2-5139-9b0b-2e17c4e138f3"
version: 2
---
# quantum/query — a query as a content-uuid

The quantum facet of [[query]]: a normalized query string hashes to a content-[[uuid]], so the same query (whitespace/case folded) shares **one identity** — a cache key / [[merge]] — and any change yields a new uuid (cache invalidation by content-address). The generic counterpart of [[quantum]]/sql. Merges into [[query]].

Matter-twin: `src/quantum/query/index.ts` (`queryUuid` · `sameQuery`). Composes [[query]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: two queries share one identity iff their normalized text (trimmed and lower-cased) is equal — normalization defines the equivalence, so a lookup hits the same cache key under any whitespace or case variation, and any meaningful change yields a new uuid that invalidates by content-address.**

@standard RFC 9562 §5.8 content-uuid (the query cache key)

<sub>content-uuid `977e967f-e1f2-5139-9b0b-2e17c4e138f3` · account `quantum/query` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
