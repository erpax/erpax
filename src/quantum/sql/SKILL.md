---
name: sql
description: "Use when caching or deduping SQL queries by identity — the canonical normalized query hashes to a content-uuid, so equivalent queries share one identity and a changed query invalidates by content-address."
atomPath: "quantum/sql"
coordinate: "quantum/sql · 1/base · fd230a5d"
contentUuid: "cca6035f-aa4a-55a8-9026-4350b179edc0"
diamondUuid: "93e8e0c5-8f80-8142-a2ee-5ded530ba372"
uuid: "fd230a5d-eaaa-8d8c-aedd-edb74fa8ee5a"
horo: 1
typography:
  partition: quantum
  bondDegree: 23
standards:
  - "RFC 9562 §5.8 content-uuid (the query cache key)"
bindings: []
signatures:
  computationUuid: "bc29d681-3fb9-846e-9efc-0836b1dc66d2"
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
      stageUuid: "3aef20db-3049-8506-85fe-b50e89dd6b70"
    - stage: seal
      stageUuid: "67d3b559-1601-8d50-b8ee-f7deae87f43b"
    - stage: uuid
      stageUuid: "683621dd-be72-874b-bcd5-e4a1023840d7"
quantum:
  superposition:
    - law
    - merge
    - quantum
    - query
    - sql
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
    computationUuid: "bc29d681-3fb9-846e-9efc-0836b1dc66d2"
    contentUuid: "cca6035f-aa4a-55a8-9026-4350b179edc0"
version: 2
---
# quantum/sql — a query as a content-uuid

The quantum facet of [[sql]]: a query's **canonical normalized form** hashes to a content-[[uuid]], so equivalent queries (e.g. reordered columns) share **one identity** — a cache key / [[merge]] — and any change yields a new uuid (cache invalidation by content-address). Merges into [[sql]].

Matter-twin: `src/quantum/sql/index.ts` (`queryUuid` · `sameQuery`). Composes [[sql]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: query-identity is the canonical normal form, never the surface syntax. Two queries share one uuid iff they normalize to the same form, so every member of a normalization-equivalence class (reordered columns and all) collapses to exactly one cache key, and any change that survives normalization necessarily forks the uuid — equivalence-by-content, invalidation-by-content, both at once.**

@standard RFC 9562 §5.8 content-uuid (the query cache key)

<sub>content-uuid `cca6035f-aa4a-55a8-9026-4350b179edc0` · account `quantum/sql` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
