---
name: "14289"
description: "Use when implementing or referencing `src/iso/14289/index.ts`."
atomPath: "iso/14289"
coordinate: "iso/14289 · 1/base · 29a89b6a"
contentUuid: "3fe5f94c-934b-53e8-a9a2-063f5da05aa7"
diamondUuid: "1d435269-a81f-83e9-ab3e-4169d2922afd"
uuid: "29a89b6a-c388-805b-b8f3-d682d3263c90"
horo: 1
typography:
  partition: iso
  bondDegree: 6
standards:
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-CSDDD-2024/1760"
  - "ISO-14289-1"
  - "ISO-14289-1:2014 pdf-ua-1"
  - "ISO-14289-1:2014 pdf-ua-1`"
  - "ISO-14289-2:2024 pdf-ua-2"
  - "ISO-14289-2:2024 pdf-ua-2`"
  - "ISO/IEC-29119"
  - "WCAG-2.1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "d13e2c91-ead1-8393-a178-c2fc7ca060a0"
  stages:
    - stage: path
      stageUuid: "ade7180e-e88a-8375-b539-315c4eced8fc"
    - stage: trinity
      stageUuid: "d95cfbad-635f-8c69-80f1-7059308587ea"
    - stage: boundary
      stageUuid: "2c2febe6-18f7-8e28-85b1-1c770c25d371"
    - stage: links
      stageUuid: "9aa5f936-b430-84bc-86ca-d9cb70137cd7"
    - stage: horo
      stageUuid: "ff70987f-f573-8150-be7a-2922163425ba"
    - stage: seal
      stageUuid: "285faf1b-6819-888b-8888-01e62002f7be"
    - stage: uuid
      stageUuid: "0a844ada-9aad-8206-84eb-d5fd37261c3f"
version: 2
---
# `src/iso/14289/index.ts`

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

Composes: [[standards]].
