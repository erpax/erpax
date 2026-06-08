---
name: segment
description: "Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension"
atomPath: segment
coordinate: segment · 2/share · 6a3f2b62
contentUuid: "85691261-9ead-5e34-a617-70aff757da89"
diamondUuid: "b451ec50-7141-8993-9b0c-296225bf2512"
uuid: "6a3f2b62-51ba-8774-9880-62e4449bd6ec"
horo: 2
bonds:
  in:
    - awareness
    - centers
    - cohort
    - diffusion
    - dimension
    - law
    - leadscore
    - reportings
    - retention
    - statements
    - upsell
  out:
    - awareness
    - centers
    - cohort
    - diffusion
    - dimension
    - law
    - leadscore
    - reportings
    - retention
    - statements
    - upsell
typography:
  partition: segment
  bondDegree: 33
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - centers
    - dimension
    - law
    - reportings
    - statements
  matrix:
    - awareness
    - centers
    - cohort
    - diffusion
    - dimension
    - law
    - leadscore
    - reportings
    - retention
    - statements
    - upsell
  backlinks:
    - awareness
    - centers
    - cohort
    - diffusion
    - dimension
    - law
    - leadscore
    - reportings
    - retention
    - statements
    - upsell
signatures:
  computationUuid: "916eb418-a4ae-884e-9935-225fa47af306"
  stages:
    - stage: path
      stageUuid: "5fe44f3b-679a-8478-b2f1-f818def80af0"
    - stage: trinity
      stageUuid: "acb9e175-5597-82d5-bb0a-c8b7ab7b76c0"
    - stage: boundary
      stageUuid: "7f86bb8d-6444-8a9a-b54c-4fc7f2b08a2b"
    - stage: links
      stageUuid: "c711f04b-5046-8486-8a68-e0b7288733e7"
    - stage: horo
      stageUuid: "ba23a203-720c-82af-b307-bce80cd080f9"
    - stage: seal
      stageUuid: "7d808221-a5b8-844a-9b51-66a200cbf2a8"
    - stage: uuid
      stageUuid: "113d92b0-e5fb-8a03-886a-4f5c06cec9bd"
version: 2
---
# segment

Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension

Composes: [[legal/entities/segment/reportings]] · [[cost/centers]] · [[financial/statements]] · [[dimension]].

**Law — [[law]]: a segment is a reporting dimension over the ledger, NOT a chart-of-accounts axis — revenue/expense/asset/liability group for disclosure without polluting the GL.**

## Standards
- IFRS-8 (operating segments)
- FASB ASC 280 (segment reporting)
