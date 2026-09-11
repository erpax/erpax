---
name: posts
description: "Use when publishing or querying CMS articles — authored content with hero image, Lexical rich-text, categories, related posts, SEO meta, per-tenant slug uniqueness, versioned drafts, and scheduled publishing. The Payload CMS post collection."
atomPath: posts
coordinate: "posts · 5/round · 2867d07c"
contentUuid: "cba21f1c-af04-5416-8d4a-13c03e385c59"
diamondUuid: "3ceb4609-0a2d-86d7-953d-4167e2ef9b1c"
uuid: "2867d07c-fb59-8916-8411-a9ecdd4407a7"
horo: 5
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
  computationUuid: "c0d5be17-24a7-845d-85ef-d5ea6ef26a63"
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
      stageUuid: "6d659a02-5eff-8f8b-85ac-862f770d6802"
    - stage: seal
      stageUuid: "a59f7144-f4bf-8a20-b8b6-e3ff2ed8e9b3"
    - stage: uuid
      stageUuid: "a09cdc67-8c29-8b10-8239-35bf7763dc40"
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
