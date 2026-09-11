---
name: media
description: "Use when uploading or retrieving files — images, video, documents — stored in Cloudflare R2 with multi-size image variants (thumbnail/square/small/medium/large/xlarge/og), alt text, captions, and GDPR-safe filenames. The tenant-scoped media upload collection."
atomPath: media
coordinate: "media · 7/descent · 7cbe2831"
contentUuid: "c0ccccb7-876c-5632-87b2-7b6e8020228b"
diamondUuid: "a37f8584-a87e-8254-a502-b6fb74723019"
uuid: "7cbe2831-226f-87a6-83c4-36e45db55f73"
horo: 7
typography:
  partition: media
  bondDegree: 96
standards:
  - "6838 mime-type media-type"
  - "GDPR Art.32 security-of-processing"
  - "GDPR Art.5(1)(c) data-minimization no-pii-in-filenames"
  - "GS1-GTIN"
  - "ISA-500"
  - "ISO/IEC-10918"
  - "ISO/IEC-10918 jpeg"
  - "ISO/IEC-10918 jpeg`"
  - "ISO/IEC-23008 high-efficiency-coding"
  - "ISO/IEC-23008 high-efficiency-coding`"
  - "PCAOB-AS-1105"
  - "UN-CEFACT"
  - UNSPSC
  - W3C PNG image
  - "W3C PNG image`"
  - W3C SVG
  - "W3C SVG`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3cceee42-a700-89f4-9935-40eb814fbd62"
  stages:
    - stage: path
      stageUuid: "24e98368-9562-8605-a8e0-f7a038cb4734"
    - stage: trinity
      stageUuid: "ebd0c5ac-7e4a-88a3-9782-a690bf8403b6"
    - stage: boundary
      stageUuid: "a66208b6-66c5-83ae-9da8-a2238732e19f"
    - stage: links
      stageUuid: "525b1d4d-f088-83de-9e99-cef89d197e4f"
    - stage: horo
      stageUuid: "733ea5c5-9502-8427-a733-6eafaec0a8a1"
    - stage: seal
      stageUuid: "b5365f93-dca2-823a-a4d2-268a2a771327"
    - stage: uuid
      stageUuid: "a573497e-f136-82e8-b752-6a28f14d545a"
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

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC-23008 high-efficiency-coding`
- `@standard ISO/IEC-10918 jpeg`
- `@standard W3C PNG image`
- `@standard W3C SVG`

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
