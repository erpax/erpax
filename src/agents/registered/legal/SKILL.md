---
name: legal
description: "Use when reasoning about legal — Use for the legal agent and its conflict-of-interest check — the matter-side agent plus the guard that must run before it acts."
atomPath: "agents/registered/legal"
coordinate: "agents/registered/legal · 8/crest · 86cfe55d"
contentUuid: "e166069d-2767-5ca0-9169-14202228280d"
diamondUuid: "c874925f-7f04-8fb9-ac3d-2c2640c5b31c"
uuid: "86cfe55d-c2c3-8917-a4a5-9a573625564e"
horo: 8
typography:
  partition: agents
  bondDegree: 63
standards:
  - "EU-2016/679"
  - "ISO-19011"
  - eIDAS
bindings: []
signatures:
  computationUuid: "f5adbc07-2052-876c-be66-c670bc2cd61b"
  stages:
    - stage: path
      stageUuid: "8ac30a94-238b-8efd-b730-17fc5bd9f10b"
    - stage: trinity
      stageUuid: "8be2984f-d013-8049-8173-0c01d5835694"
    - stage: boundary
      stageUuid: "f54331e5-d9a2-8a7e-8e29-6f4016fc89ff"
    - stage: links
      stageUuid: "2881da25-c22a-8015-8f8d-586e182fc2ca"
    - stage: horo
      stageUuid: "e3f18cfb-1b11-8394-93b5-1f2b41d37a65"
    - stage: seal
      stageUuid: "4545161f-d79b-8734-95ef-db88ab0b4076"
    - stage: uuid
      stageUuid: "0b96dc1f-c8b3-84f8-a7b0-e68124826a20"
version: 2
---
# legal

The legal agent and the check that gates it. `agent` owns legal matters; `conflict` is the conflict-of-interest determination, and it lives beside the agent because it is a **precondition** of acting, not an afterthought — an agent that acts before clearing a conflict has already done the harm.

Composes: [[law]].
