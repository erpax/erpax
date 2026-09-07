---
name: hs
description: Use when implementing or referencing WCO Harmonised System.
atomPath: "wco/hs"
coordinate: "wco/hs · 7/descent · 0a7d7b95"
contentUuid: "1c3e88bf-61d9-5ac0-80a7-7747efe031f8"
diamondUuid: "3ce6fd0e-3c00-8c6d-acd4-f98c6946b71b"
uuid: "0a7d7b95-80df-8da3-b6f4-3f53db4edb74"
horo: 7
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
  computationUuid: "ea10ab1a-fe76-8167-a8ac-8dd2a528aecd"
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
      stageUuid: "1125e017-6aed-8e52-933b-80610d4da151"
    - stage: seal
      stageUuid: "0adaf606-99f5-84f7-8c47-9921814ae910"
    - stage: uuid
      stageUuid: "89aee00d-c72b-80f5-a786-d0710bfba18f"
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
