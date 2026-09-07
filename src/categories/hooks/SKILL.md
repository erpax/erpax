---
name: hooks
description: "Use when wiring the Categories collection's lifecycle — the beforeChange barrel that pins every category row to the active tenant so multi-tenant isolation holds at the collection boundary."
atomPath: "categories/hooks"
coordinate: "categories/hooks · 3/3 · 1197242f"
contentUuid: "a795038b-9b0b-55ea-9622-a0e4253ad4ac"
diamondUuid: "71c4bd42-27bd-81b1-b176-0ba93df84778"
uuid: "1197242f-c86e-8d17-b51f-f171a0d401dc"
horo: 3
typography:
  partition: categories
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "5867c052-f011-8e01-a255-5764e39d1348"
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
      stageUuid: "bc157f90-b2fe-8aa6-89d5-4126791465b5"
    - stage: seal
      stageUuid: "ce80498c-9c3c-8914-905b-b6e0708955ca"
    - stage: uuid
      stageUuid: "62cf7d92-681a-8109-a24d-8a7e95b52b69"
version: 2
---
# categories/hooks — the category collection-module boundary

The collection-level [[hooks]] barrel for Categories. One path-segment shallow so collection wiring imports `categoriesBeforeChange` (the ordered beforeChange chain) without reaching into each sibling. The only law it enforces today is tenant-pinning — `enforceDocumentTenantForUser` attaches/creates each category inside the caller's active tenant, so isolation is decided at the write boundary, not downstream.

Matter-twin: `src/categories/hooks/index.ts` (barrel re-exporting `categoriesBeforeChange` from `./beforeChange`). Composes [[hooks]].

**Law — [[law]]: the Categories beforeChange chain is one ordered barrel — every row is tenant-pinned at the collection boundary before it is written (multi-tenant isolation is decided on the write path, not after).**
