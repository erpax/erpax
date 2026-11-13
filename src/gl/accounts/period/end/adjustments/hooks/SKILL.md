---
name: hooks
description: Use when reasoning about hooks — The adjustment child carries the matter; this is the address a collection imports.
atomPath: "gl/accounts/period/end/adjustments/hooks"
coordinate: "gl/accounts/period/end/adjustments/hooks · 9/unity · 48e139dd"
contentUuid: "6a56302f-b1f4-5b7d-95e3-810215f2424e"
diamondUuid: "20f2bab4-9d65-8266-b429-44715d148e59"
uuid: "48e139dd-2154-820f-868c-f4463efabe31"
horo: 9
typography:
  partition: gl
  bondDegree: 288
standards:
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "fab98c1e-84c9-850e-924e-e3c33a513fa6"
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
      stageUuid: "6b3039e3-4449-85f2-b47b-a33c167b7dc7"
    - stage: seal
      stageUuid: "186e42ba-a70d-853a-8dab-0a51c36484be"
    - stage: uuid
      stageUuid: "03f31c3b-04e9-85b6-8637-c564ee57c156"
version: 2
---
# gl/accounts/period/end/adjustments/hooks — the period-end adjustment's hooks, behind one entry point

The adjustment child carries the matter; this is the address a collection imports. The posting path
here is the one whose swallowed error once marked an adjustment `posted` with no journal entry behind
it ([[rules]]/cycle) — a hook that catches and returns normally reports success for work that did not
happen.

Composes: [[law]].
