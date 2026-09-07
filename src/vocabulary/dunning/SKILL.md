---
name: dunning
description: "Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not."
atomPath: "vocabulary/dunning"
coordinate: "vocabulary/dunning · 2/share · b3ed6b3f"
contentUuid: "8cd95fd2-cc85-5fcb-9e73-cbcd5cb15d13"
diamondUuid: "6128f99f-9102-8933-be74-36e8c485c33b"
uuid: "b3ed6b3f-ae7d-894c-a2d5-1d6d2a7b05aa"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "fc4b64f5-0e07-894e-9257-7d81e8b5ca19"
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
      stageUuid: "b3c48de4-00dc-8727-aac2-d64cdf8df13c"
    - stage: seal
      stageUuid: "d1654a78-16bb-828a-b928-c28936cf74db"
    - stage: uuid
      stageUuid: "cf014ef1-8cd6-84c2-878a-93e6490c2c8e"
version: 2
---
# dunning

Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not.

Composes: [[invoices/dunning/cycles]] · [[Payments]] · [[Invoices]] · [[Customers]] · [[accounting]] · [[transaction]].

**Law — [[law]]: dunning is the parent collections-policy (rule · retry schedule · messaging) over the dunning-cycles that automate payment retry and collections.**

## Standards
- CRM-generic
