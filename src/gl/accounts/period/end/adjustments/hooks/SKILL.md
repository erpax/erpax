---
name: hooks
description: Use when reasoning about hooks — The adjustment child carries the matter; this is the address a collection imports.
atomPath: "gl/accounts/period/end/adjustments/hooks"
coordinate: "gl/accounts/period/end/adjustments/hooks · 6/6 · 27864635"
contentUuid: "e127fd70-f5e4-578b-998c-d16e100be3b9"
diamondUuid: "d7470833-be79-816a-8bd1-3d2b116d0ca2"
uuid: "27864635-98f0-86bc-807e-a06994700741"
horo: 6
typography:
  partition: gl
  bondDegree: 312
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "a4dcf78b-1056-85ff-b2ff-ed27eeb4f86a"
  stages:
    - stage: path
      stageUuid: "6530d7c8-3fcf-8b04-a796-830420feccfb"
    - stage: trinity
      stageUuid: "47e0909c-938b-8faa-8473-bdec8b37a885"
    - stage: boundary
      stageUuid: "8cb5c33b-611c-8880-9989-fa1711a81787"
    - stage: links
      stageUuid: "ea6e3882-a0d3-862f-9c0d-39ade88bb0c6"
    - stage: horo
      stageUuid: "dfe89f60-e618-8598-9536-73de2a1778bf"
    - stage: seal
      stageUuid: "186e42ba-a70d-853a-8dab-0a51c36484be"
    - stage: uuid
      stageUuid: "e9fa55b7-60cc-85d8-96f5-c99b8a9eee25"
version: 2
---
# gl/accounts/period/end/adjustments/hooks — the period-end adjustment's hooks, behind one entry point

The adjustment child carries the matter; this is the address a collection imports. The posting path
here is the one whose swallowed error once marked an adjustment `posted` with no journal entry behind
it ([[rules]]/cycle) — a hook that catches and returns normally reports success for work that did not
happen.

Composes: [[law]].
