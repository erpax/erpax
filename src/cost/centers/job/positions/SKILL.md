---
name: positions
description: "Use when managing org-chart slots, headcount planning, or recruiting — an ESCO/ISCO-08 classified position (vacant, filled, or planned) that drives the recruiting pipeline and IAS-19 headcount accruals. The HR job-position collection."
atomPath: "cost/centers/job/positions"
coordinate: "cost/centers/job/positions · 5/round · f6212664"
contentUuid: "f044f5da-5fb9-5850-ba7a-726182cfcaec"
diamondUuid: "9bec28e1-110a-8ba3-8281-49e60ad987da"
uuid: "f6212664-bde6-8c86-890d-a5a0bbc76ea2"
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
  computationUuid: "a6479c63-964f-8af5-8738-afe1ddc863f3"
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
      stageUuid: "f9dc147a-b2d2-8311-bdbf-4de744ba42be"
    - stage: seal
      stageUuid: "bf8e606c-00ce-86bc-a6e4-ed3c01b23a51"
    - stage: uuid
      stageUuid: "26f540d8-6c5e-81a9-8940-d56c42af5c6d"
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
