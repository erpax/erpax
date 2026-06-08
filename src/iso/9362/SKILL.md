---
name: "9362"
description: Use when implementing or referencing ISO 9362 — BIC / SWIFT.
atomPath: iso/9362
coordinate: iso/9362 · 7/descent · e8bdcac5
contentUuid: "729cb34e-69ab-5f2f-9983-c3d818984ec3"
diamondUuid: "d355692c-7778-8671-b401-6fafff0d5027"
uuid: "e8bdcac5-cdbd-8111-b5ee-ac8b7186217c"
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
  - "ISO-9362"
  - "ISO-9362:2022 bic"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "cf1fb804-14ba-82db-8152-b837d3cb875a"
  stages:
    - stage: path
      stageUuid: "2bc99238-ebe1-815f-af4a-4a6666814891"
    - stage: trinity
      stageUuid: "8c763bad-1917-8313-8756-5d78d7e85589"
    - stage: boundary
      stageUuid: "0435c67a-b5bd-842a-bb55-e63af4d93b2d"
    - stage: links
      stageUuid: "9cb5ad9e-a118-802a-a4cd-4f8842cbdc1b"
    - stage: horo
      stageUuid: "e974a536-ddfb-8759-a5ae-41bb1a73bc56"
    - stage: seal
      stageUuid: "9f565a1e-067c-8f37-8571-dfd4bda22639"
    - stage: uuid
      stageUuid: "c65f411f-02bc-8f1d-a0a3-01d09e1fea58"
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
