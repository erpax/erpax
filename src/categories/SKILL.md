---
name: categories
description: "Use when building or browsing hierarchical content or product taxonomies — title, URL slug (per-tenant unique), parent relationship, breadcrumb trail — for posts, catalogue products, or any schema.org DefinedTerm classification. The tenant-scoped category taxonomy node."
atomPath: categories
coordinate: "categories · 8/crest · 3abccd51"
contentUuid: "b85ae7d0-0de8-5e87-ab66-0661af1c2d9d"
diamondUuid: "2f4b5a73-a6fb-8f69-a984-8958018d7ecd"
uuid: "3abccd51-44e0-88e3-920a-afd770f3ec8b"
horo: 8
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
  computationUuid: "c465282c-9962-8a55-ad01-013a79468028"
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
      stageUuid: "9a204860-71c1-80f4-b2a6-dc722ccc73b9"
    - stage: seal
      stageUuid: "c9671a3f-0a39-88e0-89a4-948f463aec3f"
    - stage: uuid
      stageUuid: "5a0f46bb-16ba-84b4-a8c3-ebe370c2e338"
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
