---
name: reviews
description: "Use when running employee performance cycles — annual, mid-year, quarterly, probation, PIP, 360 — self-assessment plus manager review, competency ratings, merit-increase and promotion recommendations, and GDPR-compliant processing. The employee performance-review collection."
atomPath: "employees/performance/reviews"
coordinate: "employees/performance/reviews · 2/share · 2fc3d532"
contentUuid: "a4f24ac6-0fc7-53f8-8e93-ac4323c68715"
diamondUuid: "516073e1-b2ec-8921-9a1d-6ce59ba190b2"
uuid: "2fc3d532-afdc-86bc-ac80-2725eaf7701e"
horo: 2
bonds:
  in:
    - access
    - employees
    - feedback
    - fields
    - hooks
    - identity
    - law
    - performance
    - proof
    - satisfaction
  out:
    - access
    - employees
    - feedback
    - fields
    - hooks
    - identity
    - law
    - proof
    - satisfaction
typography:
  partition: employees
  bondDegree: 27
  neighbors: []
standards:
  - "EU Equal Treatment Directive 2000/78"
  - GDPR Art.5 PII processing
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
    - law
    - proof
  matrix:
    - access
    - employees
    - feedback
    - fields
    - hooks
    - identity
    - law
    - proof
    - satisfaction
  backlinks:
    - access
    - employees
    - feedback
    - fields
    - hooks
    - identity
    - law
    - proof
    - satisfaction
signatures:
  computationUuid: "aeb4c32a-1c4b-82c9-9e12-14a25d02e065"
  stages:
    - stage: path
      stageUuid: "5277ad0d-e19b-863b-952e-000dac385bcf"
    - stage: trinity
      stageUuid: "175b1fdb-df54-8fe3-8d4a-ec117e8096da"
    - stage: boundary
      stageUuid: "dac28e6c-5d86-8d20-9a67-126286acb7dd"
    - stage: links
      stageUuid: "327fce69-ee90-846e-8489-1ebce855c70e"
    - stage: horo
      stageUuid: "87b666bb-5ce4-8384-b222-736717757831"
    - stage: seal
      stageUuid: "f9b059a7-e7da-8eac-a32e-15eb604c42c3"
    - stage: uuid
      stageUuid: "0632c3de-fe31-83b8-a9c7-1f46e04998e5"
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
