---
name: pipelines
description: "Use when tracking candidate applications, interview stages, offers, and hiring decisions per position — GDPR-compliant funnel (applied→screening→interview→offer→hired/rejected), sourcing, skill-match, and recruiter activity. The GDPR Art.6(1)(b) candidate-pipeline collection."
atomPath: "cost/centers/job/positions/recruiting/pipelines"
coordinate: "cost/centers/job/positions/recruiting/pipelines · 2/share · d0c41f52"
contentUuid: "f193799a-17cb-59f9-98ac-bc7c8d72d4bf"
diamondUuid: "b419b8b5-e0e2-8628-9963-46a5a3827880"
uuid: "d0c41f52-f1e8-8e17-bb83-71d1d7170686"
horo: 2
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
  computationUuid: "fa7ab2f4-35c0-809a-a3e3-e4612516ce06"
  stages:
    - stage: path
      stageUuid: "4d849f42-98d4-8e67-bc26-040e53d4ec98"
    - stage: trinity
      stageUuid: "c2778467-5917-836d-bb3a-a68f3305575a"
    - stage: boundary
      stageUuid: "3cba4093-6050-8d87-9d02-35b691a0cf6a"
    - stage: links
      stageUuid: "7a956905-9441-8005-8da4-4da5dffc1f4a"
    - stage: horo
      stageUuid: "839501b9-9c9f-8f6d-994f-2378f97df062"
    - stage: seal
      stageUuid: "b0184ca8-a938-82a6-bbc4-e3c778f21623"
    - stage: uuid
      stageUuid: "f0ccc008-2249-88ad-9d27-f6a03fc6342b"
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
