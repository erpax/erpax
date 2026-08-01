---
name: segment
description: "Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension"
atomPath: segment
coordinate: "segment · 2/share · af431415"
contentUuid: "7efac2d2-d49a-5b5c-8523-4fd0111e4929"
diamondUuid: "ed92dd44-1766-82f4-8ee1-4c2884c21684"
uuid: "af431415-9a70-8841-93b3-b7a477c1f7ad"
horo: 2
typography:
  partition: segment
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "2c4a1ec2-ebaf-8fa6-a1af-d14a7a55b155"
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
      stageUuid: "165e0f81-cd5a-8eb1-8a2f-64996b0b5324"
    - stage: seal
      stageUuid: "d516b4f6-8cc4-8118-8e7f-b978af04a2a1"
    - stage: uuid
      stageUuid: "66e361a5-e16b-8fa0-8cb5-eb1a46981d9e"
version: 2
---
# segment

Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension

Composes: [[legal/entities/segment/reportings]] · [[cost/centers]] · [[financial/statements]] · [[dimension]].

**Law — [[law]]: a segment is a reporting dimension over the ledger, NOT a chart-of-accounts axis — revenue/expense/asset/liability group for disclosure without polluting the GL.**

## Standards
- IFRS-8 (operating segments)
- FASB ASC 280 (segment reporting)
