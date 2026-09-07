---
name: posts
description: "Use when publishing or querying CMS articles — authored content with hero image, Lexical rich-text, categories, related posts, SEO meta, per-tenant slug uniqueness, versioned drafts, and scheduled publishing. The Payload CMS post collection."
atomPath: posts
coordinate: "posts · 8/crest · 608d1057"
contentUuid: "6277008a-f368-5ff7-8e25-2851cd04b469"
diamondUuid: "31265073-2144-8171-9def-081f6901c399"
uuid: "608d1057-5771-8b3d-9e17-93f1147ec141"
horo: 8
typography:
  partition: posts
  bondDegree: 19
standards:
  - "3986 uri slug-to-url"
  - "BCP-47 language-tag i18n-routing"
  - "ECMA-402"
  - "ECMA-402 internationalization-api"
  - W3C HTML5 Living Standard
  - "W3C HTML5 Living Standard`"
  - "WCAG-2.1 level-AA accessibility"
  - schema.org Article
  - schema.org BlogPosting
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e31f020c-80a0-8947-95d9-b63d102c3dd0"
  stages:
    - stage: path
      stageUuid: "1faaa317-c0a0-8259-b2cb-5da3668f7813"
    - stage: trinity
      stageUuid: "c03a4052-1468-8a4d-8726-4a6d38bc04bc"
    - stage: boundary
      stageUuid: "d1ea9447-7ab9-8399-9256-d730c4057697"
    - stage: links
      stageUuid: "3ca9de53-49ff-8fb9-ab54-4a77eb20c795"
    - stage: horo
      stageUuid: "4ceff997-719a-84b7-894d-37c487b3df38"
    - stage: seal
      stageUuid: "a59f7144-f4bf-8a20-b8b6-e3ff2ed8e9b3"
    - stage: uuid
      stageUuid: "817f250d-c137-8640-bc6f-b79b7bf78e3d"
version: 2
---
# posts

Posts — CMS articles with versioned drafts and tenant-scoped read.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: posts are CMS articles with versioned drafts and tenant-scoped read, living as one single-folder collection node (index.ts ⊕ seed.ts ⊕ index.test.ts) so there is no scatter and no drift.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C HTML5 Living Standard`

- schema.org Article
- schema.org BlogPosting
- W3C HTML5 Living Standard
- BCP-47 language-tag i18n-routing
- ECMA-402 internationalization-api
- WCAG-2.1 level-AA accessibility

Composes: [[Categories]] · [[Media]] · [[Users]] · [[versions]].
