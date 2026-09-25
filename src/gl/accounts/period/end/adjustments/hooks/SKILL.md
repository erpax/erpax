---
name: hooks
description: Use when reasoning about hooks — The adjustment child carries the matter; this is the address a collection imports.
atomPath: "gl/accounts/period/end/adjustments/hooks"
coordinate: "gl/accounts/period/end/adjustments/hooks · 9/unity · 48e139dd"
contentUuid: "caa8badc-0a13-57f4-8460-c4d478dab49d"
diamondUuid: "52ad56b8-b8c4-8486-b89f-62b441eaf75e"
uuid: "48e139dd-2154-820f-868c-f4463efabe31"
horo: 9
typography:
  partition: gl
  bondDegree: 345
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "efe235f1-3a4c-81af-af76-6a26091b84e2"
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
      stageUuid: "94f0808f-8fc0-8bfa-a2aa-26530fbea711"
    - stage: seal
      stageUuid: "186e42ba-a70d-853a-8dab-0a51c36484be"
    - stage: uuid
      stageUuid: "ce17a021-53f8-8e54-b835-bdac46052fd4"
version: 2
---
# gl/accounts/period/end/adjustments/hooks — the period-end adjustment's hooks, behind one entry point

The adjustment child carries the matter; this is the address a collection imports. The posting path
here is the one whose swallowed error once marked an adjustment `posted` with no journal entry behind
it ([[rules]]/cycle) — a hook that catches and returns normally reports success for work that did not
happen.

Composes: [[law]].
