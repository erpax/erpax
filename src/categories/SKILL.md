---
name: categories
description: "Use when building or browsing hierarchical content or product taxonomies — title, URL slug (per-tenant unique), parent relationship, breadcrumb trail — for posts, catalogue products, or any schema.org DefinedTerm classification. The tenant-scoped category taxonomy node."
atomPath: categories
coordinate: "categories · 4/weave · b3dcdc8f"
contentUuid: "aedf5b7a-5576-5fcc-a316-818ac165de98"
diamondUuid: "ed0ca1fc-5407-82ec-935a-fe0609ae90ba"
uuid: "b3dcdc8f-535d-8696-bfb0-6bb940439426"
horo: 4
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
  computationUuid: "25e8a846-a270-87cf-aa50-ee85ddd9fdfb"
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
      stageUuid: "4d21d32f-af64-86a1-8c87-e2db46cc3ea3"
    - stage: seal
      stageUuid: "c9671a3f-0a39-88e0-89a4-948f463aec3f"
    - stage: uuid
      stageUuid: "3c691de6-06d1-857f-b95e-20f76288e058"
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
