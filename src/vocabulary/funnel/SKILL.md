---
name: funnel
description: "Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage."
atomPath: "vocabulary/funnel"
coordinate: "vocabulary/funnel · 1/base · ded0f493"
contentUuid: "3f39f74d-a496-5947-9adf-e0e7817a68d0"
diamondUuid: "5868939f-09cf-8e53-bfa8-0bb756f48535"
uuid: "ded0f493-2b24-820b-a5b0-11523438552a"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "01eaa7aa-6d3f-87c7-9ce9-45c8a6bce12f"
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
      stageUuid: "aeed5565-1757-8f23-9cda-d1ab425a4acd"
    - stage: seal
      stageUuid: "da9b2c1a-d437-8e15-b077-ca269792b5ac"
    - stage: uuid
      stageUuid: "0bdf1339-7eca-8fae-a217-c2d7e8fbafa8"
version: 2
---
# funnel

Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage.

Composes: [[pipeline]] · [[Leads]] · [[Opportunities]] · [[customers/sales/orders]] · [[forecast]] · [[conversion]].

## Standards
- CRM-generic

**Law — [[law]]: a funnel measures conversion rate, width, and velocity stage-by-stage along the pipeline (lead → qualified → opportunity → order) — the rate at which prospects pass each stage, not the stages themselves.**
