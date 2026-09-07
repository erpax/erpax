---
name: "9362"
description: "Use when implementing or referencing ISO 9362 — BIC / SWIFT."
atomPath: "iso/9362"
coordinate: "iso/9362 · 5/round · 9dc3748c"
contentUuid: "00911bde-b6a5-566c-9941-60cc1eac58e7"
diamondUuid: "515bfe56-bff0-8d21-ba1f-fbf5d3999581"
uuid: "9dc3748c-1d1a-841b-99cd-100e403e8035"
horo: 5
typography:
  partition: iso
  bondDegree: 9
standards:
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "d1a35239-1621-8428-bbe9-12ae4439fa0c"
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
      stageUuid: "67bbe8e6-e1aa-850d-8b97-b665caaba0cd"
    - stage: seal
      stageUuid: "c88be5a4-d92a-8b3e-b7b6-03d3db302d08"
    - stage: uuid
      stageUuid: "661acf04-a1f6-8c4b-8e53-1007c5809f1a"
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
