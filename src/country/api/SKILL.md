---
name: api
description: "Use when reasoning about the official per-country authority API catalogue — tax authorities, business registries, e-invoicing portals, VAT/VIES, payroll, sanctions, and central-bank FX; public metadata only, credentials in tenant sandbox."
atomPath: "country/api"
coordinate: "country/api · 8/crest · 6f6b4c8e"
contentUuid: "d101492a-a9c8-548f-a6a4-5a1c2726eef7"
diamondUuid: "90ade07c-4010-81cd-8e6f-d5aafa700889"
uuid: "6f6b4c8e-e965-816f-88f4-5c6302c54e9b"
horo: 8
typography:
  partition: country
  bondDegree: 98
standards:
  - "AMLD-5 ubo-registry-access"
  - "Berlin-Group-PSD2"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU 2014/55 b2g-e-invoicing portals"
  - "IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates"
  - "ISO-20022 financial-messages cross-references"
  - "ISO-20022 financial-messages cross-references`"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-3166-1:2020 country-codes alpha-2`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - PSD2
  - "Peppol-BIS-3.0"
  - "SDMX 2.1 statistical-data-and-metadata-exchange"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "dc78ff84-5c15-8f93-a2d3-5ccfa3cadcfc"
  stages:
    - stage: path
      stageUuid: "5bfb2135-1d9c-822f-bc66-b6156d6dee52"
    - stage: trinity
      stageUuid: "3ebee979-4757-8053-956f-6877e97a3549"
    - stage: boundary
      stageUuid: "be8b504b-1e74-8115-8422-e9d946c5b3c9"
    - stage: links
      stageUuid: "5766e3e9-cb79-865e-a452-7711d00d2d8d"
    - stage: horo
      stageUuid: "a8495ea8-f111-8e9b-9a1d-43e5ce599521"
    - stage: seal
      stageUuid: "5c6e5472-2cca-81fd-9793-580c3254f166"
    - stage: uuid
      stageUuid: "1a84c366-29fd-8bb9-a4e5-155df0bdeb65"
version: 2
---
# api — official per-country authority API catalogue

The **authority** sibling of the commercial trading-API registry (`@/trading/api`). Catalogues public endpoints each country's authorities expose — registries, tax portals, e-invoicing, VIES, sanctions, open-banking directories, FX publishers. Per-tenant secrets never live here.

Matter-twin: `src/country/api/index.ts` — `COUNTRY_APIS` · `BANK_APIS` · `getCountryApis` · `getCountryApisByKind` · `hasEInvoicingPortal`. Consumed by `@/country/context`, `@/country/api/client`, MCP and admin surfaces.

**Law — [[law]]: api is one word on the country diamond path — `country/api`, not a hyphenated config folder; the catalogue and its clients share the same atom chain.**

@see [[country]] · [[trading]] · [[law]] · [[standards]]

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2`
- `@standard ISO-20022 financial-messages cross-references`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time`
