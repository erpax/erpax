---
name: forecast
description: "Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period."
atomPath: "vocabulary/forecast"
coordinate: "vocabulary/forecast · 4/weave · e85e5bec"
contentUuid: "9a07eeb6-3076-58e1-9942-eff542005868"
diamondUuid: "0ba8801a-82ff-8ff7-a905-389077516614"
uuid: "e85e5bec-383e-80da-8cce-9c5b9489006b"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 62
standards: []
bindings: []
signatures:
  computationUuid: "2e11f022-3cdd-85b0-8a99-49ea08df1ab3"
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
      stageUuid: "22d9a824-65d8-8b9a-87f4-107c0c454a7f"
    - stage: seal
      stageUuid: "f5227531-a1bc-8774-9f6f-b2ae0f6f95fb"
    - stage: uuid
      stageUuid: "7d94bf6f-89c8-8a7f-b800-504324ba3947"
version: 2
---
# forecast

Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period.

Composes: [[Opportunities]] · [[pipeline]] · [[customers/sales/orders]] · [[revenue]] · [[aggregation]] · [[territory]].

## Standards
- CRM-generic

**Law — [[law]]: a forecast is a projection, never a commitment — each amount is the deal value weighted by its probability and stage, so the total is provisional until the close date resolves it to won or lost.**
