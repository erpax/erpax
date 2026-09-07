---
name: consolidations
description: "Use when running or auditing a multi-entity group consolidation — entity closure readiness, intercompany balance reconciliation, elimination entry preparation, and consolidation workflow per IFRS-10 / IAS-27 / ASC-810. The group-consolidation process collection."
atomPath: "legal/entities/consolidations"
coordinate: "legal/entities/consolidations · 7/descent · d595b951"
contentUuid: "e28acf28-4c24-550b-ba41-e9c13b9998da"
diamondUuid: "b989fd6e-bb32-8132-8296-b6a359299712"
uuid: "d595b951-84eb-8cd9-8ed0-6159b2cae6ce"
horo: 7
typography:
  partition: legal
  bondDegree: 19
standards:
  - "IAS-27 separate-financial-statements"
  - "IFRS-10 consolidated-financial-statements"
  - "US-GAAP ASC-810 consolidation"
bindings: []
signatures:
  computationUuid: "1853345b-a078-8b9c-b59e-427c4a8f9475"
  stages:
    - stage: path
      stageUuid: "981322d4-a858-86a3-8e3b-8912515070e7"
    - stage: trinity
      stageUuid: "0c14ad4a-2dbf-81c1-a3d2-ee4b48a0b676"
    - stage: boundary
      stageUuid: "0096992b-f50e-8085-a5c6-7bc7788f4414"
    - stage: links
      stageUuid: "11896191-723c-837c-90db-46de117ce476"
    - stage: horo
      stageUuid: "798b75e8-6d7e-873b-931e-984f7ad0e1ca"
    - stage: seal
      stageUuid: "80374fbf-39a0-80c0-8d9b-2c05ac4d04c5"
    - stage: uuid
      stageUuid: "80e6f265-6a01-8ac3-b9d5-81219119334a"
version: 2
---
# consolidations

Consolidations Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS-10 consolidated-financial-statements
- IAS-27 separate-financial-statements
- US-GAAP ASC-810 consolidation

Composes: [[legal/entities]].

**Law — [[law]]: a group consolidation only proceeds when every entity is closure-ready and intercompany balances reconcile — eliminations net the inside-the-group flows to zero, so the consolidated whole is the sum of entities minus what they owe each other, not a raw addition.**
