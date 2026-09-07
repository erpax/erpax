---
name: hooks
description: Use when reasoning about hooks — The adjustment child carries the matter; this is the address a collection imports.
atomPath: "gl/accounts/period/end/adjustments/hooks"
coordinate: "gl/accounts/period/end/adjustments/hooks · 6/6 · 230f7b1a"
contentUuid: "083e1897-df91-53a7-b34b-54e510798acf"
diamondUuid: "3c78e78c-1ea5-855e-ba63-121520d241d3"
uuid: "230f7b1a-4b2f-8c17-9f72-10c84aafacce"
horo: 6
typography:
  partition: gl
  bondDegree: 348
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "5ba19c5f-2ec7-8a33-9dfe-71278351a93f"
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
      stageUuid: "4abaa06f-7964-8bee-a6e4-e7f32e7b79af"
    - stage: seal
      stageUuid: "186e42ba-a70d-853a-8dab-0a51c36484be"
    - stage: uuid
      stageUuid: "6158e7fc-624b-81a2-8cfc-fababc4ec9d1"
version: 2
---
# gl/accounts/period/end/adjustments/hooks — the period-end adjustment's hooks, behind one entry point

The adjustment child carries the matter; this is the address a collection imports. The posting path
here is the one whose swallowed error once marked an adjustment `posted` with no journal entry behind
it ([[rules]]/cycle) — a hook that catches and returns normally reports success for work that did not
happen.

Composes: [[law]].
