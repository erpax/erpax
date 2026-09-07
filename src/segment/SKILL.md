---
name: segment
description: "Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension"
atomPath: segment
coordinate: "segment · 8/crest · 73728308"
contentUuid: "39a53678-1117-56df-8632-081a403ce08c"
diamondUuid: "90bbb1d6-c03d-8f23-93be-adcff1c14998"
uuid: "73728308-9081-898a-8503-2181161a04e1"
horo: 8
typography:
  partition: segment
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "598837c6-a847-8d0f-be55-7440f5827e4e"
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
      stageUuid: "cd9c713e-0a0f-8384-b44c-a9a75d99406e"
    - stage: seal
      stageUuid: "d516b4f6-8cc4-8118-8e7f-b978af04a2a1"
    - stage: uuid
      stageUuid: "6cba6ba4-dcc9-8d73-b3f8-099206973732"
version: 2
---
# segment

Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension

Composes: [[legal/entities/segment/reportings]] · [[cost/centers]] · [[financial/statements]] · [[dimension]].

**Law — [[law]]: a segment is a reporting dimension over the ledger, NOT a chart-of-accounts axis — revenue/expense/asset/liability group for disclosure without polluting the GL.**

## Standards
- IFRS-8 (operating segments)
- FASB ASC 280 (segment reporting)
