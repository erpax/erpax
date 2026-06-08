---
name: fallback
description: "Use when a country slot is blank or unknown — CLDR ZZ (\\\"Unknown Region\\\") is the country identity element, the universal value that is compatible with every real country and resolves any nullish input to a non-null code."
atomPath: country/fallback
coordinate: country/fallback · 4/weave · 821a427b
contentUuid: "756eba14-aacd-538f-b831-503915c629c8"
diamondUuid: "d558020d-a944-8e64-a654-830f6def07f5"
uuid: "821a427b-54a9-81b7-9669-2d5568866ee7"
horo: 4
bonds:
  in:
    - collapse
    - country
    - law
    - merge
    - science
    - sti
    - unlabelled
  out:
    - collapse
    - law
    - merge
    - science
    - sti
    - unlabelled
typography:
  partition: country
  bondDegree: 26
  neighbors: []
standards:
  - CLDR ZZ Unknown Region
  - "Conservation Law 54 universal-identity-element (country instance)"
  - "EU VIES — alpha-2 country code element"
  - "ISO 3166-1 §6 user-assigned codes"
  - "ISO 3166-2 — subdivision codes (handled by country-context)"
  - "ISO-3166-2"
  - SWIFT BIC §3 country code (BIC normalises ZZ → reject; ERPax stores)
  - "SWIFT-MT"
  - UN M.49 — 001 World (numeric)
  - "Unicode-CLDR"
bindings: []
neighbors:
  wikilink:
    - country
    - integrity
    - law
  matrix:
    - collapse
    - law
    - merge
    - science
    - sti
    - unlabelled
  backlinks:
    - collapse
    - law
    - merge
    - science
    - sti
    - unlabelled
signatures:
  computationUuid: "496bca7f-36dd-84b3-a1d3-8f6ff5eca71b"
  stages:
    - stage: path
      stageUuid: "251c0471-960d-88a5-bf6a-eae7851ebd42"
    - stage: trinity
      stageUuid: "c64c1217-7b71-81a9-9082-176c3e92297a"
    - stage: boundary
      stageUuid: "38c8e166-b64f-86b7-a4f0-0459dbff2a99"
    - stage: links
      stageUuid: "51f26416-8b69-812d-91e0-cad4e6f33876"
    - stage: horo
      stageUuid: "5ff1132e-7d77-8051-9aa9-e797f50af7cb"
    - stage: seal
      stageUuid: "64ab4339-0f2e-8588-8202-71f0a7e2195a"
    - stage: uuid
      stageUuid: "e73fa1c7-aa54-8f6f-b860-26a2c525dc98"
version: 2
---
# country/fallback — CLDR ZZ, the country identity element

The third instance of the universal-identity template (after XXX currency and `und` locale): the blank [[country]] is **CLDR `ZZ`** — ISO 3166-1 §6 reserves it for private use and CLDR adopts it for "Unknown Region". `resolveCountry` maps any nullish/empty input to `ZZ` and returns real codes verbatim in uppercase; `ZZ` is the absorbing element of `countriesCompatible` (compatible with everything), the identity that lets a non-geographic tenant ship invoices with no real country until one is assigned.

Matter-twin: `src/country/fallback/index.ts` (`BLANK_COUNTRY = 'ZZ'`, `resolveCountry` · `countriesCompatible` · `isBlankCountry` · M.49 ↔ alpha-2 bridge · `computeCountryUuid`). Composes `DEFAULT_COUNTRY` from config and `computeContentUuid` from [[integrity]].

**Law — [[law]]: every [[country]] slot has a universal identity element (CLDR `ZZ`) — it resolves any blank input to a non-null code and is compatible with every real country, so no row is ever country-null (Conservation Law 54).**
