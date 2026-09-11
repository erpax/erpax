---
name: dunning
description: "Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not."
atomPath: "vocabulary/dunning"
coordinate: "vocabulary/dunning · 5/round · b7098188"
contentUuid: "5c425664-6a58-5195-becb-9edf10df2299"
diamondUuid: "ce1f83d4-f157-8329-967d-d514e0a8dca3"
uuid: "b7098188-199a-88f9-908a-8b08065edb5a"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "54f2faee-c169-82d9-b2ce-c5ae7290691e"
  stages:
    - stage: path
      stageUuid: "978bb3b8-3746-810f-8853-48c0473145c7"
    - stage: trinity
      stageUuid: "aa5c0cf4-3edd-85cb-be26-d37a6f27cc3b"
    - stage: boundary
      stageUuid: "0be8d7e3-7829-8af9-a7ea-cbc974ca0435"
    - stage: links
      stageUuid: "8aa0f33c-c0bb-8f1b-a06e-014b1712cc61"
    - stage: horo
      stageUuid: "0bada694-8635-81fd-bf6e-b02f881a82fa"
    - stage: seal
      stageUuid: "d1654a78-16bb-828a-b928-c28936cf74db"
    - stage: uuid
      stageUuid: "b850d7fd-c8fe-87d9-8dd1-105ad28b0e70"
version: 2
---
# dunning

Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not.

Composes: [[invoices/dunning/cycles]] · [[Payments]] · [[Invoices]] · [[Customers]] · [[accounting]] · [[transaction]].

**Law — [[law]]: dunning is the parent collections-policy (rule · retry schedule · messaging) over the dunning-cycles that automate payment retry and collections.**

## Standards
- CRM-generic
