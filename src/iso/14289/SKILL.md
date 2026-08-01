---
name: "14289"
description: "Use when implementing or referencing `src/standards/iso-14289/`."
atomPath: "iso/14289"
coordinate: "iso/14289 · 4/weave · 3b1cbd09"
contentUuid: "8cd7e277-33f4-546d-beb7-af0d441b8d34"
diamondUuid: "e1a43bd1-7839-8baf-987c-53531b2354c7"
uuid: "3b1cbd09-1e1c-8995-afd6-b20ea3e8a4e7"
horo: 4
typography:
  partition: iso
  bondDegree: 0
standards:
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
signatures:
  computationUuid: "97f097cf-0160-8edf-a0c0-ef11cbe6d4d9"
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
      stageUuid: "1c0953bc-7344-848a-a236-455414d358a1"
    - stage: seal
      stageUuid: "0c11a6df-473e-8078-8eb2-ab4f9d8eb416"
    - stage: uuid
      stageUuid: "bb016b28-826f-83d1-b989-f5ed07aaa288"
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
