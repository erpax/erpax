---
name: context
description: Use when reasoning about context — createAgentContext — the ONE place an AgentContext is assembled.
atomPath: "agent/context"
coordinate: "agent/context · 5/round · 035d9269"
contentUuid: "1367ed73-7342-5e92-a9d8-f08de693336c"
diamondUuid: "8f939a48-c064-8b09-a76d-02d1c29ba433"
uuid: "035d9269-a82f-88fe-8547-66911eb3a5b8"
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
  computationUuid: "88449e0e-691d-89b9-8047-e7f1a48c7852"
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
      stageUuid: "4cc31071-f966-876a-bdf9-64f06c2b302f"
    - stage: seal
      stageUuid: "313862e8-b468-8239-8ebc-3180fbef7352"
    - stage: uuid
      stageUuid: "5f37c056-4e94-8efc-a18b-1b44be4689c9"
version: 2
---
# agent/context

createAgentContext — the ONE place an AgentContext is assembled.

Extracted from `agent/context.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
