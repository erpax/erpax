---
name: members
description: "Use when recording individual members of an audit committee — name, title, affiliation (internal/external/independent), role (chair/vice-chair/member/financial-expert), term dates, and expertise areas. The SOX §301 committee-composition roster."
atomPath: "legal/entities/audit/committees/audit/committee/members"
coordinate: "legal/entities/audit/committees/audit/committee/members · 7/descent · 6668c189"
contentUuid: "e7fbc473-370d-5cd2-b737-795fc1dbb0e9"
diamondUuid: "422fd72a-ef34-80bf-8f41-f3fe9e5f3c14"
uuid: "6668c189-7935-817d-ac18-f95abc8f5a22"
horo: 7
bonds:
  in:
    - committee
    - committees
  out:
    - committees
typography:
  partition: legal
  bondDegree: 3
  neighbors: []
standards:
  - "NYSE 303A.07 audit-committee"
  - "SEC Rule 10A-3 audit-committee-independence"
  - "SOX §301 audit-committee-composition"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - committees
  backlinks:
    - committees
signatures:
  computationUuid: "1648bea9-ff24-8173-83ec-351c17e51f83"
  stages:
    - stage: path
      stageUuid: "cf88a4d2-e636-8912-a3ab-cfebaab3fb46"
    - stage: trinity
      stageUuid: "12f414ad-2aae-85e7-9770-471175e425ba"
    - stage: boundary
      stageUuid: "aa09dfad-1ef3-868f-a100-94e6a6d51f1e"
    - stage: links
      stageUuid: "c1e2d989-260a-8fee-86d2-91e12e1fbcd8"
    - stage: horo
      stageUuid: "d4f384ca-7133-8e12-833e-f12b6b08a1c0"
    - stage: seal
      stageUuid: "9ac44f9d-f298-89ff-9dd2-a2a30690d8dd"
    - stage: uuid
      stageUuid: "56ed910c-8a80-8279-81bf-ce6fab149fb8"
version: 2
---
# audit-committee-members

AuditCommitteeMembers.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SOX §301 audit-committee-composition
- SEC Rule 10A-3 audit-committee-independence
- NYSE 303A.07 audit-committee
- ISO-27001 A.5.23 cloud-service-tenant-isolation
