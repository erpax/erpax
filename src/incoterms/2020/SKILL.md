---
name: "2020"
description: Use when implementing or referencing INCOTERMS 2020.
atomPath: "incoterms/2020"
coordinate: "incoterms/2020 · 2/share · fa6358c0"
contentUuid: "5952362a-4012-5a44-8c8e-a8d90aedf388"
diamondUuid: "d6c02837-f2cd-84e5-84c2-d0e3b9bbf4de"
uuid: "fa6358c0-90e4-8bd6-bad3-c14c7e637ca4"
horo: 2
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
  computationUuid: "b72211f5-b927-81ec-83a6-2504069e5f97"
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
      stageUuid: "467ecd45-7c4b-8369-ab48-003cd149aff5"
    - stage: seal
      stageUuid: "bc5c7bce-a07b-891e-96de-7b7acde63fc6"
    - stage: uuid
      stageUuid: "8687c55e-814e-835f-a43d-d88e8af00e32"
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
