---
name: cmspage
description: "Use when creating or managing CMS pages — hero blocks, content blocks, forms, SEO meta — with per-tenant unique slugs, versioned drafts, breadcrumb hierarchy, and i18n routing. The Payload CMS page collection."
atomPath: cmspage
coordinate: "cmspage · 4/weave · 9da8e79d"
contentUuid: "245f82a1-f74d-53a0-9ec3-271a218c3e6a"
diamondUuid: "7015326c-068c-85c8-8230-4d117c260a65"
uuid: "9da8e79d-1cba-8868-99a3-6d9d5a45b3cf"
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
  - "UBL-2.1"
  - W3C HTML5 Living Standard
  - "W3C HTML5 Living Standard`"
  - "W3C-HTML5"
  - "WCAG-2.1 level-AA accessibility"
  - schema.org WebPage
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ac1984a3-17c1-8d24-b4f8-a8f68e8870be"
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
      stageUuid: "ce771faa-59f6-833c-9cc2-c223ab419605"
    - stage: seal
      stageUuid: "513d1eda-4757-8047-8dc6-8cb82e2851f4"
    - stage: uuid
      stageUuid: "9e637f3f-d69d-8f33-816b-26dbd85b84f8"
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
