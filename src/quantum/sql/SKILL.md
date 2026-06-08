---
name: sql
description: "Use when caching or deduping SQL queries by identity — the canonical normalized query hashes to a content-uuid, so equivalent queries share one identity and a changed query invalidates by content-address."
atomPath: quantum/sql
coordinate: quantum/sql · 1/base · b5523992
contentUuid: "0bbe5bec-7536-5b66-8993-a48ebdaec644"
diamondUuid: "6ae9934e-d0f1-812a-a5d2-53eb5a5cd6f9"
uuid: "b5523992-11c5-8a54-8f74-28b956cd6daa"
horo: 1
bonds:
  in:
    - column
    - law
    - merge
    - quantum
    - query
    - sql
    - table
    - uuid
  out:
    - column
    - law
    - merge
    - quantum
    - query
    - sql
    - table
    - uuid
typography:
  partition: quantum
  bondDegree: 29
  neighbors: []
standards:
  - "RFC 9562 §5.8 content-uuid (the query cache key)"
bindings: []
neighbors:
  wikilink:
    - law
    - merge
    - quantum
    - sql
    - uuid
  matrix:
    - column
    - law
    - merge
    - quantum
    - query
    - sql
    - table
    - uuid
  backlinks:
    - column
    - law
    - merge
    - quantum
    - query
    - sql
    - table
    - uuid
signatures:
  computationUuid: "e7e105b2-43d1-8750-8a25-5ed5ffcfedd0"
  stages:
    - stage: path
      stageUuid: "d1c97627-32e2-8c5f-b317-c4112004cb8f"
    - stage: trinity
      stageUuid: "9c0e22e1-2fff-880e-be2b-430f367d0c05"
    - stage: boundary
      stageUuid: "db8dec9d-4139-8334-b342-214116740c19"
    - stage: links
      stageUuid: "bd7cca66-6a06-8407-83b8-c68e8b5c0fb1"
    - stage: horo
      stageUuid: "72a5c457-6b0b-8bd2-b0aa-cd6f4c7574df"
    - stage: seal
      stageUuid: "67d3b559-1601-8d50-b8ee-f7deae87f43b"
    - stage: uuid
      stageUuid: "75f719e4-2bc8-896a-933b-5b28c1311775"
quantum:
  superposition:
    - column
    - law
    - merge
    - quantum
    - query
    - sql
    - table
    - uuid
    - superposition
  collapse:
    - "RFC 9562 §5.8 content-uuid (the query cache key)"
    - "Use when caching or deduping SQL queries by identity — the canonical normalized query hashes to a content-uuid, so equivalent queries share one identity and a changed query invalidates by content-address."
    - "matter-twin:src/quantum/sql/index.ts"
    - "query-identity is the canonical normal form, never the surface syntax. Two queries share one uuid iff they normalize to the same form, so every member of a normalization-equivalence class (reordered columns and all) collapses to exactly one cache key, and any change that survives normalization necessarily forks the uuid — equivalence-by-content, invalidation-by-content, both at once."
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "e7e105b2-43d1-8750-8a25-5ed5ffcfedd0"
    contentUuid: "0bbe5bec-7536-5b66-8993-a48ebdaec644"
version: 2
---
# quantum/sql — a query as a content-uuid

The quantum facet of [[sql]]: a query's **canonical normalized form** hashes to a content-[[uuid]], so equivalent queries (e.g. reordered columns) share **one identity** — a cache key / [[merge]] — and any change yields a new uuid (cache invalidation by content-address). Merges into [[sql]].

Matter-twin: `src/quantum/sql/index.ts` (`queryUuid` · `sameQuery`). Composes [[sql]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: query-identity is the canonical normal form, never the surface syntax. Two queries share one uuid iff they normalize to the same form, so every member of a normalization-equivalence class (reordered columns and all) collapses to exactly one cache key, and any change that survives normalization necessarily forks the uuid — equivalence-by-content, invalidation-by-content, both at once.**

@standard RFC 9562 §5.8 content-uuid (the query cache key)

<sub>content-uuid `0bbe5bec-7536-5b66-8993-a48ebdaec644` · account `quantum/sql` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
