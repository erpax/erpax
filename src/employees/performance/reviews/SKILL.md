---
name: reviews
description: "Use when running employee performance cycles — annual, mid-year, quarterly, probation, PIP, 360 — self-assessment plus manager review, competency ratings, merit-increase and promotion recommendations, and GDPR-compliant processing. The employee performance-review collection."
atomPath: "employees/performance/reviews"
coordinate: "employees/performance/reviews · 4/weave · c70edc16"
contentUuid: "dd2fd7f2-5efe-5534-bb52-182003f66ea5"
diamondUuid: "4644e104-bc8c-852f-8942-5430e5642ac6"
uuid: "c70edc16-0d62-86d7-ba4f-e9f6380ca6cb"
horo: 4
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
  computationUuid: "2faa577d-e7c9-8f77-869f-1517de64338b"
  stages:
    - stage: path
      stageUuid: "5277ad0d-e19b-863b-952e-000dac385bcf"
    - stage: trinity
      stageUuid: "175b1fdb-df54-8fe3-8d4a-ec117e8096da"
    - stage: boundary
      stageUuid: "dac28e6c-5d86-8d20-9a67-126286acb7dd"
    - stage: links
      stageUuid: "5aa1577c-bd93-8e99-8b08-243272bc8ade"
    - stage: horo
      stageUuid: "915b4252-fab3-8187-8fcf-c0cf81b2bbb6"
    - stage: seal
      stageUuid: "f9b059a7-e7da-8eac-a32e-15eb604c42c3"
    - stage: uuid
      stageUuid: "fc798573-5c42-8ec2-9190-4c4d912e2f00"
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
