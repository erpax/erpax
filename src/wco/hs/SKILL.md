---
name: hs
description: Use when implementing or referencing WCO Harmonised System.
atomPath: wco/hs
coordinate: wco/hs · 2/share · 446cb578
contentUuid: "e2404819-4d7a-538b-8a26-de421ea70857"
diamondUuid: "64f4a376-c55a-88f6-8603-19c309dca67e"
uuid: "446cb578-f5a6-8f5b-ae63-10cbf175a54e"
horo: 2
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: wco
  bondDegree: 3
  neighbors: []
standards:
  - EU CN Code (Combined Nomenclature) Regulation (EEC) 2658/87
  - US HTS (Harmonized Tariff Schedule)
  - "WCO Harmonised System Convention (effective 1988, latest revision 2022)"
  - "WCO-HS"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "a0ad4e15-460e-8f92-be2c-4edbe6ccf464"
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
      stageUuid: "5213cc5a-6525-873d-807a-19ff602ae234"
    - stage: seal
      stageUuid: "0adaf606-99f5-84f7-8c47-9921814ae910"
    - stage: uuid
      stageUuid: "bb12b6fb-2fa8-8c4f-aec1-25c34fddf33a"
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
