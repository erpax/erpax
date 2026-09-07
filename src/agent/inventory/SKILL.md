---
name: inventory
description: "Use when reasoning about agent/inventory — agent inventory scan, emit, and monitor for stale or duplicate agents."
atomPath: "agent/inventory"
coordinate: "agent/inventory · 7/descent · 71d712ae"
contentUuid: "7415ef52-4871-5006-8d63-0444fc7b894f"
diamondUuid: "139e4973-ebcc-84e2-a9fc-0a1589c95c78"
uuid: "71d712ae-5fdd-8ee7-b612-b5b2c25c5147"
horo: 7
typography:
  partition: agent
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "18d30a1f-189d-88ea-9908-1af974ea32d2"
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
      stageUuid: "cdeb5eb1-433c-83dc-98a0-736847218b60"
    - stage: seal
      stageUuid: "2047f04e-7985-8bda-8d9a-5f2958913d93"
    - stage: uuid
      stageUuid: "cf40aca7-6172-89e8-9cf8-4c660ab73556"
version: 2
---
# agent/inventory

Agent inventory scan, emit, and monitor for stale or duplicate agents.

**Law — [[law]]: agent/inventory composes under [[agent]] — content-addressed agent ledger, no hand-maintained roster.**

Matter-twin: `src/agent/inventory/index.ts`

Composes [[agent]] · [[monitor]] · [[seal]]
