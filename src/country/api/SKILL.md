---
name: api
description: "Use when reasoning about the official per-country authority API catalogue — tax authorities, business registries, e-invoicing portals, VAT/VIES, payroll, sanctions, and central-bank FX; public metadata only, credentials in tenant sandbox."
atomPath: "country/api"
coordinate: "country/api · 4/weave · 44e20053"
contentUuid: "317887af-bb55-5bcb-91c8-128d39636d11"
diamondUuid: "514bc5fc-549d-8f1b-9f5e-ee35a7ac1005"
uuid: "44e20053-9d2a-8209-9e1a-66aab9b4eaf8"
horo: 4
bonds:
  in:
    - access
    - calculate
    - client
    - country
    - descent
    - dev
    - dimension
    - endpoint
    - endpoints
    - fs
    - github
    - harden
    - integrity
    - law
    - mcp
    - path
    - payload
    - port
    - quantum
    - queries
    - redirects
    - reference
    - spec
    - url
    - uuid
    - web
    - workspace
  out:
    - access
    - calculate
    - client
    - descent
    - dev
    - dimension
    - endpoint
    - endpoints
    - fs
    - github
    - harden
    - integrity
    - law
    - mcp
    - path
    - payload
    - port
    - quantum
    - queries
    - redirects
    - reference
    - spec
    - url
    - uuid
    - web
    - workspace
typography:
  partition: country
  bondDegree: 96
  neighbors: []
standards:
  - "AMLD-5 ubo-registry-access"
  - "Berlin-Group-PSD2"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU 2014/55 b2g-e-invoicing portals"
  - "EU-2002/58"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates"
  - "ISO-20022"
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
neighbors:
  wikilink:
    - country
    - law
    - standards
    - trading
  matrix:
    - access
    - calculate
    - client
    - descent
    - dev
    - dimension
    - endpoint
    - endpoints
    - fs
    - github
    - harden
    - integrity
    - law
    - mcp
    - path
    - payload
    - port
    - quantum
    - queries
    - redirects
    - reference
    - spec
    - url
    - uuid
    - web
    - workspace
  backlinks:
    - access
    - calculate
    - client
    - descent
    - dev
    - dimension
    - endpoint
    - endpoints
    - fs
    - github
    - harden
    - integrity
    - law
    - mcp
    - path
    - payload
    - port
    - quantum
    - queries
    - redirects
    - reference
    - spec
    - url
    - uuid
    - web
    - workspace
signatures:
  computationUuid: "bf89304b-51e5-8528-a9ef-29515186cd6d"
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
      stageUuid: "25b631bb-abfd-8c7c-a5c2-617fb3c1ebf8"
    - stage: seal
      stageUuid: "5c6e5472-2cca-81fd-9793-580c3254f166"
    - stage: uuid
      stageUuid: "37ebd0c7-cb9c-841b-806a-b42476b48f95"
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
