---
name: posts
description: "Use when publishing or querying CMS articles — authored content with hero image, Lexical rich-text, categories, related posts, SEO meta, per-tenant slug uniqueness, versioned drafts, and scheduled publishing. The Payload CMS post collection."
atomPath: posts
coordinate: "posts · 4/weave · c2b2150a"
contentUuid: "96d5a209-f837-502b-9160-6c0ce0d24bc9"
diamondUuid: "26bdc9ff-7b34-89dd-aafc-dbeae2d0af2e"
uuid: "c2b2150a-b8f1-8da6-955e-f6d4ce0d2255"
horo: 4
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
  computationUuid: "f588e1fb-4b1c-8ac3-9799-66428daca69b"
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
      stageUuid: "178c4da5-c69d-80b2-a5f5-d450311ecb46"
    - stage: seal
      stageUuid: "a59f7144-f4bf-8a20-b8b6-e3ff2ed8e9b3"
    - stage: uuid
      stageUuid: "3c4b203c-6b2f-8f6c-87f6-41869f13804a"
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
