---
name: revenue
description: "Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral."
atomPath: revenue
coordinate: "revenue · 4/weave · d3758518"
contentUuid: "c2702665-5073-5689-b136-de1cbb2b752d"
diamondUuid: "946648af-7c18-8a7f-8539-6f66ab03888f"
uuid: "d3758518-aab6-886e-a7d9-1579921b00f8"
horo: 4
typography:
  partition: revenue
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "b639744a-03a6-8e30-b4dd-014447c48bf0"
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
      stageUuid: "c938c694-1bf8-8f57-b18f-0b2b6dab963c"
    - stage: seal
      stageUuid: "105ac0e6-07e0-8434-a4aa-f04fc8308ab1"
    - stage: uuid
      stageUuid: "ce7893a1-3b77-8603-b00a-9accebd68f36"
version: 2
---
# revenue

Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral.

Composes: [[customers/contracts/performance/obligations]] · [[Invoices]] · [[Contracts]] · [[accounting]] · [[currency]] · [[deferredrevenue]].

**Law — [[law]]: revenue recognises only as performance obligations are satisfied — at a point in time or over time — with the remainder deferred (IFRS-15 / ASC-606).**

## Standards
- IFRS-15
- ASC-606
