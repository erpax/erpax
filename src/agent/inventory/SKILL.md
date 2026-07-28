---
name: inventory
description: "Use when reasoning about agent/inventory — agent inventory scan, emit, and monitor for stale or duplicate agents."
atomPath: "agent/inventory"
coordinate: "agent/inventory · 5/round · aff3db23"
contentUuid: "9b1262bd-d937-5231-846c-8c964c06a7cd"
diamondUuid: "5d9a5617-0117-80ae-85fd-e30e37879752"
uuid: "aff3db23-01ec-8db8-b8a5-0274b33eefe6"
horo: 5
bonds:
  in:
    - agent
    - automate
    - law
    - level
    - monitor
    - movement
    - seal
  out:
    - agent
    - automate
    - law
    - level
    - monitor
    - movement
    - seal
typography:
  partition: agent
  bondDegree: 0
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agent
    - law
    - monitor
    - seal
  matrix:
    - agent
    - automate
    - law
    - level
    - monitor
    - movement
    - seal
  backlinks:
    - agent
    - automate
    - law
    - level
    - monitor
    - movement
    - seal
signatures:
  computationUuid: "d98c3ff7-59fd-87e5-a0d5-56fe66689f28"
  stages:
    - stage: path
      stageUuid: "46dffa67-13c0-822e-a579-03e148c3349a"
    - stage: trinity
      stageUuid: "0fea4688-b8ec-8b2e-96fb-c98fa31abc2a"
    - stage: boundary
      stageUuid: "2061352f-46ce-8884-a140-29ca9a0a0d55"
    - stage: links
      stageUuid: "6289522b-af65-8f35-bab0-c59e4b1584dc"
    - stage: horo
      stageUuid: "3bffa8fd-6a79-866e-9e0a-08e259fef0bc"
    - stage: seal
      stageUuid: "91b1b584-1019-82a9-97f0-802881dd19e3"
    - stage: uuid
      stageUuid: "ea11f6b3-3d10-869d-b26f-969c72a4dc46"
version: 2
---
# agent/inventory

Agent inventory scan, emit, and monitor for stale or duplicate agents.

**Law — [[law]]: agent/inventory composes under [[agent]] — content-addressed agent ledger, no hand-maintained roster.**

Matter-twin: `src/agent/inventory/index.ts`

Composes [[agent]] · [[monitor]] · [[seal]]
