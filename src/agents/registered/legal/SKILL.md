---
name: legal
description: "Use when reasoning about legal — Use for the legal agent and its conflict-of-interest check — the matter-side agent plus the guard that must run before it acts."
atomPath: "agents/registered/legal"
coordinate: "agents/registered/legal · 8/crest · 0fd257ae"
contentUuid: "c2f40cc2-679e-5fb3-9e77-9a58f8a18258"
diamondUuid: "7dffbe88-6807-8e55-89a5-278f5aa35845"
uuid: "0fd257ae-0f0f-8069-9b64-143a85a8a8a2"
horo: 8
typography:
  partition: agents
  bondDegree: 56
standards:
  - "EU-2016/679"
  - "ISO-19011"
  - eIDAS
bindings: []
signatures:
  computationUuid: "420cc2c4-bdcc-8df6-b802-5b6266a1f352"
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
      stageUuid: "86faaa62-3c3f-8fea-b92e-b6591c3786fc"
    - stage: seal
      stageUuid: "4545161f-d79b-8734-95ef-db88ab0b4076"
    - stage: uuid
      stageUuid: "9b6587b0-63f3-8a05-966a-243a716b6daf"
version: 2
---
# legal

The legal agent and the check that gates it. `agent` owns legal matters; `conflict` is the conflict-of-interest determination, and it lives beside the agent because it is a **precondition** of acting, not an afterthought — an agent that acts before clearing a conflict has already done the harm.

Composes: [[law]].
