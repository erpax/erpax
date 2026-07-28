---
name: context
description: "Use when any code needs to branch on country — resolve a single canonical CountryContext from any signal (explicit, IBAN, address, tenant, house default) instead of reading the profile, specifics, and API registries directly."
atomPath: "country/context"
coordinate: "country/context · 5/round · 01a865e5"
contentUuid: "afbe6bb0-47fd-5de3-bcb0-deb3c91e0512"
diamondUuid: "44560e2e-5434-8f2a-85f2-cb3c564d997b"
uuid: "01a865e5-af0b-8b2c-bf8f-932632896a8f"
horo: 5
bonds:
  in:
    - country
    - law
    - original
  out:
    - country
    - law
    - original
typography:
  partition: country
  bondDegree: 16
  neighbors: []
standards:
  - "EU 2014/55 b2g-e-invoicing-mandate-resolution"
  - "ISO-3166-1:2020 country-codes alpha-2 dispatch-key"
  - "ISO-3166-1:2020 country-codes alpha-2 dispatch-key`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - country
    - law
  matrix:
    - country
    - law
    - original
  backlinks:
    - country
    - law
    - original
signatures:
  computationUuid: "a505658f-1ddd-8d78-9896-854bc71abf55"
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
      stageUuid: "6c675ff7-cda6-881c-bc7b-5b86d6527760"
    - stage: seal
      stageUuid: "1dddaf70-dc63-8443-ac4c-d19515cce9c0"
    - stage: uuid
      stageUuid: "3734d115-3c60-8adf-b282-d4c60358a976"
version: 2
---
# country/context — the single canonical country merge

Anywhere the codebase branches on country (tenant default, party, bank account, ship-to, tax jurisdiction, e-invoicing dispatch, sanctions screening) it resolves through this service rather than reading the registries directly. `resolveCountryContext` picks the country by first-non-null wins — explicit → IBAN → address → tenant → house default — and always returns a non-null bundle: `profile` (currency/locale/accountingStandard), `specifics` (fiscal year, tax-id formats, mandate), `apis`, `tradingApis`, bound `helpers`, and a `source` diagnostic recording how the country was chosen.

Matter-twin: `src/country/context/index.ts` — `resolveCountryContext(input)` over `@/config/regional/defaults` · `@/config/country/specifics` · `@/country/api` · `@/trading/api` · `extractIbanCountry`, with helpers bound to the resolved code (`validateTaxId` · `validateIban` · `requiresEInvoicing` · `fiscalYearStartMonth` · `apisOfKind`).

**Law — [[law]]: every country branch resolves through one canonical merge — first-non-null of explicit/IBAN/address/tenant/default, always non-null, with a `source` diagnostic — so the registries are never read directly and the [[country]] decision is one auditable bundle.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key`
