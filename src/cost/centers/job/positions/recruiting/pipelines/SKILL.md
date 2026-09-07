---
name: pipelines
description: "Use when tracking candidate applications, interview stages, offers, and hiring decisions per position — GDPR-compliant funnel (applied→screening→interview→offer→hired/rejected), sourcing, skill-match, and recruiter activity. The GDPR Art.6(1)(b) candidate-pipeline collection."
atomPath: "cost/centers/job/positions/recruiting/pipelines"
coordinate: "cost/centers/job/positions/recruiting/pipelines · 8/crest · cde5826e"
contentUuid: "f028b7fe-0fd8-502d-8232-1b063f1ae46e"
diamondUuid: "d26f126b-331f-8154-9246-a31ff68ba08f"
uuid: "cde5826e-562b-8a92-a6d4-67c63eb404c1"
horo: 8
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
  computationUuid: "3714be51-06af-8a62-a6c5-f1c82ecfd195"
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
      stageUuid: "1abb272f-3840-8df0-955f-e85402bb4b55"
    - stage: seal
      stageUuid: "b0184ca8-a938-82a6-bbc4-e3c778f21623"
    - stage: uuid
      stageUuid: "62331812-e97f-83cf-b69b-9a86646486ca"
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
