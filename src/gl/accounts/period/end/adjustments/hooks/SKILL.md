---
name: hooks
description: Use when reasoning about hooks — The adjustment child carries the matter; this is the address a collection imports.
atomPath: "gl/accounts/period/end/adjustments/hooks"
coordinate: "gl/accounts/period/end/adjustments/hooks · 6/6 · 6bed7881"
contentUuid: "27bffbd3-4c8f-502e-93e9-a98c3a5d7533"
diamondUuid: "4b5c2e8f-36ed-8713-a210-4ce555b903be"
uuid: "6bed7881-df34-8818-9d5f-82fe87d38773"
horo: 6
typography:
  partition: gl
  bondDegree: 348
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "da1098c2-e243-8a4e-86b8-512f751d94d9"
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
      stageUuid: "0dcfdbe4-e6c5-85b0-8190-34d8bc09bc7c"
    - stage: seal
      stageUuid: "186e42ba-a70d-853a-8dab-0a51c36484be"
    - stage: uuid
      stageUuid: "72818298-46ad-8007-8049-60c9b349c273"
version: 2
---
# gl/accounts/period/end/adjustments/hooks — the period-end adjustment's hooks, behind one entry point

The adjustment child carries the matter; this is the address a collection imports. The posting path
here is the one whose swallowed error once marked an adjustment `posted` with no journal entry behind
it ([[rules]]/cycle) — a hook that catches and returns normally reports success for work that did not
happen.

Composes: [[law]].
