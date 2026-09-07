---
name: dunning
description: "Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not."
atomPath: "vocabulary/dunning"
coordinate: "vocabulary/dunning · 1/base · 518dd496"
contentUuid: "57c47937-969f-5fc9-b6ec-fef7a6b7e315"
diamondUuid: "ac42b89e-75f2-89fb-87b3-cb082aaaeebd"
uuid: "518dd496-22eb-8347-b789-f7e4db9f9cc4"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 22
standards: []
bindings: []
signatures:
  computationUuid: "a81af13a-a5ad-86e8-a7ed-3e9e6fa9fdff"
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
      stageUuid: "3b76a527-1585-8191-b511-71cd02688c9a"
    - stage: seal
      stageUuid: "d1654a78-16bb-828a-b928-c28936cf74db"
    - stage: uuid
      stageUuid: "bbe93a1d-abed-8e35-8302-aa913cfa1edf"
version: 2
---
# dunning

Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not.

Composes: [[invoices/dunning/cycles]] · [[Payments]] · [[Invoices]] · [[Customers]] · [[accounting]] · [[transaction]].

**Law — [[law]]: dunning is the parent collections-policy (rule · retry schedule · messaging) over the dunning-cycles that automate payment retry and collections.**

## Standards
- CRM-generic
