---
name: media
description: Use when uploading or retrieving files — images, video, documents — stored in Cloudflare R2 with multi-size image variants (thumbnail/square/small/medium/large/xlarge/og), alt text, captions, and GDPR-safe filenames. The tenant-scoped media upload collection.
---

# media

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- RFC 6838 mime-type media-type
- ISO/IEC-23008 high-efficiency-coding
- ISO/IEC-10918 jpeg
- W3C PNG image
- W3C SVG
- GDPR Art.5(1)(c) data-minimization no-pii-in-filenames
- GDPR Art.32 security-of-processing

Composes: [[access]] · [[hooks]] · [[lexical]].
