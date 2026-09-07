---
name: consolidations
description: "Use when running or auditing a multi-entity group consolidation — entity closure readiness, intercompany balance reconciliation, elimination entry preparation, and consolidation workflow per IFRS-10 / IAS-27 / ASC-810. The group-consolidation process collection."
atomPath: "legal/entities/consolidations"
coordinate: "legal/entities/consolidations · 1/base · 92251bc5"
contentUuid: "01c2f47f-106f-51c4-8e88-4b085dda0d32"
diamondUuid: "bd880007-59af-87cf-9930-5dacaf0ab9ec"
uuid: "92251bc5-a064-8d82-9d48-d0b49439273d"
horo: 1
typography:
  partition: legal
  bondDegree: 19
standards:
  - "IAS-27 separate-financial-statements"
  - "IFRS-10 consolidated-financial-statements"
  - "US-GAAP ASC-810 consolidation"
bindings: []
signatures:
  computationUuid: "6584cedc-6e77-806e-9033-f7ab52162f4f"
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
      stageUuid: "df9efb39-3a9d-8216-b976-96fb81f0aff9"
    - stage: seal
      stageUuid: "80374fbf-39a0-80c0-8d9b-2c05ac4d04c5"
    - stage: uuid
      stageUuid: "685d7bcd-d4cb-8912-a866-f7c7c1f84494"
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
