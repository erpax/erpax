---
name: reviews
description: "Use when running employee performance cycles — annual, mid-year, quarterly, probation, PIP, 360 — self-assessment plus manager review, competency ratings, merit-increase and promotion recommendations, and GDPR-compliant processing. The employee performance-review collection."
atomPath: employees/performance/reviews
coordinate: employees/performance/reviews · 8/crest · e7d9287c
contentUuid: "92b21028-6b5d-5424-9dab-0e6e2890cd05"
diamondUuid: "d7a4ee4e-7f04-846a-b64d-28500a3f6118"
uuid: "e7d9287c-fa7c-8da4-9840-2f2399eb1aee"
horo: 8
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
  - EU Equal Treatment Directive 2000/78
  - GDPR Art.5 PII processing
  - "ISO-19011:2018 audit-trail performance-evidence"
  - "ISO-8601-1:2019 date-time"
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
  computationUuid: "dba264f4-90e6-825a-b2bc-2256baacb366"
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
      stageUuid: "33f17f1b-048d-8fb5-9c6c-deab126a7ceb"
    - stage: seal
      stageUuid: "f9b059a7-e7da-8eac-a32e-15eb604c42c3"
    - stage: uuid
      stageUuid: "2b1c5c85-a32c-8d1f-9464-29d55c297405"
version: 2
---
# performance-reviews

Performance Reviews — annual / quarterly review records.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: one record per employee performance cycle — self-assessment plus manager review, competency ratings, and merit/promotion recommendations, processed under GDPR; a single-folder collection node (no scatter, no drift).**

## Standards
- ISO-8601-1:2019 date-time
- GDPR Art.5 PII processing
- EU Equal Treatment Directive 2000/78
- ISO-19011:2018 audit-trail performance-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[access]] · [[fields]] · [[hooks]] · [[identity]] · [[proof]].
