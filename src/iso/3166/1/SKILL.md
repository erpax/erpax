---
name: "1"
description: "Use when implementing or referencing ISO 3166-1 — Country codes."
atomPath: "iso/3166/1"
coordinate: "iso/3166/1 · 5/round · 3e2c8bda"
contentUuid: "77f08aae-0a56-50cd-bab9-fe4e522a9a46"
diamondUuid: "15446f43-c49e-8cc3-bae9-4637e7811d27"
uuid: "3e2c8bda-7884-841a-839d-a60a1ce92382"
horo: 5
typography:
  partition: iso
  bondDegree: 9
standards:
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 country-codes`"
  - "ISO/IEC-29119"
  - "Peppol-BIS-3.0"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e07be0e7-8f56-8de7-9303-0a92b54c0205"
  stages:
    - stage: path
      stageUuid: "ba069499-1393-8460-b924-5f142f4e08f7"
    - stage: trinity
      stageUuid: "a3ff79ae-48aa-86e8-865b-5c8e01d06db3"
    - stage: boundary
      stageUuid: "5e3e24fc-4940-8a61-b52c-b42c0fbf5133"
    - stage: links
      stageUuid: "2377e045-308e-8041-98ca-ead59a3fb939"
    - stage: horo
      stageUuid: "d603ed44-a55e-8541-afef-7924d25d4f25"
    - stage: seal
      stageUuid: "048ee2f8-f984-8257-bf1b-9145195155f0"
    - stage: uuid
      stageUuid: "bc557946-35db-8d6d-8a52-c8aa98a52d86"
version: 2
---
# ISO 3166-1 — Country codes

**Edition:** ISO 3166-1:2020.
**Publisher:** <https://www.iso.org/iso-3166-country-codes.html>
**Online browsing:** <https://www.iso.org/obp/ui/#search>

## What's here

- `validate.ts` — `isIso3166Alpha2(s)`, `isIso3166Alpha3(s)`.

## Out of scope

- Numeric codes (UN M.49) — implement under `un-m49/` if needed.
- Reserved / exceptionally reserved alpha codes (e.g. `EU`, `UK`) — caller's
  policy whether to accept.

## Used by

Every Payload field named `country` (collections: `Tenants`, `Customers`,
`Vendors`, `TaxJurisdictions`, address fields under multi-tenant ecommerce).

**Law — [[law]]: a country is identified only by its ISO 3166-1 code (alpha-2 / alpha-3) — every `country` field across the corpus speaks one canonical codeset, so the same place is the same code everywhere, never a free-text name.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes`

Composes: [[standards]].
