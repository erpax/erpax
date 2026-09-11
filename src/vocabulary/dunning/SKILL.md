---
name: dunning
description: "Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not."
atomPath: "vocabulary/dunning"
coordinate: "vocabulary/dunning · 5/round · 144e30d6"
contentUuid: "9bccbfb2-11fd-5bd9-9bcf-9b31e1d3744a"
diamondUuid: "4facb5dc-0e8a-821d-a94f-236d315dc7cc"
uuid: "144e30d6-47f5-80c8-8456-264d6560e326"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "58d6a733-8707-8f25-a919-8bc3169680fd"
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
      stageUuid: "cee5d652-5c6b-85f4-b61c-cfed1bea4656"
    - stage: seal
      stageUuid: "d1654a78-16bb-828a-b928-c28936cf74db"
    - stage: uuid
      stageUuid: "b3acdf3f-9789-8cbf-a3b6-a5ab5900181b"
version: 2
---
# dunning

Use when automating payment retry and collections — dunning-cycles exist but dunning as the parent concept (policy, rule, retry schedule, messaging) does not.

Composes: [[invoices/dunning/cycles]] · [[Payments]] · [[Invoices]] · [[Customers]] · [[accounting]] · [[transaction]].

**Law — [[law]]: dunning is the parent collections-policy (rule · retry schedule · messaging) over the dunning-cycles that automate payment retry and collections.**

## Standards
- CRM-generic
