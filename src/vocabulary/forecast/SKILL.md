---
name: forecast
description: "Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period."
atomPath: "vocabulary/forecast"
coordinate: "vocabulary/forecast · 1/base · 2fd6051e"
contentUuid: "6df1c3ef-57c5-5261-8d06-bf37332a5f01"
diamondUuid: "81b4d48e-3c86-8cd6-aef6-6ffc5e5da6e4"
uuid: "2fd6051e-0311-857c-8315-876bf162cd9d"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 64
standards: []
bindings: []
signatures:
  computationUuid: "69bc5412-70ce-87a6-88ac-ee9242951985"
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
      stageUuid: "f47a10af-339f-8c7b-b8dd-ce82a3eefcc8"
    - stage: seal
      stageUuid: "f5227531-a1bc-8774-9f6f-b2ae0f6f95fb"
    - stage: uuid
      stageUuid: "cf5a0509-9ae5-8aec-acb7-d6401548b091"
version: 2
---
# forecast

Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period.

Composes: [[Opportunities]] · [[pipeline]] · [[customers/sales/orders]] · [[revenue]] · [[aggregation]] · [[territory]].

## Standards
- CRM-generic

**Law — [[law]]: a forecast is a projection, never a commitment — each amount is the deal value weighted by its probability and stage, so the total is provisional until the close date resolves it to won or lost.**
