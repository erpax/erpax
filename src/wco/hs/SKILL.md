---
name: hs
description: Use when implementing or referencing WCO Harmonised System.
atomPath: "wco/hs"
coordinate: "wco/hs · 2/share · 8275ef9f"
contentUuid: "0bc80002-3314-5895-8325-19ac5817a53c"
diamondUuid: "9e5b16b2-18fd-87a9-bbd7-5c3aa039868d"
uuid: "8275ef9f-a01c-8d22-935d-d96bf94dcdca"
horo: 2
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
  computationUuid: "e7600f00-15cd-8d3b-9f15-1fbb1ead6189"
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
      stageUuid: "cf43b9e0-9f6e-8af6-94e1-48a556fdec41"
    - stage: seal
      stageUuid: "0adaf606-99f5-84f7-8c47-9921814ae910"
    - stage: uuid
      stageUuid: "2773e20a-e516-8f29-af47-0438f0edc982"
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
