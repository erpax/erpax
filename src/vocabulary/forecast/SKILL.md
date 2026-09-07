---
name: forecast
description: "Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period."
atomPath: "vocabulary/forecast"
coordinate: "vocabulary/forecast · 8/crest · 84a83124"
contentUuid: "3f917193-a54e-56af-a20e-553abc6e3746"
diamondUuid: "2052d944-c382-81ed-b9f9-9ff729f59fc2"
uuid: "84a83124-5ecb-84b6-89cc-96e51cdbc0e0"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 62
standards: []
bindings: []
signatures:
  computationUuid: "9c1e4f8c-7530-82ed-b762-58257f30665e"
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
      stageUuid: "569c6ab4-5c36-87f6-839e-d0f7e4d03fdf"
    - stage: seal
      stageUuid: "f5227531-a1bc-8774-9f6f-b2ae0f6f95fb"
    - stage: uuid
      stageUuid: "8bc62235-0e71-8a84-9291-93d30553d3a8"
version: 2
---
# forecast

Use when projecting revenue from pipeline/opportunities — weighted by probability, stage, and close date; aggregated by rep/territory/product/period.

Composes: [[Opportunities]] · [[pipeline]] · [[customers/sales/orders]] · [[revenue]] · [[aggregation]] · [[territory]].

## Standards
- CRM-generic

**Law — [[law]]: a forecast is a projection, never a commitment — each amount is the deal value weighted by its probability and stage, so the total is provisional until the close date resolves it to won or lost.**
