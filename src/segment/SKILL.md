---
name: segment
description: "Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension"
atomPath: segment
coordinate: "segment · 2/share · c8a9678c"
contentUuid: "0bbaa139-8803-5602-99ac-5d926cbbabb8"
diamondUuid: "1fb74dbb-b8a5-8c7e-9caa-0d0f9b17861c"
uuid: "c8a9678c-eaae-89a8-b64c-354d81410272"
horo: 2
typography:
  partition: segment
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "fab1138e-956d-866b-ac54-fcfed2a47684"
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
      stageUuid: "96de2b9a-831a-8a1d-a548-d35a629dcd1b"
    - stage: seal
      stageUuid: "d516b4f6-8cc4-8118-8e7f-b978af04a2a1"
    - stage: uuid
      stageUuid: "090ea875-27ba-83de-9e0b-d347546beec8"
version: 2
---
# segment

Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension

Composes: [[legal/entities/segment/reportings]] · [[cost/centers]] · [[financial/statements]] · [[dimension]].

**Law — [[law]]: a segment is a reporting dimension over the ledger, NOT a chart-of-accounts axis — revenue/expense/asset/liability group for disclosure without polluting the GL.**

## Standards
- IFRS-8 (operating segments)
- FASB ASC 280 (segment reporting)
