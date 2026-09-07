---
name: hooks
description: "Use when wiring the Categories collection's lifecycle — the beforeChange barrel that pins every category row to the active tenant so multi-tenant isolation holds at the collection boundary."
atomPath: "categories/hooks"
coordinate: "categories/hooks · 9/unity · 4f908cc5"
contentUuid: "7c3e72d8-77fb-5a36-9bb4-62a6abb999cd"
diamondUuid: "775f1912-2dc1-8567-8872-6417ab52b9eb"
uuid: "4f908cc5-8bef-8f25-b893-b4d55bdc3b8b"
horo: 9
typography:
  partition: categories
  bondDegree: 312
standards: []
bindings: []
signatures:
  computationUuid: "fa4e464a-9ed2-8cd3-a733-6b80a4048208"
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
      stageUuid: "8e5c7300-a1bc-8656-a310-e5c109c54aa2"
    - stage: seal
      stageUuid: "ce80498c-9c3c-8914-905b-b6e0708955ca"
    - stage: uuid
      stageUuid: "8a0a36c6-a23c-832e-920e-d91bdc41512d"
version: 2
---
# categories/hooks — the category collection-module boundary

The collection-level [[hooks]] barrel for Categories. One path-segment shallow so collection wiring imports `categoriesBeforeChange` (the ordered beforeChange chain) without reaching into each sibling. The only law it enforces today is tenant-pinning — `enforceDocumentTenantForUser` attaches/creates each category inside the caller's active tenant, so isolation is decided at the write boundary, not downstream.

Matter-twin: `src/categories/hooks/index.ts` (barrel re-exporting `categoriesBeforeChange` from `./beforeChange`). Composes [[hooks]].

**Law — [[law]]: the Categories beforeChange chain is one ordered barrel — every row is tenant-pinned at the collection boundary before it is written (multi-tenant isolation is decided on the write path, not after).**
