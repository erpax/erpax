---
name: posts
description: "Use when publishing or querying CMS articles — authored content with hero image, Lexical rich-text, categories, related posts, SEO meta, per-tenant slug uniqueness, versioned drafts, and scheduled publishing. The Payload CMS post collection."
atomPath: posts
coordinate: "posts · 2/share · 578f5f7b"
contentUuid: "e9feaaf6-e9bb-534e-be08-9a0c3e1566f3"
diamondUuid: "44e74066-b0d0-8f8b-803a-f7d20b60106a"
uuid: "578f5f7b-dee9-8aee-bd3e-d28fe2048a6c"
horo: 2
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
  computationUuid: "2866c37a-9fe3-8a50-a296-15d76653a3ee"
  stages:
    - stage: path
      stageUuid: "1faaa317-c0a0-8259-b2cb-5da3668f7813"
    - stage: trinity
      stageUuid: "c03a4052-1468-8a4d-8726-4a6d38bc04bc"
    - stage: boundary
      stageUuid: "d1ea9447-7ab9-8399-9256-d730c4057697"
    - stage: links
      stageUuid: "9f7df15a-843d-88e2-85a2-d9b1f75062a7"
    - stage: horo
      stageUuid: "0b75ab31-48fa-890a-a24c-44018dafdff5"
    - stage: seal
      stageUuid: "a59f7144-f4bf-8a20-b8b6-e3ff2ed8e9b3"
    - stage: uuid
      stageUuid: "96563fd5-4cd2-874c-bde6-ea1481c8e53e"
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
