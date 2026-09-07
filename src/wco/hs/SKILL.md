---
name: hs
description: Use when implementing or referencing WCO Harmonised System.
atomPath: "wco/hs"
coordinate: "wco/hs · 8/crest · 8b1a196d"
contentUuid: "828bbdaf-7ff5-5dda-a7c1-5863eb6eb373"
diamondUuid: "60ae4481-6c46-88a2-989e-705e14384855"
uuid: "8b1a196d-490b-805c-ba34-1a53dd12d4d2"
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
  computationUuid: "b6eca7cb-6b49-8640-a41a-e410d9fe3b81"
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
      stageUuid: "2a1fca22-6cd6-816f-96a9-521dd9137fac"
    - stage: seal
      stageUuid: "0adaf606-99f5-84f7-8c47-9921814ae910"
    - stage: uuid
      stageUuid: "0421fe41-6a18-83fa-89b2-c20cc7749489"
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
