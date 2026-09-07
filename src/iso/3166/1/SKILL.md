---
name: "1"
description: "Use when implementing or referencing ISO 3166-1 — Country codes."
atomPath: "iso/3166/1"
coordinate: "iso/3166/1 · 4/weave · 76178abc"
contentUuid: "04f86295-8a44-5a62-aa99-b88135836e4b"
diamondUuid: "80e87054-796f-8cf1-b5ee-fda2ed8e8d8c"
uuid: "76178abc-f938-82b8-998a-9ffb34e56802"
horo: 4
typography:
  partition: iso
  bondDegree: 7
standards:
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 country-codes`"
  - "ISO/IEC-29119"
  - "Peppol-BIS-3.0"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "f4c630f1-14a7-8cc5-b968-0a9067674b72"
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
      stageUuid: "ea169a36-8767-8298-ac1d-c3df9be3223e"
    - stage: seal
      stageUuid: "048ee2f8-f984-8257-bf1b-9145195155f0"
    - stage: uuid
      stageUuid: "1afb7dbe-2024-8fb8-9c0b-f0b1465dcd6a"
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
