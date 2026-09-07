---
name: hooks
description: Use when reasoning about hooks — The adjustment child carries the matter; this is the address a collection imports.
atomPath: "gl/accounts/period/end/adjustments/hooks"
coordinate: "gl/accounts/period/end/adjustments/hooks · 3/3 · d831ebc8"
contentUuid: "80066de4-a1cb-5f34-bfb6-0b35c8a0a77c"
diamondUuid: "b61369e8-7edd-8b6f-87b6-edf8b55f3de3"
uuid: "d831ebc8-d4f9-8d76-8c62-c27a212cd2df"
horo: 3
typography:
  partition: gl
  bondDegree: 348
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "fccf4cbf-7ee8-8385-80cf-1e6943ee7c5b"
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
      stageUuid: "36df26a4-400a-8f93-a8d7-6cd7459d4d68"
    - stage: seal
      stageUuid: "186e42ba-a70d-853a-8dab-0a51c36484be"
    - stage: uuid
      stageUuid: "a4f9b6d6-8ba5-8aaa-a45f-98e6649cd0a4"
version: 2
---
# gl/accounts/period/end/adjustments/hooks — the period-end adjustment's hooks, behind one entry point

The adjustment child carries the matter; this is the address a collection imports. The posting path
here is the one whose swallowed error once marked an adjustment `posted` with no journal entry behind
it ([[rules]]/cycle) — a hook that catches and returns normally reports success for work that did not
happen.

Composes: [[law]].
