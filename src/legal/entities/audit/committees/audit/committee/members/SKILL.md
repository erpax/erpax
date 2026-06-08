---
name: members
description: "Use when recording individual members of an audit committee — name, title, affiliation (internal/external/independent), role (chair/vice-chair/member/financial-expert), term dates, and expertise areas. The SOX §301 committee-composition roster."
atomPath: legal/entities/audit/committees/audit/committee/members
coordinate: legal/entities/audit/committees/audit/committee/members · 7/descent · bf66b5cc
contentUuid: "cdc13bd4-8bae-531d-bbf2-7296fe5c6e1f"
diamondUuid: "2f29faf2-0fdc-806f-9a27-f7a7c15daced"
uuid: "bf66b5cc-ea7c-8be2-b106-6b94671f9acd"
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
  computationUuid: "ab1b7f68-e2e6-80f1-ad38-ac76ee3fe3d2"
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
      stageUuid: "9ea0f813-79ce-84b5-9692-7bb66f24ce5e"
    - stage: seal
      stageUuid: "9ac44f9d-f298-89ff-9dd2-a2a30690d8dd"
    - stage: uuid
      stageUuid: "91218a1f-99ab-8429-bafb-6d7b8e454af8"
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
