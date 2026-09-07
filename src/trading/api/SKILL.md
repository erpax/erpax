---
name: api
description: "Use when reasoning about the commercial trading-API catalogue — payment gateways, marketplaces, shipping carriers, Peppol/EDI access points, banking aggregators, and FX feeds; public metadata only, credentials in tenant sandbox."
atomPath: "trading/api"
coordinate: "trading/api · 4/weave · e5c31aa3"
contentUuid: "a353302d-4454-5c15-8c96-def6c66cee45"
diamondUuid: "d3fb4df8-c960-89a7-94a0-b2f2d1419861"
uuid: "e5c31aa3-6612-8919-89cc-9bcf7a1703b6"
horo: 4
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
  computationUuid: "7e1a478e-3c63-844a-ab26-eb4d35219190"
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
      stageUuid: "420215a9-d07d-8413-b451-de5584429b9c"
    - stage: seal
      stageUuid: "00198611-fec6-8505-88c1-da8051fa0ab5"
    - stage: uuid
      stageUuid: "4156885d-8729-8c78-b3a1-4d9059868f64"
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
