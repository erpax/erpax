---
name: categories
description: "Use when building or browsing hierarchical content or product taxonomies — title, URL slug (per-tenant unique), parent relationship, breadcrumb trail — for posts, catalogue products, or any schema.org DefinedTerm classification. The tenant-scoped category taxonomy node."
atomPath: categories
coordinate: "categories · 7/descent · aa77fea9"
contentUuid: "fd33f349-23b3-53ea-91f8-f1325cf97abb"
diamondUuid: "9b237808-fde2-8467-a47b-7afd158c1a98"
uuid: "aa77fea9-d057-873b-856f-c6f6186f3c3e"
horo: 7
typography:
  partition: categories
  bondDegree: 4
standards:
  - "3986 uri slug-to-url"
  - schema.org Category
  - "schema.org DefinedTerm taxonomic-term"
bindings: []
signatures:
  computationUuid: "60c61603-f58e-8777-ba8a-0225e8b480d6"
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
      stageUuid: "5ed88af1-7874-85b3-b9d1-de391d357f2e"
    - stage: seal
      stageUuid: "c9671a3f-0a39-88e0-89a4-948f463aec3f"
    - stage: uuid
      stageUuid: "30b9f7f8-8965-86f6-9708-fe4bf36982ae"
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
