---
name: api
description: "Use when reasoning about the commercial trading-API catalogue — payment gateways, marketplaces, shipping carriers, Peppol/EDI access points, banking aggregators, and FX feeds; public metadata only, credentials in tenant sandbox."
atomPath: "trading/api"
coordinate: "trading/api · 7/descent · b55981ff"
contentUuid: "96da6651-00fe-5187-bf34-788cf28634a0"
diamondUuid: "4ff89162-f108-863b-bc2b-bd96c4f2e1cc"
uuid: "b55981ff-445f-85d2-b265-10a93ee5668d"
horo: 7
typography:
  partition: trading
  bondDegree: 66
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
  computationUuid: "fdd530e8-c613-87b6-a34a-db52de9664ac"
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
      stageUuid: "1d840d46-92bd-828e-a0ce-85c51d0a7607"
    - stage: seal
      stageUuid: "00198611-fec6-8505-88c1-da8051fa0ab5"
    - stage: uuid
      stageUuid: "4725ac97-be9d-857b-bff1-902b3a78f655"
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
