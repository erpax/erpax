---
name: categories
description: "Use when building or browsing hierarchical content or product taxonomies — title, URL slug (per-tenant unique), parent relationship, breadcrumb trail — for posts, catalogue products, or any schema.org DefinedTerm classification. The tenant-scoped category taxonomy node."
atomPath: categories
coordinate: "categories · 5/round · cf41b221"
contentUuid: "7692cd12-8375-5788-8bea-ccc32517267c"
diamondUuid: "25cdf935-fd93-8ee0-a9ac-d85d752005fb"
uuid: "cf41b221-a736-8e5e-8699-fdfd1d46eda8"
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
  computationUuid: "fb6712cc-65c0-8c27-9c76-57ead94b543c"
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
      stageUuid: "01cacf2b-2ba9-8df5-af1f-48c46b2dc6e0"
    - stage: seal
      stageUuid: "c9671a3f-0a39-88e0-89a4-948f463aec3f"
    - stage: uuid
      stageUuid: "520a3adc-c3ef-840d-8ad1-75c94ecca5fb"
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
