---
name: reviews
description: "Use when running employee performance cycles — annual, mid-year, quarterly, probation, PIP, 360 — self-assessment plus manager review, competency ratings, merit-increase and promotion recommendations, and GDPR-compliant processing. The employee performance-review collection."
atomPath: "employees/performance/reviews"
coordinate: "employees/performance/reviews · 2/share · 6896fc07"
contentUuid: "a9008ce2-00fb-5c01-bdd2-4715e106462e"
diamondUuid: "e6a78406-6e09-8550-9710-af63edbc4a77"
uuid: "6896fc07-9c31-8d20-b7ac-b0b54d3913b1"
horo: 2
typography:
  partition: employees
  bondDegree: 27
standards:
  - "EU Equal Treatment Directive 2000/78"
  - GDPR Art.5 PII processing
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "0e21435b-9d0b-8068-8c42-8ad21d8b970c"
  stages:
    - stage: path
      stageUuid: "5277ad0d-e19b-863b-952e-000dac385bcf"
    - stage: trinity
      stageUuid: "175b1fdb-df54-8fe3-8d4a-ec117e8096da"
    - stage: boundary
      stageUuid: "dac28e6c-5d86-8d20-9a67-126286acb7dd"
    - stage: links
      stageUuid: "ce231bb4-ab71-8a1c-91d5-c9c402efc98a"
    - stage: horo
      stageUuid: "e5c2dc35-b20e-8f0c-932b-a3fcb53d8859"
    - stage: seal
      stageUuid: "f9b059a7-e7da-8eac-a32e-15eb604c42c3"
    - stage: uuid
      stageUuid: "39bb8917-0869-89a4-956a-788fc7b50fde"
version: 2
---
# performance-reviews

Performance Reviews — annual / quarterly review records.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: one record per employee performance cycle — self-assessment plus manager review, competency ratings, and merit/promotion recommendations, processed under GDPR; a single-folder collection node (no scatter, no drift).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`

- ISO-8601-1:2019 date-time
- GDPR Art.5 PII processing
- EU Equal Treatment Directive 2000/78
- ISO-19011:2018 audit-trail performance-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[access]] · [[field]] · [[hooks]] · [[identity]] · [[proof]].
