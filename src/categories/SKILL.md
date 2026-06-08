---
name: categories
description: "Use when building or browsing hierarchical content or product taxonomies — title, URL slug (per-tenant unique), parent relationship, breadcrumb trail — for posts, catalogue products, or any schema.org DefinedTerm classification. The tenant-scoped category taxonomy node."
atomPath: categories
coordinate: categories · 2/share · 54897dee
contentUuid: "aba3fd73-a082-57e4-bd72-a4d1ac6b9835"
diamondUuid: "b2ee1f33-2e95-829c-847e-4689b0d33607"
uuid: "54897dee-6e7f-8aa6-8f54-75d9ad1fa174"
horo: 2
bonds:
  in:
    - posts
  out:
    - posts
typography:
  partition: categories
  bondDegree: 4
  neighbors: []
standards:
  - "3986 uri slug-to-url"
  - schema.org Category
  - "schema.org DefinedTerm taxonomic-term"
bindings: []
neighbors:
  wikilink:
    - posts
  matrix:
    - posts
  backlinks:
    - posts
signatures:
  computationUuid: "69f4b8ae-3b99-8f23-93f7-3cd82a8ad44f"
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
      stageUuid: "7d66919b-df57-85e3-9882-909aa977b8ce"
    - stage: seal
      stageUuid: "4496b3c8-9883-8be9-9995-fafc675b6d91"
    - stage: uuid
      stageUuid: "a0ca19ed-c111-8258-afab-9cba4f6adeee"
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
