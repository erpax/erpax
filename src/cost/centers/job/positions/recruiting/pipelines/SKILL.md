---
name: pipelines
description: "Use when tracking candidate applications, interview stages, offers, and hiring decisions per position — GDPR-compliant funnel (applied→screening→interview→offer→hired/rejected), sourcing, skill-match, and recruiter activity. The GDPR Art.6(1)(b) candidate-pipeline collection."
atomPath: "cost/centers/job/positions/recruiting/pipelines"
coordinate: "cost/centers/job/positions/recruiting/pipelines · 7/descent · 12adf422"
contentUuid: "ebe50441-5441-59f5-a8c5-6218355e7b30"
diamondUuid: "7576d96e-1de7-8b07-aa73-b99e0f09d3cd"
uuid: "12adf422-610b-8a7d-aa19-b20cc16a6bb9"
horo: 7
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
  computationUuid: "6a1610b1-b910-8480-bfaf-1e6ec0130cd6"
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
      stageUuid: "c9d7371f-04dd-8f6d-8b9c-f85c344f3483"
    - stage: seal
      stageUuid: "b0184ca8-a938-82a6-bbc4-e3c778f21623"
    - stage: uuid
      stageUuid: "569845a4-dc2d-83a4-9a59-8008a94334db"
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
