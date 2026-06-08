---
name: api
description: "Use when reasoning about the official per-country authority API catalogue — tax authorities, business registries, e-invoicing portals, VAT/VIES, payroll, sanctions, and central-bank FX; public metadata only, credentials in tenant sandbox."
atomPath: country/api
coordinate: country/api · 5/round · be8f7e2f
contentUuid: "79f2f8a4-99fc-5875-ad19-b56506571a21"
diamondUuid: "818d61ff-093d-8b99-89ad-d299bf07cc83"
uuid: "be8f7e2f-4d27-8164-a4a1-d08c0d412c75"
horo: 5
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
  bondDegree: 94
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
  - "EU-Taxonomy-2020/852"
  - "IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates"
  - "ISO-20022"
  - "ISO-20022 financial-messages cross-references"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - PSD2
  - "Peppol-BIS-3.0"
  - "SDMX 2.1 statistical-data-and-metadata-exchange"
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
  computationUuid: "88fd0c30-a71e-81c6-8b04-aa6a280ee0d4"
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
      stageUuid: "32cf7be8-4f10-8188-9383-4f54ba4a6526"
    - stage: seal
      stageUuid: "5c6e5472-2cca-81fd-9793-580c3254f166"
    - stage: uuid
      stageUuid: "12991772-a750-8934-878b-c4800d834467"
version: 2
---
# api — official per-country authority API catalogue

The **authority** sibling of the commercial trading-API registry (`@/trading/api`). Catalogues public endpoints each country's authorities expose — registries, tax portals, e-invoicing, VIES, sanctions, open-banking directories, FX publishers. Per-tenant secrets never live here.

Matter-twin: `src/country/api/index.ts` — `COUNTRY_APIS` · `BANK_APIS` · `getCountryApis` · `getCountryApisByKind` · `hasEInvoicingPortal`. Consumed by `@/country/context`, `@/country/api/client`, MCP and admin surfaces.

**Law — [[law]]: api is one word on the country diamond path — `country/api`, not a hyphenated config folder; the catalogue and its clients share the same atom chain.**

@see [[country]] · [[trading]] · [[law]] · [[standards]]
