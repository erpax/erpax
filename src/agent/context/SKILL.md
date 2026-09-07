---
name: context
description: Use when reasoning about context — createAgentContext — the ONE place an AgentContext is assembled.
atomPath: "agent/context"
coordinate: "agent/context · 5/round · a76c2aae"
contentUuid: "61b0cb8e-ae21-5fca-9415-57d5e69b2bd8"
diamondUuid: "cfd8e03f-5e36-86d7-b32f-1dc286b1ed5b"
uuid: "a76c2aae-a392-854e-b830-f73611d763b6"
horo: 5
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
  computationUuid: "a645f9a8-a047-8c28-9480-0b6949970d2d"
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
      stageUuid: "0ac65859-6691-881e-ad94-cbc8dd63f9e7"
    - stage: seal
      stageUuid: "313862e8-b468-8239-8ebc-3180fbef7352"
    - stage: uuid
      stageUuid: "1fd63432-5277-8da7-a1e4-bb3550ecc48f"
version: 2
---
# agent/context

createAgentContext — the ONE place an AgentContext is assembled.

Extracted from `agent/context.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
