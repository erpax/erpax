---
name: hooks
description: Use when reasoning about hooks — The adjustment child carries the matter; this is the address a collection imports.
atomPath: "gl/accounts/period/end/adjustments/hooks"
coordinate: "gl/accounts/period/end/adjustments/hooks · 6/6 · a053d2a6"
contentUuid: "1eee47c0-ca0b-5452-a81a-e68ced88245f"
diamondUuid: "7fcdb2fd-f939-817a-be96-684379e4b623"
uuid: "a053d2a6-cb0e-8e61-88dd-2a749ebb021d"
horo: 6
typography:
  partition: gl
  bondDegree: 312
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "702638c4-5ff8-8f81-8184-4826432610c8"
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
      stageUuid: "22c643b8-782f-8b58-949f-e97d3deb0264"
    - stage: seal
      stageUuid: "186e42ba-a70d-853a-8dab-0a51c36484be"
    - stage: uuid
      stageUuid: "3eb948cf-4f12-8491-b614-9a64c2d9c864"
version: 2
---
# gl/accounts/period/end/adjustments/hooks — the period-end adjustment's hooks, behind one entry point

The adjustment child carries the matter; this is the address a collection imports. The posting path
here is the one whose swallowed error once marked an adjustment `posted` with no journal entry behind
it ([[rules]]/cycle) — a hook that catches and returns normally reports success for work that did not
happen.

Composes: [[law]].
