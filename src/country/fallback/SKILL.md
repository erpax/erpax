---
name: fallback
description: "Use when a country slot is blank or unknown — CLDR ZZ (\"Unknown Region\") is the country identity element, the universal value that is compatible with every real country and resolves any nullish input to a non-null code."
atomPath: "country/fallback"
coordinate: "country/fallback · 8/crest · 34d5502b"
contentUuid: "7a73405c-06cf-5553-a12f-91df636434b3"
diamondUuid: "8b740513-dbb3-82f6-bf36-f4a8b06132c2"
uuid: "34d5502b-7625-8f7d-bdc0-5158c2f24272"
horo: 8
typography:
  partition: country
  bondDegree: 24
standards:
  - CLDR ZZ Unknown Region
  - "EU VIES — alpha-2 country code element"
  - "ISO 3166-1 §6 user-assigned codes"
  - "ISO 3166-1 §6 user-assigned codes`"
  - "ISO 3166-2 — subdivision codes (handled by country-context)"
  - "ISO 3166-2 — subdivision codes (handled by country-context)`"
  - "ISO-3166-2"
  - SWIFT BIC §3 country code (BIC normalises ZZ → reject; ERPax stores)
  - "SWIFT-MT"
  - UN M.49 — 001 World (numeric)
  - "Unicode-CLDR"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "92f514df-2761-8771-b080-16ac7195719f"
  stages:
    - stage: path
      stageUuid: "251c0471-960d-88a5-bf6a-eae7851ebd42"
    - stage: trinity
      stageUuid: "c64c1217-7b71-81a9-9082-176c3e92297a"
    - stage: boundary
      stageUuid: "d309d003-2ebe-80bc-862e-2aea1c18ae78"
    - stage: links
      stageUuid: "51f26416-8b69-812d-91e0-cad4e6f33876"
    - stage: horo
      stageUuid: "3ebb8e5c-7f10-8ce3-a206-14c7c6231516"
    - stage: seal
      stageUuid: "63b9e659-b763-8c13-9e44-9e0968317243"
    - stage: uuid
      stageUuid: "ea854961-e085-8691-aeb1-ca0e940c2e6f"
version: 2
---
# country/fallback — CLDR ZZ, the country identity element

The third instance of the universal-identity template (after XXX currency and `und` locale): the blank [[country]] is **CLDR `ZZ`** — ISO 3166-1 §6 reserves it for private use and CLDR adopts it for "Unknown Region". `resolveCountry` maps any nullish/empty input to `ZZ` and returns real codes verbatim in uppercase; `ZZ` is the absorbing element of `countriesCompatible` (compatible with everything), the identity that lets a non-geographic tenant ship invoices with no real country until one is assigned.

Matter-twin: `src/country/fallback/index.ts` (`BLANK_COUNTRY = 'ZZ'`, `resolveCountry` · `countriesCompatible` · `isBlankCountry` · M.49 ↔ alpha-2 bridge · `computeCountryUuid`). Composes `DEFAULT_COUNTRY` from config and `computeContentUuid` from [[integrity]].

**Law — [[law]]: every [[country]] slot has a universal identity element (CLDR `ZZ`) — it resolves any blank input to a non-null code and is compatible with every real country, so no row is ever country-null (Conservation Law 54).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 3166-1 §6 user-assigned codes`
- `@standard ISO 3166-2 — subdivision codes (handled by country-context)`
