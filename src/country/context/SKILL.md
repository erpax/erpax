---
name: context
description: "Use when any code needs to branch on country — resolve a single canonical CountryContext from any signal (explicit, IBAN, address, tenant, house default) instead of reading the profile, specifics, and API registries directly."
atomPath: "country/context"
coordinate: "country/context · 8/crest · 8672646c"
contentUuid: "4253d20b-b6cc-5090-be6f-79c38f22be67"
diamondUuid: "b8678389-beea-8e4d-95ca-964c00c65ac3"
uuid: "8672646c-d4d6-8fd2-8429-dfc5affa6630"
horo: 8
typography:
  partition: country
  bondDegree: 29
standards:
  - "EU 2014/55 b2g-e-invoicing-mandate-resolution"
  - "ISO-3166-1:2020 country-codes alpha-2 dispatch-key"
  - "ISO-3166-1:2020 country-codes alpha-2 dispatch-key`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "8a5d43c7-010a-8b21-8170-20b985876745"
  stages:
    - stage: path
      stageUuid: "c9f2dfab-bf15-8e07-ba09-f4e1793da06f"
    - stage: trinity
      stageUuid: "7b2a00c3-29c8-8995-a6d4-07056a628431"
    - stage: boundary
      stageUuid: "00751628-7eec-8391-a271-f0d45e1f9caa"
    - stage: links
      stageUuid: "20e7bb08-cd27-8637-898b-f43cde876653"
    - stage: horo
      stageUuid: "b50f5132-3005-884e-a8b5-bd9cd00a1965"
    - stage: seal
      stageUuid: "d0c452f4-cfe0-8dde-abd1-0ef738dc8864"
    - stage: uuid
      stageUuid: "551e2cfd-9137-8e38-897b-66ffad6111aa"
version: 2
---
# country/context — the single canonical country merge

Anywhere the codebase branches on country (tenant default, party, bank account, ship-to, tax jurisdiction, e-invoicing dispatch, sanctions screening) it resolves through this service rather than reading the registries directly. `resolveCountryContext` picks the country by first-non-null wins — explicit → IBAN → address → tenant → house default — and always returns a non-null bundle: `profile` (currency/locale/accountingStandard), `specifics` (fiscal year, tax-id formats, mandate), `apis`, `tradingApis`, bound `helpers`, and a `source` diagnostic recording how the country was chosen.

Matter-twin: `src/country/context/index.ts` — `resolveCountryContext(input)` over `@/config/regional/defaults` · `@/config/country/specifics` · `@/country/api` · `@/trading/api` · `extractIbanCountry`, with helpers bound to the resolved code (`validateTaxId` · `validateIban` · `requiresEInvoicing` · `fiscalYearStartMonth` · `apisOfKind`).

**Law — [[law]]: every country branch resolves through one canonical merge — first-non-null of explicit/IBAN/address/tenant/default, always non-null, with a `source` diagnostic — so the registries are never read directly and the [[country]] decision is one auditable bundle.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key`
