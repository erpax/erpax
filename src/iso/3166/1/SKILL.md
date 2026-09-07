---
name: "1"
description: "Use when implementing or referencing ISO 3166-1 — Country codes."
atomPath: "iso/3166/1"
coordinate: "iso/3166/1 · 7/descent · 65c91d80"
contentUuid: "8d0932e7-2b6a-5d80-a309-ea629a1701ad"
diamondUuid: "3d9ac3a0-54bb-8d1a-a28e-60a7e0635349"
uuid: "65c91d80-9691-8765-b310-ff312d5b206f"
horo: 7
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
  computationUuid: "81854823-164f-8f41-a4e2-5d0bf334a663"
  stages:
    - stage: path
      stageUuid: "ba069499-1393-8460-b924-5f142f4e08f7"
    - stage: trinity
      stageUuid: "a3ff79ae-48aa-86e8-865b-5c8e01d06db3"
    - stage: boundary
      stageUuid: "5e3e24fc-4940-8a61-b52c-b42c0fbf5133"
    - stage: links
      stageUuid: "3108a2a0-1193-8e0d-a0b3-b37c2283b22a"
    - stage: horo
      stageUuid: "9d137153-5026-8c5d-a3e1-a6474595a2b1"
    - stage: seal
      stageUuid: "048ee2f8-f984-8257-bf1b-9145195155f0"
    - stage: uuid
      stageUuid: "d1bde905-d8fd-88c4-bd44-9ee62b02ef6a"
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
