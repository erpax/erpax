---
name: "1"
description: "Use when implementing or referencing ISO 3166-1 — Country codes."
atomPath: "iso/3166/1"
coordinate: "iso/3166/1 · 1/base · 5afee0d1"
contentUuid: "ada5d1ce-f472-5cd3-929d-fb2dcec7894b"
diamondUuid: "6c3907aa-f95f-865b-bc5c-e91f686091cc"
uuid: "5afee0d1-185a-8f57-b9aa-f24def1acd6f"
horo: 1
typography:
  partition: iso
  bondDegree: 0
standards:
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 country-codes`"
  - "Peppol-BIS-3.0"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "02df5e1f-eb2b-846f-b4e8-a421f35bb9ef"
  stages:
    - stage: path
      stageUuid: "ba069499-1393-8460-b924-5f142f4e08f7"
    - stage: trinity
      stageUuid: "a3ff79ae-48aa-86e8-865b-5c8e01d06db3"
    - stage: boundary
      stageUuid: "5e3e24fc-4940-8a61-b52c-b42c0fbf5133"
    - stage: links
      stageUuid: "5bdd1305-a952-81f1-9792-f1dbbad7f5a7"
    - stage: horo
      stageUuid: "84f036b1-8b53-84b6-a609-c844e30a77bb"
    - stage: seal
      stageUuid: "048ee2f8-f984-8257-bf1b-9145195155f0"
    - stage: uuid
      stageUuid: "2da6182a-4f2e-8f0c-bde1-450b1c6b5eb9"
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
