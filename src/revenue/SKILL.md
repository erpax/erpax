---
name: revenue
description: "Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral."
atomPath: revenue
coordinate: "revenue · 8/crest · de428ab8"
contentUuid: "43aa74fa-98f3-59f1-8ad2-65df66a24bf2"
diamondUuid: "ea934148-d9ae-8ff0-9cee-04d539d53d0d"
uuid: "de428ab8-0dc1-85f4-a810-1820c81c4d5f"
horo: 8
typography:
  partition: revenue
  bondDegree: 42
standards: []
bindings: []
signatures:
  computationUuid: "f841b5a7-54fa-81e4-83b2-5c99f60050e9"
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
      stageUuid: "8c8b50d3-ecfe-84e1-99f9-0838b8f944b5"
    - stage: seal
      stageUuid: "105ac0e6-07e0-8434-a4aa-f04fc8308ab1"
    - stage: uuid
      stageUuid: "019ae5b1-6ce8-895e-af4d-fbd6a6d71c37"
version: 2
---
# revenue

Use when applying IFRS-15 / ASC-606 revenue recognition logic — performance obligations, contract modification, timing (at-a-point vs. over-time), deferral.

Composes: [[customers/contracts/performance/obligations]] · [[Invoices]] · [[Contracts]] · [[accounting]] · [[currency]] · [[deferredrevenue]].

**Law — [[law]]: revenue recognises only as performance obligations are satisfied — at a point in time or over time — with the remainder deferred (IFRS-15 / ASC-606).**

## Standards
- IFRS-15
- ASC-606
