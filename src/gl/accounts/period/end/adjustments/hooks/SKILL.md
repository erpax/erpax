---
name: hooks
description: Use when reasoning about hooks — The adjustment child carries the matter; this is the address a collection imports.
atomPath: "gl/accounts/period/end/adjustments/hooks"
coordinate: "gl/accounts/period/end/adjustments/hooks · 9/unity · 48e139dd"
contentUuid: "1b304be4-7784-5e77-a83c-6c21240204c5"
diamondUuid: "cb44c16e-5644-8f57-bca4-0c685a73e9b5"
uuid: "48e139dd-2154-820f-868c-f4463efabe31"
horo: 9
typography:
  partition: gl
  bondDegree: 333
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "31919efe-085f-8bd3-a9b0-2cd78ea91a84"
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
      stageUuid: "3dd7dd10-b113-8232-9cf5-b570799a6fe3"
    - stage: seal
      stageUuid: "186e42ba-a70d-853a-8dab-0a51c36484be"
    - stage: uuid
      stageUuid: "1c880bf2-3e8c-8dcf-9d60-7bd31cb60d3a"
version: 2
---
# gl/accounts/period/end/adjustments/hooks — the period-end adjustment's hooks, behind one entry point

The adjustment child carries the matter; this is the address a collection imports. The posting path
here is the one whose swallowed error once marked an adjustment `posted` with no journal entry behind
it ([[rules]]/cycle) — a hook that catches and returns normally reports success for work that did not
happen.

Composes: [[law]].
