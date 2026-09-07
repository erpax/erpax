---
name: registry
description: "Use when reasoning about registry — In-memory AgentRegistry — single source of truth for the A-vortex."
atomPath: "agent/registry"
coordinate: "agent/registry · 4/weave · e42de20b"
contentUuid: "f8a0249a-fecc-5db4-9a80-6f2f5ec4cf95"
diamondUuid: "d043312e-b420-824f-8285-902098854b0e"
uuid: "e42de20b-7417-8c85-8d52-e191f2a84bfc"
horo: 4
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
  computationUuid: "943b753a-98ed-8691-bff4-bec11c6a80a6"
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
      stageUuid: "0ec8dbac-37e9-8999-a2dc-832addfb21c1"
    - stage: seal
      stageUuid: "fb168a6c-d86e-843f-a3ae-f4b4c0735eda"
    - stage: uuid
      stageUuid: "d3b9628d-c8f7-8cdd-b3b4-77c2e221fbe0"
version: 2
---
# agent/registry

In-memory AgentRegistry — single source of truth for the A-vortex.

Extracted from `agent/registry.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
