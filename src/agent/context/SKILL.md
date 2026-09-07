---
name: context
description: Use when reasoning about context — createAgentContext — the ONE place an AgentContext is assembled.
atomPath: "agent/context"
coordinate: "agent/context · 1/base · 36c1445c"
contentUuid: "786a5356-9ac5-588d-bc79-cd1266422bdc"
diamondUuid: "6f512228-12b6-8e27-9892-ca5bf093b6bf"
uuid: "36c1445c-8093-8fa4-8a7c-16e0e1be03b9"
horo: 1
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
  computationUuid: "0331ece0-3463-873f-b0dd-dabcaade0d83"
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
      stageUuid: "bf4cc978-c98e-864b-be48-f7d961983d13"
    - stage: seal
      stageUuid: "313862e8-b468-8239-8ebc-3180fbef7352"
    - stage: uuid
      stageUuid: "5a425df4-6c17-833d-bb57-e2bfc202fa41"
version: 2
---
# agent/context

createAgentContext — the ONE place an AgentContext is assembled.

Extracted from `agent/context.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
