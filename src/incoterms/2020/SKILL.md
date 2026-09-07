---
name: "2020"
description: Use when implementing or referencing INCOTERMS 2020.
atomPath: "incoterms/2020"
coordinate: "incoterms/2020 · 8/crest · b47b8c31"
contentUuid: "9c99f1b9-57b5-5a8d-941e-c39ac294d944"
diamondUuid: "8c8624e4-d888-86ab-9c7d-3048ea579221"
uuid: "b47b8c31-ef48-815e-8e5f-1d543b7722e3"
horo: 8
typography:
  partition: incoterms
  bondDegree: 6
standards:
  - "ICC INCOTERMS 2020 publication-no-723E"
  - "INCOTERMS-2020"
  - "ISO 6346 freight-container-code (related)"
  - "ISO 6346 freight-container-code (related)`"
  - "UBL-2.1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "2580b17a-496a-80f8-af55-141d3ea4b059"
  stages:
    - stage: path
      stageUuid: "df4f13a5-87ea-850c-b3f9-b4a9aeaa2eaa"
    - stage: trinity
      stageUuid: "a50676f0-e720-8cb3-bd2a-ecdfb4180b17"
    - stage: boundary
      stageUuid: "c1dee3dd-99c1-86b0-9415-54df7050b280"
    - stage: links
      stageUuid: "1634edfc-d2bf-8282-a7f7-a4d8e0745434"
    - stage: horo
      stageUuid: "8930fe10-e665-870f-ad49-4a386a42fc10"
    - stage: seal
      stageUuid: "bc5c7bce-a07b-891e-96de-7b7acde63fc6"
    - stage: uuid
      stageUuid: "9f17da74-fab8-8855-8fae-50b927871905"
version: 2
---
# INCOTERMS 2020

International Commercial Terms — published by the International Chamber of Commerce (ICC publication 723E, effective 1 January 2020). 11 three-letter codes that contractually allocate cost, risk, insurance, and customs obligations between seller and buyer in a cross-border sale.

## Scope

This module exports the canonical 11-code set + the family split (multimodal vs sea/inland) + Payload-ready select options. It does not interpret obligations — collections that need rule-driven defaults (e.g. who pays freight, who insures) layer that on top.

## Out of scope

- Pre-2020 INCOTERMS revisions (2010 / 2000 / 1990). If a tenant cites a legacy contract, store the literal text — do not coerce.
- Domestic shipping terms (FOB Origin / Destination in US trade) — those are not INCOTERMS.

## Citations

- ICC INCOTERMS 2020 publication 723E
- WCO HS Convention (companion when crossing customs)
- EU UCC 952/2013 (companion for EU import/export procedures)

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 6346 freight-container-code (related)`

Composes: [[standards]] · [[vocabulary/delivery]].
