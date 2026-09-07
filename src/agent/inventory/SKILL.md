---
name: inventory
description: "Use when reasoning about agent/inventory — agent inventory scan, emit, and monitor for stale or duplicate agents."
atomPath: "agent/inventory"
coordinate: "agent/inventory · 8/crest · b074127b"
contentUuid: "ea595614-9756-5998-a73b-bdb358571b9a"
diamondUuid: "f19dfad2-07a1-88f6-bba1-6f8f6549601a"
uuid: "b074127b-adec-8302-8117-40e2bfad1741"
horo: 8
typography:
  partition: agent
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "f1817cd4-af88-82d3-a370-8662871bc8b7"
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
      stageUuid: "1cf292c8-84e3-89fe-a124-ed823f0762d1"
    - stage: seal
      stageUuid: "2047f04e-7985-8bda-8d9a-5f2958913d93"
    - stage: uuid
      stageUuid: "65823ca8-d1d5-83a1-9c8c-b986d548b9b4"
version: 2
---
# agent/inventory

Agent inventory scan, emit, and monitor for stale or duplicate agents.

**Law — [[law]]: agent/inventory composes under [[agent]] — content-addressed agent ledger, no hand-maintained roster.**

Matter-twin: `src/agent/inventory/index.ts`

Composes [[agent]] · [[monitor]] · [[seal]]
