---
name: hooks
description: "Use when wiring the Categories collection's lifecycle — the beforeChange barrel that pins every category row to the active tenant so multi-tenant isolation holds at the collection boundary."
atomPath: "categories/hooks"
coordinate: "categories/hooks · 3/3 · 1decd564"
contentUuid: "cf04666f-c1d8-5c08-9881-02e28d23bda1"
diamondUuid: "068a5f71-5b38-8eaf-8ce9-e08dc1e07e26"
uuid: "1decd564-bb93-84ab-b801-91764481c24c"
horo: 3
typography:
  partition: categories
  bondDegree: 348
standards: []
bindings: []
signatures:
  computationUuid: "7dedc435-1e6c-8e7a-90d1-9a85444db914"
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
      stageUuid: "7d023242-9a1a-8f89-98c6-4cee3b9163a9"
    - stage: seal
      stageUuid: "ce80498c-9c3c-8914-905b-b6e0708955ca"
    - stage: uuid
      stageUuid: "8baba1ba-c93b-8332-a142-a96f01f4604e"
version: 2
---
# categories/hooks — the category collection-module boundary

The collection-level [[hooks]] barrel for Categories. One path-segment shallow so collection wiring imports `categoriesBeforeChange` (the ordered beforeChange chain) without reaching into each sibling. The only law it enforces today is tenant-pinning — `enforceDocumentTenantForUser` attaches/creates each category inside the caller's active tenant, so isolation is decided at the write boundary, not downstream.

Matter-twin: `src/categories/hooks/index.ts` (barrel re-exporting `categoriesBeforeChange` from `./beforeChange`). Composes [[hooks]].

**Law — [[law]]: the Categories beforeChange chain is one ordered barrel — every row is tenant-pinned at the collection boundary before it is written (multi-tenant isolation is decided on the write path, not after).**
