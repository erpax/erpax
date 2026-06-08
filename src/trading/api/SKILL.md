---
name: api
description: "Use when reasoning about the commercial trading-API catalogue — payment gateways, marketplaces, shipping carriers, Peppol/EDI access points, banking aggregators, and FX feeds; public metadata only, credentials in tenant sandbox."
atomPath: trading/api
coordinate: trading/api · 5/round · eb1b7568
contentUuid: "5b3cc5f5-82cd-533d-87b7-c5af8d7ae919"
diamondUuid: "039e1c80-6bb7-8a8a-94f3-b14b15241c30"
uuid: "eb1b7568-c994-87fe-9a45-ed5972f0a9c4"
horo: 5
bonds:
  in:
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
    - trading
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
  partition: trading
  bondDegree: 0
  neighbors: []
standards:
  - "EN-16931 + Peppol-BIS-3 e-invoicing access-points"
  - "EU-2002/58"
  - "EU-Taxonomy-2020/852"
  - "ISO-20022"
  - "ISO-20022 financial-messages cross-references"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes alpha-2 region-scope"
  - "ISO-4217:2015 currency-codes fx-feeds"
  - "PSD2 EU-2015/2366 open-banking-aggregators (Berlin Group NextGenPSD2)"
  - "RFC-9110 http-semantics REST-client"
bindings: []
neighbors:
  wikilink:
    - carriers
    - commerce
    - connections
    - country
    - law
    - payment
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
  computationUuid: "46152e99-827e-8270-af93-851b19fad6a3"
  stages:
    - stage: path
      stageUuid: "c268fa1b-e1c8-8a18-906e-b42582eac018"
    - stage: trinity
      stageUuid: "58fcbf33-03ea-8da7-9fab-88c88aa71136"
    - stage: boundary
      stageUuid: "3b9df761-a65b-8a89-ae9e-3a10a9650240"
    - stage: links
      stageUuid: "8a1dffb1-ebe5-886e-bb8a-d106ab9999f0"
    - stage: horo
      stageUuid: "82211919-8f33-8e30-932a-e2659ea13823"
    - stage: seal
      stageUuid: "0eb9cc6f-a50e-8b40-be05-3f41ce4ea11a"
    - stage: uuid
      stageUuid: "ee6b5860-0323-8fa9-ac4e-95dbb3286b2c"
version: 2
---
# api — commercial trading-API catalogue

The **commercial** sibling of the official per-country authority registry (`@/country/api`). Catalogues third-party services a trading company plugs into — gateways, marketplaces, carriers, Peppol access points, open-banking aggregators, FX feeds. Each entry carries public metadata only; per-tenant secrets live in `@/tenant/remote/secret`.

Matter-twin: `src/trading/api/index.ts` — `TRADING_APIS` · `getTradingApis` · `getTradingApisByCategory` · `hasPaymentGateway` · `listAllTradingApis`. Consumed by `@/country/context`, `@/trading/api/client`, MCP `erpax.trading.list`.

**Law — [[law]]: api is one word on the trading diamond path — `trading/api`, not a hyphenated config folder; the catalogue and its clients share the same atom chain.**

@see [[trading]] · [[country]] · [[commerce]] · [[payment]] · [[carriers]] · [[connections]]
