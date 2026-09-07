---
name: inventory
description: "Use when reasoning about agent/inventory — agent inventory scan, emit, and monitor for stale or duplicate agents."
atomPath: "agent/inventory"
coordinate: "agent/inventory · 7/descent · c40beb9f"
contentUuid: "25d5f634-9d32-5ecb-8e84-de26fff68037"
diamondUuid: "3367202d-dbb9-8082-a08c-ebdc859ce145"
uuid: "c40beb9f-5c1d-86b2-9ca8-6aac9a6b595e"
horo: 7
typography:
  partition: agent
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "ae2e880f-4ea6-8efd-8010-f4ddba243ba7"
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
      stageUuid: "39553946-98ed-8745-b8d6-147bdd6f3695"
    - stage: seal
      stageUuid: "2047f04e-7985-8bda-8d9a-5f2958913d93"
    - stage: uuid
      stageUuid: "8ac024c2-95da-8086-9338-552669cc7327"
version: 2
---
# agent/inventory

Agent inventory scan, emit, and monitor for stale or duplicate agents.

**Law — [[law]]: agent/inventory composes under [[agent]] — content-addressed agent ledger, no hand-maintained roster.**

Matter-twin: `src/agent/inventory/index.ts`

Composes [[agent]] · [[monitor]] · [[seal]]
