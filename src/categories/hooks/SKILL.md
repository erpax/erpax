---
name: hooks
description: "Use when wiring the Categories collection's lifecycle — the beforeChange barrel that pins every category row to the active tenant so multi-tenant isolation holds at the collection boundary."
atomPath: "categories/hooks"
coordinate: "categories/hooks · 9/unity · 1dbb7bc9"
contentUuid: "d3a6539c-5111-5dc8-b3f1-4e508a38b112"
diamondUuid: "4779a912-2174-812d-8ff1-cc70a77f1b05"
uuid: "1dbb7bc9-f941-85d1-90f9-61cb7c2119c1"
horo: 9
typography:
  partition: categories
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "c0eabdd1-456b-8a13-ad0a-56697ceac197"
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
      stageUuid: "a3f24425-543f-8ee1-905f-ccf42dc27b47"
    - stage: seal
      stageUuid: "ce80498c-9c3c-8914-905b-b6e0708955ca"
    - stage: uuid
      stageUuid: "b62d05a5-96d5-8747-b681-36afcba32499"
version: 2
---
# categories/hooks — the category collection-module boundary

The collection-level [[hooks]] barrel for Categories. One path-segment shallow so collection wiring imports `categoriesBeforeChange` (the ordered beforeChange chain) without reaching into each sibling. The only law it enforces today is tenant-pinning — `enforceDocumentTenantForUser` attaches/creates each category inside the caller's active tenant, so isolation is decided at the write boundary, not downstream.

Matter-twin: `src/categories/hooks/index.ts` (barrel re-exporting `categoriesBeforeChange` from `./beforeChange`). Composes [[hooks]].

**Law — [[law]]: the Categories beforeChange chain is one ordered barrel — every row is tenant-pinned at the collection boundary before it is written (multi-tenant isolation is decided on the write path, not after).**
