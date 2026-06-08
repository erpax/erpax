---
name: posts
description: "Use when publishing or querying CMS articles — authored content with hero image, Lexical rich-text, categories, related posts, SEO meta, per-tenant slug uniqueness, versioned drafts, and scheduled publishing. The Payload CMS post collection."
atomPath: posts
coordinate: posts · 5/round · 36041e31
contentUuid: "6382bcc2-1ca0-5f53-b841-120610aecdde"
diamondUuid: "53458057-af48-843f-af00-5a02dc7c29d7"
uuid: "36041e31-2bc3-8e46-9330-6d19061607c2"
horo: 5
bonds:
  in:
    - blog
    - categories
    - law
    - media
    - users
    - versions
  out:
    - blog
    - categories
    - law
    - media
    - users
    - versions
typography:
  partition: posts
  bondDegree: 0
  neighbors: []
standards:
  - "3986 uri slug-to-url"
  - "BCP-47 language-tag i18n-routing"
  - "ECMA-402"
  - "ECMA-402 internationalization-api"
  - "ILO-C111"
  - W3C HTML5 Living Standard
  - "WCAG-2.1 level-AA accessibility"
  - schema.org Article
  - schema.org BlogPosting
bindings: []
neighbors:
  wikilink:
    - categories
    - law
    - media
    - users
    - versions
  matrix:
    - blog
    - categories
    - law
    - media
    - users
    - versions
  backlinks:
    - blog
    - categories
    - law
    - media
    - users
    - versions
signatures:
  computationUuid: "4d6b6847-28f9-8a27-add2-0ed8c7e0dd77"
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
      stageUuid: "f388423c-c178-83f9-bc9c-b8455a38d5df"
    - stage: seal
      stageUuid: "975c7f9a-0bbb-8333-a13a-3c4848165c32"
    - stage: uuid
      stageUuid: "d972ac43-abdd-8dc5-826c-8a1e263bbd4e"
version: 2
---
# posts

Posts — CMS articles with versioned drafts and tenant-scoped read.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: posts are CMS articles with versioned drafts and tenant-scoped read, living as one single-folder collection node (index.ts ⊕ seed.ts ⊕ index.test.ts) so there is no scatter and no drift.**

## Standards
- schema.org Article
- schema.org BlogPosting
- W3C HTML5 Living Standard
- BCP-47 language-tag i18n-routing
- ECMA-402 internationalization-api
- WCAG-2.1 level-AA accessibility

Composes: [[Categories]] · [[Media]] · [[Users]] · [[versions]].
