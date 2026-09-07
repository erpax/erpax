---
name: categories
description: "Use when building or browsing hierarchical content or product taxonomies — title, URL slug (per-tenant unique), parent relationship, breadcrumb trail — for posts, catalogue products, or any schema.org DefinedTerm classification. The tenant-scoped category taxonomy node."
atomPath: categories
coordinate: "categories · 5/round · 871fd874"
contentUuid: "84c8ba8e-563f-514d-9562-5d616f499b92"
diamondUuid: "5a66907c-c7ca-85a6-9450-db5755b9a23f"
uuid: "871fd874-1458-8d4e-9215-e12febe09034"
horo: 5
typography:
  partition: categories
  bondDegree: 4
standards:
  - "3986 uri slug-to-url"
  - "RFC-3986"
  - schema.org Category
  - "schema.org DefinedTerm taxonomic-term"
bindings: []
signatures:
  computationUuid: "ccbf83d4-3f2b-8edd-b647-8b4f2dc07dd3"
  stages:
    - stage: path
      stageUuid: "c2c4ccde-15a0-80b9-8d74-b22aba18e1f2"
    - stage: trinity
      stageUuid: "47eaed2a-1e36-87e8-8ba6-f5a04f82452d"
    - stage: boundary
      stageUuid: "bf1a360f-1650-87c6-b4c3-9d57001305a9"
    - stage: links
      stageUuid: "7dc65476-1349-8559-b4f1-1058292cdb75"
    - stage: horo
      stageUuid: "83bcb405-703c-85d4-b7b5-e4e5f38eb02c"
    - stage: seal
      stageUuid: "c9671a3f-0a39-88e0-89a4-948f463aec3f"
    - stage: uuid
      stageUuid: "d7fe8001-ec7f-8c4f-b35d-6cbd4791c26d"
version: 2
---
# categories

Categories — taxonomy for posts/products with per-tenant slug uniqueness.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- rfc 3986 uri slug-to-url
- schema.org Category
- schema.org DefinedTerm taxonomic-term

Composes: [[Posts]].
