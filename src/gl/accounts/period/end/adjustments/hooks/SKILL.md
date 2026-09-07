---
name: hooks
description: Use when reasoning about hooks — The adjustment child carries the matter; this is the address a collection imports.
atomPath: "gl/accounts/period/end/adjustments/hooks"
coordinate: "gl/accounts/period/end/adjustments/hooks · 3/3 · 3a86293e"
contentUuid: "37f41799-84b1-5e20-91da-7571577b55c7"
diamondUuid: "6075f399-7ff3-8f26-9ad4-ced5836e7537"
uuid: "3a86293e-0289-8e0e-95fb-471dd6458767"
horo: 3
typography:
  partition: gl
  bondDegree: 348
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "b94ed609-5a3a-8ef4-a057-472dfa0c0eb4"
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
      stageUuid: "bc919999-2a10-8178-9514-b10088dba3ac"
    - stage: seal
      stageUuid: "186e42ba-a70d-853a-8dab-0a51c36484be"
    - stage: uuid
      stageUuid: "1c93b08e-6f39-8311-9c20-51bbb1fa9272"
version: 2
---
# gl/accounts/period/end/adjustments/hooks — the period-end adjustment's hooks, behind one entry point

The adjustment child carries the matter; this is the address a collection imports. The posting path
here is the one whose swallowed error once marked an adjustment `posted` with no journal entry behind
it ([[rules]]/cycle) — a hook that catches and returns normally reports success for work that did not
happen.

Composes: [[law]].
