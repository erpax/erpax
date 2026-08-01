---
name: inventory
description: "Use when reasoning about agent/inventory — agent inventory scan, emit, and monitor for stale or duplicate agents."
atomPath: "agent/inventory"
coordinate: "agent/inventory · 4/weave · 99d14027"
contentUuid: "8a77cbcb-3bb2-58b8-a394-a06a371bf6dc"
diamondUuid: "b6ae1fc0-e7e9-8cfa-b931-078ac793ab79"
uuid: "99d14027-6577-8f72-a0c3-10396817d95e"
horo: 4
typography:
  partition: agent
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "6700079a-fd0c-8c1c-9bfa-56b1132d1f8d"
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
      stageUuid: "fd1e7418-fa4b-854d-af30-086c134a6782"
    - stage: seal
      stageUuid: "91b1b584-1019-82a9-97f0-802881dd19e3"
    - stage: uuid
      stageUuid: "c3351684-7b3e-8d5b-81bd-d98c40106deb"
version: 2
---
# agent/inventory

Agent inventory scan, emit, and monitor for stale or duplicate agents.

**Law — [[law]]: agent/inventory composes under [[agent]] — content-addressed agent ledger, no hand-maintained roster.**

Matter-twin: `src/agent/inventory/index.ts`

Composes [[agent]] · [[monitor]] · [[seal]]
