---
name: "1"
description: "Use when implementing or referencing ISO 3166-1 — Country codes."
atomPath: "iso/3166/1"
coordinate: "iso/3166/1 · 1/base · 35c1974d"
contentUuid: "715849f7-cec4-5e17-bcbd-43273933ec4e"
diamondUuid: "7a41410f-ca7b-814e-9a37-6cf199edccb8"
uuid: "35c1974d-e76c-8fa7-8a9e-459f83578e51"
horo: 1
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: iso
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-3166-1:2020 country-codes"
  - "ISO-3166-1:2020 country-codes`"
  - "Peppol-BIS-3.0"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "ac0fb757-d1a4-8647-8f87-6950ac639085"
  stages:
    - stage: path
      stageUuid: "ba069499-1393-8460-b924-5f142f4e08f7"
    - stage: trinity
      stageUuid: "a3ff79ae-48aa-86e8-865b-5c8e01d06db3"
    - stage: boundary
      stageUuid: "5e3e24fc-4940-8a61-b52c-b42c0fbf5133"
    - stage: links
      stageUuid: "7e6a8a6c-1a1b-8ba9-94bb-6e3baf037598"
    - stage: horo
      stageUuid: "db6acaab-a420-865d-ad5b-5ca4e3d7bed9"
    - stage: seal
      stageUuid: "048ee2f8-f984-8257-bf1b-9145195155f0"
    - stage: uuid
      stageUuid: "f341857a-6bdf-8c81-b39b-9f50c9f30db5"
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
