---
name: registry
description: "Use when reasoning about registry — In-memory AgentRegistry — single source of truth for the A-vortex."
atomPath: "agent/registry"
coordinate: "agent/registry · 7/descent · d5957b42"
contentUuid: "f8cc14df-7dd5-5730-9050-317d7a10a070"
diamondUuid: "38cad48a-1c30-811d-a1bb-ce6fdf869237"
uuid: "d5957b42-7a7d-8308-862e-3061b00b43ae"
horo: 7
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
  computationUuid: "417c3244-7fff-8955-882e-99542c3cd611"
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
      stageUuid: "beabd6a9-9f6b-8042-a14f-be7ea985578e"
    - stage: seal
      stageUuid: "fb168a6c-d86e-843f-a3ae-f4b4c0735eda"
    - stage: uuid
      stageUuid: "9385c269-af2b-860c-95ca-8422ddbabd2f"
version: 2
---
# agent/registry

In-memory AgentRegistry — single source of truth for the A-vortex.

Extracted from `agent/registry.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
