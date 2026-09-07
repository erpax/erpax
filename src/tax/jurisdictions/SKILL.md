---
name: jurisdictions
description: "Use when setting up or querying tax authority master data — jurisdiction code, country/region/level (national to supranational), VAT registration number and dates, filing frequency and due day, filing currency. The per-tenant tax-authority master collection referenced by tax codes, calculations and returns."
atomPath: "tax/jurisdictions"
coordinate: "tax/jurisdictions · 2/share · f48cdb99"
contentUuid: "8ec45641-5033-5978-96a6-d9a5f1416284"
diamondUuid: "6bd4f017-ed15-8536-9862-b969ddf796b5"
uuid: "f48cdb99-0423-8a27-a691-0ffd0c923dbb"
horo: 2
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
  computationUuid: "a8206092-fdc6-8d21-b7a4-8d39f329bc92"
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
      stageUuid: "70ddc5fc-af8c-8bb7-9290-f2f7e09316d2"
    - stage: seal
      stageUuid: "041ed780-4185-84da-b56d-9fe91a87f98b"
    - stage: uuid
      stageUuid: "e149bc05-f7e6-83a7-8eb9-e6c22ba1e7f9"
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
