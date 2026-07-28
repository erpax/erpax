---
name: consolidations
description: "Use when running or auditing a multi-entity group consolidation — entity closure readiness, intercompany balance reconciliation, elimination entry preparation, and consolidation workflow per IFRS-10 / IAS-27 / ASC-810. The group-consolidation process collection."
atomPath: "legal/entities/consolidations"
coordinate: "legal/entities/consolidations · 2/share · 98276571"
contentUuid: "f72e164c-0f27-50a4-ba37-5c2e01fd1ec0"
diamondUuid: "e7cf5402-7dfd-845c-9210-e9ea863ab9be"
uuid: "98276571-3b96-8d04-baf7-16c509f75af8"
horo: 2
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
  computationUuid: "4ac64d64-272c-81ae-8902-b361d3096684"
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
      stageUuid: "d7b786e1-ed68-8a45-bc00-684188da7b81"
    - stage: seal
      stageUuid: "00f0dbe9-7cf2-8b20-9f39-defe45db3774"
    - stage: uuid
      stageUuid: "2af709c7-248a-8583-b56d-1c644e9d64b3"
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
