---
name: funnel
description: "Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage."
atomPath: "vocabulary/funnel"
coordinate: "vocabulary/funnel · 5/round · 5b15ea8c"
contentUuid: "664d3b67-ce72-5e00-83f6-b3f668868009"
diamondUuid: "76f32a48-4149-882d-adee-0e7b2bdb28ab"
uuid: "5b15ea8c-7e2c-8152-8f54-54476c9049ff"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "9a1d12f5-a274-85c9-9fb5-af5151ab7a32"
  stages:
    - stage: path
      stageUuid: "31efe69a-affb-858d-a6b1-91e2705748d8"
    - stage: trinity
      stageUuid: "51614def-3e36-8d9d-8351-a777a4753623"
    - stage: boundary
      stageUuid: "cdd68c43-aff4-88bb-94f3-87d52e012c21"
    - stage: links
      stageUuid: "0a9daaf2-e87a-864f-bf74-c29f0195a28c"
    - stage: horo
      stageUuid: "0892ce9b-44bd-8b70-8e61-a4a4f3ec4b4c"
    - stage: seal
      stageUuid: "da9b2c1a-d437-8e15-b077-ca269792b5ac"
    - stage: uuid
      stageUuid: "e588a0ae-f2e2-8f22-b5f3-014fe994247e"
version: 2
---
# funnel

Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage.

Composes: [[pipeline]] · [[Leads]] · [[Opportunities]] · [[customers/sales/orders]] · [[forecast]] · [[conversion]].

## Standards
- CRM-generic

**Law — [[law]]: a funnel measures conversion rate, width, and velocity stage-by-stage along the pipeline (lead → qualified → opportunity → order) — the rate at which prospects pass each stage, not the stages themselves.**
