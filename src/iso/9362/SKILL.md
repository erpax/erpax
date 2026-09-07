---
name: "9362"
description: "Use when implementing or referencing ISO 9362 — BIC / SWIFT."
atomPath: "iso/9362"
coordinate: "iso/9362 · 7/descent · d4af1b97"
contentUuid: "57032911-cd64-5290-a597-56b7e31ec1b4"
diamondUuid: "8ba852d8-8026-83c3-9ff9-802c0049fe42"
uuid: "d4af1b97-8e78-8026-89a4-96943862e056"
horo: 7
typography:
  partition: iso
  bondDegree: 9
standards:
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "2c1b1630-9240-8ce5-9d7a-837b58dc19cb"
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
      stageUuid: "be25f530-671a-834d-86f3-f59912fd195e"
    - stage: seal
      stageUuid: "c88be5a4-d92a-8b3e-b7b6-03d3db302d08"
    - stage: uuid
      stageUuid: "afcefe34-f746-8301-9857-fb7ea9840c8e"
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
