---
name: "9362"
description: "Use when implementing or referencing ISO 9362 — BIC / SWIFT."
atomPath: "iso/9362"
coordinate: "iso/9362 · 2/share · 4bf5d589"
contentUuid: "7098d08f-022e-54a7-a4f1-772697f3bb59"
diamondUuid: "232c016b-aacb-8a67-b1e3-0ec4d95328b2"
uuid: "4bf5d589-ba2b-89bf-bbb3-e8035481baf6"
horo: 2
typography:
  partition: iso
  bondDegree: 9
standards:
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "78397a76-9a19-891b-b409-239b67f046cb"
  stages:
    - stage: path
      stageUuid: "2bc99238-ebe1-815f-af4a-4a6666814891"
    - stage: trinity
      stageUuid: "8c763bad-1917-8313-8756-5d78d7e85589"
    - stage: boundary
      stageUuid: "0435c67a-b5bd-842a-bb55-e63af4d93b2d"
    - stage: links
      stageUuid: "ba60cf8d-f3e9-8940-80e1-31d903bbddb2"
    - stage: horo
      stageUuid: "fcca0cf6-5a14-8b4a-8998-549888c4f4c3"
    - stage: seal
      stageUuid: "c88be5a4-d92a-8b3e-b7b6-03d3db302d08"
    - stage: uuid
      stageUuid: "1e7215c0-36f0-82ca-9377-e2b749e747dd"
version: 2
---
# ISO 9362 — BIC / SWIFT

**Edition:** ISO 9362:2022.
**Registry holder:** SWIFT.
**Publisher:** <https://www.iso.org/standard/81111.html>

## What's here

- `bic.ts` — `isSwiftBic(s)` regex for the 8 or 11-character BIC structure.

## Used by

Bank-routing fields on `BankStatements`, `PaymentMethods`, `Vendors`.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-9362:2022 bic`

Composes: [[standards]] · [[identity]].
