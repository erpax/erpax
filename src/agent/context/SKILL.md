---
name: context
description: Use when reasoning about context — createAgentContext — the ONE place an AgentContext is assembled.
atomPath: "agent/context"
coordinate: "agent/context · 7/descent · 757bdcfe"
contentUuid: "9df3c5d7-8a71-5f7c-a1bb-abcbe023c7d0"
diamondUuid: "1dfc1eeb-8829-8128-a831-37ad17a5ddad"
uuid: "757bdcfe-2726-8c9f-aabd-ba6ec945b687"
horo: 7
typography:
  partition: agent
  bondDegree: 29
standards:
  - "ISO/IEC 12207 software-life-cycle (one substrate seam)"
  - "ISO/IEC 25010:2023 §5.4 reusability (single-source-of-truth context)"
  - "ISO/IEC-12207"
  - "ISO/IEC-25010"
bindings: []
signatures:
  computationUuid: "ced82ce1-534d-8a9c-9920-a36dc843d484"
  stages:
    - stage: path
      stageUuid: "8b3c709d-b6e0-88ca-8c52-b574922b2ff0"
    - stage: trinity
      stageUuid: "8f99629c-9a72-8fde-b628-066b49ff9d71"
    - stage: boundary
      stageUuid: "571472f3-1370-8a0d-a6ba-cb34d182e0aa"
    - stage: links
      stageUuid: "01837e2d-4a3a-8606-a8d3-7945994c06e3"
    - stage: horo
      stageUuid: "2fb217ac-d0fa-8c45-9c59-b82402875d90"
    - stage: seal
      stageUuid: "313862e8-b468-8239-8ebc-3180fbef7352"
    - stage: uuid
      stageUuid: "7b3a125f-01ad-8732-8a80-955a458f781c"
version: 2
---
# agent/context

createAgentContext — the ONE place an AgentContext is assembled.

Extracted from `agent/context.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
