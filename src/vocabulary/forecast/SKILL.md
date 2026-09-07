---
name: forecast
description: "Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period."
atomPath: "vocabulary/forecast"
coordinate: "vocabulary/forecast · 4/weave · c704997a"
contentUuid: "186b9cc9-531c-53f6-bdcc-8a168a8a80a5"
diamondUuid: "fedcdaaf-1dad-8c66-9a43-79016f7d3bc7"
uuid: "c704997a-5f91-8ce8-8695-0f3ce539c9e3"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 64
standards: []
bindings: []
signatures:
  computationUuid: "7dfc913c-31aa-8302-9027-2d42767b4d60"
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
      stageUuid: "7b27d8b4-c2dd-80c3-b2d8-e44490d0212e"
    - stage: seal
      stageUuid: "f5227531-a1bc-8774-9f6f-b2ae0f6f95fb"
    - stage: uuid
      stageUuid: "77ccba77-5844-8201-a8a8-92ee952b5dd5"
version: 2
---
# forecast

Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period.

Composes: [[Opportunities]] · [[pipeline]] · [[customers/sales/orders]] · [[revenue]] · [[aggregation]] · [[territory]].

## Standards
- CRM-generic

**Law — [[law]]: a forecast is a projection, never a commitment — each amount is the deal value weighted by its probability and stage, so the total is provisional until the close date resolves it to won or lost.**
