---
name: pipelines
description: "Use when tracking candidate applications, interview stages, offers, and hiring decisions per position — GDPR-compliant funnel (applied→screening→interview→offer→hired/rejected), sourcing, skill-match, and recruiter activity. The GDPR Art.6(1)(b) candidate-pipeline collection."
atomPath: "cost/centers/job/positions/recruiting/pipelines"
coordinate: "cost/centers/job/positions/recruiting/pipelines · 8/crest · f5c2252e"
contentUuid: "b89d656a-2875-5be5-9a6b-92c470fbcd26"
diamondUuid: "10e2d0f7-472e-8443-a561-b679e1929e55"
uuid: "f5c2252e-f502-85df-9a54-81ae3f6390c5"
horo: 8
bonds:
  in:
    - access
    - fields
    - hooks
    - identity
    - interview
    - proof
    - recruiting
    - standard
  out:
    - access
    - fields
    - hooks
    - identity
    - interview
    - proof
    - standard
typography:
  partition: cost
  bondDegree: 21
  neighbors: []
standards:
  - "ADA / EEOC US-equal-opportunity"
  - "EU Equal Treatment Directive 2000/78"
  - "GDPR Art.5(1)(e) storage-limitation"
  - "GDPR Art.6(1)(b) recruitment-lawful-basis"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - access
    - fields
    - hooks
    - identity
    - proof
    - standard
  matrix:
    - access
    - fields
    - hooks
    - identity
    - interview
    - proof
    - standard
  backlinks:
    - access
    - fields
    - hooks
    - identity
    - interview
    - proof
    - standard
signatures:
  computationUuid: "715cd83a-5d7d-8d1f-a470-e6e04dfff546"
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
      stageUuid: "91162533-3b98-84fc-80b4-689d5ab6ede2"
    - stage: seal
      stageUuid: "b0184ca8-a938-82a6-bbc4-e3c778f21623"
    - stage: uuid
      stageUuid: "804f7688-b3ac-8905-b4f9-df880f51f2fc"
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

Composes: [[fields]] · [[hooks]] · [[access]] · [[standard]] · [[proof]] · [[identity]].
