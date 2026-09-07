---
name: revenue
description: "Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral."
atomPath: revenue
coordinate: "revenue · 2/share · c8fbad82"
contentUuid: "21b2b98c-4491-5c8d-93ff-b7a34c5db124"
diamondUuid: "e7b9e8ad-d84e-8e0d-9ea6-880e0da44e33"
uuid: "c8fbad82-7d05-805d-8c49-0e917e6cf0ea"
horo: 2
typography:
  partition: revenue
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "9a6e0adb-49ca-80bd-925e-d64a292540fe"
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
      stageUuid: "e28b6e7d-14a3-85e2-8f73-9dbba786740c"
    - stage: seal
      stageUuid: "105ac0e6-07e0-8434-a4aa-f04fc8308ab1"
    - stage: uuid
      stageUuid: "e08188d7-e41f-8dbb-b069-a2d6edc89c1a"
version: 2
---
# revenue

Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral.

Composes: [[customers/contracts/performance/obligations]] · [[Invoices]] · [[Contracts]] · [[accounting]] · [[currency]] · [[deferredrevenue]].

**Law — [[law]]: revenue recognises only as performance obligations are satisfied — at a point in time or over time — with the remainder deferred (IFRS-15 / ASC-606).**

## Standards
- IFRS-15
- ASC-606
