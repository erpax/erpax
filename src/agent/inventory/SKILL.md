---
name: inventory
description: "Use when reasoning about agent/inventory — agent inventory scan, emit, and monitor for stale or duplicate agents."
atomPath: "agent/inventory"
coordinate: "agent/inventory · 1/base · 0e1b1db8"
contentUuid: "cadafd81-109d-58ec-9866-baa7bd9ff72b"
diamondUuid: "c1b72307-e2e6-8c48-ba7b-bf880ca5a8da"
uuid: "0e1b1db8-caa2-8d5d-a661-042486e86639"
horo: 1
typography:
  partition: agent
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "abbcc161-4191-8b52-b821-45d36cff9082"
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
      stageUuid: "43d6e862-3aad-8d82-bdac-a16c4187b166"
    - stage: seal
      stageUuid: "2047f04e-7985-8bda-8d9a-5f2958913d93"
    - stage: uuid
      stageUuid: "c2d48f06-021b-8329-825b-e6c3f69d06f9"
version: 2
---
# agent/inventory

Agent inventory scan, emit, and monitor for stale or duplicate agents.

**Law — [[law]]: agent/inventory composes under [[agent]] — content-addressed agent ledger, no hand-maintained roster.**

Matter-twin: `src/agent/inventory/index.ts`

Composes [[agent]] · [[monitor]] · [[seal]]
