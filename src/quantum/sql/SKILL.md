---
name: sql
description: "Use when caching or deduping SQL queries by identity — the canonical normalized query hashes to a content-uuid, so equivalent queries share one identity and a changed query invalidates by content-address."
atomPath: "quantum/sql"
coordinate: "quantum/sql · 5/round · 23990548"
contentUuid: "7e758a1b-b7d2-56bf-bbcd-41745b744a1d"
diamondUuid: "0a2824fb-bee1-88d6-bd64-4fecbcbae637"
uuid: "23990548-a3c8-85ab-8504-3c8141887d23"
horo: 5
typography:
  partition: quantum
  bondDegree: 29
standards:
  - "RFC 9562 §5.8 content-uuid (the query cache key)"
bindings: []
signatures:
  computationUuid: "ac7bb098-534c-8d3c-b558-53ee9d1b5e70"
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
      stageUuid: "7a392a1f-f843-80ba-afc8-2ff9d11da314"
    - stage: seal
      stageUuid: "67d3b559-1601-8d50-b8ee-f7deae87f43b"
    - stage: uuid
      stageUuid: "28c2983e-962b-833b-bb92-273be76f9c5d"
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
    computationUuid: "ac7bb098-534c-8d3c-b558-53ee9d1b5e70"
    contentUuid: "7e758a1b-b7d2-56bf-bbcd-41745b744a1d"
version: 2
---
# quantum/sql — a query as a content-uuid

The quantum facet of [[sql]]: a query's **canonical normalized form** hashes to a content-[[uuid]], so equivalent queries (e.g. reordered columns) share **one identity** — a cache key / [[merge]] — and any change yields a new uuid (cache invalidation by content-address). Merges into [[sql]].

Matter-twin: `src/quantum/sql/index.ts` (`queryUuid` · `sameQuery`). Composes [[sql]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: query-identity is the canonical normal form, never the surface syntax. Two queries share one uuid iff they normalize to the same form, so every member of a normalization-equivalence class (reordered columns and all) collapses to exactly one cache key, and any change that survives normalization necessarily forks the uuid — equivalence-by-content, invalidation-by-content, both at once.**

@standard RFC 9562 §5.8 content-uuid (the query cache key)

<sub>content-uuid `7e758a1b-b7d2-56bf-bbcd-41745b744a1d` · account `quantum/sql` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
