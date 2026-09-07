---
name: cmspage
description: "Use when creating or managing CMS pages — hero blocks, content blocks, forms, SEO meta — with per-tenant unique slugs, versioned drafts, breadcrumb hierarchy, and i18n routing. The Payload CMS page collection."
atomPath: cmspage
coordinate: "cmspage · 8/crest · 1bdd52d5"
contentUuid: "ce7ec08a-8e6b-59c0-931a-b3d0ea38218f"
diamondUuid: "dbf76cfc-4f9e-8de4-802c-f9bfa75debfc"
uuid: "1bdd52d5-c7bc-8685-9a0a-42c1d3c1498a"
horo: 8
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
  - "UBL-2.1"
  - W3C HTML5 Living Standard
  - "W3C HTML5 Living Standard`"
  - "W3C-HTML5"
  - "WCAG-2.1 level-AA accessibility"
  - schema.org WebPage
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "bb1a0121-09dd-8f7e-9ec4-891f94b178a3"
  stages:
    - stage: path
      stageUuid: "92bc216a-c0cb-8198-8fd5-bad8486018cd"
    - stage: trinity
      stageUuid: "b74f7f9c-e52f-8708-ba89-1ae616ae0b7c"
    - stage: boundary
      stageUuid: "7404fb60-bb51-8496-911c-8fc22f54d296"
    - stage: links
      stageUuid: "5afc4fde-6294-852d-8c87-92dd2ccb99c8"
    - stage: horo
      stageUuid: "15d4c678-7eb0-8af9-8db6-e05a45105e49"
    - stage: seal
      stageUuid: "513d1eda-4757-8047-8dc6-8cb82e2851f4"
    - stage: uuid
      stageUuid: "cfe97037-6f1f-897c-9e86-a5b80a62b965"
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
