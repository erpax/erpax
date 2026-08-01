---
name: revenue
description: "Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral."
atomPath: revenue
coordinate: "revenue · 8/crest · 4998f70c"
contentUuid: "a853117d-fa56-539c-a57d-8834dcc579ca"
diamondUuid: "34fffc6f-8b0c-8e07-b9e4-9e5f2269a275"
uuid: "4998f70c-a198-8efc-a033-b0b38a5bb07f"
horo: 8
typography:
  partition: revenue
  bondDegree: 36
standards: []
bindings: []
signatures:
  computationUuid: "71eee541-af4b-863d-baac-84642ee36cf7"
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
      stageUuid: "0915a87c-26fb-81dd-9719-d5ab91902f8b"
    - stage: seal
      stageUuid: "105ac0e6-07e0-8434-a4aa-f04fc8308ab1"
    - stage: uuid
      stageUuid: "17cfa8e3-b94f-8f6e-955a-70e17d0dad24"
version: 2
---
# revenue

Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral.

Composes: [[customers/contracts/performance/obligations]] · [[Invoices]] · [[Contracts]] · [[accounting]] · [[currency]] · [[deferredrevenue]].

**Law — [[law]]: revenue recognises only as performance obligations are satisfied — at a point in time or over time — with the remainder deferred (IFRS-15 / ASC-606).**

## Standards
- IFRS-15
- ASC-606
