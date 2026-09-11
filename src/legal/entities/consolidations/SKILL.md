---
name: consolidations
description: "Use when running or auditing a multi-entity group consolidation — entity closure readiness, intercompany balance reconciliation, elimination entry preparation, and consolidation workflow per IFRS-10 / IAS-27 / ASC-810. The group-consolidation process collection."
atomPath: "legal/entities/consolidations"
coordinate: "legal/entities/consolidations · 5/round · 7dde5066"
contentUuid: "5a0dbe7f-1cd8-549c-8a1c-ff5b31e477d9"
diamondUuid: "375d1a0f-82a2-8ca2-904f-81156e52e4a3"
uuid: "7dde5066-e7da-8bdf-84d0-694f689bfeca"
horo: 5
typography:
  partition: legal
  bondDegree: 19
standards:
  - "IAS-27 separate-financial-statements"
  - "IFRS-10 consolidated-financial-statements"
  - "US-GAAP ASC-810 consolidation"
bindings: []
signatures:
  computationUuid: "0790166d-c6c0-8b66-89c3-8d32cf4cebce"
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
      stageUuid: "4cc6ab27-a06c-8bb0-ab02-3b5ec7d1a8df"
    - stage: seal
      stageUuid: "80374fbf-39a0-80c0-8d9b-2c05ac4d04c5"
    - stage: uuid
      stageUuid: "1f6f0636-f504-81e3-859e-efa5e91ec00d"
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
