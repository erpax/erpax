---
name: dunning
description: "Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not."
atomPath: "vocabulary/dunning"
coordinate: "vocabulary/dunning · 5/round · 70de609e"
contentUuid: "936c19a2-eb8d-5743-8079-5e98c5e79b8d"
diamondUuid: "605cde1f-f130-84f9-bdc8-a2fee66a966a"
uuid: "70de609e-ad2d-8a1e-914b-df255f77ec9f"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "196b5244-8bf5-8e2f-9c54-b46bd8e3dda3"
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
      stageUuid: "3627b788-d7f4-89c1-bd96-425d1566602c"
    - stage: seal
      stageUuid: "d1654a78-16bb-828a-b928-c28936cf74db"
    - stage: uuid
      stageUuid: "bcb9a619-491c-8936-a02e-ff5a1795011c"
version: 2
---
# dunning

Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not.

Composes: [[invoices/dunning/cycles]] · [[Payments]] · [[Invoices]] · [[Customers]] · [[accounting]] · [[transaction]].

**Law — [[law]]: dunning is the parent collections-policy (rule · retry schedule · messaging) over the dunning-cycles that automate payment retry and collections.**

## Standards
- CRM-generic
