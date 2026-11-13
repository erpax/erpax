---
name: legal
description: "Use when reasoning about legal — Use for the legal agent and its conflict-of-interest check — the matter-side agent plus the guard that must run before it acts."
atomPath: "agents/registered/legal"
coordinate: "agents/registered/legal · 8/crest · 0fd257ae"
contentUuid: "0fabb6d1-1012-5d30-9982-1b57fba4fa64"
diamondUuid: "aeecf1c9-a46b-8d91-a1aa-0aaf065fcd98"
uuid: "0fd257ae-0f0f-8069-9b64-143a85a8a8a2"
horo: 8
typography:
  partition: agents
  bondDegree: 40
standards:
  - "EU-2016/679"
  - "ISO-19011"
  - eIDAS
bindings: []
signatures:
  computationUuid: "cb2f562d-edd7-8567-af99-8b9bed7147da"
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
      stageUuid: "6349e685-fdd0-828e-92a4-b9e571040a8b"
    - stage: seal
      stageUuid: "4545161f-d79b-8734-95ef-db88ab0b4076"
    - stage: uuid
      stageUuid: "fdda3a7c-23c0-8a5a-8058-6f74ffa88353"
version: 2
---
# legal

The legal agent and the check that gates it. `agent` owns legal matters; `conflict` is the conflict-of-interest determination, and it lives beside the agent because it is a **precondition** of acting, not an afterthought — an agent that acts before clearing a conflict has already done the harm.

Composes: [[law]].
