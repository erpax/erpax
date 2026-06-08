---
name: "14289"
description: "Use when implementing or referencing `src/standards/iso-14289/`."
atomPath: iso/14289
coordinate: iso/14289 · 7/descent · ac01df57
contentUuid: "f56ee763-721d-5e66-985e-b23f9afe362e"
diamondUuid: "3ce16b38-2274-83f0-b58b-8cb908bafe45"
uuid: "ac01df57-1fe4-84e8-ac6a-fec54996765a"
horo: 7
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
  - "ISO-14289-2:2024 pdf-ua-2"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "f8077085-6ae8-87e0-b046-e272e2d68be7"
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
      stageUuid: "0a0bd98b-0f1a-8fc0-a895-b1a1f9616f45"
    - stage: seal
      stageUuid: "0c11a6df-473e-8078-8eb2-ab4f9d8eb416"
    - stage: uuid
      stageUuid: "cea2e9dd-fb7e-8bb4-8ed0-9c48b4f5694d"
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
