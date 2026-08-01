---
name: forecast
description: "Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period."
atomPath: "vocabulary/forecast"
coordinate: "vocabulary/forecast · 7/descent · 1bb5544c"
contentUuid: "bcc9d430-ee96-570e-a962-91ad01ca0719"
diamondUuid: "0eccdb63-b31d-84f0-916e-b81c1791d8d8"
uuid: "1bb5544c-9910-8a82-8e45-3d8dc99e6203"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 60
standards: []
bindings: []
signatures:
  computationUuid: "0cc959ea-7b60-8e83-af0c-31c37782a697"
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
      stageUuid: "ace0d964-8de2-8051-9270-eeb495eec589"
    - stage: seal
      stageUuid: "b49ddde6-6076-832f-860d-9933574b7773"
    - stage: uuid
      stageUuid: "d06fc440-a5e1-8876-a17c-19de6ab4287a"
version: 2
---
# forecast

Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period.

Composes: [[Opportunities]] · [[pipeline]] · [[customers/sales/orders]] · [[revenue]] · [[aggregation]] · [[territory]].

## Standards
- CRM-generic

**Law — [[law]]: a forecast is a projection, never a commitment — each amount is the deal value weighted by its probability and stage, so the total is provisional until the close date resolves it to won or lost.**
