---
name: reviews
description: "Use when running employee performance cycles — annual, mid-year, quarterly, probation, PIP, 360 — self-assessment plus manager review, competency ratings, merit-increase and promotion recommendations, and GDPR-compliant processing. The employee performance-review collection."
atomPath: "employees/performance/reviews"
coordinate: "employees/performance/reviews · 7/descent · d2dc6615"
contentUuid: "f74dfe82-ac62-5a89-82ef-712858e246d6"
diamondUuid: "021b870c-917c-824e-befc-d6fc2eb955c6"
uuid: "d2dc6615-8706-8741-837c-5fad2246ec41"
horo: 7
typography:
  partition: employees
  bondDegree: 24
standards:
  - "EU Equal Treatment Directive 2000/78"
  - GDPR Art.5 PII processing
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3aaa8dbf-e6eb-8fe1-8134-dd21f6eb8f59"
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
      stageUuid: "348ba744-f7a7-8dd2-b8a5-08ab1b4259a4"
    - stage: seal
      stageUuid: "f9b059a7-e7da-8eac-a32e-15eb604c42c3"
    - stage: uuid
      stageUuid: "e3758520-e143-8202-962f-4cbe62bc81b3"
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
