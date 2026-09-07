---
name: "13616"
description: Use when implementing or referencing ISO 13616 — IBAN.
atomPath: "iso/13616"
coordinate: "iso/13616 · 5/round · f7400aff"
contentUuid: "f89b3374-e892-5ad6-819a-68e7ffadfed6"
diamondUuid: "4c72b583-87a4-8470-8024-a25fa25ab785"
uuid: "f7400aff-262d-8e03-84ac-e68d3a36fe2c"
horo: 5
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
  computationUuid: "2e9f4ef0-e43a-8125-9f6b-1e62571dd3a0"
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
      stageUuid: "727122d5-7d7b-8c78-a33b-7ab4f11e3169"
    - stage: seal
      stageUuid: "2bd5b69b-6e79-861a-b3f2-811e7836ae1d"
    - stage: uuid
      stageUuid: "5cb0dc30-fb03-85cf-8fa5-3dcaf329596f"
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
