---
name: forecast
description: "Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period."
atomPath: "vocabulary/forecast"
coordinate: "vocabulary/forecast · 8/crest · 592b8f4c"
contentUuid: "d91d1c0d-0863-5749-9499-c5c378dd8c7a"
diamondUuid: "ee31aaf7-fd39-8bc9-bc67-71c074b16c8a"
uuid: "592b8f4c-e0d4-8840-a698-826fd2d28a77"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 61
standards: []
bindings: []
signatures:
  computationUuid: "09986f18-8fb5-8edb-be35-f7e4f89de95b"
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
      stageUuid: "70708ab4-f98c-840d-9479-669965301a05"
    - stage: seal
      stageUuid: "f5227531-a1bc-8774-9f6f-b2ae0f6f95fb"
    - stage: uuid
      stageUuid: "72f23add-63f1-89c3-95df-841775ce09d7"
version: 2
---
# forecast

Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period.

Composes: [[Opportunities]] · [[pipeline]] · [[customers/sales/orders]] · revenue · [[aggregation]] · territory.

## Standards
- CRM-generic

**Law — [[law]]: a forecast is a projection, never a commitment — each amount is the deal value weighted by its probability and stage, so the total is provisional until the close date resolves it to won or lost.**
