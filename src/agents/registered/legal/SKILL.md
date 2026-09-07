---
name: legal
description: "Use when reasoning about legal — Use for the legal agent and its conflict-of-interest check — the matter-side agent plus the guard that must run before it acts."
atomPath: "agents/registered/legal"
coordinate: "agents/registered/legal · 1/base · 5ce77b2e"
contentUuid: "e4ff8f4b-ce9b-545c-8a9b-d6167dbe977e"
diamondUuid: "23c34e56-58ae-8dd2-8d42-0f03ef060c1d"
uuid: "5ce77b2e-128b-8d90-be9f-9dfe34ce0886"
horo: 1
typography:
  partition: agents
  bondDegree: 63
standards:
  - "EU-2016/679"
  - "ISO-19011"
  - eIDAS
bindings: []
signatures:
  computationUuid: "83d82225-07ba-849c-99a4-987e8b2c4633"
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
      stageUuid: "0be04193-1c41-8212-b543-f843918eacd8"
    - stage: seal
      stageUuid: "4545161f-d79b-8734-95ef-db88ab0b4076"
    - stage: uuid
      stageUuid: "9af95729-f9d0-813d-9ad4-a899a0d1c856"
version: 2
---
# legal

The legal agent and the check that gates it. `agent` owns legal matters; `conflict` is the conflict-of-interest determination, and it lives beside the agent because it is a **precondition** of acting, not an afterthought — an agent that acts before clearing a conflict has already done the harm.

Composes: [[law]].
