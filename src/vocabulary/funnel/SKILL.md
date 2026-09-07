---
name: funnel
description: "Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage."
atomPath: "vocabulary/funnel"
coordinate: "vocabulary/funnel · 5/round · cb1fc823"
contentUuid: "703f295d-2e40-5d83-8100-c189fe500b68"
diamondUuid: "b83c1d98-307e-87b8-a852-128c1f34f827"
uuid: "cb1fc823-9f0b-8061-b11a-fe08d1ae9ff0"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "aea947e8-5c39-81ca-898e-a4b796f58ecf"
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
      stageUuid: "1f2252fa-22e9-89c6-bf90-30ef38bb7977"
    - stage: seal
      stageUuid: "da9b2c1a-d437-8e15-b077-ca269792b5ac"
    - stage: uuid
      stageUuid: "62ec2b7f-3ad5-851b-b71f-db3893465439"
version: 2
---
# funnel

Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage.

Composes: [[pipeline]] · [[Leads]] · [[Opportunities]] · [[customers/sales/orders]] · [[forecast]] · [[conversion]].

## Standards
- CRM-generic

**Law — [[law]]: a funnel measures conversion rate, width, and velocity stage-by-stage along the pipeline (lead → qualified → opportunity → order) — the rate at which prospects pass each stage, not the stages themselves.**
