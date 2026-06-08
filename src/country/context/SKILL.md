---
name: context
description: "Use when any code needs to branch on country — resolve a single canonical CountryContext from any signal (explicit, IBAN, address, tenant, house default) instead of reading the profile, specifics, and API registries directly."
atomPath: country/context
coordinate: country/context · 2/share · 73d5c13a
contentUuid: "4e9d083e-0b9d-5820-accb-ea6f18378c03"
diamondUuid: "d2dc97c6-d4db-85c5-aaaa-69f0df9e2a76"
uuid: "73d5c13a-438c-8c50-993d-2b0e193ca6c3"
horo: 2
bonds:
  in:
    - collapse
    - country
    - description
    - law
    - media
    - merge
    - original
    - sti
  out:
    - collapse
    - description
    - law
    - media
    - merge
    - original
    - sti
typography:
  partition: country
  bondDegree: 24
  neighbors: []
standards:
  - "EU 2014/55 b2g-e-invoicing-mandate-resolution"
  - "ISO-19011:2018 audit-trail country-decision-evidence"
  - "ISO-3166-1:2020 country-codes alpha-2 dispatch-key"
bindings: []
neighbors:
  wikilink:
    - country
    - law
  matrix:
    - collapse
    - description
    - law
    - media
    - merge
    - original
    - sti
  backlinks:
    - collapse
    - description
    - law
    - media
    - merge
    - original
    - sti
signatures:
  computationUuid: "6bdd1c79-7015-8982-8f96-955b85143bce"
  stages:
    - stage: path
      stageUuid: "c9f2dfab-bf15-8e07-ba09-f4e1793da06f"
    - stage: trinity
      stageUuid: "7b2a00c3-29c8-8995-a6d4-07056a628431"
    - stage: boundary
      stageUuid: "bb1425f5-2c00-8de7-bd06-a1498cf3f3e1"
    - stage: links
      stageUuid: "20e7bb08-cd27-8637-898b-f43cde876653"
    - stage: horo
      stageUuid: "ae9db160-4455-8885-a3d8-950beb7e61fd"
    - stage: seal
      stageUuid: "1dddaf70-dc63-8443-ac4c-d19515cce9c0"
    - stage: uuid
      stageUuid: "97feaf91-1c2a-85d8-9b73-615ac8c0ec82"
version: 2
---
# country/context — the single canonical country merge

Anywhere the codebase branches on country (tenant default, party, bank account, ship-to, tax jurisdiction, e-invoicing dispatch, sanctions screening) it resolves through this service rather than reading the registries directly. `resolveCountryContext` picks the country by first-non-null wins — explicit → IBAN → address → tenant → house default — and always returns a non-null bundle: `profile` (currency/locale/accountingStandard), `specifics` (fiscal year, tax-id formats, mandate), `apis`, `tradingApis`, bound `helpers`, and a `source` diagnostic recording how the country was chosen.

Matter-twin: `src/country/context/index.ts` — `resolveCountryContext(input)` over `@/config/regional-defaults` · `@/config/country-specifics` · `@/country/api` · `@/trading/api` · `extractIbanCountry`, with helpers bound to the resolved code (`validateTaxId` · `validateIban` · `requiresEInvoicing` · `fiscalYearStartMonth` · `apisOfKind`).

**Law — [[law]]: every country branch resolves through one canonical merge — first-non-null of explicit/IBAN/address/tenant/default, always non-null, with a `source` diagnostic — so the registries are never read directly and the [[country]] decision is one auditable bundle.**
