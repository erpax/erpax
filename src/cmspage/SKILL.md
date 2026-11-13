---
name: cmspage
description: "Use when creating or managing CMS pages — hero blocks, content blocks, forms, SEO meta — with per-tenant unique slugs, versioned drafts, breadcrumb hierarchy, and i18n routing. The Payload CMS page collection."
atomPath: cmspage
coordinate: "cmspage · 4/weave · 55dfc9d4"
contentUuid: "3c11205b-157c-5027-8d37-7ae58e43a209"
diamondUuid: "04427a56-f5d5-82bc-af91-b784f569b955"
uuid: "55dfc9d4-0bbb-8365-86a2-d57e732e6722"
horo: 4
typography:
  partition: cmspage
  bondDegree: 18
standards:
  - "3986 uri slug-to-url"
  - "BCP-47"
  - "BCP-47 language-tag i18n-routing"
  - "ECMA-402"
  - "ECMA-402 internationalization-api"
  - "NIST-INCITS-359-2012"
  - "RFC-3986"
  - W3C HTML5 Living Standard
  - "W3C HTML5 Living Standard`"
  - "W3C-HTML5"
  - "WCAG-2.1 level-AA accessibility"
  - schema.org WebPage
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "6f9fc975-21b9-8ab3-8b90-61b9f1e7b549"
  stages:
    - stage: path
      stageUuid: "92bc216a-c0cb-8198-8fd5-bad8486018cd"
    - stage: trinity
      stageUuid: "b74f7f9c-e52f-8708-ba89-1ae616ae0b7c"
    - stage: boundary
      stageUuid: "e993cc6f-e09d-8d1e-9125-f98bba67df47"
    - stage: links
      stageUuid: "7de51d3e-208f-8086-b014-43a61b50fbd5"
    - stage: horo
      stageUuid: "39fb7275-9ca0-8dee-96aa-13ea38605e4b"
    - stage: seal
      stageUuid: "513d1eda-4757-8047-8dc6-8cb82e2851f4"
    - stage: uuid
      stageUuid: "b8531d7e-ce17-8206-9beb-292596756843"
version: 2
---
# pages

Pages — CMS pages with versioned drafts and per-tenant slug uniqueness.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Composition

This collection composes:
- [[admin]] — for admin panel configuration and preview
- [[access]] — for role-based access control (superAdminOrTenantAdmin, authenticatedOrPublished)
- [[versions]] — for versioned drafts and document lifecycle
- [[identity]] — for slug uniqueness within tenant scope
- queries — for query presets and default population

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C HTML5 Living Standard`

- schema.org WebPage
- W3C HTML5 Living Standard
- BCP-47 language-tag i18n-routing
- ECMA-402 internationalization-api
- WCAG-2.1 level-AA accessibility
