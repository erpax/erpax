---
name: api
description: "Use when reasoning about the official per-country authority API catalogue — tax authorities, business registries, e-invoicing portals, VAT/VIES, payroll, sanctions, and central-bank FX; public metadata only, credentials in tenant sandbox."
atomPath: "country/api"
coordinate: "country/api · 7/descent · 32f09023"
contentUuid: "a7afbcbe-73d4-5788-96cc-2c604f907a20"
diamondUuid: "f6a58c2f-c99d-8a78-9e19-97fd3aca4c4d"
uuid: "32f09023-1239-8311-868f-9aad17fa2cf5"
horo: 7
typography:
  partition: country
  bondDegree: 102
standards:
  - "AMLD-5 ubo-registry-access"
  - "Berlin-Group-PSD2"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU 2014/55 b2g-e-invoicing portals"
  - "ISO-20022 financial-messages cross-references"
  - "ISO-20022 financial-messages cross-references`"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-3166-1:2020 country-codes alpha-2`"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time`"
  - PSD2
  - "Peppol-BIS-3.0"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b61cbdcd-4fb2-80a4-b0e2-610d681b1db7"
  stages:
    - stage: path
      stageUuid: "5bfb2135-1d9c-822f-bc66-b6156d6dee52"
    - stage: trinity
      stageUuid: "3ebee979-4757-8053-956f-6877e97a3549"
    - stage: boundary
      stageUuid: "694e7536-a9cb-8c3b-8ff8-0f2000e6454b"
    - stage: links
      stageUuid: "5766e3e9-cb79-865e-a452-7711d00d2d8d"
    - stage: horo
      stageUuid: "c1ba00d5-ed78-85c2-9bef-462b2ad16f61"
    - stage: seal
      stageUuid: "7eddb1b0-38db-8234-bb93-a0e2322ada02"
    - stage: uuid
      stageUuid: "91086488-e647-8d1f-8f50-eaf48bac6105"
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
