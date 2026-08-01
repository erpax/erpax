---
name: funnel
description: "Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage."
atomPath: "vocabulary/funnel"
coordinate: "vocabulary/funnel · 5/round · b1021494"
contentUuid: "1420188a-ba41-5744-b0e8-dfe2fa1018c7"
diamondUuid: "e609dbda-5f2c-8058-8f52-a5687a23b8dc"
uuid: "b1021494-3982-87c1-a00e-6a7cdf5b93d2"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "729d2318-94d4-88e6-9aa5-33ff17d5f56f"
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
      stageUuid: "4a3e7194-a6e6-8d39-86d1-ecfd41350ef5"
    - stage: seal
      stageUuid: "74f9c1fa-37fb-8506-98e9-88fa0f7ba4e2"
    - stage: uuid
      stageUuid: "62ed0fba-c1ab-8e9f-8cd1-6c8f0d48a9fd"
version: 2
---
# funnel

Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage.

Composes: [[pipeline]] · [[Leads]] · [[Opportunities]] · [[customers/sales/orders]] · [[forecast]] · [[conversion]].

## Standards
- CRM-generic

**Law — [[law]]: a funnel measures conversion rate, width, and velocity stage-by-stage along the pipeline (lead → qualified → opportunity → order) — the rate at which prospects pass each stage, not the stages themselves.**
