---
name: "13616"
description: Use when implementing or referencing ISO 13616 — IBAN.
atomPath: iso/13616
coordinate: iso/13616 · 5/round · 1c9d897c
contentUuid: "0a3eafb2-ee82-50f7-a1fd-40a0126e4709"
diamondUuid: "0d17f8d8-f9e7-8302-a78f-7a55ea1bb9c1"
uuid: "1c9d897c-4e68-8c52-aa2a-ae898e13e32c"
horo: 5
bonds:
  in:
    - iso
    - law
  out:
    - law
typography:
  partition: iso
  bondDegree: 3
  neighbors: []
standards:
  - "EU-2003/88/EC"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban"
  - "ISO-7064"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "a48410fd-5e86-86d3-9766-ca829cd81bfe"
  stages:
    - stage: path
      stageUuid: "a6497596-f432-84f5-b0c0-f2f977696194"
    - stage: trinity
      stageUuid: "d727a187-b74f-8401-8b22-3415f14e6f2b"
    - stage: boundary
      stageUuid: "6a546e41-2c97-8260-a4e3-e6a8f1695bdf"
    - stage: links
      stageUuid: "aff2fa31-a3e6-8839-bbeb-c3cbe4b45408"
    - stage: horo
      stageUuid: "c898a28d-379a-8145-9ea7-e34438ed9856"
    - stage: seal
      stageUuid: "b2998783-4b47-8362-9542-423fb867ac09"
    - stage: uuid
      stageUuid: "d26e708a-d01a-8c40-8361-8c1d971cc2d1"
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
