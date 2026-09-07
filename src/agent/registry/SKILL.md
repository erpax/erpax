---
name: registry
description: "Use when reasoning about registry — In-memory AgentRegistry — single source of truth for the A-vortex."
atomPath: "agent/registry"
coordinate: "agent/registry · 8/crest · 5df467e5"
contentUuid: "8f8122d9-5a67-5bf1-96ec-9e248cc887d3"
diamondUuid: "4f6383b5-0c7a-828b-8af7-25bdc23292f4"
uuid: "5df467e5-05eb-8c3d-befc-2b0533cb64a7"
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
  computationUuid: "6cf72b21-ec87-8c8d-94bc-eb35e3d62f37"
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
      stageUuid: "28fcee52-9cde-8317-b8a7-a5f99efb8930"
    - stage: seal
      stageUuid: "fb168a6c-d86e-843f-a3ae-f4b4c0735eda"
    - stage: uuid
      stageUuid: "2954d493-c54a-8333-bada-a4d32c849bc8"
version: 2
---
# agent/registry

In-memory AgentRegistry — single source of truth for the A-vortex.

Extracted from `agent/registry.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
