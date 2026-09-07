---
name: cmspage
description: "Use when creating or managing CMS pages — hero blocks, content blocks, forms, SEO meta — with per-tenant unique slugs, versioned drafts, breadcrumb hierarchy, and i18n routing. The Payload CMS page collection."
atomPath: cmspage
coordinate: "cmspage · 7/descent · 660b8332"
contentUuid: "7241c29d-2c0c-57ba-9968-a21246c3db55"
diamondUuid: "2a5f9c48-756f-8106-8323-dfac046f9909"
uuid: "660b8332-4348-84a9-8775-ced5647c6dde"
horo: 7
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
  computationUuid: "859c68c9-3aca-8b00-ba3f-a0616047da5c"
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
      stageUuid: "bf1fd01e-9ecf-89f2-b166-ba0b824035b2"
    - stage: seal
      stageUuid: "513d1eda-4757-8047-8dc6-8cb82e2851f4"
    - stage: uuid
      stageUuid: "bb55fc02-4ef2-8985-ad30-6db66c02b0b7"
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
