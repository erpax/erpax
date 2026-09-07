---
name: hooks
description: Use when reasoning about hooks — The adjustment child carries the matter; this is the address a collection imports.
atomPath: "gl/accounts/period/end/adjustments/hooks"
coordinate: "gl/accounts/period/end/adjustments/hooks · 6/6 · 538f3524"
contentUuid: "89bb6f15-50f5-5c26-95f5-df7bafad5a83"
diamondUuid: "1b709983-83cc-83ce-a338-e439d1dda96d"
uuid: "538f3524-a5ad-8550-8bdd-25cd9a58f8f8"
horo: 6
typography:
  partition: gl
  bondDegree: 348
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "1a425cdd-4fc8-8c20-8e23-9292c71dbacf"
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
      stageUuid: "0a41b2b4-d06e-8e7b-a42c-20f2de65bd1f"
    - stage: seal
      stageUuid: "186e42ba-a70d-853a-8dab-0a51c36484be"
    - stage: uuid
      stageUuid: "8d3f9d0a-c3ae-8dd6-b23a-e1519bd80234"
version: 2
---
# gl/accounts/period/end/adjustments/hooks — the period-end adjustment's hooks, behind one entry point

The adjustment child carries the matter; this is the address a collection imports. The posting path
here is the one whose swallowed error once marked an adjustment `posted` with no journal entry behind
it ([[rules]]/cycle) — a hook that catches and returns normally reports success for work that did not
happen.

Composes: [[law]].
