---
name: posts
description: "Use when publishing or querying CMS articles — authored content with hero image, Lexical rich-text, categories, related posts, SEO meta, per-tenant slug uniqueness, versioned drafts, and scheduled publishing. The Payload CMS post collection."
atomPath: posts
coordinate: "posts · 7/descent · f32a9554"
contentUuid: "b3efa5b3-1871-510f-978e-9302d4515509"
diamondUuid: "ffdecc15-ecd3-8b38-8c26-70a770618527"
uuid: "f32a9554-bc6e-8bd9-acb2-f370ddef6e11"
horo: 7
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
  computationUuid: "c5c5f427-2bbb-8837-a442-8f6c1bcefd79"
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
      stageUuid: "4518513c-068f-8111-bb9d-8a1febd56d8c"
    - stage: seal
      stageUuid: "a59f7144-f4bf-8a20-b8b6-e3ff2ed8e9b3"
    - stage: uuid
      stageUuid: "7d964398-a8b8-821c-bb90-ce2730a69f3d"
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
