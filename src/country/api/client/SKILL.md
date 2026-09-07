---
name: client
description: "Use when calling the public, no-auth and key-based official country APIs (VIES, Companies House, KvK, Brønnøysund, INSEE, BG Търговски Регистър, Peppol, EU/OFAC sanctions, БНБ/ECB FX) and resolving them through the EU national→pan-EU fallback chains."
atomPath: "country/api/client"
coordinate: "country/api/client · 8/crest · 9de05533"
contentUuid: "e6a65df2-50b8-5230-8aa6-72a30f554aaa"
diamondUuid: "c38643d5-090c-809e-b414-180c57c315e1"
uuid: "9de05533-b034-8d97-871d-b7dd9eef0962"
horo: 8
typography:
  partition: country
  bondDegree: 6
standards:
  - "AMLD-5 ubo-screening"
  - Berlin Group NextGenPSD2 v1.3
  - "Berlin-Group-PSD2"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017 §B2G semantic-model"
  - "EN-16931:2017 §B2G semantic-model`"
  - "EN-16931:2017 §BT-31 seller-vat-identifier"
  - "EN-16931:2017 §BT-31 seller-vat-identifier`"
  - "EU 2006/112/EC vat-system-directive Art.214"
  - "EU 2014/55 b2g-e-invoicing-mandate"
  - "EU 2580/2001 cfsp-restrictive-measures"
  - "IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 BG country-code"
  - "ISO-3166-1:2020 BG country-code`"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-3166-1:2020 country-codes alpha-2 dispatch-key"
  - "ISO-3166-1:2020 country-codes alpha-2 dispatch-key`"
  - "ISO-3166-1:2020 country-codes alpha-2`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - PSD2
  - "PSD2 EU 2015/2366 ais-pis"
  - "Peppol-BIS-3.0"
  - "Peppol-BIS-3.0 billing"
  - "SDMX 2.1 statistical-data-and-metadata-exchange"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "1fb0a316-3973-813c-867a-5d99df180a97"
  stages:
    - stage: path
      stageUuid: "d3ce08b3-da50-8d31-af4c-395defbcd0df"
    - stage: trinity
      stageUuid: "265de743-9bf6-8e46-9075-8ba71b118177"
    - stage: boundary
      stageUuid: "e2f4b25b-a894-8861-a366-780a0a96f7a2"
    - stage: links
      stageUuid: "7183e0a6-e1bc-88e1-81ef-5f9e4b6d4cad"
    - stage: horo
      stageUuid: "ff387bfa-7302-8aac-ac58-2237e9435a80"
    - stage: seal
      stageUuid: "b1dd545d-c932-83dd-aa52-717e10865115"
    - stage: uuid
      stageUuid: "b0792935-850f-85b1-aad5-b550d096c182"
version: 2
---
# country/api/client — official country API clients (one file per auth pattern)

Working integrations with the catalogued official APIs, organised by *auth pattern* not by country: the catalogue is broad but the realised auth surface is narrow (no-auth JSON, key-in-query, SOAP). Every client returns `{ ok, data?, error?, source }` so the caller branches on success without exception flow, and `source` carries the publisher name for the audit trail. The EU-fallback resolvers try a country-specific publisher first and fall back to the pan-EU baseline (БНБ→ECB for FX, national register→VIES for VAT, national→EU consolidated for sanctions, national→Peppol Directory for e-invoicing), returning the first success so the [[country]] reconciliation path is one shape regardless of which authority answered.

Matter-twin: `src/country/api/client/index.ts` — `checkVies` · `lookupCompaniesHouse` · `lookupBrreg` · `lookupBnbExchangeRate` / `lookupEcbExchangeRate` · `lookupEuFallbackRate` · `validateBgVatId` / `validateBgEik` · `discoverBgAspsps` · `listAllCountryApis`, over the `@/country/api` catalogue.

**Law — [[law]]: every official-[[api]] call returns one `{ ok, data?, error?, source }` shape with `source` attributing the answering authority, and the EU fallback chain resolves national→pan-EU to the first success — so the [[country]] caller branches on one shape regardless of publisher or auth pattern.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2 dispatch-key`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-3166-1:2020 country-codes alpha-2`
- `@standard EN-16931:2017 §B2G semantic-model`
- `@standard ISO-3166-1:2020 BG country-code`
- `@standard EN-16931:2017 §BT-31 seller-vat-identifier`
