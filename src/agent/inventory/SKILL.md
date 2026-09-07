---
name: inventory
description: "Use when reasoning about agent/inventory — agent inventory scan, emit, and monitor for stale or duplicate agents."
atomPath: "agent/inventory"
coordinate: "agent/inventory · 1/base · 3d12eb0f"
contentUuid: "55300952-61bf-544b-b785-291e217bb61c"
diamondUuid: "bd7696f4-15c3-8758-b7f3-efa1ae10512b"
uuid: "3d12eb0f-ad89-8465-8b36-d560e08a5020"
horo: 1
typography:
  partition: agent
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "9ca252eb-c455-8f91-9c17-216471041419"
  stages:
    - stage: path
      stageUuid: "46dffa67-13c0-822e-a579-03e148c3349a"
    - stage: trinity
      stageUuid: "0fea4688-b8ec-8b2e-96fb-c98fa31abc2a"
    - stage: boundary
      stageUuid: "8d867cf4-fa11-8df6-b28e-60488a08c1f6"
    - stage: links
      stageUuid: "6289522b-af65-8f35-bab0-c59e4b1584dc"
    - stage: horo
      stageUuid: "b8820595-3cc4-8563-b277-e168ea450268"
    - stage: seal
      stageUuid: "2047f04e-7985-8bda-8d9a-5f2958913d93"
    - stage: uuid
      stageUuid: "72ef4e65-f487-877a-9bec-118bc2d6436a"
version: 2
---
# agent/inventory

Agent inventory scan, emit, and monitor for stale or duplicate agents.

**Law — [[law]]: agent/inventory composes under [[agent]] — content-addressed agent ledger, no hand-maintained roster.**

Matter-twin: `src/agent/inventory/index.ts`

Composes [[agent]] · [[monitor]] · [[seal]]
