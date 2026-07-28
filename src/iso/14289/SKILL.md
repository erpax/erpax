---
name: "14289"
description: "Use when implementing or referencing `src/standards/iso-14289/`."
atomPath: "iso/14289"
coordinate: "iso/14289 · 2/share · b0934f2e"
contentUuid: "6653e0d7-eee6-5fc7-be96-e8be25dae504"
diamondUuid: "f9c357bb-c80b-8b83-b6cf-75755e6caa3e"
uuid: "b0934f2e-f633-85c7-9912-da919d88009b"
horo: 2
bonds:
  in:
    - iso
  out: []
typography:
  partition: iso
  bondDegree: 0
  neighbors: []
standards:
  - "EU-2014/55"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-CSDDD-2024/1760"
  - "ISO-14289-1"
  - "ISO-14289-1:2014 pdf-ua-1"
  - "ISO-14289-1:2014 pdf-ua-1`"
  - "ISO-14289-2:2024 pdf-ua-2"
  - "ISO-14289-2:2024 pdf-ua-2`"
  - "WCAG-2.1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "e5b853a6-8454-80cc-a225-43980cf9d04c"
  stages:
    - stage: path
      stageUuid: "ade7180e-e88a-8375-b539-315c4eced8fc"
    - stage: trinity
      stageUuid: "d95cfbad-635f-8c69-80f1-7059308587ea"
    - stage: boundary
      stageUuid: "2c2febe6-18f7-8e28-85b1-1c770c25d371"
    - stage: links
      stageUuid: "82ab4f54-73f0-8fa8-9bdd-cecd50e7c25f"
    - stage: horo
      stageUuid: "df152bdd-ea51-8389-b85a-ab9ef183a91c"
    - stage: seal
      stageUuid: "0c11a6df-473e-8078-8eb2-ab4f9d8eb416"
    - stage: uuid
      stageUuid: "9c8ab792-857f-8e09-af34-89b11032babd"
version: 2
---
# `src/standards/iso-14289/`

ISO 14289 PDF/UA — accessibility-conformance profile declarations for
PDFs the project produces.

| Module | Standard implemented |
|---|---|
| `profile.ts` | PDF/UA-1 / PDF/UA-2 part constants + XMP `pdfuaid:part` helper |

`PDF_UA_DEFAULT` = `{ part: 1 }` — PDF/UA-1 is the only widely-supported
profile as of 2026-05.

Combined with PDF/A: a PDF that conforms to **both** archival
(`iso-19005`) and accessibility (`iso-14289`) is typically declared as
PDF/A-2a (the 'a' suffix means accessible, requires tagged structure)
+ PDF/UA-1. The XMP packet emitted by `iso-19005/metadata.ts` accepts
an optional PDF/UA part argument so both declarations live in one block.

Out of scope: tagged-PDF structure construction. The `<StructTreeRoot>`
+ figure alt-text + reading order tagging stays in the PDF generator
(Puppeteer + ghostscript / qpdf post-process). This module only emits
the conformance declaration the validators read.

When extending:
1. New PDF/UA profile / level → add to `profile.ts`.
2. Spec mirror under `tests/standards/iso-14289/`.
3. `pnpm standards:write-index` to refresh `docs/STANDARDS_INDEX.md`.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-14289-1:2014 pdf-ua-1`
- `@standard ISO-14289-2:2024 pdf-ua-2`
