---
name: forecast
description: "Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period."
atomPath: "vocabulary/forecast"
coordinate: "vocabulary/forecast · 8/crest · d0aeb092"
contentUuid: "00e6aa19-0cd3-5f59-b2de-f920d7c4b5e8"
diamondUuid: "669a1a49-196a-871b-b8ba-4e0a8e6d0fc5"
uuid: "d0aeb092-2828-8c58-80f6-b885dd960a79"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 64
standards: []
bindings: []
signatures:
  computationUuid: "9d051d2d-a1e5-823a-8871-ae1f80c3fa15"
  stages:
    - stage: path
      stageUuid: "5e012143-b6be-84e2-8005-6679f6f5280f"
    - stage: trinity
      stageUuid: "76765977-0fa0-8dec-b9a6-42b9487691fb"
    - stage: boundary
      stageUuid: "7a0c0f16-ecfb-8801-8d18-fec6abab9829"
    - stage: links
      stageUuid: "5395ac7a-484e-8f4b-b33f-6f2a0e7e311d"
    - stage: horo
      stageUuid: "1d8f4253-187d-8740-b658-2d4cf4264aa2"
    - stage: seal
      stageUuid: "f5227531-a1bc-8774-9f6f-b2ae0f6f95fb"
    - stage: uuid
      stageUuid: "aac3f9c3-870a-8215-8b85-6725b12635dc"
version: 2
---
# forecast

Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period.

Composes: [[Opportunities]] · [[pipeline]] · [[customers/sales/orders]] · [[revenue]] · [[aggregation]] · [[territory]].

## Standards
- CRM-generic

**Law — [[law]]: a forecast is a projection, never a commitment — each amount is the deal value weighted by its probability and stage, so the total is provisional until the close date resolves it to won or lost.**
