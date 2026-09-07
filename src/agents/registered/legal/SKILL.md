---
name: legal
description: "Use when reasoning about legal — Use for the legal agent and its conflict-of-interest check — the matter-side agent plus the guard that must run before it acts."
atomPath: "agents/registered/legal"
coordinate: "agents/registered/legal · 2/share · 4a829e5d"
contentUuid: "27a9c98b-42f3-59cf-84ad-8ea228464cdf"
diamondUuid: "2a443413-367b-8298-b08e-210edd2848de"
uuid: "4a829e5d-e865-8393-8773-5e2a0a18198c"
horo: 2
typography:
  partition: agents
  bondDegree: 63
standards:
  - "EU-2016/679"
  - "ISO-19011"
  - eIDAS
bindings: []
signatures:
  computationUuid: "8b4bb9f8-3a8c-8e10-b2ca-f8c63fefe7a8"
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
      stageUuid: "0c3b2ae1-2568-8806-a806-df9d64503930"
    - stage: seal
      stageUuid: "4545161f-d79b-8734-95ef-db88ab0b4076"
    - stage: uuid
      stageUuid: "596dbcbf-9981-80bf-bfe0-c25c25cd943d"
version: 2
---
# legal

The legal agent and the check that gates it. `agent` owns legal matters; `conflict` is the conflict-of-interest determination, and it lives beside the agent because it is a **precondition** of acting, not an afterthought — an agent that acts before clearing a conflict has already done the harm.

Composes: [[law]].
