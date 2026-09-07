---
name: revenue
description: "Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral."
atomPath: revenue
coordinate: "revenue · 4/weave · 55d4f6c6"
contentUuid: "292c38a8-7294-5e5f-8943-b962a81109eb"
diamondUuid: "cacc4401-251f-8a60-91fc-35e3130ea3e4"
uuid: "55d4f6c6-d532-8fb9-840a-7ebec6731550"
horo: 4
typography:
  partition: revenue
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "c41c1a5c-52b0-8dfd-bf16-613f67219b0d"
  stages:
    - stage: path
      stageUuid: "6fc3d9cd-9700-88df-9b46-eb6b01fe0ac5"
    - stage: trinity
      stageUuid: "b8e3a18b-7e64-86fa-9ca2-22b04f77c5f8"
    - stage: boundary
      stageUuid: "eacc76c1-f759-8556-ae54-630bb81664bb"
    - stage: links
      stageUuid: "3e1d22bb-fa55-8f4d-abd2-def12cd89aef"
    - stage: horo
      stageUuid: "12c690ba-4259-8534-a100-9047ddb4abb2"
    - stage: seal
      stageUuid: "105ac0e6-07e0-8434-a4aa-f04fc8308ab1"
    - stage: uuid
      stageUuid: "7d02e805-8f53-84e6-a707-241a4525f660"
version: 2
---
# revenue

Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral.

Composes: [[customers/contracts/performance/obligations]] · [[Invoices]] · [[Contracts]] · [[accounting]] · [[currency]] · [[deferredrevenue]].

**Law — [[law]]: revenue recognises only as performance obligations are satisfied — at a point in time or over time — with the remainder deferred (IFRS-15 / ASC-606).**

## Standards
- IFRS-15
- ASC-606
