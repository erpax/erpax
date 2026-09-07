---
name: hooks
description: Use when reasoning about hooks — The adjustment child carries the matter; this is the address a collection imports.
atomPath: "gl/accounts/period/end/adjustments/hooks"
coordinate: "gl/accounts/period/end/adjustments/hooks · 3/3 · 11a902eb"
contentUuid: "ace46c66-b47f-551b-aaf1-dd520be8a173"
diamondUuid: "5bed992e-0591-8a75-bd51-f76bf4bbcddb"
uuid: "11a902eb-2421-891f-819c-c266c639a138"
horo: 3
typography:
  partition: gl
  bondDegree: 312
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "ac06063c-e02b-8387-a845-401966db5912"
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
      stageUuid: "9da27bfc-ad9a-81b7-9e40-50073771e2e1"
    - stage: seal
      stageUuid: "186e42ba-a70d-853a-8dab-0a51c36484be"
    - stage: uuid
      stageUuid: "230bd3a0-8c53-8599-a837-fb4322e6bf6a"
version: 2
---
# gl/accounts/period/end/adjustments/hooks — the period-end adjustment's hooks, behind one entry point

The adjustment child carries the matter; this is the address a collection imports. The posting path
here is the one whose swallowed error once marked an adjustment `posted` with no journal entry behind
it ([[rules]]/cycle) — a hook that catches and returns normally reports success for work that did not
happen.

Composes: [[law]].
