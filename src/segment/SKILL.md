---
name: segment
description: "Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension"
atomPath: segment
coordinate: "segment · 8/crest · 4b6f1c48"
contentUuid: "06241fbd-1634-55ad-9406-01e37382375a"
diamondUuid: "87e441bf-8182-80f1-a40d-14ec532c9142"
uuid: "4b6f1c48-b48e-878c-8404-7cfb3f64694b"
horo: 8
typography:
  partition: segment
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "d8e1491c-053a-8933-bc2b-505890d2e1f5"
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
      stageUuid: "97ad064f-0736-8cbd-a0b9-bb5820925896"
    - stage: seal
      stageUuid: "d516b4f6-8cc4-8118-8e7f-b978af04a2a1"
    - stage: uuid
      stageUuid: "43dd3d92-2bd2-81be-8f4c-3215e942e158"
version: 2
---
# segment

Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension

Composes: [[legal/entities/segment/reportings]] · [[cost/centers]] · [[financial/statements]] · [[dimension]].

**Law — [[law]]: a segment is a reporting dimension over the ledger, NOT a chart-of-accounts axis — revenue/expense/asset/liability group for disclosure without polluting the GL.**

## Standards
- IFRS-8 (operating segments)
- FASB ASC 280 (segment reporting)
