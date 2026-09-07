---
name: funnel
description: "Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage."
atomPath: "vocabulary/funnel"
coordinate: "vocabulary/funnel · 1/base · a8304296"
contentUuid: "20205cd2-291a-5e0a-83b8-2a714e54b422"
diamondUuid: "9bd4d468-4032-8ee4-8dba-faa1e3ad19b3"
uuid: "a8304296-6049-859b-bb2e-2c9c8b8b0bb7"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "ea9fd21f-555b-893a-b997-66038656a88b"
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
      stageUuid: "ecba3821-8d5d-82c0-af1a-6d70de330df6"
    - stage: seal
      stageUuid: "da9b2c1a-d437-8e15-b077-ca269792b5ac"
    - stage: uuid
      stageUuid: "59197fa8-f49d-87f6-bdce-108b8f72ef03"
version: 2
---
# funnel

Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage.

Composes: [[pipeline]] · [[Leads]] · [[Opportunities]] · [[customers/sales/orders]] · [[forecast]] · [[conversion]].

## Standards
- CRM-generic

**Law — [[law]]: a funnel measures conversion rate, width, and velocity stage-by-stage along the pipeline (lead → qualified → opportunity → order) — the rate at which prospects pass each stage, not the stages themselves.**
