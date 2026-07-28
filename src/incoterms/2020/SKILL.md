---
name: "2020"
description: Use when implementing or referencing INCOTERMS 2020.
atomPath: "incoterms/2020"
coordinate: "incoterms/2020 · 1/base · 6d549bc4"
contentUuid: "f574d780-5c25-5056-a319-4c4ddaadeca0"
diamondUuid: "716fec05-011b-8433-b455-9bf3e755dfa9"
uuid: "6d549bc4-cb52-81b1-9eb7-451f9e2c20da"
horo: 1
bonds:
  in:
    - readme
  out: []
typography:
  partition: incoterms
  bondDegree: 0
  neighbors: []
standards:
  - "ICC INCOTERMS 2020 publication-no-723E"
  - "INCOTERMS-2020"
  - "ISO 6346 freight-container-code (related)"
  - "ISO 6346 freight-container-code (related)`"
  - "UBL-2.1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "5f2ee053-8d25-82e1-8255-c4651d53d1b9"
  stages:
    - stage: path
      stageUuid: "df4f13a5-87ea-850c-b3f9-b4a9aeaa2eaa"
    - stage: trinity
      stageUuid: "a50676f0-e720-8cb3-bd2a-ecdfb4180b17"
    - stage: boundary
      stageUuid: "c1dee3dd-99c1-86b0-9415-54df7050b280"
    - stage: links
      stageUuid: "cdd4c7e4-a4a4-8c77-84b2-1021963d0419"
    - stage: horo
      stageUuid: "93d85885-672b-8bc5-93aa-afb8f6449e63"
    - stage: seal
      stageUuid: "bc5c7bce-a07b-891e-96de-7b7acde63fc6"
    - stage: uuid
      stageUuid: "4aef4489-7682-8d1b-a826-5401c29f6965"
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
