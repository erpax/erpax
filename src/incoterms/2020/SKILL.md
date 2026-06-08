---
name: "2020"
description: Use when implementing or referencing INCOTERMS 2020.
atomPath: incoterms/2020
coordinate: incoterms/2020 · 4/weave · 187a3260
contentUuid: "fcb95def-06af-50e9-9172-719da813fc5a"
diamondUuid: "1eec18be-2de6-8d6a-bda3-bab00d52e87e"
uuid: "187a3260-d56e-8600-8b37-0e36b5826e76"
horo: 4
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
  - "UBL-2.1"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "56bb09ac-1685-8f7d-afcd-b725445b11b3"
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
      stageUuid: "22e9111a-7457-8ed8-a02f-4b1d3fee994b"
    - stage: seal
      stageUuid: "bc5c7bce-a07b-891e-96de-7b7acde63fc6"
    - stage: uuid
      stageUuid: "925fc7c1-3aee-8658-84f8-dc01e2c051f2"
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
