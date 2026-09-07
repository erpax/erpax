---
name: registry
description: "Use when reasoning about registry — In-memory AgentRegistry — single source of truth for the A-vortex."
atomPath: "agent/registry"
coordinate: "agent/registry · 8/crest · e22a7138"
contentUuid: "46b85a53-f337-5023-9359-1ffc1dcfef5c"
diamondUuid: "b4b8bc96-1d1a-82fd-97c7-1487bc4be5fb"
uuid: "e22a7138-d62f-8596-8ea1-3f3e62705650"
horo: 8
typography:
  partition: agent
  bondDegree: 31
standards:
  - "ISO/IEC 12207 software-life-cycle (single-source-of-truth)"
  - "ISO/IEC 25010:2023 §5.4 reusability"
  - "ISO/IEC-12207"
  - "ISO/IEC-25010"
bindings: []
signatures:
  computationUuid: "c0ab57ce-9455-8748-b071-3dc6e68325dc"
  stages:
    - stage: path
      stageUuid: "457f2f8d-5971-8b74-a894-7b25dca68c23"
    - stage: trinity
      stageUuid: "e31850d8-ab63-8636-a28b-5d100814c081"
    - stage: boundary
      stageUuid: "3569cdf1-a84b-8252-b319-ae4773b1cafc"
    - stage: links
      stageUuid: "c4030012-e495-897d-af91-dc37e15efe4e"
    - stage: horo
      stageUuid: "1cfc0fae-8b8f-80c4-ba15-18533b3a16c0"
    - stage: seal
      stageUuid: "fb168a6c-d86e-843f-a3ae-f4b4c0735eda"
    - stage: uuid
      stageUuid: "568b8778-65d2-8137-83ec-1a6d3684054e"
version: 2
---
# agent/registry

In-memory AgentRegistry — single source of truth for the A-vortex.

Extracted from `agent/registry.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
