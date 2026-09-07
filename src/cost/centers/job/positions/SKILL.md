---
name: positions
description: "Use when managing org-chart slots, headcount planning, or recruiting — an ESCO/ISCO-08 classified position (vacant, filled, or planned) that drives the recruiting pipeline and IAS-19 headcount accruals. The HR job-position collection."
atomPath: "cost/centers/job/positions"
coordinate: "cost/centers/job/positions · 5/round · 891017e9"
contentUuid: "8e91752f-903f-5ba3-9afe-551ade77f9f5"
diamondUuid: "e79ecb97-3674-8271-bf6c-850c189e44fc"
uuid: "891017e9-3f2a-870a-98ec-a62797d163d0"
horo: 5
typography:
  partition: cost
  bondDegree: 42
standards:
  - "IFRS IAS-19 employee-benefits (planned-headcount accruals)"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "5618cfa8-22e6-89a6-a725-8d3e6aef6af6"
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
      stageUuid: "e0565cf5-7c88-848f-ae8c-b78b5092d505"
    - stage: seal
      stageUuid: "bf8e606c-00ce-86bc-a6e4-ed3c01b23a51"
    - stage: uuid
      stageUuid: "34d01b61-1fbb-8e2e-9f85-b24ed923272b"
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
