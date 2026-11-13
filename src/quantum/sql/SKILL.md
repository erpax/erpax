---
name: sql
description: "Use when caching or deduping SQL queries by identity — the canonical normalized query hashes to a content-uuid, so equivalent queries share one identity and a changed query invalidates by content-address."
atomPath: "quantum/sql"
coordinate: "quantum/sql · 1/base · fd230a5d"
contentUuid: "262fe433-572b-545f-84cd-47052526107e"
diamondUuid: "aea6a10e-4b1b-8c4e-9ae2-9651cd4615be"
uuid: "fd230a5d-eaaa-8d8c-aedd-edb74fa8ee5a"
horo: 1
typography:
  partition: quantum
  bondDegree: 26
standards:
  - "RFC 9562 §5.8 content-uuid (the query cache key)"
bindings: []
signatures:
  computationUuid: "ca623673-8c49-8175-b027-6320fb1ef5b2"
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
      stageUuid: "155b9ba6-268b-8285-a435-f94ae5c425e8"
    - stage: seal
      stageUuid: "67d3b559-1601-8d50-b8ee-f7deae87f43b"
    - stage: uuid
      stageUuid: "4ee54875-024f-840d-a3f4-942b8d3a7ea7"
quantum:
  superposition:
    - column
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
    computationUuid: "ca623673-8c49-8175-b027-6320fb1ef5b2"
    contentUuid: "262fe433-572b-545f-84cd-47052526107e"
version: 2
---
# quantum/sql — a query as a content-uuid

The quantum facet of [[sql]]: a query's **canonical normalized form** hashes to a content-[[uuid]], so equivalent queries (e.g. reordered columns) share **one identity** — a cache key / [[merge]] — and any change yields a new uuid (cache invalidation by content-address). Merges into [[sql]].

Matter-twin: `src/quantum/sql/index.ts` (`queryUuid` · `sameQuery`). Composes [[sql]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: query-identity is the canonical normal form, never the surface syntax. Two queries share one uuid iff they normalize to the same form, so every member of a normalization-equivalence class (reordered columns and all) collapses to exactly one cache key, and any change that survives normalization necessarily forks the uuid — equivalence-by-content, invalidation-by-content, both at once.**

@standard RFC 9562 §5.8 content-uuid (the query cache key)

<sub>content-uuid `262fe433-572b-545f-84cd-47052526107e` · account `quantum/sql` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
