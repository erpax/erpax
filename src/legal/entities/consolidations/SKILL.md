---
name: consolidations
description: "Use when running or auditing a multi-entity group consolidation — entity closure readiness, intercompany balance reconciliation, elimination entry preparation, and consolidation workflow per IFRS-10 / IAS-27 / ASC-810. The group-consolidation process collection."
atomPath: legal/entities/consolidations
coordinate: legal/entities/consolidations · 5/round · a610cef7
contentUuid: "71e48e94-e1fd-571f-a029-f983e96b3737"
diamondUuid: "c4bdf077-4886-88e2-b8f0-03d2e423196e"
uuid: "a610cef7-4ac0-8275-a08f-b144507150b8"
horo: 5
bonds:
  in:
    - consolidation
    - elimination
    - entities
    - goodwill
    - law
    - relatedparty
  out:
    - consolidation
    - elimination
    - entities
    - goodwill
    - law
    - relatedparty
typography:
  partition: legal
  bondDegree: 0
  neighbors: []
standards:
  - "IAS-27 separate-financial-statements"
  - "IFRS-10 consolidated-financial-statements"
  - "US-GAAP ASC-810 consolidation"
bindings: []
neighbors:
  wikilink:
    - entities
    - law
  matrix:
    - consolidation
    - elimination
    - entities
    - goodwill
    - law
    - relatedparty
  backlinks:
    - consolidation
    - elimination
    - entities
    - goodwill
    - law
    - relatedparty
signatures:
  computationUuid: "977f6688-dda1-8496-ae1d-745e847a817a"
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
      stageUuid: "484ecae3-47c7-8a88-908d-4bf42c896a1d"
    - stage: seal
      stageUuid: "00f0dbe9-7cf2-8b20-9f39-defe45db3774"
    - stage: uuid
      stageUuid: "0c75dc86-19b8-81d7-827a-90f5ee29fcc2"
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
