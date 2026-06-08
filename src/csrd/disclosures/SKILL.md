---
name: disclosures
description: "Use when structuring EU mandatory sustainability reporting — one row per ESRS datapoint per reporting year (E1–E5 environmental, S1–S4 social, G1 governance) with narrative, quantitative KPIs, IRO classification, and assurance evidence for XBRL filing. The CSRD/ESRS disclosure register."
atomPath: csrd/disclosures
coordinate: csrd/disclosures · 8/crest · c2cd60d3
contentUuid: "6ca36138-43c6-5f41-8f76-c25adebf8a2e"
diamondUuid: "01251052-4450-820a-805e-0a3921e35c29"
uuid: "c2cd60d3-840b-81e4-aea8-98953dcfd8ee"
horo: 8
bonds:
  in:
    - accounting
    - emissions
    - fields
    - hooks
    - law
    - standard
  out:
    - accounting
    - emissions
    - fields
    - hooks
    - law
    - standard
typography:
  partition: csrd
  bondDegree: 19
  neighbors: []
standards:
  - EU CSRD Directive 2022/2464
  - "EU EFRAG ESRS-XBRL taxonomy"
  - EU ESRS 1 General Requirements
  - EU ESRS 2 General Disclosures
  - "EU SFDR 2019/2088 sustainable-finance"
  - EU Taxonomy Regulation 2020/852
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "EU-CSRD"
  - "EU-ESRS"
  - "GHG-Protocol"
  - "IFRS S1 general-sustainability-disclosure"
  - "IFRS S2 climate-disclosures"
  - "ISAE 3000 limited-assurance (rises to reasonable-assurance under CSRD by 2028)"
  - "ISO 14064-1:2018 ghg-quantification (basis for ESRS E1)"
  - "ISO-14064-1"
  - OECD GRI Standards
  - XBRL
bindings: []
neighbors:
  wikilink:
    - accounting
    - emissions
    - fields
    - hooks
    - law
    - standard
  matrix:
    - accounting
    - emissions
    - fields
    - hooks
    - law
    - standard
  backlinks:
    - accounting
    - emissions
    - fields
    - hooks
    - law
    - standard
signatures:
  computationUuid: "573a5653-a3bc-8e68-86bd-e8da67669296"
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
      stageUuid: "2d65dc79-c473-857b-a762-498478b437e8"
    - stage: seal
      stageUuid: "ab8206c5-d899-82d6-a4d0-72b32ebbef7e"
    - stage: uuid
      stageUuid: "966aa526-270c-8ffc-84e3-7e25e6f17244"
version: 2
---
# csrd-disclosures

CSRD Disclosures — EU CSRD Directive 2022/2464 + ESRS 1/2 mandatory.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
