---
name: "13616"
description: Use when implementing or referencing ISO 13616 — IBAN.
atomPath: "iso/13616"
coordinate: "iso/13616 · 7/descent · 20540aa6"
contentUuid: "1607bf4d-0696-5d9c-b18a-9fe72563cdac"
diamondUuid: "8e048af0-0515-8aa9-a180-580e7de95963"
uuid: "20540aa6-9041-898e-8df6-e149bca921e7"
horo: 7
typography:
  partition: iso
  bondDegree: 12
standards:
  - "EU-2003/88/EC"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-7064"
  - "ISO/IEC-29119"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "991ea6d8-a343-8e03-b43d-efa8e5ad2f43"
  stages:
    - stage: path
      stageUuid: "a6497596-f432-84f5-b0c0-f2f977696194"
    - stage: trinity
      stageUuid: "d727a187-b74f-8401-8b22-3415f14e6f2b"
    - stage: boundary
      stageUuid: "6a546e41-2c97-8260-a4e3-e6a8f1695bdf"
    - stage: links
      stageUuid: "81287d2a-68b0-8d79-ba49-af87203f25b6"
    - stage: horo
      stageUuid: "2426c105-a2d2-82b1-9b67-420d2a8f8f50"
    - stage: seal
      stageUuid: "2bd5b69b-6e79-861a-b3f2-811e7836ae1d"
    - stage: uuid
      stageUuid: "2f7934e1-7195-8725-a485-8781e515bb63"
version: 2
---
# ISO 13616 — IBAN

**Edition:** ISO 13616-1:2020 (Registry: ISO 13616-2:2020).
**Registry holder:** SWIFT.
**Publisher:** <https://www.iso.org/standard/81090.html>
**Registry:** <https://www.swift.com/standards/data-standards/iban>

## What's here

- `iban.ts` — `isIban(s)` with mod-97 checksum per ISO 7064 / ISO 13616-1 §A.1.

## Used by

Bank-account fields on `BankStatements`, `PaymentMethods`, `Payments`,
`Vendors`, `Tenants`. PCI-DSS scope: not card data; treat as PII (GDPR).

**Law — [[law]]: an IBAN is self-validating — its mod-97 check digits (ISO 7064) make the identifier carry its own integrity proof, so a typo fails the checksum, not the bank.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-13616-1:2020 iban`

Composes: [[standards]] · [[identity]].
