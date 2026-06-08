---
name: pipelines
description: "Use when tracking candidate applications, interview stages, offers, and hiring decisions per position — GDPR-compliant funnel (applied→screening→interview→offer→hired/rejected), sourcing, skill-match, and recruiter activity. The GDPR Art.6(1)(b) candidate-pipeline collection."
atomPath: cost/centers/job/positions/recruiting/pipelines
coordinate: cost/centers/job/positions/recruiting/pipelines · 5/round · cd49baef
contentUuid: "9da8228b-6be7-5a3a-84d0-75a046bce1f2"
diamondUuid: "79350d65-b8ba-8249-8d41-3c66fec4f11c"
uuid: "cd49baef-abf3-8c21-89b6-6742ad72343c"
horo: 5
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
  - EU Equal Treatment Directive 2000/78
  - "GDPR Art.5(1)(e) storage-limitation"
  - "GDPR Art.6(1)(b) recruitment-lawful-basis"
  - "ISO-19011:2018 audit-trail recruiting-evidence"
  - "ISO-8601-1:2019 date-time"
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
  computationUuid: "f5357b45-e474-87a6-8893-5273be7660c7"
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
      stageUuid: "44348790-bd04-8b7f-a50a-a9a4a0dc11b0"
    - stage: seal
      stageUuid: "b0184ca8-a938-82a6-bbc4-e3c778f21623"
    - stage: uuid
      stageUuid: "79027a84-bf61-8a38-8588-e15ab2d61bdf"
version: 2
---
# recruiting-pipeline

Recruiting Pipeline — applicants / interviews / offers per position.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- GDPR Art.6(1)(b) recruitment-lawful-basis
- GDPR Art.5(1)(e) storage-limitation
- EU Equal Treatment Directive 2000/78
- ADA / EEOC US-equal-opportunity
- ISO-19011:2018 audit-trail recruiting-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[fields]] · [[hooks]] · [[access]] · [[standard]] · [[proof]] · [[identity]].
