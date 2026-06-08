---
name: jurisdictions
description: "Use when setting up or querying tax authority master data — jurisdiction code, country/region/level (national to supranational), VAT registration number and dates, filing frequency and due day, filing currency. The per-tenant tax-authority master collection referenced by tax codes, calculations and returns."
atomPath: tax/jurisdictions
coordinate: tax/jurisdictions · 7/descent · 954307b7
contentUuid: "dcbd83ae-743e-54cf-ab69-a4a272405ab5"
diamondUuid: "a58ffda7-0994-84eb-9206-dbba0514332a"
uuid: "954307b7-c273-8726-8f98-9fc70c89015f"
horo: 7
bonds:
  in:
    - codes
    - items
    - returns
    - tax
  out:
    - codes
    - items
    - returns
typography:
  partition: tax
  bondDegree: 0
  neighbors: []
standards:
  - "EN-16931:2017 §BG-23 vat-breakdown"
  - "IAS-12"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes"
  - "ISO-4217:2015 currency-codes"
  - "OECD SAF-T jurisdiction-codes"
  - "UN-CEFACT"
  - "US-GAAP"
bindings: []
neighbors:
  wikilink:
    - codes
    - items
    - returns
  matrix:
    - codes
    - items
    - returns
  backlinks:
    - codes
    - items
    - returns
signatures:
  computationUuid: "c5e8dec2-7d37-8788-865d-20233caa97f3"
  stages:
    - stage: path
      stageUuid: "615009fd-1ff2-8e0a-9667-4ad384c694d1"
    - stage: trinity
      stageUuid: "915a47bc-6071-85a3-98d7-22d98a21453e"
    - stage: boundary
      stageUuid: "7f1a3208-b6f5-8a0b-8658-c30be50eeecc"
    - stage: links
      stageUuid: "c218d658-a066-8666-94d4-c1211cf9f4bb"
    - stage: horo
      stageUuid: "b5eb5a2e-99f4-8c2d-b31e-4a3e881ce887"
    - stage: seal
      stageUuid: "e1378cf1-3619-8dcd-9f58-dcc58f540d56"
    - stage: uuid
      stageUuid: "51c89823-3751-8c67-9401-6b53aeef7440"
version: 2
---
# tax-jurisdictions

Tax Jurisdictions — tax authority master.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-3166-1:2020 country-codes alpha-2
- ISO-3166-2:2020 subdivision-codes
- ISO-4217:2015 currency-codes
- EN-16931:2017 §BG-23 vat-breakdown
- OECD SAF-T jurisdiction-codes

Composes: [[tax/jurisdictions/deferred/tax/items]] · [[tax/jurisdictions/tax/codes]] · [[tax/jurisdictions/tax/returns]].
