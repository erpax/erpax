---
name: funnel
description: "Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage."
atomPath: funnel
coordinate: funnel · 4/weave · 420f4d8c
contentUuid: "fb361a04-50f0-5794-8645-d1d42a917eb7"
diamondUuid: "09ef0f40-617c-82df-ae79-bafc02858f05"
uuid: "420f4d8c-06bc-81d4-9e06-745584fe8eac"
horo: 4
bonds:
  in:
    - conversion
    - forecast
    - law
    - leads
    - opportunities
    - orders
    - pipeline
  out:
    - conversion
    - forecast
    - law
    - leads
    - opportunities
    - orders
    - pipeline
typography:
  partition: funnel
  bondDegree: 22
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - conversion
    - forecast
    - law
    - leads
    - opportunities
    - orders
    - pipeline
  matrix:
    - conversion
    - forecast
    - law
    - leads
    - opportunities
    - orders
    - pipeline
  backlinks:
    - conversion
    - forecast
    - law
    - leads
    - opportunities
    - orders
    - pipeline
signatures:
  computationUuid: "396de33b-e4cf-8624-98b1-f74e64cb3896"
  stages:
    - stage: path
      stageUuid: "f55ab12e-b2be-88e6-9000-fa1899dbacf4"
    - stage: trinity
      stageUuid: "a7a01010-f70e-886e-ac00-abfc69cdbb2d"
    - stage: boundary
      stageUuid: "0c5add4a-fd97-899d-81d7-958fcff9cd97"
    - stage: links
      stageUuid: "598b351f-6ac9-8c08-a045-d8e924a92726"
    - stage: horo
      stageUuid: "013a0008-930b-83f8-aecf-d14b7eae4d8d"
    - stage: seal
      stageUuid: "4907488a-d585-876e-a932-abee0bd6b587"
    - stage: uuid
      stageUuid: "3925fe43-9a5e-8576-83c3-19c20eb1e050"
version: 2
---
# funnel

Use when measuring conversion rates across pipeline stages — lead-to-qualified, qualified-to-opportunity, opportunity-to-order metrics; funnel width/velocity per stage.

Composes: [[pipeline]] · [[Leads]] · [[Opportunities]] · [[customers/sales/orders]] · [[forecast]] · [[conversion]].

## Standards
- CRM-generic

**Law — [[law]]: a funnel measures conversion rate, width, and velocity stage-by-stage along the pipeline (lead → qualified → opportunity → order) — the rate at which prospects pass each stage, not the stages themselves.**
