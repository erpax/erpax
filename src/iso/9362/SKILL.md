---
name: "9362"
description: "Use when implementing or referencing ISO 9362 — BIC / SWIFT."
atomPath: "iso/9362"
coordinate: "iso/9362 · 4/weave · 33f1b36c"
contentUuid: "053947e5-65e4-5e3c-902f-5371aa931aa6"
diamondUuid: "5acec40a-b9bc-8a6d-81f5-df30a50b22e4"
uuid: "33f1b36c-b520-8f29-aa89-f34fec9e1bbe"
horo: 4
typography:
  partition: iso
  bondDegree: 9
standards:
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b5fab283-d9d5-8d75-9203-c16ee395b309"
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
      stageUuid: "18773baa-b6ca-8247-9235-337b648de882"
    - stage: seal
      stageUuid: "c88be5a4-d92a-8b3e-b7b6-03d3db302d08"
    - stage: uuid
      stageUuid: "d60bac1d-7567-8394-aa6a-096d2d223e33"
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
