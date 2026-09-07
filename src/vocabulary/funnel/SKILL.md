---
name: funnel
description: "Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage."
atomPath: "vocabulary/funnel"
coordinate: "vocabulary/funnel · 1/base · 155f800e"
contentUuid: "8fafc5ba-3e3e-5edf-95ff-80b7c1e678ec"
diamondUuid: "580616eb-0136-8105-8bbe-3b144960d9d7"
uuid: "155f800e-df57-82f9-962e-428ff30656b9"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "77dff3ad-fabc-8a9b-9aea-9c383456a7b3"
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
      stageUuid: "99f2d034-bd2c-83ec-a70c-eb2b0fb55312"
    - stage: seal
      stageUuid: "da9b2c1a-d437-8e15-b077-ca269792b5ac"
    - stage: uuid
      stageUuid: "65b166af-35ef-8555-9c6c-31144e3c5e1e"
version: 2
---
# funnel

Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage.

Composes: [[pipeline]] · [[Leads]] · [[Opportunities]] · [[customers/sales/orders]] · [[forecast]] · [[conversion]].

## Standards
- CRM-generic

**Law — [[law]]: a funnel measures conversion rate, width, and velocity stage-by-stage along the pipeline (lead → qualified → opportunity → order) — the rate at which prospects pass each stage, not the stages themselves.**
