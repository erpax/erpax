---
name: forecast
description: "Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period."
atomPath: "vocabulary/forecast"
coordinate: "vocabulary/forecast · 1/base · 19cbc3e0"
contentUuid: "da06e361-8590-573e-ae15-3fcccbc2e809"
diamondUuid: "778cd2b8-00bb-8290-bcfb-55ef080f8154"
uuid: "19cbc3e0-8d57-8cff-a1ff-c268f3fb14b2"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 54
standards: []
bindings: []
signatures:
  computationUuid: "85897f51-2a9b-8f79-a4c8-91f6d6f57bbf"
  stages:
    - stage: path
      stageUuid: "5e012143-b6be-84e2-8005-6679f6f5280f"
    - stage: trinity
      stageUuid: "76765977-0fa0-8dec-b9a6-42b9487691fb"
    - stage: boundary
      stageUuid: "132adacf-c9ef-80e2-8a90-4ad0052431a5"
    - stage: links
      stageUuid: "cbb632d0-0c4a-8b12-b310-fcc3e2e9c0c5"
    - stage: horo
      stageUuid: "ada513a8-24ba-8b9c-b681-28c4d68a111d"
    - stage: seal
      stageUuid: "f5227531-a1bc-8774-9f6f-b2ae0f6f95fb"
    - stage: uuid
      stageUuid: "bef732db-784e-81a3-b1d6-07a18934ebcf"
version: 2
---
# forecast

Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period.

Composes: [[Opportunities]] · [[pipeline]] · [[customers/sales/orders]] · revenue · [[aggregation]] · territory.

## Standards
- CRM-generic

**Law — [[law]]: a forecast is a projection, never a commitment — each amount is the deal value weighted by its probability and stage, so the total is provisional until the close date resolves it to won or lost.**
