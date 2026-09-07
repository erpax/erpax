---
name: "9362"
description: "Use when implementing or referencing ISO 9362 — BIC / SWIFT."
atomPath: "iso/9362"
coordinate: "iso/9362 · 8/crest · 263826c9"
contentUuid: "e1d2bff4-53c9-56b9-a3b2-8b153c82d89a"
diamondUuid: "dfc92026-589e-86c8-b157-229744a2c4a0"
uuid: "263826c9-c301-8168-af27-db3ee0add661"
horo: 8
typography:
  partition: iso
  bondDegree: 9
standards:
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "c7187d8d-9a30-8fef-a97f-741c10e536b0"
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
      stageUuid: "a8f36dbf-dbc7-8a00-b746-7a77d68d8490"
    - stage: seal
      stageUuid: "c88be5a4-d92a-8b3e-b7b6-03d3db302d08"
    - stage: uuid
      stageUuid: "33881022-c38a-8443-aa68-513441e63246"
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
