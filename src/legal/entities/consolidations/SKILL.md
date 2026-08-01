---
name: consolidations
description: "Use when running or auditing a multi-entity group consolidation — entity closure readiness, intercompany balance reconciliation, elimination entry preparation, and consolidation workflow per IFRS-10 / IAS-27 / ASC-810. The group-consolidation process collection."
atomPath: "legal/entities/consolidations"
coordinate: "legal/entities/consolidations · 4/weave · 19fecc14"
contentUuid: "1ba7e565-293d-5efb-ae42-5078b20c6ded"
diamondUuid: "12c076aa-5de1-8e31-a777-d6dd1db59bb9"
uuid: "19fecc14-ee26-8f9f-868c-bafaf41dfa4c"
horo: 4
typography:
  partition: legal
  bondDegree: 0
standards:
  - "IAS-27 separate-financial-statements"
  - "IFRS-10 consolidated-financial-statements"
  - "US-GAAP ASC-810 consolidation"
bindings: []
signatures:
  computationUuid: "5ffca0dc-dabf-85e7-b70e-b72698087139"
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
      stageUuid: "7757062c-ba24-862d-82fb-7c1139da386c"
    - stage: seal
      stageUuid: "00f0dbe9-7cf2-8b20-9f39-defe45db3774"
    - stage: uuid
      stageUuid: "5f597aea-b9f9-8366-bf6c-31590f4adf4a"
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
