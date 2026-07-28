---
name: positions
description: "Use when managing org-chart slots, headcount planning, or recruiting — an ESCO/ISCO-08 classified position (vacant, filled, or planned) that drives the recruiting pipeline and IAS-19 headcount accruals. The HR job-position collection."
atomPath: "cost/centers/job/positions"
coordinate: "cost/centers/job/positions · 1/base · 5e952a9c"
contentUuid: "a9d41dd9-a52d-5f7b-91cc-ec60ef65c980"
diamondUuid: "f66a2bff-e928-8353-9ce5-08f288c14da1"
uuid: "5e952a9c-f6ee-85ad-a761-a26b420f372c"
horo: 1
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
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "b7a7b5e5-88df-84f1-b77c-c2ebe26b13dc"
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
      stageUuid: "25b1e914-63a8-8476-8547-7235d6c63be4"
    - stage: seal
      stageUuid: "bf8e606c-00ce-86bc-a6e4-ed3c01b23a51"
    - stage: uuid
      stageUuid: "183308de-891e-80ab-8056-6344f606c4e5"
version: 2
---
# job-positions

Job Positions — open positions + org-chart anchor.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`

- ISO-8601-1:2019 date-time
- IFRS IAS-19 employee-benefits (planned-headcount accruals)
- ISO-19011:2018 audit-trail headcount-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: a job-position is an ESCO/ISCO-08-classified org-chart slot (vacant·filled·planned) — it anchors headcount planning, drives the recruiting [[pipeline]], and accrues IAS-19 headcount, distinct from the person who fills it.**

Composes: [[pipeline]] · [[train]] · [[identity]] · [[proof]] · [[standard]].
