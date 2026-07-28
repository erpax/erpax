---
name: "9362"
description: "Use when implementing or referencing ISO 9362 — BIC / SWIFT."
atomPath: "iso/9362"
coordinate: "iso/9362 · 7/descent · 874aee59"
contentUuid: "fef83f40-2e7c-5e0a-ac2c-de3636ac9428"
diamondUuid: "0e66cac1-ef6c-8e73-b1e4-bff1dc5ba523"
uuid: "874aee59-7957-8ae0-9d19-b9f16e50f533"
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
  - "ISO-9362:2022 bic`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "ab3cf4b4-2c08-8997-9955-13305204c768"
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
      stageUuid: "ccb1e542-8081-8965-bf68-d44800c78532"
    - stage: seal
      stageUuid: "9f565a1e-067c-8f37-8571-dfd4bda22639"
    - stage: uuid
      stageUuid: "f69733e5-054f-8680-b1e4-ac5ad2865571"
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
