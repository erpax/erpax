---
name: "13616"
description: Use when implementing or referencing ISO 13616 — IBAN.
atomPath: "iso/13616"
coordinate: "iso/13616 · 4/weave · 564036b9"
contentUuid: "5a6591e3-b196-51c9-bbd2-d648d7e49380"
diamondUuid: "7db07494-6463-852f-9e60-56188bc13634"
uuid: "564036b9-2729-8b68-baab-3e4542ba390b"
horo: 4
typography:
  partition: iso
  bondDegree: 10
standards:
  - "EU-2003/88/EC"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-7064"
  - "ISO/IEC-29119"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "5de021e4-4f84-856e-8616-39c5e46f9a8a"
  stages:
    - stage: path
      stageUuid: "a6497596-f432-84f5-b0c0-f2f977696194"
    - stage: trinity
      stageUuid: "d727a187-b74f-8401-8b22-3415f14e6f2b"
    - stage: boundary
      stageUuid: "6a546e41-2c97-8260-a4e3-e6a8f1695bdf"
    - stage: links
      stageUuid: "adf366bb-b361-8c78-82cc-335fd8f4f8d0"
    - stage: horo
      stageUuid: "2f7b3a5f-fb09-8285-aab7-76448b60255a"
    - stage: seal
      stageUuid: "2bd5b69b-6e79-861a-b3f2-811e7836ae1d"
    - stage: uuid
      stageUuid: "d77a8e2c-b0fa-8c95-9343-23b7878d63e7"
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
