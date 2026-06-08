---
name: pages
description: "Use when creating or managing CMS pages — hero blocks, content blocks, forms, SEO meta — with per-tenant unique slugs, versioned drafts, breadcrumb hierarchy, and i18n routing. The Payload CMS page collection."
atomPath: pages
coordinate: pages · 4/weave · 17b4d21c
contentUuid: "134d8aa8-5395-5400-abbe-82dd5fdaab70"
diamondUuid: "1f0bf859-9845-8e92-995b-37e882209b23"
uuid: "17b4d21c-7e0c-8a14-ad65-4feb5af106c2"
horo: 4
bonds:
  in:
    - access
    - admin
    - all
    - identity
    - queries
    - versions
  out:
    - access
    - admin
    - all
    - identity
    - queries
    - versions
typography:
  partition: pages
  bondDegree: 0
  neighbors: []
standards:
  - "3986 uri slug-to-url"
  - "BCP-47 language-tag i18n-routing"
  - "ECMA-402"
  - "ECMA-402 internationalization-api"
  - "ILO-C111"
  - "NIST-INCITS-359-2012"
  - "UBL-2.1"
  - W3C HTML5 Living Standard
  - "WCAG-2.1 level-AA accessibility"
  - schema.org WebPage
bindings: []
neighbors:
  wikilink:
    - access
    - admin
    - identity
    - queries
    - versions
  matrix:
    - access
    - admin
    - all
    - identity
    - queries
    - versions
  backlinks:
    - access
    - admin
    - all
    - identity
    - queries
    - versions
signatures:
  computationUuid: "8de27af2-1c8c-8918-ad1f-a1c62b19488b"
  stages:
    - stage: path
      stageUuid: "89d0c0ce-a2eb-8388-8c14-d7435aee05ee"
    - stage: trinity
      stageUuid: "ea697047-de90-8f82-a0c0-f807f71ba849"
    - stage: boundary
      stageUuid: "8a5af68b-6ea3-8c78-a0e6-668bcd04e000"
    - stage: links
      stageUuid: "f3d7304f-2da2-8467-af84-24efbb972f86"
    - stage: horo
      stageUuid: "1530d8ff-a4d2-8238-8a56-3ef216f63a97"
    - stage: seal
      stageUuid: "39faed2a-0c52-891c-b969-5e63150ab018"
    - stage: uuid
      stageUuid: "63f8c8b4-2400-8247-b463-2c33fc509016"
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
- schema.org WebPage
- W3C HTML5 Living Standard
- BCP-47 language-tag i18n-routing
- ECMA-402 internationalization-api
- WCAG-2.1 level-AA accessibility
