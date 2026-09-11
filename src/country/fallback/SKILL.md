---
name: fallback
description: "Use when a country slot is blank or unknown — CLDR ZZ (\"Unknown Region\") is the country identity element, the universal value that is compatible with every real country and resolves any nullish input to a non-null code."
atomPath: "country/fallback"
coordinate: "country/fallback · 7/descent · f27705e7"
contentUuid: "cdebfc74-c2d7-5157-980a-2e93ce93d31c"
diamondUuid: "fae123a7-816a-8bf9-9a27-9d1838247f07"
uuid: "f27705e7-7f22-83df-a343-6529488dcf2c"
horo: 7
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
  computationUuid: "95140961-f09f-8eff-925f-a1a543da8651"
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
      stageUuid: "16a8a490-4b98-8222-a9ff-065e008247ea"
    - stage: seal
      stageUuid: "63b9e659-b763-8c13-9e44-9e0968317243"
    - stage: uuid
      stageUuid: "29f6b5a5-128a-8f96-904c-bcceb1b7a650"
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
