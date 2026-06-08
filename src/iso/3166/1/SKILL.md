---
name: "1"
description: "Use when implementing or referencing ISO 3166-1 — Country codes."
atomPath: iso/3166/1
coordinate: iso/3166/1 · 5/round · e0664ada
contentUuid: "83cc7783-84c8-5d3d-b088-ea1bc237d3ae"
diamondUuid: "abf1f358-5f1a-8675-8da6-ad198983dfbf"
uuid: "e0664ada-22a0-870c-b1fa-c07a262f1ff7"
horo: 5
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
  - "ISO-13616-1"
  - "ISO-3166-1:2020 country-codes"
  - "Peppol-BIS-3.0"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "89943eb1-1444-8941-8dc5-85577b8d41f1"
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
      stageUuid: "69a66e95-fbcd-8564-a1aa-a28acc7cc52b"
    - stage: seal
      stageUuid: "048ee2f8-f984-8257-bf1b-9145195155f0"
    - stage: uuid
      stageUuid: "96d394d7-2218-82c5-9edc-e01cb4dfcd84"
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
