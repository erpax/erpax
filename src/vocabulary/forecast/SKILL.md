---
name: forecast
description: "Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period."
atomPath: "vocabulary/forecast"
coordinate: "vocabulary/forecast · 5/round · 75c93f23"
contentUuid: "cd3199b6-e3e5-5829-8803-a68ed4d67a81"
diamondUuid: "410f8bbb-0c06-810a-a67b-9d38692cd488"
uuid: "75c93f23-fd6b-87d4-bb9a-f3febed667ff"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 62
standards: []
bindings: []
signatures:
  computationUuid: "6c2da8ee-8516-8519-adfc-09d513fa13f5"
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
      stageUuid: "80f272b9-0bb8-813f-99c3-4d60475598cc"
    - stage: seal
      stageUuid: "f5227531-a1bc-8774-9f6f-b2ae0f6f95fb"
    - stage: uuid
      stageUuid: "525e2174-1887-876f-aaa2-2e20499c6850"
version: 2
---
# forecast

Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period.

Composes: [[Opportunities]] · [[pipeline]] · [[customers/sales/orders]] · [[revenue]] · [[aggregation]] · [[territory]].

## Standards
- CRM-generic

**Law — [[law]]: a forecast is a projection, never a commitment — each amount is the deal value weighted by its probability and stage, so the total is provisional until the close date resolves it to won or lost.**
