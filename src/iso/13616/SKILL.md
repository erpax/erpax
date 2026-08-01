---
name: "13616"
description: Use when implementing or referencing ISO 13616 — IBAN.
atomPath: "iso/13616"
coordinate: "iso/13616 · 1/base · 98aeb223"
contentUuid: "fdf27ccf-a8cf-5c18-aa27-917675ec7571"
diamondUuid: "cad42adb-e6cb-8fd5-9b5d-22754b8eb504"
uuid: "98aeb223-3d1e-8582-b6a6-f7caf41ba936"
horo: 1
typography:
  partition: iso
  bondDegree: 1
standards:
  - "EU-2003/88/EC"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-7064"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "80ab2104-d546-8a77-9fe7-8bd2a7a4d7e0"
  stages:
    - stage: path
      stageUuid: "a6497596-f432-84f5-b0c0-f2f977696194"
    - stage: trinity
      stageUuid: "d727a187-b74f-8401-8b22-3415f14e6f2b"
    - stage: boundary
      stageUuid: "6a546e41-2c97-8260-a4e3-e6a8f1695bdf"
    - stage: links
      stageUuid: "b00595e5-e1d4-8925-9166-5ad0f8b891f8"
    - stage: horo
      stageUuid: "fa1b7757-bd95-834f-bd29-88e0189c2e82"
    - stage: seal
      stageUuid: "b2998783-4b47-8362-9542-423fb867ac09"
    - stage: uuid
      stageUuid: "66b37b08-8e0e-883b-8fac-a769fb1a0867"
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
