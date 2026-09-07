---
name: registry
description: "Use when reasoning about registry — In-memory AgentRegistry — single source of truth for the A-vortex."
atomPath: "agent/registry"
coordinate: "agent/registry · 4/weave · bfa64423"
contentUuid: "d78e6793-93ae-532a-86fa-d97da217060e"
diamondUuid: "f9f46f63-b217-8afd-a955-05c6d1d967e1"
uuid: "bfa64423-ebfb-83b8-af33-e202d581e1ae"
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
  computationUuid: "40b5ec54-52d1-88e5-8f59-c0921c5fe254"
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
      stageUuid: "3ad5eeb4-05a8-8a8e-91f5-a5d958775d1e"
    - stage: seal
      stageUuid: "fb168a6c-d86e-843f-a3ae-f4b4c0735eda"
    - stage: uuid
      stageUuid: "e56065ce-f8c2-89e2-bbf9-89b5fed0cbfe"
version: 2
---
# agent/registry

In-memory AgentRegistry — single source of truth for the A-vortex.

Extracted from `agent/registry.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[agent]].
