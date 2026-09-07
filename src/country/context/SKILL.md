---
name: context
description: "Use when any code needs to branch on country — resolve a single canonical CountryContext from any signal (explicit, IBAN, address, tenant, house default) instead of reading the profile, specifics, and API registries directly."
atomPath: "country/context"
coordinate: "country/context · 2/share · 80cad355"
contentUuid: "92af0971-4b49-5256-81e7-c9239b2fcf18"
diamondUuid: "fa63de15-b95a-8600-acde-261da95781ac"
uuid: "80cad355-5f3d-8a56-9062-936273c899e0"
horo: 2
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
  computationUuid: "39d2f7da-3b9e-8f34-af73-42abcc002e19"
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
      stageUuid: "cc4bfb0e-3772-8f91-8557-20d90a27bb78"
    - stage: seal
      stageUuid: "d0c452f4-cfe0-8dde-abd1-0ef738dc8864"
    - stage: uuid
      stageUuid: "a6db1f86-b39f-81ec-b279-4aa53b605a65"
version: 2
---
# country/context — the single canonical country merge

Anywhere the codebase branches on country (tenant default, party, bank account, ship-to, tax jurisdiction, e-invoicing dispatch, sanctions screening) it resolves through this service rather than reading the registries directly. `resolveCountryContext` picks the country by first-non-null wins — explicit → IBAN → address → tenant → house default — and always returns a non-null bundle: `profile` (currency/locale/accountingStandard), `specifics` (fiscal year, tax-id formats, mandate), `apis`, `tradingApis`, bound `helpers`, and a `source` diagnostic recording how the country was chosen.

Matter-twin: `src/country/context/index.ts` — `resolveCountryContext(input)` over `@/config/regional/defaults` · `@/config/country/specifics` · `@/country/api` · `@/trading/api` · `extractIbanCountry`, with helpers bound to the resolved code (`validateTaxId` · `validateIban` · `requiresEInvoicing` · `fiscalYearStartMonth` · `apisOfKind`).

**Law — [[law]]: every country branch resolves through one canonical merge — first-non-null of explicit/IBAN/address/tenant/default, always non-null, with a `source` diagnostic — so the registries are never read directly and the [[country]] decision is one auditable bundle.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key`
