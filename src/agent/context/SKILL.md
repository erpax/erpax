---
name: context
description: Use when reasoning about context — createAgentContext — the ONE place an AgentContext is assembled.
atomPath: "agent/context"
coordinate: "agent/context · 7/descent · 109509fc"
contentUuid: "2dc2d590-8224-53dd-8dc2-99d93e436996"
diamondUuid: "e1d88e0d-146d-8f1c-8248-7072e9f95a67"
uuid: "109509fc-2515-8d76-9d24-a9016478fdd5"
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
  computationUuid: "c6896b63-e8e2-8f84-aaf8-485314c883a6"
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
      stageUuid: "f8ba07c2-8870-8b5d-81ba-e74aca6aca21"
    - stage: seal
      stageUuid: "313862e8-b468-8239-8ebc-3180fbef7352"
    - stage: uuid
      stageUuid: "31ea15a7-2a9a-87b4-95e5-ce98994c911a"
version: 2
---
# agent/context

createAgentContext — the ONE place an AgentContext is assembled.

Extracted from `agent/context.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
