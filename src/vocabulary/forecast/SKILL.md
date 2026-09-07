---
name: forecast
description: "Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period."
atomPath: "vocabulary/forecast"
coordinate: "vocabulary/forecast · 5/round · 1fd50094"
contentUuid: "55458dc8-15b4-533f-afd2-096587884320"
diamondUuid: "4f0c9c2b-5286-8eb4-bae9-9b9a9178072d"
uuid: "1fd50094-2075-8baf-a08b-e6162c4e8a19"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 62
standards: []
bindings: []
signatures:
  computationUuid: "8c4c2541-ad8d-87b4-8cf1-9f6f8538fda1"
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
      stageUuid: "f8f05bd4-f772-8cb8-8720-a8fb4865c026"
    - stage: seal
      stageUuid: "f5227531-a1bc-8774-9f6f-b2ae0f6f95fb"
    - stage: uuid
      stageUuid: "a7381e87-2d18-888a-9810-dc444bd46600"
version: 2
---
# forecast

Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period.

Composes: [[Opportunities]] · [[pipeline]] · [[customers/sales/orders]] · [[revenue]] · [[aggregation]] · [[territory]].

## Standards
- CRM-generic

**Law — [[law]]: a forecast is a projection, never a commitment — each amount is the deal value weighted by its probability and stage, so the total is provisional until the close date resolves it to won or lost.**
