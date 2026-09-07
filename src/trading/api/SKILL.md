---
name: api
description: "Use when reasoning about the commercial trading-API catalogue — payment gateways, marketplaces, shipping carriers, Peppol/EDI access points, banking aggregators, and FX feeds; public metadata only, credentials in tenant sandbox."
atomPath: "trading/api"
coordinate: "trading/api · 4/weave · aaae9b08"
contentUuid: "c5b8bfaf-4745-5bd5-942c-622afc4357b8"
diamondUuid: "86f0a8e1-0f5d-874e-836f-20af84d4d115"
uuid: "aaae9b08-fe45-81d5-b582-ec712a775dac"
horo: 4
typography:
  partition: trading
  bondDegree: 102
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
  computationUuid: "6450fd64-7e22-81ba-84f9-7d8501afb007"
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
      stageUuid: "2371c255-1e7e-87d5-a0c7-c800f6c6d065"
    - stage: seal
      stageUuid: "00198611-fec6-8505-88c1-da8051fa0ab5"
    - stage: uuid
      stageUuid: "b63d8b29-11ac-8dc2-8e48-4d498d27ecf4"
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
