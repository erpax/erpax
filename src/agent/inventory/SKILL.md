---
name: inventory
description: "Use when reasoning about agent/inventory — agent inventory scan, emit, and monitor for stale or duplicate agents."
atomPath: "agent/inventory"
coordinate: "agent/inventory · 8/crest · c0b13b94"
contentUuid: "f8379d2c-0d47-54d6-9172-913c8213d252"
diamondUuid: "29b5a113-cf0e-8840-b04c-55456bcecddb"
uuid: "c0b13b94-df51-8579-b6d9-7616e29455df"
horo: 8
typography:
  partition: agent
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "42c8b858-c85c-83db-a8d1-b96ae0ad1684"
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
      stageUuid: "6e4718e2-f092-883d-83a1-b8c8905bbb54"
    - stage: seal
      stageUuid: "2047f04e-7985-8bda-8d9a-5f2958913d93"
    - stage: uuid
      stageUuid: "8e6e2fd9-e568-8ee0-bab3-646610a8f69b"
version: 2
---
# agent/inventory

Agent inventory scan, emit, and monitor for stale or duplicate agents.

**Law — [[law]]: agent/inventory composes under [[agent]] — content-addressed agent ledger, no hand-maintained roster.**

Matter-twin: `src/agent/inventory/index.ts`

Composes [[agent]] · [[monitor]] · [[seal]]
