---
name: context
description: "Use when any code needs to branch on country — resolve a single canonical CountryContext from any signal (explicit, IBAN, address, tenant, house default) instead of reading the profile, specifics, and API registries directly."
atomPath: "country/context"
coordinate: "country/context · 4/weave · edc58c83"
contentUuid: "5af18369-9620-5182-a0f4-159bd3fd820e"
diamondUuid: "62ea18b6-6527-8a16-8745-428248c48435"
uuid: "edc58c83-abdf-8307-ba7c-1c0124f50a19"
horo: 4
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
  computationUuid: "e000ca2d-5423-8583-919d-7de1560da5bb"
  stages:
    - stage: path
      stageUuid: "c9f2dfab-bf15-8e07-ba09-f4e1793da06f"
    - stage: trinity
      stageUuid: "7b2a00c3-29c8-8995-a6d4-07056a628431"
    - stage: boundary
      stageUuid: "00751628-7eec-8391-a271-f0d45e1f9caa"
    - stage: links
      stageUuid: "ac17e1a8-a8ee-8a4f-940e-86bd2f010e18"
    - stage: horo
      stageUuid: "d82ec720-d4f9-8f6a-8c10-a02b696383af"
    - stage: seal
      stageUuid: "d0c452f4-cfe0-8dde-abd1-0ef738dc8864"
    - stage: uuid
      stageUuid: "726230f4-c7c0-8a98-81d4-03bbdcef0762"
version: 2
---
# country/context — the single canonical country merge

Anywhere the codebase branches on country (tenant default, party, bank account, ship-to, tax jurisdiction, e-invoicing dispatch, sanctions screening) it resolves through this service rather than reading the registries directly. `resolveCountryContext` picks the country by first-non-null wins — explicit → IBAN → address → tenant → house default — and always returns a non-null bundle: `profile` (currency/locale/accountingStandard), `specifics` (fiscal year, tax-id formats, mandate), `apis`, `tradingApis`, bound `helpers`, and a `source` diagnostic recording how the country was chosen.

Matter-twin: `src/country/context/index.ts` — `resolveCountryContext(input)` over `@/config/regional/defaults` · `@/config/country/specifics` · `@/country/api` · `@/trading/api` · `extractIbanCountry`, with helpers bound to the resolved code (`validateTaxId` · `validateIban` · `requiresEInvoicing` · `fiscalYearStartMonth` · `apisOfKind`).

**Law — [[law]]: every country branch resolves through one canonical merge — first-non-null of explicit/IBAN/address/tenant/default, always non-null, with a `source` diagnostic — so the registries are never read directly and the [[country]] decision is one auditable bundle.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key`
