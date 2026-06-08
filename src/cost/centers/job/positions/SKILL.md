---
name: positions
description: "Use when managing org-chart slots, headcount planning, or recruiting — an ESCO/ISCO-08 classified position (vacant, filled, or planned) that drives the recruiting pipeline and IAS-19 headcount accruals. The HR job-position collection."
atomPath: cost/centers/job/positions
coordinate: cost/centers/job/positions · 7/descent · 82f35770
contentUuid: "096dc86b-bae9-570e-a15b-aacef12272a3"
diamondUuid: "b293e95b-365f-8ccb-b269-d5d65fa9d1e2"
uuid: "82f35770-9b8c-8849-84db-045ed235615d"
horo: 7
bonds:
  in:
    - allocation
    - career
    - centers
    - compensation
    - decompression
    - identity
    - job
    - law
    - matter
    - pipeline
    - proof
    - standard
    - tenure
    - train
  out:
    - allocation
    - career
    - centers
    - compensation
    - decompression
    - identity
    - law
    - matter
    - pipeline
    - proof
    - standard
    - tenure
    - train
typography:
  partition: cost
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS IAS-19 employee-benefits (planned-headcount accruals)"
  - "ISO-19011:2018 audit-trail headcount-evidence"
  - "ISO-8601-1:2019 date-time"
bindings: []
neighbors:
  wikilink:
    - identity
    - law
    - pipeline
    - proof
    - standard
    - train
  matrix:
    - allocation
    - career
    - centers
    - compensation
    - decompression
    - identity
    - law
    - matter
    - pipeline
    - proof
    - standard
    - tenure
    - train
  backlinks:
    - allocation
    - career
    - centers
    - compensation
    - decompression
    - identity
    - law
    - matter
    - pipeline
    - proof
    - standard
    - tenure
    - train
signatures:
  computationUuid: "89b9ce09-b713-883c-8168-c6c96518fc4b"
  stages:
    - stage: path
      stageUuid: "5965dd4d-91c4-8faf-99b9-f05081fb6b66"
    - stage: trinity
      stageUuid: "1c213776-dfaf-8c72-b040-1f2ce08f6094"
    - stage: boundary
      stageUuid: "cab97988-e53d-8bb1-999d-b77c7b7dee5c"
    - stage: links
      stageUuid: "44e32719-7151-81c0-a3e0-82e428b4c799"
    - stage: horo
      stageUuid: "1557ed66-6961-894e-9bc9-63cb72683b14"
    - stage: seal
      stageUuid: "bf8e606c-00ce-86bc-a6e4-ed3c01b23a51"
    - stage: uuid
      stageUuid: "73825b41-5998-811e-9dd6-8932ecaddec4"
version: 2
---
# job-positions

Job Positions — open positions + org-chart anchor.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- IFRS IAS-19 employee-benefits (planned-headcount accruals)
- ISO-19011:2018 audit-trail headcount-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a job-position is an ESCO/ISCO-08-classified org-chart slot (vacant·filled·planned) — it anchors headcount planning, drives the recruiting [[pipeline]], and accrues IAS-19 headcount, distinct from the person who fills it.**

Composes: [[pipeline]] · [[train]] · [[identity]] · [[proof]] · [[standard]].
