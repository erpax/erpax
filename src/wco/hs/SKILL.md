---
name: hs
description: Use when implementing or referencing WCO Harmonised System.
atomPath: "wco/hs"
coordinate: "wco/hs · 8/crest · 3b9822d6"
contentUuid: "5c6589ee-2588-5d66-9851-63a9437acea0"
diamondUuid: "c61b586a-f945-8ebc-a8cf-469205434a5a"
uuid: "3b9822d6-ecdb-847f-adec-6b6d1477badc"
horo: 8
typography:
  partition: wco
  bondDegree: 3
standards:
  - "EU CN Code (Combined Nomenclature) Regulation (EEC) 2658/87"
  - US HTS (Harmonized Tariff Schedule)
  - "WCO Harmonised System Convention (effective 1988, latest revision 2022)"
  - "WCO-HS"
bindings: []
signatures:
  computationUuid: "e3909346-c0df-8b1e-88ec-c8af68c4e2b8"
  stages:
    - stage: path
      stageUuid: "cf6a70dd-3bb8-8899-8c7e-73cbdd921d82"
    - stage: trinity
      stageUuid: "5f206816-cb37-845f-8727-12f5a4c5bd7a"
    - stage: boundary
      stageUuid: "4031f74e-dcf6-8625-bce5-3efa53e14ead"
    - stage: links
      stageUuid: "e90a926d-0fc4-8592-8b2f-b227c85fcd80"
    - stage: horo
      stageUuid: "fa5440da-38b5-85ad-b3b3-5600dd6a66b2"
    - stage: seal
      stageUuid: "0adaf606-99f5-84f7-8c47-9921814ae910"
    - stage: uuid
      stageUuid: "e8cc67c9-077b-81b2-8f75-1f32d602936b"
version: 2
---
# WCO Harmonised System

World Customs Organisation HS Convention. Globally standardised goods classification — 6-digit harmonised root + national extension (8 in EU CN, 10 in US HTS).

## Scope

- 21 sections × 99 chapters as a structural index.
- Structure validator (`isValidHsCodeStructure`) — confirms 6–10 digit shape, NOT existence.
- `hsChapter(code)` + `sectionForChapter(chapter)` lookups.

## Out of scope

- Full per-heading / subheading dictionary (~5 600 subheadings, ~12 000 with national extensions) — too large for in-repo. Consume via WCO HS Database API or per-jurisdiction Customs API when needed.
- Tariff rates per code — those live with each customs jurisdiction's tariff schedule.
- Section-specific rules of interpretation (HSI 1-6) — apply at classification time, not in the registry.

## Citations

- WCO Harmonised System Convention (1988, latest revision 2022)
- EU Combined Nomenclature — Council Regulation (EEC) 2658/87 + annual updates
- US Harmonized Tariff Schedule (USITC)
- INCOTERMS 2020 (companion when crossing customs)
- EU UCC 952/2013 (companion for EU import/export procedures)

**Law — [[law]]: the Harmonised System is the global goods classification — a 6-digit harmonised root plus national extension (8 EU CN, 10 US HTS); the registry validates structure and indexes sections/chapters, never the full per-heading dictionary.**
