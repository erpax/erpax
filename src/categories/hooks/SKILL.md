---
name: hooks
description: "Use when wiring the Categories collection's lifecycle — the beforeChange barrel that pins every category row to the active tenant so multi-tenant isolation holds at the collection boundary."
atomPath: "categories/hooks"
coordinate: "categories/hooks · 6/6 · 43d19ac0"
contentUuid: "d55de9ae-68f6-5e8b-a3cc-e0c486fad9cc"
diamondUuid: "e6010471-8748-8525-bdca-efa84f89aed9"
uuid: "43d19ac0-f383-8919-979b-93bc6e897ebe"
horo: 6
typography:
  partition: categories
  bondDegree: 316
standards: []
bindings: []
signatures:
  computationUuid: "54a239f7-b3ab-867c-b9c5-d65b92d8fe9a"
  stages:
    - stage: path
      stageUuid: "1f271df0-1d7e-8f9e-be37-3ea495462722"
    - stage: trinity
      stageUuid: "32bcab85-a62c-87d0-922c-55a8843ba87b"
    - stage: boundary
      stageUuid: "f81e2019-0a32-8390-98ea-1cc785de84a0"
    - stage: links
      stageUuid: "71e08471-92a0-85b4-b926-d21affcbf63f"
    - stage: horo
      stageUuid: "c7eb5283-cdf1-8e1c-bff5-fe841a034b32"
    - stage: seal
      stageUuid: "ce80498c-9c3c-8914-905b-b6e0708955ca"
    - stage: uuid
      stageUuid: "95443bff-0f43-8d3d-a5d1-4513954a6789"
version: 2
---
# categories/hooks — the category collection-module boundary

The collection-level [[hooks]] barrel for Categories. One path-segment shallow so collection wiring imports `categoriesBeforeChange` (the ordered beforeChange chain) without reaching into each sibling. The only law it enforces today is tenant-pinning — `enforceDocumentTenantForUser` attaches/creates each category inside the caller's active tenant, so isolation is decided at the write boundary, not downstream.

Matter-twin: `src/categories/hooks/index.ts` (barrel re-exporting `categoriesBeforeChange` from `./beforeChange`). Composes [[hooks]].

**Law — [[law]]: the Categories beforeChange chain is one ordered barrel — every row is tenant-pinned at the collection boundary before it is written (multi-tenant isolation is decided on the write path, not after).**
