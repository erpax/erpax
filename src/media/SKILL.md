---
name: media
description: "Use when uploading or retrieving files — images, video, documents — stored in Cloudflare R2 with multi-size image variants (thumbnail/square/small/medium/large/xlarge/og), alt text, captions, and GDPR-safe filenames. The tenant-scoped media upload collection."
atomPath: media
coordinate: media · 8/crest · d73d4959
contentUuid: "cd2a08d9-07b2-5b33-9638-36585873360e"
diamondUuid: "38eb6411-aa22-85c8-800a-7c77ba235885"
uuid: "d73d4959-5d47-8492-aed3-e2d47126e1cc"
horo: 8
bonds:
  in:
    - access
    - after
    - appearance
    - associated
    - authenticity
    - before
    - category
    - context
    - during
    - enumeration
    - gallery
    - hooks
    - item
    - law
    - lexical
    - link
    - manipulation
    - media
    - news
    - object
    - organization
    - original
    - posting
    - posts
    - rating
    - review
    - social
    - subscription
    - upload
  out:
    - access
    - after
    - appearance
    - associated
    - authenticity
    - before
    - category
    - context
    - during
    - enumeration
    - gallery
    - hooks
    - item
    - law
    - lexical
    - link
    - manipulation
    - media
    - news
    - object
    - organization
    - original
    - posting
    - posts
    - rating
    - review
    - social
    - subscription
    - upload
typography:
  partition: media
  bondDegree: 0
  neighbors: []
standards:
  - "6838 mime-type media-type"
  - "GDPR Art.32 security-of-processing"
  - "GDPR Art.5(1)(c) data-minimization no-pii-in-filenames"
  - "GS1-GTIN"
  - "ILO-C105"
  - "ISA-500"
  - "ISO-9362"
  - "ISO/IEC-10918"
  - "ISO/IEC-10918 jpeg"
  - "ISO/IEC-23008 high-efficiency-coding"
  - "PCAOB-AS-1105"
  - "UN-CEFACT"
  - UNSPSC
  - W3C PNG image
  - W3C SVG
bindings: []
neighbors:
  wikilink:
    - access
    - hooks
    - law
    - lexical
  matrix:
    - access
    - after
    - appearance
    - associated
    - authenticity
    - before
    - category
    - context
    - during
    - enumeration
    - gallery
    - hooks
    - item
    - law
    - lexical
    - link
    - manipulation
    - media
    - news
    - object
    - organization
    - original
    - posting
    - posts
    - rating
    - review
    - social
    - subscription
    - upload
  backlinks:
    - access
    - after
    - appearance
    - associated
    - authenticity
    - before
    - category
    - context
    - during
    - enumeration
    - gallery
    - hooks
    - item
    - law
    - lexical
    - link
    - manipulation
    - media
    - news
    - object
    - organization
    - original
    - posting
    - posts
    - rating
    - review
    - social
    - subscription
    - upload
signatures:
  computationUuid: "8cee3b90-d864-8b3b-8b72-94ffea6e1e32"
  stages:
    - stage: path
      stageUuid: "24e98368-9562-8605-a8e0-f7a038cb4734"
    - stage: trinity
      stageUuid: "ebd0c5ac-7e4a-88a3-9782-a690bf8403b6"
    - stage: boundary
      stageUuid: "bdbf69a2-1683-8619-8ae9-925b3fcd2f30"
    - stage: links
      stageUuid: "525b1d4d-f088-83de-9e99-cef89d197e4f"
    - stage: horo
      stageUuid: "9b17a7e5-fdf0-853e-ac30-a28d3be2f75f"
    - stage: seal
      stageUuid: "4dd527ff-231e-895e-8fbd-a2e42cd703d8"
    - stage: uuid
      stageUuid: "1322eb6b-2040-8bf8-926d-6037e6c67aa4"
version: 2
---
# media

The one `media` object, expressed as coexisting facets in this single folder:

- `index.ts` — the Payload **collection** (matter / node identity, `slug: 'media'`): schema, standards banners, R2 upload sizes.
- `Component.tsx` — the React **render facet** (`Media` FC), picks `ImageMedia` / `VideoMedia` by MIME; re-exported from `index.ts` as `MediaComponent`.
- `image/media`, `video/media` — the picture / `<video>` sub-renderers.
- `types.ts` — shared `Props` for the render facets.
- `hooks/beforeChange` — tenant-scoping of uploads.
- co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks).

One folder per object ⇒ no scatter ⇒ no drift.

## Standards
- RFC 6838 mime-type media-type
- ISO/IEC-23008 high-efficiency-coding
- ISO/IEC-14496 mpeg-4 video
- ISO/IEC-10918 jpeg
- W3C PNG image
- W3C SVG
- schema.org ImageObject
- schema.org VideoObject
- WCAG-2.1 §1.1.1 non-text-content alt-text
- GDPR Art.5(1)(c) data-minimization no-pii-in-filenames
- GDPR Art.32 security-of-processing
- ISO-27001 A.5.23 cloud-service-isolation tenant-scope

Composes: [[access]] · [[hooks]] · [[lexical]].

**Law — [[law]]: one media object lives as coexisting facets in a single folder — the Payload upload collection, its React render facet (picking image/video by MIME) and its sub-renderers — with tenant-scoped uploads to R2 and computed multi-size variants; one folder per object ⇒ no scatter ⇒ no drift.**
