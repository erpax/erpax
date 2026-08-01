---
name: reviews
description: "Use when running employee performance cycles — annual, mid-year, quarterly, probation, PIP, 360 — self-assessment plus manager review, competency ratings, merit-increase and promotion recommendations, and GDPR-compliant processing. The employee performance-review collection."
atomPath: "employees/performance/reviews"
coordinate: "employees/performance/reviews · 1/base · acfff9ab"
contentUuid: "c43e0514-77f7-5496-bb15-6d4323cd64b5"
diamondUuid: "f4ca8ecf-2a30-8b3e-9051-a18b57890d09"
uuid: "acfff9ab-5fd1-8dce-9ffa-fb5d505106d8"
horo: 1
typography:
  partition: employees
  bondDegree: 25
standards:
  - "EU Equal Treatment Directive 2000/78"
  - GDPR Art.5 PII processing
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b664f78d-8735-8477-8eb6-85f96c8b485b"
  stages:
    - stage: path
      stageUuid: "5277ad0d-e19b-863b-952e-000dac385bcf"
    - stage: trinity
      stageUuid: "175b1fdb-df54-8fe3-8d4a-ec117e8096da"
    - stage: boundary
      stageUuid: "dac28e6c-5d86-8d20-9a67-126286acb7dd"
    - stage: links
      stageUuid: "d4440b1a-ff95-86b7-ad5d-40ebd39e20f3"
    - stage: horo
      stageUuid: "b2e10e73-8f25-8c24-a962-7de89b8a57bf"
    - stage: seal
      stageUuid: "f9b059a7-e7da-8eac-a32e-15eb604c42c3"
    - stage: uuid
      stageUuid: "e1df1ff8-5d1e-8f64-b148-d50ea0149ff0"
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

Composes: [[access]] · [[fields]] · [[hooks]] · [[identity]] · [[proof]].
