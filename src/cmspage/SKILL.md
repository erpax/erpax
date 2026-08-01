---
name: cmspage
description: "Use when creating or managing CMS pages — hero blocks, content blocks, forms, SEO meta — with per-tenant unique slugs, versioned drafts, breadcrumb hierarchy, and i18n routing. The Payload CMS page collection."
atomPath: cmspage
coordinate: "cmspage · 5/round · 8123b17d"
contentUuid: "66a69587-54d0-522d-808d-2df496b31a4e"
diamondUuid: "a4a30f6c-96ef-8529-b59b-6231bdddb1ad"
uuid: "8123b17d-094e-8b22-976b-f02ed9a999fe"
horo: 5
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
  - "UBL-2.1"
  - W3C HTML5 Living Standard
  - "W3C HTML5 Living Standard`"
  - "WCAG-2.1 level-AA accessibility"
  - schema.org WebPage
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7acdbf60-0857-81f4-ade0-dbea92961ef2"
  stages:
    - stage: path
      stageUuid: "92bc216a-c0cb-8198-8fd5-bad8486018cd"
    - stage: trinity
      stageUuid: "b74f7f9c-e52f-8708-ba89-1ae616ae0b7c"
    - stage: boundary
      stageUuid: "7404fb60-bb51-8496-911c-8fc22f54d296"
    - stage: links
      stageUuid: "7de51d3e-208f-8086-b014-43a61b50fbd5"
    - stage: horo
      stageUuid: "f0eeeda8-2dd4-8df4-a51f-bc228c354ce7"
    - stage: seal
      stageUuid: "513d1eda-4757-8047-8dc6-8cb82e2851f4"
    - stage: uuid
      stageUuid: "fc28d148-2a5c-8b8d-bb9e-faf70bb09a28"
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
- [[queries]] — for query presets and default population

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C HTML5 Living Standard`

- schema.org WebPage
- W3C HTML5 Living Standard
- BCP-47 language-tag i18n-routing
- ECMA-402 internationalization-api
- WCAG-2.1 level-AA accessibility
