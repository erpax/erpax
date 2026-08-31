---
name: "9362"
description: "Use when implementing or referencing ISO 9362 — BIC / SWIFT."
atomPath: "iso/9362"
coordinate: "iso/9362 · 7/descent · e7deae68"
contentUuid: "b6b70cba-70b2-5da6-b611-59f0fda052d8"
diamondUuid: "d434f49a-8948-805b-84b6-2d96fb863c54"
uuid: "e7deae68-6799-8c70-9d17-5f5767920be7"
horo: 7
typography:
  partition: iso
  bondDegree: 0
standards:
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "317ea82c-bb2d-84f4-8cf6-c05e784f17be"
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
      stageUuid: "c79b85c2-2af4-83ed-a1b4-370368b3ea16"
    - stage: seal
      stageUuid: "9f565a1e-067c-8f37-8571-dfd4bda22639"
    - stage: uuid
      stageUuid: "f4d095cd-9c58-8cd8-a3b8-c179f8aaeab8"
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

Composes: [[iso]] · [[standards]] · [[identity]].
