---
name: api
description: "Use when reasoning about the commercial trading-API catalogue — payment gateways, marketplaces, shipping carriers, Peppol/EDI access points, banking aggregators, and FX feeds; public metadata only, credentials in tenant sandbox."
atomPath: "trading/api"
coordinate: "trading/api · 5/round · ff72f3ca"
contentUuid: "925b0933-da05-52aa-9f9d-6a66923033e8"
diamondUuid: "84f953e2-0ad2-8e3d-86c7-d3e316f6b36b"
uuid: "ff72f3ca-a83c-8887-a06d-42340f33ebc8"
horo: 5
typography:
  partition: trading
  bondDegree: 100
standards:
  - "EN-16931 + Peppol-BIS-3 e-invoicing access-points"
  - "ISO-20022 financial-messages cross-references"
  - "ISO-20022 financial-messages cross-references`"
  - "ISO-3166-1:2020 country-codes alpha-2 region-scope"
  - "ISO-3166-1:2020 country-codes alpha-2 region-scope`"
  - "ISO-4217:2015 currency-codes fx-feeds"
  - "ISO-4217:2015 currency-codes fx-feeds`"
  - "PSD2 EU-2015/2366 open-banking-aggregators (Berlin Group NextGenPSD2)"
  - "RFC-9110 http-semantics REST-client"
  - "RFC-9110 http-semantics REST-client`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "488fbc6c-4cfb-880d-9f8a-6e35a5f0ef83"
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
      stageUuid: "255999ce-5ec0-808d-a0ad-db4b086db952"
    - stage: seal
      stageUuid: "00198611-fec6-8505-88c1-da8051fa0ab5"
    - stage: uuid
      stageUuid: "838c9347-3a5c-8bd7-b607-b101cc864b47"
version: 2
---
# api — commercial trading-API catalogue

The **commercial** sibling of the official per-country authority registry (`@/country/api`). Catalogues third-party services a trading company plugs into — gateways, marketplaces, carriers, Peppol access points, open-banking aggregators, FX feeds. Each entry carries public metadata only; per-tenant secrets live in `@/tenant/remote/secret`.

Matter-twin: `src/trading/api/index.ts` — `TRADING_APIS` · `getTradingApis` · `getTradingApisByCategory` · `hasPaymentGateway` · `listAllTradingApis`. Consumed by `@/country/context`, `@/trading/api/client`, MCP `erpax.trading.list`.

**Law — [[law]]: api is one word on the trading diamond path — `trading/api`, not a hyphenated config folder; the catalogue and its clients share the same atom chain.**

@see [[trading]] · [[country]] · [[commerce]] · [[payment]] · [[carriers]] · [[connections]]

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2 region-scope`
- `@standard ISO-4217:2015 currency-codes fx-feeds`
- `@standard ISO-20022 financial-messages cross-references`
- `@standard RFC-9110 http-semantics REST-client`
