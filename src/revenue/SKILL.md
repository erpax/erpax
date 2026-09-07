---
name: revenue
description: "Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral."
atomPath: revenue
coordinate: "revenue · 8/crest · c2e92f3d"
contentUuid: "0216a42f-476d-5dcf-9fa6-5fa3f72f34eb"
diamondUuid: "76256c10-5261-894b-874d-4ce857fcf578"
uuid: "c2e92f3d-2dee-8dfb-82ab-4a636dd03216"
horo: 8
typography:
  partition: revenue
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "fce725b1-64ea-8efe-aced-c896e1c777e6"
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
      stageUuid: "8ef07d1b-2818-877a-8bf8-0aecfab4bfec"
    - stage: seal
      stageUuid: "105ac0e6-07e0-8434-a4aa-f04fc8308ab1"
    - stage: uuid
      stageUuid: "0468e453-b712-8f0f-b099-f87efd65c89a"
version: 2
---
# revenue

Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral.

Composes: [[customers/contracts/performance/obligations]] · [[Invoices]] · [[Contracts]] · [[accounting]] · [[currency]] · [[deferredrevenue]].

**Law — [[law]]: revenue recognises only as performance obligations are satisfied — at a point in time or over time — with the remainder deferred (IFRS-15 / ASC-606).**

## Standards
- IFRS-15
- ASC-606
