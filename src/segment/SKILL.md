---
name: segment
description: "Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension"
atomPath: segment
coordinate: "segment · 1/base · bd036320"
contentUuid: "7e8d76b5-8045-5bac-b073-b5b4d32f57e6"
diamondUuid: "8ac7bf15-2c2f-8686-90df-13a306123c70"
uuid: "bd036320-ff3e-8100-8a3a-dc477ab91b54"
horo: 1
typography:
  partition: segment
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "e98f13f0-e34c-8ae4-ba58-46c0043fafdd"
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
      stageUuid: "18d72f84-3af6-8214-9b67-99581c7795a8"
    - stage: seal
      stageUuid: "d516b4f6-8cc4-8118-8e7f-b978af04a2a1"
    - stage: uuid
      stageUuid: "60c201a6-d944-87f2-90ae-d081d0b40af6"
version: 2
---
# segment

Use when identifying and reporting operating segments per IFRS-8 — revenue/expense/asset/liability grouping for disclosure and management reporting; distinct from cost-center dimension

Composes: [[legal/entities/segment/reportings]] · [[cost/centers]] · [[financial/statements]] · [[dimension]].

**Law — [[law]]: a segment is a reporting dimension over the ledger, NOT a chart-of-accounts axis — revenue/expense/asset/liability group for disclosure without polluting the GL.**

## Standards
- IFRS-8 (operating segments)
- FASB ASC 280 (segment reporting)
