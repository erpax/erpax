---
name: jurisdictions
description: "Use when setting up or querying tax authority master data — jurisdiction code, country/region/level (national to supranational), VAT registration number and dates, filing frequency and due day, filing currency. The per-tenant tax-authority master collection referenced by tax codes, calculations and returns."
atomPath: "tax/jurisdictions"
coordinate: "tax/jurisdictions · 8/crest · d8580891"
contentUuid: "965b91fa-36df-5c80-8ebc-ff26093a1bc9"
diamondUuid: "4319c8f8-176c-8f67-8208-05232db2581b"
uuid: "d8580891-8411-834f-bc39-d59bbcdee53b"
horo: 8
typography:
  partition: tax
  bondDegree: 14
standards:
  - "EN-16931:2017 §BG-23 vat-breakdown"
  - "EN-16931:2017 §BG-23 vat-breakdown`"
  - "IAS-12"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-3166-1:2020 country-codes alpha-2`"
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes"
  - "ISO-3166-2:2020 subdivision-codes`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "OECD SAF-T jurisdiction-codes"
  - "UN-CEFACT"
  - "US-GAAP"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "c6789910-69ee-8250-93d8-9bb4784d086d"
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
      stageUuid: "70d25b78-2a0a-8ae0-bdaa-d9b9cd6c3884"
    - stage: seal
      stageUuid: "041ed780-4185-84da-b56d-9fe91a87f98b"
    - stage: uuid
      stageUuid: "5c430d7c-068d-813f-af03-3520c4520bf5"
version: 2
---
# tax-jurisdictions

Tax Jurisdictions — tax authority master.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2`
- `@standard ISO-3166-2:2020 subdivision-codes`
- `@standard ISO-4217:2015 currency-codes`
- `@standard EN-16931:2017 §BG-23 vat-breakdown`

- ISO-3166-1:2020 country-codes alpha-2
- ISO-3166-2:2020 subdivision-codes
- ISO-4217:2015 currency-codes
- EN-16931:2017 §BG-23 vat-breakdown
- OECD SAF-T jurisdiction-codes

Composes: [[tax/jurisdictions/deferred/tax/items]] · [[tax/jurisdictions/tax/codes]] · [[tax/jurisdictions/tax/returns]].
