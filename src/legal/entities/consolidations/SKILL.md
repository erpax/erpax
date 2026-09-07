---
name: consolidations
description: "Use when running or auditing a multi-entity group consolidation — entity closure readiness, intercompany balance reconciliation, elimination entry preparation, and consolidation workflow per IFRS-10 / IAS-27 / ASC-810. The group-consolidation process collection."
atomPath: "legal/entities/consolidations"
coordinate: "legal/entities/consolidations · 2/share · 22c11528"
contentUuid: "70350bb3-e14c-5f93-9c86-3c265fad09a4"
diamondUuid: "ecd9dc8c-cc94-8395-a263-f6da2269cd87"
uuid: "22c11528-7d04-84ab-bb26-654866029be8"
horo: 2
typography:
  partition: legal
  bondDegree: 19
standards:
  - "IAS-27 separate-financial-statements"
  - "IFRS-10 consolidated-financial-statements"
  - "US-GAAP ASC-810 consolidation"
bindings: []
signatures:
  computationUuid: "93750d5d-0e4b-8991-a9dd-bd8ee1aea3ee"
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
      stageUuid: "01cf7308-fe2d-8be5-b593-e972dfa67147"
    - stage: seal
      stageUuid: "80374fbf-39a0-80c0-8d9b-2c05ac4d04c5"
    - stage: uuid
      stageUuid: "81f0ca8d-185c-8d63-89a0-ea31cb509b19"
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
