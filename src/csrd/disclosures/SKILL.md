---
name: disclosures
description: "Use when structuring EU mandatory sustainability reporting — one row per ESRS datapoint per reporting year (E1–E5 environmental, S1–S4 social, G1 governance) with narrative, quantitative KPIs, IRO classification, and assurance evidence for XBRL filing. The CSRD/ESRS disclosure register."
atomPath: "csrd/disclosures"
coordinate: "csrd/disclosures · 7/descent · 42fcef45"
contentUuid: "38e4ee5b-62b9-5b88-a5d0-e04ca001ea55"
diamondUuid: "7c38ce08-2c2e-803a-a033-9db133920345"
uuid: "42fcef45-bf77-8223-86b5-057136059b1a"
horo: 7
typography:
  partition: csrd
  bondDegree: 19
standards:
  - "EU CSRD Directive 2022/2464"
  - "EU EFRAG ESRS-XBRL taxonomy"
  - EU ESRS 1 General Requirements
  - EU ESRS 2 General Disclosures
  - "EU SFDR 2019/2088 sustainable-finance"
  - "EU Taxonomy Regulation 2020/852"
  - "EU-CSRD"
  - "EU-ESRS"
  - "GHG-Protocol"
  - "IFRS S1 general-sustainability-disclosure"
  - "IFRS S2 climate-disclosures"
  - "ISO 14064-1:2018 ghg-quantification (basis for ESRS E1)"
  - "ISO 14064-1:2018 ghg-quantification (basis for ESRS E1)`"
  - "ISO-14064-1"
  - OECD GRI Standards
  - XBRL
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "23c3d598-0712-8b9e-86d2-ddbbc4b4114e"
  stages:
    - stage: path
      stageUuid: "42d87685-4469-8d8d-ad0f-b3fec575bd74"
    - stage: trinity
      stageUuid: "f3d068b9-f877-8b24-9d8a-614be4dab41a"
    - stage: boundary
      stageUuid: "50072567-48d1-8c74-8d9b-69ff20ebcff9"
    - stage: links
      stageUuid: "e92cf626-78bc-8be8-8a55-e521345e3b26"
    - stage: horo
      stageUuid: "fbcdb313-f4e7-86de-896e-a50c38a1fab7"
    - stage: seal
      stageUuid: "ab8206c5-d899-82d6-a4d0-72b32ebbef7e"
    - stage: uuid
      stageUuid: "4e52663b-d767-8a87-bc8a-be78919641d8"
version: 2
---
# csrd-disclosures

CSRD Disclosures — EU CSRD Directive 2022/2464 + ESRS 1/2 mandatory.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 14064-1:2018 ghg-quantification (basis for ESRS E1)`

- EU CSRD Directive 2022/2464
- EU ESRS 1 General Requirements
- EU ESRS 2 General Disclosures
- ISO 14064-1:2018 ghg-quantification (basis for ESRS E1)
- EU EFRAG ESRS-XBRL taxonomy
- IFRS S1 general-sustainability-disclosure
- IFRS S2 climate-disclosures
- ISAE 3000 limited-assurance (rises to reasonable-assurance under CSRD by 2028)
- EU SFDR 2019/2088 sustainable-finance
- EU Taxonomy Regulation 2020/852
- OECD GRI Standards
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[fiscal/periods/carbon/emissions]] · [[accounting]] · [[fields]] · [[hooks]] · [[standard]].

**Law — [[law]]: exactly one row per ESRS datapoint per reporting year, each carrying its narrative, quantitative KPI, IRO classification and assurance evidence — the single XBRL-filable unit of the CSRD/ESRS register.**
