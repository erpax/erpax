---
name: pipelines
description: "Use when tracking candidate applications, interview stages, offers, and hiring decisions per position — GDPR-compliant funnel (applied→screening→interview→offer→hired/rejected), sourcing, skill-match, and recruiter activity. The GDPR Art.6(1)(b) candidate-pipeline collection."
atomPath: "cost/centers/job/positions/recruiting/pipelines"
coordinate: "cost/centers/job/positions/recruiting/pipelines · 5/round · f8504a06"
contentUuid: "fa4d5a25-15f5-58d1-9be1-5ddd6e876eba"
diamondUuid: "4ec95382-eab8-835d-a357-6f6fb8b96296"
uuid: "f8504a06-b90f-8c0b-b366-3b28fd9d7d89"
horo: 5
typography:
  partition: cost
  bondDegree: 21
standards:
  - "ADA / EEOC US-equal-opportunity"
  - "EU Equal Treatment Directive 2000/78"
  - "GDPR Art.5(1)(e) storage-limitation"
  - "GDPR Art.6(1)(b) recruitment-lawful-basis"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "a730f276-b29f-8adc-b67b-baab7c803a88"
  stages:
    - stage: path
      stageUuid: "4d849f42-98d4-8e67-bc26-040e53d4ec98"
    - stage: trinity
      stageUuid: "c2778467-5917-836d-bb3a-a68f3305575a"
    - stage: boundary
      stageUuid: "3cba4093-6050-8d87-9d02-35b691a0cf6a"
    - stage: links
      stageUuid: "666ce1f9-d459-8f90-bc27-19e53f781c25"
    - stage: horo
      stageUuid: "666328b9-3a74-893b-a286-707c32b7a172"
    - stage: seal
      stageUuid: "b0184ca8-a938-82a6-bbc4-e3c778f21623"
    - stage: uuid
      stageUuid: "557e77d9-7e2d-8041-8c4b-9a59e35f5a93"
version: 2
---
# recruiting-pipeline

Recruiting Pipeline — applicants / interviews / offers per position.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`

- ISO-8601-1:2019 date-time
- GDPR Art.6(1)(b) recruitment-lawful-basis
- GDPR Art.5(1)(e) storage-limitation
- EU Equal Treatment Directive 2000/78
- ADA / EEOC US-equal-opportunity
- ISO-19011:2018 audit-trail recruiting-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[field]] · [[hooks]] · [[access]] · [[standard]] · [[proof]] · [[identity]].
