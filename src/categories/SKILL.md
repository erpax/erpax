---
name: categories
description: "Use when building or browsing hierarchical content or product taxonomies — title, URL slug (per-tenant unique), parent relationship, breadcrumb trail — for posts, catalogue products, or any schema.org DefinedTerm classification. The tenant-scoped category taxonomy node."
atomPath: categories
coordinate: "categories · 1/base · f995d915"
contentUuid: "24dcd9e8-279e-56dd-8269-15a737d4f637"
diamondUuid: "2f3a84dd-6801-875b-b881-8ee40942cfc7"
uuid: "f995d915-10ab-823b-a2ca-e7dd275c4d76"
horo: 1
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
  computationUuid: "d2e53e18-79c4-8833-a505-60330c851268"
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
      stageUuid: "6277784b-9f39-89a1-8af5-00bbe1224e0c"
    - stage: seal
      stageUuid: "c9671a3f-0a39-88e0-89a4-948f463aec3f"
    - stage: uuid
      stageUuid: "34355265-fff3-821b-a594-a2afa7c295cc"
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
