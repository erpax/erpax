---
name: sql
description: "Use when caching or deduping SQL queries by identity — the canonical normalized query hashes to a content-uuid, so equivalent queries share one identity and a changed query invalidates by content-address."
atomPath: "quantum/sql"
coordinate: "quantum/sql · 7/descent · 905b486e"
contentUuid: "0c5ff349-80fc-5074-ab52-dde9109ac031"
diamondUuid: "0db7a406-f023-85d2-b608-f9aba3137799"
uuid: "905b486e-10c6-892a-b232-8611304989e7"
horo: 7
typography:
  partition: quantum
  bondDegree: 29
standards:
  - "RFC 9562 §5.8 content-uuid (the query cache key)"
bindings: []
signatures:
  computationUuid: "2d4e1698-2d5e-8a50-b54e-d556cc11f29e"
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
      stageUuid: "e4fbe2d8-f411-8444-90a1-7e622e94d1c6"
    - stage: seal
      stageUuid: "67d3b559-1601-8d50-b8ee-f7deae87f43b"
    - stage: uuid
      stageUuid: "4577f2cd-eb54-8e79-82df-d850d8d6d5d9"
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
    computationUuid: "2d4e1698-2d5e-8a50-b54e-d556cc11f29e"
    contentUuid: "0c5ff349-80fc-5074-ab52-dde9109ac031"
version: 2
---
# quantum/sql — a query as a content-uuid

The quantum facet of [[sql]]: a query's **canonical normalized form** hashes to a content-[[uuid]], so equivalent queries (e.g. reordered columns) share **one identity** — a cache key / [[merge]] — and any change yields a new uuid (cache invalidation by content-address). Merges into [[sql]].

Matter-twin: `src/quantum/sql/index.ts` (`queryUuid` · `sameQuery`). Composes [[sql]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: query-identity is the canonical normal form, never the surface syntax. Two queries share one uuid iff they normalize to the same form, so every member of a normalization-equivalence class (reordered columns and all) collapses to exactly one cache key, and any change that survives normalization necessarily forks the uuid — equivalence-by-content, invalidation-by-content, both at once.**

@standard RFC 9562 §5.8 content-uuid (the query cache key)

<sub>content-uuid `0c5ff349-80fc-5074-ab52-dde9109ac031` · account `quantum/sql` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
